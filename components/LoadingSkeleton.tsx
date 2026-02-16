'use client';

export function TaskCardSkeleton() {
  return (
    <div className="p-4 bg-card rounded-lg border border-border/50 space-y-3 animate-pulse">
      <div className="h-4 bg-secondary rounded w-3/4" />
      <div className="h-3 bg-secondary rounded w-full" />
      <div className="h-3 bg-secondary rounded w-1/2" />
      <div className="flex gap-2 pt-2">
        <div className="h-7 bg-secondary rounded flex-1" />
        <div className="h-7 bg-secondary rounded flex-1" />
      </div>
    </div>
  );
}

export function ColumnSkeleton() {
  return (
    <div className="min-w-80 space-y-4 animate-pulse">
      <div className="h-16 bg-secondary rounded-t-lg" />
      <div className="space-y-3 px-4">
        {[1, 2, 3].map((i) => (
          <TaskCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function TaskBoardSkeleton() {
  return (
    <div className="h-full bg-background p-6 space-y-6">
      <div className="h-8 bg-secondary rounded w-1/3 animate-pulse" />
      <div className="flex gap-6">
        {[1, 2, 3].map((i) => (
          <ColumnSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
