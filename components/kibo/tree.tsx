'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight,
  ChevronDown,
  FileText,
  ShieldCheck,
  Lock,
  ExternalLink,
  CheckCircle2,
  Folder,
  FolderOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TreeNode {
  id: string;
  title: string;
  type: 'folder' | 'document' | 'certificate' | 'contract';
  status?: 'verified' | 'pending' | 'encrypted';
  hash?: string;
  date?: string;
  children?: TreeNode[];
}

export interface TreeProps {
  data: TreeNode[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const nodeIcons = {
  folder: Folder,
  document: FileText,
  certificate: ShieldCheck,
  contract: Lock,
};

const statusBadges = {
  verified: {
    label: 'DLD Verified',
    color:
      'bg-surface-subtle/10 text-fjord dark:text-muted border-border/20',
  },
  pending: {
    label: 'In Audit',
    color:
      'bg-surface-subtle/10 dark:bg-surface-subtle/10 text-muted dark:text-muted dark:text-muted dark:text-muted border-stone-400/20 dark:border-stone-600/20',
  },
  encrypted: {
    label: '256-Bit Encrypted',
    color:
      'bg-surface-subtle/10 dark:bg-surface-subtle/10 text-muted dark:text-muted dark:text-muted dark:text-muted border-border/20 dark:border-stone-700/20',
  },
};

export const TreeItem = ({
  node,
  level = 0,
}: {
  node: TreeNode;
  level?: number;
}) => {
  const [isOpen, setIsOpen] = useState(level === 0 || level === 1);
  const hasChildren = node.children && node.children.length > 0;
  const IconComponent =
    node.type === 'folder'
      ? isOpen
        ? FolderOpen
        : Folder
      : nodeIcons[node.type];

  return (
    <div className="select-none">
      <motion.div
        onClick={() => hasChildren && setIsOpen(!isOpen)}
        whileHover={{ x: 3 }}
        className={cn(
          'group flex items-center justify-between border border-transparent px-3 py-2.5 transition-colors hover:border-border/60 hover:bg-surface-subtle dark:border-border/60 dark:bg-fjord-hover',
          hasChildren && 'cursor-pointer font-semibold',
          !hasChildren && 'text-text',
        )}
        style={{ paddingLeft: `${Math.max(12, level * 24 + 12)}px` }}
      >
        <div className="flex min-w-0 items-center gap-2.5">
          {hasChildren ? (
            <span className="text-muted transition-transform duration-200 dark:text-muted">
              {isOpen ? (
                <ChevronDown className="size-4" />
              ) : (
                <ChevronRight className="size-4" />
              )}
            </span>
          ) : (
            <span className="w-4" />
          )}
          <IconComponent
            className={cn(
              'size-4 shrink-0',
              node.type === 'certificate'
                ? 'text-fjord'
                : 'text-fjord dark:text-muted',
            )}
          />
          <span className="truncate text-sm font-medium text-fjord dark:text-white">
            {node.title}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          {node.hash && (
            <span className="hidden font-mono text-[10px] text-muted md:inline dark:text-muted">
              {node.hash}
            </span>
          )}
          {node.date && (
            <span className="text-xs text-muted dark:text-muted">
              {node.date}
            </span>
          )}
          {node.status && (
            <span
              className={cn(
                'inline-flex items-center gap-1 border px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase',
                statusBadges[node.status].color,
              )}
            >
              {node.status === 'verified' && (
                <CheckCircle2 className="size-3" />
              )}
              <span>{statusBadges[node.status].label}</span>
            </span>
          )}
        </div>
      </motion.div>

      <AnimatePresence initial={false}>
        {isOpen && hasChildren && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: 0.2,
              type: 'spring',
              stiffness: 400,
              damping: 30,
            }}
            className="ml-5 overflow-hidden border-l border-border/40 dark:border-border/40"
          >
            {node.children!.map((child) => (
              <TreeItem key={child.id} node={child} level={level + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Tree = ({
  data = [],
  title = 'Cryptographic Title Deed & Escrow Registry',
  subtitle = 'DLD Blockchain Document Hierarchy',
  className,
}: TreeProps) => {
  return (
    <div
      className={cn(
        'border border-border/60 bg-surface p-6 shadow-sm dark:border-border/60 dark:bg-fjord-hover',
        className,
      )}
    >
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 border-b border-border/40 pb-5 sm:flex-row sm:items-center dark:border-border/40">
        <div>
          <span className="text-xs font-bold tracking-widest text-fjord uppercase dark:text-muted">
            {subtitle}
          </span>
          <h3 className="mt-1 font-display text-xl font-bold text-fjord sm:text-2xl dark:text-white">
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 bg-fjord-bg px-3 py-1 text-xs font-semibold text-white dark:bg-white dark:text-fjord">
            <Lock className="size-3.5" />
            <span>SHA-256 Immutable Audit</span>
          </span>
        </div>
      </div>

      {/* Tree Content */}
      <div className="space-y-1">
        {data.map((node) => (
          <TreeItem key={node.id} node={node} />
        ))}
      </div>
    </div>
  );
};
