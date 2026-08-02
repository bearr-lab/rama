'use client';

import * as React from 'react';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Trash2,
  Sparkles,
  Building,
  Filter,
  MoreHorizontal,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Kanban } from '@/components/kibo/kanban';

export interface TaskItem {
  id: string;
  title: string;
  property: string;
  column: 'draft' | 'viewing' | 'offer' | 'transfer';
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  verified?: boolean;
}

const DEFAULT_TASKS: TaskItem[] = [
  {
    id: 'task-1',
    title: 'Verify RERA Escrow Account Certificate #8992-1',
    property: 'Sky Collection Penthouse, Downtown',
    column: 'draft',
    priority: 'low',
    dueDate: 'Today',
    verified: true,
  },
  {
    id: 'task-2',
    title: 'Review Developer Service Charge NOC (2024-2026)',
    property: 'Marina Gate Residence 1, Dubai Marina',
    column: 'draft',
    priority: 'medium',
    dueDate: 'Tomorrow',
    verified: true,
  },
  {
    id: 'task-3',
    title: 'Private VIP Inspection & Acoustic Survey',
    property: 'Sky Collection Penthouse, Downtown',
    column: 'viewing',
    priority: 'medium',
    dueDate: 'July 28, 14:00',
    verified: true,
  },
  {
    id: 'task-4',
    title: 'Submit Formal MOU Form F at AED 18.25M',
    property: 'Sky Collection Penthouse, Downtown',
    column: 'offer',
    priority: 'high',
    dueDate: 'July 30',
    verified: true,
  },
  {
    id: 'task-5',
    title: "Prepare Manager's Check for 4% DLD Transfer Fee",
    property: 'Creek Horizon Tower A, Creek Harbour',
    column: 'transfer',
    priority: 'high',
    dueDate: 'August 2',
    verified: true,
  },
];

const COLUMNS: {
  id: TaskItem['column'];
  label: string;
  badge: string;
  color: string;
}[] = [
  {
    id: 'draft',
    label: 'Stage 1: Due Diligence & Drafts',
    badge: 'Active',
    color:
      'border-border/30 dark:border-stone-700/30 bg-surface-subtle/5 dark:bg-surface-subtle/5',
  },
  {
    id: 'viewing',
    label: 'Stage 2: Viewings Scheduled',
    badge: 'Active',
    color: 'border-border/30 bg-surface-subtle/5',
  },
  {
    id: 'offer',
    label: 'Stage 3: MOU & Offers Submitted',
    badge: 'Pending',
    color:
      'border-stone-400/30 dark:border-stone-600/30 bg-surface-subtle/5 dark:bg-surface-subtle/5',
  },
  {
    id: 'transfer',
    label: 'Stage 4: DLD Transfer Ready',
    badge: 'Milestone',
    color: 'border-border/30 bg-surface-subtle/5',
  },
];

