'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState, useCallback, useMemo, useEffect } from 'react';

// Create transport once outside the component to avoid re-creation on every render
const chatTransport = new DefaultChatTransport({ api: '/api/chat' });

// Bump this version whenever the message schema changes (e.g., removing tool call history).
// Old localStorage entries stored under a different version are automatically wiped.
const CHAT_VERSION = 'v2';
const STORAGE_KEY = `rama-chat-history-${CHAT_VERSION}`;

// Wipe any old versioned keys so stale/corrupt history doesn't bleed into new sessions
if (typeof window !== 'undefined') {
  ['rama-chat-history', 'rama-chat-history-v1'].forEach((oldKey) => {
    if (localStorage.getItem(oldKey)) {
      localStorage.removeItem(oldKey);
    }
  });
}

interface V7Part {
  type: string;
  text?: string;
  toolCallId?: string;
  toolName?: string;
  state?: string;
  input?: Record<string, unknown>;
  output?: unknown;
}

interface V7UIMessage {
  id: string;
  role: string;
  parts?: V7Part[];
}

export function useAIChat() {
  const { messages, setMessages, sendMessage: chatSendMessage, status, error } = useChat({
    transport: chatTransport,
  });

  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          if (setMessages) setMessages(parsed);
        }
      } catch (e) {
        console.error('Failed to parse chat history', e);
      }
    }

    setIsLoaded(true);
  }, [setMessages]);

  // Save to localStorage when messages change
  useEffect(() => {
    if (isLoaded) {
      if (messages.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, [messages, isLoaded]);

  const clearChat = useCallback(() => {
    if (setMessages) setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  }, [setMessages]);

  const [input, setInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const sendMessage = useCallback(
    async (content: string) => {
      const text = content.trim();
      if (!text) return;
      setInput('');
      try {
        await chatSendMessage({ role: 'user', parts: [{ type: 'text', text }] });
      } catch (err) {
        console.error('Error sending message:', err);
      }
    },
    [chatSendMessage],
  );

  // Normalize messages for the UI — v7 uses parts array, NOT content or toolInvocations
  const normalizedMessages = useMemo(() => {
    return (messages as unknown as V7UIMessage[]).map((msg) => {
      const parts = msg.parts ?? [];

      // Extract plain text content from text parts
      const textContent = parts
        .filter((p: V7Part) => p.type === 'text')
        .map((p: V7Part) => p.text ?? '')
        .join('');

      // In v7, tool parts have type "tool-{toolName}" (e.g. "tool-show_property_cards")
      // They have: toolCallId, toolName (derived), state, input, output
      const toolInvocations = parts
        .filter((p: V7Part) => typeof p.type === 'string' && p.type.startsWith('tool-') && p.type !== 'tool-input-start')
        .map((p: V7Part) => {
          // Extract tool name: "tool-show_property_cards" → "show_property_cards"
          const toolName = p.type === 'dynamic-tool'
            ? p.toolName
            : p.type.replace(/^tool-/, '');
          // Map v7 states to legacy format expected by generative-ui.tsx
          // v7 states: 'input-streaming' | 'input-available' | 'output-available' | 'output-error'
          let legacyState: string;
          const result = p.output;
          if (p.state === 'output-available') {
            legacyState = 'result';
          } else if (p.state === 'input-available') {
            legacyState = 'call';
          } else {
            legacyState = 'partial-call'; // streaming
          }
          return {
            toolCallId: p.toolCallId ?? '',
            toolName: toolName ?? '',
            args: p.input ?? {},
            state: legacyState,
            result,
          };
        });

      return {
        id: msg.id,
        role: msg.role as 'user' | 'assistant',
        content: textContent,
        toolInvocations: toolInvocations.length > 0 ? toolInvocations : undefined,
        parts,
      };
    });
  }, [messages]);

  return {
    messages: normalizedMessages,
    sendMessage,
    isLoading: status === 'submitted' || status === 'streaming',
    error: error?.message ?? null,
    input,
    setInput,
    handleInputChange,
    clearChat,
  };
}
