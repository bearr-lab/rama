import { logger } from '@/lib/logger';

const NVIDIA_API_URL = 'https://integrate.api.nvidia.com/v1';
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 500;
const MAX_BATCH_SIZE = 100; // nv-embed-v1 batch limit or arbitrary safe limit

export interface EmbeddingRequest {
  input: string | string[];
  model?: string;
  encoding_format?: 'float' | 'base64';
}

export interface EmbeddingResponse {
  object: string;
  data: {
    object: string;
    index: number;
    embedding: number[];
  }[];
  model: string;
  usage: {
    prompt_tokens: number;
    total_tokens: number;
  };
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRetry(url: string, options: RequestInit, retries = MAX_RETRIES): Promise<Response> {
  let attempt = 0;
  
  while (attempt < retries) {
    try {
      const response = await fetch(url, options);
      
      // 429 Too Many Requests or 5xx Server Errors are retryable
      if (!response.ok && (response.status === 429 || response.status >= 500)) {
        throw new Error(`Retryable status: ${response.status}`);
      }
      
      return response;
    } catch (error) {
      attempt++;
      if (attempt >= retries) {
        throw error;
      }
      
      // Exponential backoff with jitter
      const backoffMs = BASE_DELAY_MS * Math.pow(2, attempt) + Math.random() * 100;
      logger.warn(`NVIDIA API fetch failed (attempt ${attempt}/${retries}). Retrying in ${Math.round(backoffMs)}ms...`);
      await delay(backoffMs);
    }
  }
  
  throw new Error('Unreachable');
}

export const nvidiaNim = {
  /**
   * Get embeddings for one or more text inputs using nvidia/nv-embed-v1.
   * Handles batching and retry logic automatically.
   */
  async getEmbeddings(inputs: string[]): Promise<number[][]> {
    if (!inputs || inputs.length === 0) return [];
    
    const apiKey = process.env.NVIDIA_NIM_API_KEY;
    if (!apiKey) {
      throw new Error('NVIDIA_NIM_API_KEY is not configured in environment variables.');
    }

    const allEmbeddings: number[][] = [];
    
    // Process in batches
    for (let i = 0; i < inputs.length; i += MAX_BATCH_SIZE) {
      const batch = inputs.slice(i, i + MAX_BATCH_SIZE);
      
      const response = await fetchWithRetry(`${NVIDIA_API_URL}/embeddings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'nvidia/nv-embed-v1',
          input: batch,
          encoding_format: 'float',
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`NVIDIA API Error (${response.status}): ${errorText}`);
      }

      const result = (await response.json()) as EmbeddingResponse;
      
      // Sort by index to ensure correct order
      const sortedData = [...result.data].sort((a, b) => a.index - b.index);
      
      allEmbeddings.push(...sortedData.map(item => item.embedding));
    }
    
    return allEmbeddings;
  }
};
