'use client';

import React, { createContext, useContext, useCallback, useMemo } from 'react';
import { Task, Column, TaskBoardState, TaskStatus } from '@/lib/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface TaskBoardContextType {
  taskBoard: TaskBoardState;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, newStatus: TaskStatus) => void;
  getTasks: () => Task[];
  getTasksByStatus: (status: TaskStatus) => Task[];
  clearBoard: () => void;
}

const TaskBoardContext = createContext<TaskBoardContextType | undefined>(undefined);

const INITIAL_TASKS: Task[] = [];

const INITIAL_COLUMNS: Column[] = [
  { id: 'todo', title: 'To Do', tasks: [] },
  { id: 'in-progress', title: 'In Progress', tasks: [] },
  { id: 'done', title: 'Done', tasks: [] },
];

export function TaskBoardProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useLocalStorage<Task[]>('task-board-tasks', INITIAL_TASKS);

  const taskBoard = useMemo<TaskBoardState>(() => {
    const columns: Column[] = INITIAL_COLUMNS.map((col) => ({
      ...col,
      tasks: tasks.filter((task) => task.status === col.id),
    }));

    return {
      tasks,
      columns,
      isLoading: false,
      error: null,
    };
  }, [tasks]);

  const addTask = useCallback(
    (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
      const newTask: Task = {
        ...task,
        id: `task_${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setTasks((prevTasks) => [...prevTasks, newTask]);
    },
    [setTasks]
  );

  const updateTask = useCallback(
    (id: string, updates: Partial<Task>) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id
            ? {
                ...task,
                ...updates,
                updatedAt: new Date().toISOString(),
              }
            : task
        )
      );
    },
    [setTasks]
  );

  const deleteTask = useCallback(
    (id: string) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    },
    [setTasks]
  );

  const moveTask = useCallback(
    (taskId: string, newStatus: TaskStatus) => {
      updateTask(taskId, { status: newStatus });
    },
    [updateTask]
  );

  const getTasks = useCallback(() => {
    return tasks;
  }, [tasks]);

  const getTasksByStatus = useCallback(
    (status: TaskStatus) => {
      return tasks.filter((task) => task.status === status);
    },
    [tasks]
  );

  const clearBoard = useCallback(() => {
    setTasks([]);
  }, [setTasks]);

  return (
    <TaskBoardContext.Provider
      value={{
        taskBoard,
        addTask,
        updateTask,
        deleteTask,
        moveTask,
        getTasks,
        getTasksByStatus,
        clearBoard,
      }}
    >
      {children}
    </TaskBoardContext.Provider>
  );
}

export function useTaskBoard() {
  const context = useContext(TaskBoardContext);
  if (context === undefined) {
    throw new Error('useTaskBoard must be used within a TaskBoardProvider');
  }
  return context;
}
