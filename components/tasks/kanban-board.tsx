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
    color: 'border-sky-500/30 bg-sky-500/5',
  },
  {
    id: 'viewing',
    label: 'Stage 2: Viewings Scheduled',
    badge: 'Active',
    color: 'border-purple-500/30 bg-purple-500/5',
  },
  {
    id: 'offer',
    label: 'Stage 3: MOU & Offers Submitted',
    badge: 'Pending',
    color: 'border-amber-500/30 bg-amber-500/5',
  },
  {
    id: 'transfer',
    label: 'Stage 4: DLD Transfer Ready',
    badge: 'Milestone',
    color: 'border-emerald-500/30 bg-emerald-500/5',
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
    <div className="flex h-full w-full flex-col space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col justify-between gap-4 border-b border-border pb-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <span className="text-body-sm font-bold text-muted">
            Filter Priority:
          </span>
          <div className="flex items-center gap-1 rounded-xl border border-border bg-surface-subtle p-1">
            {['all', 'high', 'medium', 'low'].map((p) => (
              <button
                key={p}
                onClick={() => setFilterPriority(p)}
                className={cn(
                  'rounded-lg px-3 py-1 text-xs font-bold capitalize transition-all',
                  filterPriority === p
                    ? 'bg-ink text-white shadow-sm'
                    : 'text-muted hover:text-ink',
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1 rounded-xl border border-border bg-surface-subtle p-1">
          <button
            onClick={() => setViewMode('kibo')}
            className={cn(
              'rounded-lg px-3 py-1 text-xs font-bold transition-all',
              viewMode === 'kibo' ? 'bg-fjord text-white shadow-sm' : 'text-muted hover:text-ink'
            )}
          >
            Kibo Animated Pipeline
          </button>
          <button
            onClick={() => setViewMode('classic')}
            className={cn(
              'rounded-lg px-3 py-1 text-xs font-bold transition-all',
              viewMode === 'classic' ? 'bg-ink text-white shadow-sm' : 'text-muted hover:text-ink'
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
            className="text-caption font-bold text-muted transition-colors hover:text-ink"
          >
            Reset Demo Board
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-body-sm flex items-center gap-2 rounded-xl bg-fjord px-5 py-2.5 font-bold text-white shadow-sm transition-all hover:bg-fjord-hover"
          >
            <Plus className="h-4 w-4" />
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
            color: col.color.split(' ')[1] || 'bg-fjord/10',
            items: filteredTasks.filter((t) => t.column === col.id),
          }))}
          onMoveItem={(itemId, sourceCol, targetCol) => {
            setTasks((prev) =>
              prev.map((t) =>
                t.id === itemId ? { ...t, column: targetCol as TaskItem['column'] } : t
              )
            );
          }}
          renderCard={(task, colId, onMoveDirection) => (
            <div className="group relative space-y-3 rounded-2xl border border-border/80 bg-card p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:bg-neutral-900/90">
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider uppercase',
                    task.priority === 'high' && 'border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300',
                    task.priority === 'medium' && 'border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300',
                    task.priority === 'low' && 'border-border/80 bg-surface-subtle text-muted'
                  )}
                >
                  <span
                    className={cn(
                      'h-1.5 w-1.5 shrink-0 rounded-full',
                      task.priority === 'high' && 'bg-rose-500',
                      task.priority === 'medium' && 'bg-amber-500',
                      task.priority === 'low' && 'bg-muted'
                    )}
                  />
                  <span>{task.priority}</span>
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="rounded-lg p-1 text-muted opacity-0 transition-all group-hover:opacity-100 hover:bg-rose-500/10 hover:text-rose-500"
                  title="Delete Task"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
              <div>
                <h5 className="text-body-sm leading-snug font-bold text-ink dark:text-white">
                  {task.title}
                </h5>
                <div className="text-caption mt-1.5 flex items-center gap-1.5 truncate text-muted">
                  <Building className="h-3.5 w-3.5 shrink-0 text-fjord" />
                  <span className="truncate">{task.property}</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs text-muted">
                <div className="flex items-center gap-1 font-medium">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{task.dueDate}</span>
                </div>
                <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                  {task.column !== 'draft' && (
                    <button
                      onClick={() => onMoveDirection('left')}
                      className="rounded-lg border border-border bg-surface-subtle p-1.5 text-ink transition-colors hover:bg-border dark:text-white"
                      title="Previous Stage"
                    >
                      <ArrowLeft className="h-3 w-3" />
                    </button>
                  )}
                  {task.column !== 'transfer' && (
                    <button
                      onClick={() => onMoveDirection('right')}
                      className="rounded-lg border border-border bg-surface-subtle p-1.5 text-ink transition-colors hover:bg-border dark:text-white"
                      title="Next Stage"
                    >
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        />
      ) : (
        <div className="grid min-h-[600px] flex-1 grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {COLUMNS.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.column === col.id);
          return (
            <div
              key={col.id}
              className="shadow-subtle flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface"
            >
              {/* Column Header */}
              <div
                className={cn(
                  'flex items-center justify-between border-b border-border p-4',
                  col.color,
                )}
              >
                <div className="flex items-center gap-2">
                  <h4 className="text-body-sm font-display font-extrabold text-ink">
                    {col.label}
                  </h4>
                  <span className="rounded-full bg-surface/80 px-2 py-0.5 text-[10px] font-extrabold text-ink uppercase dark:bg-black/40">
                    {col.badge}
                  </span>
                </div>
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border bg-surface text-xs font-extrabold text-ink shadow-2xs">
                  {colTasks.length}
                </span>
              </div>

              {/* Column Task Cards */}
              <div className="flex-1 space-y-3 overflow-y-auto bg-surface-subtle/50 p-4">
                {colTasks.length === 0 ? (
                  <div className="flex h-40 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/60 p-4 text-center">
                    <p className="text-caption font-medium text-muted">
                      No tasks in this stage
                    </p>
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <div
                      key={task.id}
                      className="group animate-in fade-in relative space-y-3 rounded-2xl border border-border bg-surface p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      {/* Priority Tag & Delete */}
                      <div className="flex items-center justify-between">
                        <span
                          className={cn(
                            'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider uppercase',
                            task.priority === 'high' &&
                              'border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300',
                            task.priority === 'medium' &&
                              'border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300',
                            task.priority === 'low' &&
                              'border-border/80 bg-surface-subtle text-muted',
                          )}
                        >
                          <span
                            className={cn(
                              'h-1.5 w-1.5 shrink-0 rounded-full',
                              task.priority === 'high' && 'bg-rose-500',
                              task.priority === 'medium' && 'bg-amber-500',
                              task.priority === 'low' && 'bg-muted',
                            )}
                          />
                          <span>{task.priority}</span>
                        </span>

                        <button
                          onClick={() => deleteTask(task.id)}
                          className="rounded-lg p-1 text-muted opacity-0 transition-all group-hover:opacity-100 hover:bg-rose-500/10 hover:text-rose-500"
                          title="Delete Task"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Title & Property */}
                      <div>
                        <h5 className="text-body-sm leading-snug font-bold text-ink">
                          {task.title}
                        </h5>
                        <div className="text-caption mt-1.5 flex items-center gap-1.5 truncate text-muted">
                          <Building className="h-3.5 w-3.5 shrink-0 text-fjord" />
                          <span className="truncate">{task.property}</span>
                        </div>
                      </div>

                      {/* Footer: Due Date & Move Controls */}
                      <div className="text-caption flex items-center justify-between border-t border-border/60 pt-2">
                        <div className="flex items-center gap-1.5 font-medium text-muted">
                          <Calendar className="h-3.5 w-3.5 text-fjord" />
                          <span>{task.dueDate}</span>
                        </div>

                        {/* Move Left / Right Arrows */}
                        <div className="flex items-center gap-1">
                          {task.column !== 'draft' && (
                            <button
                              onClick={() => moveTask(task.id, 'left')}
                              className="rounded-lg border border-border bg-surface-subtle p-1.5 text-ink transition-colors hover:bg-border"
                              title="Move Previous Stage"
                            >
                              <ArrowLeft className="h-3 w-3" />
                            </button>
                          )}
                          {task.column !== 'transfer' && (
                            <button
                              onClick={() => moveTask(task.id, 'right')}
                              className="rounded-lg border border-border bg-surface-subtle p-1.5 text-ink transition-colors hover:bg-border"
                              title="Move Next Stage"
                            >
                              <ArrowRight className="h-3 w-3" />
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
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm duration-150">
          <div className="animate-in zoom-in-95 w-full max-w-md space-y-6 rounded-3xl border border-border bg-surface p-6 shadow-2xl duration-200">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-2.5">
                <div className="rounded-xl bg-fjord/10 p-2 text-fjord">
                  <Plus className="h-5 w-5" />
                </div>
                <h3 className="text-h3 font-display font-bold text-ink">
                  New Transaction Action
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-caption font-bold text-muted hover:text-ink"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="text-caption mb-1 block font-bold text-ink">
                  Action Description
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Verify Seller Power of Attorney (POA)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="text-body-sm w-full rounded-xl border border-border bg-surface-subtle px-4 py-2.5 text-ink focus:ring-2 focus:ring-fjord focus:outline-none"
                />
              </div>

              <div>
                <label className="text-caption mb-1 block font-bold text-ink">
                  Target Property / Project
                </label>
                <select
                  value={newProperty}
                  onChange={(e) => setNewProperty(e.target.value)}
                  className="text-body-sm w-full rounded-xl border border-border bg-surface-subtle px-4 py-2.5 text-ink focus:ring-2 focus:ring-fjord focus:outline-none"
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
                  <label className="text-caption mb-1 block font-bold text-ink">
                    Stage Column
                  </label>
                  <select
                    value={newColumn}
                    onChange={(e) => setNewColumn(e.target.value as any)}
                    className="text-caption w-full rounded-xl border border-border bg-surface-subtle px-3 py-2.5 font-bold text-ink focus:ring-2 focus:ring-fjord focus:outline-none"
                  >
                    <option value="draft">Due Diligence</option>
                    <option value="viewing">Viewing</option>
                    <option value="offer">Offer Submitted</option>
                    <option value="transfer">Transfer Ready</option>
                  </select>
                </div>

                <div>
                  <label className="text-caption mb-1 block font-bold text-ink">
                    Priority Level
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="text-caption w-full rounded-xl border border-border bg-surface-subtle px-3 py-2.5 font-bold text-ink focus:ring-2 focus:ring-fjord focus:outline-none"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-border pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-body-sm rounded-xl border border-border bg-surface px-5 py-2.5 font-bold text-muted transition-colors hover:text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-body-sm rounded-xl bg-fjord px-6 py-2.5 font-bold text-white shadow-sm transition-all hover:bg-fjord-hover"
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
