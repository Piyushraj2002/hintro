'use client';

import { useMemo, useState } from 'react';
import { Task, TaskStatus } from '@/lib/types';

export function useSearch(tasks: Task[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | 'all'>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'created' | 'dueDate' | 'priority'>('created');

  const filteredAndSortedTasks = useMemo(() => {
    let result = [...tasks];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query)
      );
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      result = result.filter((task) => task.status === selectedStatus);
    }

    // Filter by priority
    if (selectedPriority !== 'all') {
      result = result.filter((task) => task.priority === selectedPriority);
    }

    // Sort tasks
    result.sort((a, b) => {
      if (sortBy === 'created') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === 'dueDate') {
        const aDate = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
        const bDate = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
        return aDate - bDate;
      } else if (sortBy === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return 0;
    });

    return result;
  }, [tasks, searchQuery, selectedStatus, selectedPriority, sortBy]);

  return {
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    selectedPriority,
    setSelectedPriority,
    sortBy,
    setSortBy,
    filteredAndSortedTasks,
    totalResults: filteredAndSortedTasks.length,
  };
}
