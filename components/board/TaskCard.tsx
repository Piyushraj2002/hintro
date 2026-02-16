'use client';

import { Task } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Edit2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  isDragging?: boolean;
}

export function TaskCard({ task, onDelete, onEdit, isDragging }: TaskCardProps) {
  const priorityColors = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };

  const dueDate = task.dueDate ? new Date(task.dueDate) : null;
  const isOverdue = dueDate && dueDate < new Date() && task.status !== 'done';

  return (
    <Card
      className={cn(
        'p-4 cursor-move hover:shadow-md transition-all border border-border/50 bg-card hover:bg-card/90',
        isDragging && 'opacity-50 shadow-lg',
        isOverdue && 'border-destructive/50 border-l-4 border-l-destructive'
      )}
    >
      <div className="space-y-3">
        {/* Title */}
        <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-2">
          {task.title}
        </h3>

        {/* Description */}
        {task.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
        )}

        {/* Metadata */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span
            className={cn(
              'px-2 py-1 rounded text-xs font-medium',
              priorityColors[task.priority]
            )}
          >
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>

          {dueDate && (
            <span
              className={cn(
                'text-xs px-2 py-1 rounded',
                isOverdue
                  ? 'bg-destructive/20 text-destructive'
                  : 'bg-secondary text-muted-foreground'
              )}
            >
              {dueDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t border-border/30">
          <Button
            size="sm"
            variant="ghost"
            className="flex-1 h-7 text-xs text-muted-foreground hover:text-primary"
            onClick={() => onEdit(task)}
          >
            <Edit2 className="w-3 h-3 mr-1" />
            Edit
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="flex-1 h-7 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => onDelete(task.id)}
          >
            <Trash2 className="w-3 h-3 mr-1" />
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}
