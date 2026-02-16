'use client';

import React, { createContext, useContext, useCallback } from 'react';
import { Activity, ActivityType } from '@/lib/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface ActivityContextType {
  activities: Activity[];
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
  clearActivities: () => void;
  getRecentActivities: (limit: number) => Activity[];
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

const INITIAL_ACTIVITIES: Activity[] = [];

export function ActivityProvider({ children }: { children: React.ReactNode }) {
  const [activities, setActivities] = useLocalStorage<Activity[]>(
    'task-board-activities',
    INITIAL_ACTIVITIES
  );

  const addActivity = useCallback(
    (activity: Omit<Activity, 'id' | 'timestamp'>) => {
      const newActivity: Activity = {
        ...activity,
        id: `activity_${Date.now()}`,
        timestamp: new Date().toISOString(),
      };

      setActivities((prevActivities) => [newActivity, ...prevActivities]);
    },
    [setActivities]
  );

  const clearActivities = useCallback(() => {
    setActivities([]);
  }, [setActivities]);

  const getRecentActivities = useCallback(
    (limit: number) => {
      return activities.slice(0, limit);
    },
    [activities]
  );

  return (
    <ActivityContext.Provider
      value={{
        activities,
        addActivity,
        clearActivities,
        getRecentActivities,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivity() {
  const context = useContext(ActivityContext);
  if (context === undefined) {
    throw new Error('useActivity must be used within an ActivityProvider');
  }
  return context;
}
