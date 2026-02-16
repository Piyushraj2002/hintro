'use client';

import { useActivity } from '@/app/context/ActivityContext';
import { Activity } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit2, Trash2, LogIn, LogOut, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const activityIcons = {
  created: Plus,
  updated: Edit2,
  deleted: Trash2,
  moved: ArrowRight,
  login: LogIn,
  logout: LogOut,
};

const activityColors = {
  created: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  updated: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  deleted: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  moved: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  login: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400',
  logout: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
};

interface ActivityLogProps {
  limit?: number;
  showHeader?: boolean;
}

export function ActivityLog({ limit = 10, showHeader = true }: ActivityLogProps) {
  const { activities } = useActivity();
  const displayedActivities = activities.slice(0, limit);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    });
  };

  return (
    <div className="space-y-4">
      {showHeader && (
        <div>
          <h2 className="text-2xl font-bold text-foreground">Recent Activity</h2>
          <p className="text-muted-foreground mt-1">
            {activities.length} total activit{activities.length !== 1 ? 'ies' : 'y'}
          </p>
        </div>
      )}

      <div className="space-y-3">
        {displayedActivities.length === 0 ? (
          <Card className="p-8 text-center border-border/50">
            <p className="text-muted-foreground">No activities yet</p>
          </Card>
        ) : (
          displayedActivities.map((activity) => {
            const Icon = activityIcons[activity.type as keyof typeof activityIcons];

            return (
              <Card
                key={activity.id}
                className="p-4 border-border/50 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      'p-2 rounded-lg mt-1',
                      activityColors[activity.type as keyof typeof activityColors]
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatTime(activity.timestamp)}
                    </p>
                  </div>

                  <Badge
                    variant="secondary"
                    className="text-xs whitespace-nowrap bg-secondary/50"
                  >
                    {activity.type}
                  </Badge>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