export function KanbanBoard() {
  const [tasks, setTasks] = React.useState<TaskItem[]>(DEFAULT_TASKS);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<'classic' | 'kibo'>('kibo');

  // Load from localStorage on client mount to prevent SSR hydration mismatch
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('rama_v2_kanban_tasks');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setTasks(parsed);
          }
        } catch (e) {}
      }
      setIsLoaded(true);
    }
  }, []);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState('');
  const [newProperty, setNewProperty] = React.useState(
    'Sky Collection Penthouse',
  );
  const [newPriority, setNewPriority] =
    React.useState<TaskItem['priority']>('medium');
  const [newColumn, setNewColumn] = React.useState<TaskItem['column']>('draft');
  const [filterPriority, setFilterPriority] = React.useState<string>('all');

  // Persist to localStorage on change (CTO Approved Hybrid Strategy)
  React.useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem('rama_v2_kanban_tasks', JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

  const moveTask = (taskId: string, direction: 'left' | 'right') => {
    const colOrder: TaskItem['column'][] = [
      'draft',
      'viewing',
      'offer',
      'transfer',
    ];
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const currIdx = colOrder.indexOf(t.column);
        const nextIdx =
          direction === 'right'
            ? Math.min(currIdx + 1, 3)
            : Math.max(currIdx - 1, 0);
        return { ...t, column: colOrder[nextIdx] };
      }),
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      title: newTitle,
      property: newProperty,
      column: newColumn,
      priority: newPriority,
      dueDate: 'Upcoming',
      verified: true,
    };

    setTasks((prev) => [newTask, ...prev]);
    setNewTitle('');
    setIsModalOpen(false);
  };

  const filteredTasks =
    filterPriority === 'all'
      ? tasks
      : tasks.filter((t) => t.priority === filterPriority);

  return (
    <div className="flex size-full flex-col space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col justify-between gap-4 border-b border-border pb-4 sm:flex-row sm:items-center dark:border-border">
        <div className="flex items-center gap-2">
          <span className="text-body-sm font-bold text-muted dark:text-muted">
            Filter Priority:
          </span>
          <div className="flex items-center gap-1 border border-border bg-surface-subtle p-1 dark:border-border dark:bg-fjord-hover">
            {['all', 'high', 'medium', 'low'].map((p) => (
              <button
                key={p}
                onClick={() => setFilterPriority(p)}
                className={cn(
                  'px-3 py-1 text-xs font-bold capitalize transition-all',
                  filterPriority === p
                    ? 'bg-fjord text-white shadow-sm'
                    : 'text-muted hover:text-fjord dark:text-muted',
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1 border border-border bg-surface-subtle p-1 dark:border-border dark:bg-fjord-hover">
          <button
            onClick={() => setViewMode('kibo')}
            className={cn(
              'px-3 py-1 text-xs font-bold transition-all',
              viewMode === 'kibo'
                ? 'bg-fjord-hover text-white shadow-sm dark:bg-surface-subtle'
                : 'text-muted hover:text-fjord dark:text-muted',
            )}
          >
            Kibo Animated Pipeline
          </button>
          <button
            onClick={() => setViewMode('classic')}
            className={cn(
              'px-3 py-1 text-xs font-bold transition-all',
              viewMode === 'classic'
                ? 'bg-fjord text-white shadow-sm'
                : 'text-muted hover:text-fjord dark:text-muted',
            )}
          >
            Classic Board
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setTasks(DEFAULT_TASKS);
              localStorage.removeItem('rama_v2_kanban_tasks');
            }}
            className="text-caption font-bold text-muted transition-colors hover:text-fjord dark:text-muted"
          >
            Reset Demo Board
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-body-sm flex items-center gap-2 bg-fjord-hover px-5 py-2.5 font-bold text-white shadow-sm transition-all hover:bg-surface-subtle dark:bg-surface-subtle dark:bg-surface-subtle"
          >
            <Plus className="size-4" />
            <span>New Action Task</span>
          </button>
        </div>
      </div>

      {/* Kanban Grid (Kibo vs Classic) */}
      {viewMode === 'kibo' ? (
        <Kanban
          columns={COLUMNS.map((col) => ({
            id: col.id,
            title: col.label,
            color:
              col.color.split(' ')[1] || 'bg-fjord-hover/10 dark:bg-surface-subtle/10',
            items: filteredTasks.filter((t) => t.column === col.id),
          }))}
          onMoveItem={(itemId, sourceCol, targetCol) => {
            setTasks((prev) =>
              prev.map((t) =>
                t.id === itemId
                  ? { ...t, column: targetCol as TaskItem['column'] }
                  : t,
              ),
            );
          }}
          renderCard={(task, colId, onMoveDirection) => (
            <div className="group relative space-y-3 border border-border/80 bg-card p-4 shadow-sm transition-all duration-200 hover:shadow-lg dark:border-border/80 dark:bg-neutral-900/90">
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    'inline-flex items-center gap-1.5 border px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider uppercase',
                    task.priority === 'high' &&
                      'border-stone-400/20 bg-surface-subtle/10 text-fjord dark:border-stone-600/20 dark:bg-surface-subtle/10 dark:text-muted dark:text-fjord',
                    task.priority === 'medium' &&
                      'border-stone-400/20 bg-surface-subtle/10 text-muted dark:border-stone-600/20 dark:bg-surface-subtle/10 dark:text-muted dark:text-muted',
                    task.priority === 'low' &&
                      'border-border/80 bg-surface-subtle text-muted dark:border-border/80 dark:bg-fjord-hover dark:text-muted',
                  )}
                >
                  <span
                    className={cn(
                      'size-1.5 shrink-0',
                      task.priority === 'high' &&
                        'bg-surface-subtle dark:bg-surface-subtle',
                      task.priority === 'medium' &&
                        'bg-surface-subtle dark:bg-stone-300',
                      task.priority === 'low' && 'bg-muted',
                    )}
                  />
                  <span>{task.priority}</span>
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-1 text-muted opacity-0 transition-all group-hover:opacity-100 hover:bg-surface-subtle/10 hover:text-fjord dark:bg-surface-subtle/10 dark:text-muted dark:text-muted"
                  title="Delete Task"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
              <div>
                <h5 className="text-body-sm leading-snug font-bold text-fjord dark:text-white">
                  {task.title}
                </h5>
                <div className="text-caption mt-1.5 flex items-center gap-1.5 truncate text-muted dark:text-muted">
                  <Building className="size-3.5 shrink-0 text-fjord dark:text-muted" />
                  <span className="truncate">{task.property}</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-border/40 pt-2 text-xs text-muted dark:border-border/40 dark:text-muted">
                <div className="flex items-center gap-1 font-medium">
                  <Clock className="size-3.5" />
                  <span>{task.dueDate}</span>
                </div>
                <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                  {task.column !== 'draft' && (
                    <button
                      onClick={() => onMoveDirection('left')}
                      className="border border-border bg-surface-subtle p-1.5 text-fjord transition-colors hover:bg-border dark:border-border dark:bg-fjord-hover dark:text-white"
                      title="Previous Stage"
                    >
                      <ArrowLeft className="size-3" />
                    </button>
                  )}
                  {task.column !== 'transfer' && (
                    <button
                      onClick={() => onMoveDirection('right')}
                      className="border border-border bg-surface-subtle p-1.5 text-fjord transition-colors hover:bg-border dark:border-border dark:bg-fjord-hover dark:text-white"
                      title="Next Stage"
                    >
                      <ArrowRight className="size-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        />
      ) : (
        <div className="grid min-h-150 flex-1 grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {COLUMNS.map((col) => {
            const colTasks = filteredTasks.filter((t) => t.column === col.id);
            return (
              <div
                key={col.id}
                className="shadow-subtle flex h-full flex-col overflow-hidden border border-border bg-surface dark:border-border dark:bg-fjord-hover"
              >
                {/* Column Header */}
                <div
                  className={cn(
                    'flex items-center justify-between border-b border-border p-4 dark:border-border',
                    col.color,
                  )}
                >
                  <div className="flex items-center gap-2">
                    <h4 className="text-body-sm font-display font-extrabold text-fjord dark:text-white">
                      {col.label}
                    </h4>
                    <span className="bg-surface/80 px-2 py-0.5 text-[10px] font-extrabold text-fjord uppercase dark:bg-fjord/40 dark:bg-fjord-hover/80 dark:text-white">
                      {col.badge}
                    </span>
                  </div>
                  <span className="flex size-6 items-center justify-center border border-border bg-surface text-xs font-extrabold text-fjord shadow-2xs dark:border-border dark:bg-fjord-hover dark:text-white">
                    {colTasks.length}
                  </span>
                </div>

                {/* Column Task Cards */}
                <div className="flex-1 space-y-3 overflow-y-auto bg-surface-subtle/50 p-4 dark:bg-fjord-hover/50">
                  {colTasks.length === 0 ? (
                    <div className="flex h-40 flex-col items-center justify-center border-2 border-dashed border-border/60 p-4 text-center dark:border-border/60">
                      <p className="text-caption font-medium text-muted dark:text-muted">
                        No tasks in this stage
                      </p>
                    </div>
                  ) : (
                    colTasks.map((task) => (
                      <div
                        key={task.id}
                        className="group animate-in fade-in relative space-y-3 border border-border bg-surface p-4 shadow-sm transition-all duration-200 hover:shadow-lg dark:border-border dark:bg-fjord-hover"
                      >
                        {/* Priority Tag & Delete */}
                        <div className="flex items-center justify-between">
                          <span
                            className={cn(
                              'inline-flex items-center gap-1.5 border px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider uppercase',
                              task.priority === 'high' &&
                                'border-stone-400/20 bg-surface-subtle/10 text-fjord dark:border-stone-600/20 dark:bg-surface-subtle/10 dark:text-muted dark:text-fjord',
                              task.priority === 'medium' &&
                                'border-stone-400/20 bg-surface-subtle/10 text-muted dark:border-stone-600/20 dark:bg-surface-subtle/10 dark:text-muted dark:text-muted',
                              task.priority === 'low' &&
                                'border-border/80 bg-surface-subtle text-muted dark:border-border/80 dark:bg-fjord-hover dark:text-muted',
                            )}
                          >
                            <span
                              className={cn(
                                'size-1.5 shrink-0',
                                task.priority === 'high' &&
                                  'bg-surface-subtle dark:bg-surface-subtle',
                                task.priority === 'medium' &&
                                  'bg-surface-subtle dark:bg-stone-300',
                                task.priority === 'low' && 'bg-muted',
                              )}
                            />
                            <span>{task.priority}</span>
                          </span>

                          <button
                            onClick={() => deleteTask(task.id)}
                            className="p-1 text-muted opacity-0 transition-all group-hover:opacity-100 hover:bg-surface-subtle/10 hover:text-fjord dark:bg-surface-subtle/10 dark:text-muted dark:text-muted"
                            title="Delete Task"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>

                        {/* Title & Property */}
                        <div>
                          <h5 className="text-body-sm leading-snug font-bold text-fjord dark:text-white">
                            {task.title}
                          </h5>
                          <div className="text-caption mt-1.5 flex items-center gap-1.5 truncate text-muted dark:text-muted">
                            <Building className="size-3.5 shrink-0 text-fjord dark:text-muted" />
                            <span className="truncate">{task.property}</span>
                          </div>
                        </div>

                        {/* Footer: Due Date & Move Controls */}
                        <div className="text-caption flex items-center justify-between border-t border-border/60 pt-2 dark:border-border/60">
                          <div className="flex items-center gap-1.5 font-medium text-muted dark:text-muted">
                            <Calendar className="size-3.5 text-fjord dark:text-muted" />
                            <span>{task.dueDate}</span>
                          </div>

                          {/* Move Left / Right Arrows */}
                          <div className="flex items-center gap-1">
                            {task.column !== 'draft' && (
                              <button
                                onClick={() => moveTask(task.id, 'left')}
                                className="border border-border bg-surface-subtle p-1.5 text-fjord transition-colors hover:bg-border dark:border-border dark:bg-fjord-hover dark:text-white"
                                title="Move Previous Stage"
                              >
                                <ArrowLeft className="size-3" />
                              </button>
                            )}
                            {task.column !== 'transfer' && (
                              <button
                                onClick={() => moveTask(task.id, 'right')}
                                className="border border-border bg-surface-subtle p-1.5 text-fjord transition-colors hover:bg-border dark:border-border dark:bg-fjord-hover dark:text-white"
                                title="Move Next Stage"
                              >
                                <ArrowRight className="size-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* New Task Modal */}
      {isModalOpen && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-fjord/80 backdrop-blur-md p-4 backdrop-blur-sm duration-150">
          <div className="animate-in zoom-in-95 w-full max-w-md space-y-6 border border-border bg-surface p-6 shadow-2xl duration-200 dark:border-border dark:bg-fjord-hover">
            <div className="flex items-center justify-between border-b border-border pb-4 dark:border-border">
              <div className="flex items-center gap-2.5">
                <div className="bg-fjord-hover/10 p-2 text-fjord dark:bg-surface-subtle/10 dark:text-muted">
                  <Plus className="size-5" />
                </div>
                <h3 className="text-h3 font-display font-bold text-fjord dark:text-white">
                  New Transaction Action
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-caption font-bold text-muted hover:text-fjord dark:text-muted"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="text-caption mb-1 block font-bold text-fjord dark:text-white">
                  Action Description
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Verify Seller Power of Attorney (POA)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="text-body-sm w-full border border-border bg-surface-subtle px-4 py-2.5 text-fjord focus:ring-2 focus:ring-stone-900 focus:outline-none dark:border-border dark:bg-fjord-hover dark:text-white"
                />
              </div>

              <div>
                <label className="text-caption mb-1 block font-bold text-fjord dark:text-white">
                  Target Property / Project
                </label>
                <select
                  value={newProperty}
                  onChange={(e) => setNewProperty(e.target.value)}
                  className="text-body-sm w-full border border-border bg-surface-subtle px-4 py-2.5 text-fjord focus:ring-2 focus:ring-stone-900 focus:outline-none dark:border-border dark:bg-fjord-hover dark:text-white"
                >
                  <option value="Sky Collection Penthouse">
                    Sky Collection Penthouse, Downtown
                  </option>
                  <option value="Marina Gate Residence 1">
                    Marina Gate Residence 1, Dubai Marina
                  </option>
                  <option value="Creek Horizon Tower A">
                    Creek Horizon Tower A, Creek Harbour
                  </option>
                  <option value="General Portfolio Task">
                    General Portfolio Task
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-caption mb-1 block font-bold text-fjord dark:text-white">
                    Stage Column
                  </label>
                  <select
                    value={newColumn}
                    onChange={(e) => setNewColumn(e.target.value as any)}
                    className="text-caption w-full border border-border bg-surface-subtle px-3 py-2.5 font-bold text-fjord focus:ring-2 focus:ring-stone-900 focus:outline-none dark:border-border dark:bg-fjord-hover dark:text-white"
                  >
                    <option value="draft">Due Diligence</option>
                    <option value="viewing">Viewing</option>
                    <option value="offer">Offer Submitted</option>
                    <option value="transfer">Transfer Ready</option>
                  </select>
                </div>

                <div>
                  <label className="text-caption mb-1 block font-bold text-fjord dark:text-white">
                    Priority Level
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="text-caption w-full border border-border bg-surface-subtle px-3 py-2.5 font-bold text-fjord focus:ring-2 focus:ring-stone-900 focus:outline-none dark:border-border dark:bg-fjord-hover dark:text-white"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-border pt-4 dark:border-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-body-sm border border-border bg-surface px-5 py-2.5 font-bold text-muted transition-colors hover:text-fjord dark:border-border dark:bg-fjord-hover dark:text-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-body-sm bg-fjord-hover px-6 py-2.5 font-bold text-white shadow-sm transition-all hover:bg-surface-subtle dark:bg-surface-subtle dark:bg-surface-subtle"
                >
                  Create Action
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
