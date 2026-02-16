'use client';

import { Column as ColumnType, Task } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { TaskCard } from './TaskCard';
import { cn } from '@/lib/utils';

interface ColumnProps {
  column: ColumnType;
  onDeleteTask: (id: string) => void;
  onEditTask: (task: Task) => void;
  isDraggingOver?: boolean;
}

const columnStyles = {
  'todo': 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/30',
  'in-progress': 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/30',
  'done': 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900/30',
};

export function Column({
  column,
  onDeleteTask,
  onEditTask,
  isDraggingOver,
}: ColumnProps) {
  return (
    <div className="flex flex-col h-full min-w-80 max-w-80">
      {/* Column Header */}
      <div className={cn(
        'p-4 rounded-t-lg border-b border-border/50',
        columnStyles[column.id as keyof typeof columnStyles]
      )}>
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-foreground text-lg">{column.title}</h2>
          <span className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
            {column.tasks.length}
          </span>
        </div>
      </div>

      {/* Column Content */}
      <div
        className={cn(
          'flex-1 overflow-y-auto p-4 space-y-3 rounded-b-lg',
          columnStyles[column.id as keyof typeof columnStyles],
          isDraggingOver && 'bg-opacity-75 ring-2 ring-primary/50'
        )}
      >
        {column.tasks.length === 0 ? (
          <div className="h-32 flex items-center justify-center text-center">
            <p className="text-sm text-muted-foreground">No tasks yet</p>
          </div>
        ) : (
          column.tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDeleteTask}
              onEdit={onEditTask}
            />
          ))
        )}
      </div>
    </div>
  );
}
