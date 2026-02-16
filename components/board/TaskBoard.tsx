'use client';

import { useState, useCallback } from 'react';
import { Task } from '@/lib/types';
import { useTaskBoard } from '@/app/context/TaskBoardContext';
import { useActivity } from '@/app/context/ActivityContext';
import { useAuth } from '@/app/context/AuthContext';
import { useSearch } from '@/hooks/useSearch';
import { Column } from './Column';
import { TaskForm } from './TaskForm';
import { SearchPanel } from './SearchPanel';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { TaskFormData } from '@/lib/validators';
import { showToast } from '@/lib/toast';

export function TaskBoard() {
  const { taskBoard, addTask, updateTask, deleteTask } = useTaskBoard();
  const { addActivity } = useActivity();
  const { auth } = useAuth();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  
  const {
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    selectedPriority,
    setSelectedPriority,
    sortBy,
    setSortBy,
    filteredAndSortedTasks,
    totalResults,
  } = useSearch(taskBoard.tasks);

  const handleAddTask = useCallback(
    (data: TaskFormData) => {
      setIsLoading(true);
      try {
        addTask({
          title: data.title,
          description: data.description || '',
          status: data.status,
          dueDate: data.dueDate || undefined,
          priority: data.priority,
        });

        // Add activity log
        if (auth.user) {
          addActivity({
            type: 'created',
            userId: auth.user.id,
            description: `Created task: ${data.title}`,
          });
        }

        showToast.success('Task created successfully');
      } finally {
        setIsLoading(false);
      }
    },
    [addTask, addActivity, auth.user]
  );

  const handleEditTask = useCallback(
    (task: Task) => {
      setEditingTask(task);
      setIsFormOpen(true);
    },
    []
  );

  const handleUpdateTask = useCallback(
    (data: TaskFormData) => {
      if (!editingTask) return;

      setIsLoading(true);
      try {
        updateTask(editingTask.id, {
          title: data.title,
          description: data.description || '',
          status: data.status,
          dueDate: data.dueDate || undefined,
          priority: data.priority,
        });

        // Add activity log
        if (auth.user) {
          addActivity({
            type: 'updated',
            userId: auth.user.id,
            description: `Updated task: ${data.title}`,
            taskId: editingTask.id,
          });
        }

        showToast.success('Task updated successfully');
        setEditingTask(null);
      } finally {
        setIsLoading(false);
      }
    },
    [editingTask, updateTask, addActivity, auth.user]
  );

  const handleDeleteTask = useCallback(
    (id: string) => {
      const task = taskBoard.tasks.find((t) => t.id === id);
      deleteTask(id);

      // Add activity log
      if (auth.user && task) {
        addActivity({
          type: 'deleted',
          userId: auth.user.id,
          description: `Deleted task: ${task.title}`,
          taskId: id,
        });
      }

      showToast.success('Task deleted successfully');
    },
    [taskBoard.tasks, deleteTask, addActivity, auth.user]
  );

  const handleFormSubmit = (data: TaskFormData) => {
    if (editingTask) {
      handleUpdateTask(data);
    } else {
      handleAddTask(data);
    }
  };

  // Create filtered columns based on search results
  const filteredColumns = taskBoard.columns.map((column) => ({
    ...column,
    tasks: column.tasks.filter((task) =>
      filteredAndSortedTasks.some((t) => t.id === task.id)
    ),
  }));

  return (
    <div className="h-full bg-background p-4 md:p-6">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Tasks</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              {taskBoard.tasks.length} total task{taskBoard.tasks.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingTask(null);
              setIsFormOpen(true);
            }}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold w-full md:w-auto"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Task
          </Button>
        </div>

        {/* Search Panel Toggle */}
        <div className="mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSearchPanel(!showSearchPanel)}
            className="border-primary/30 text-primary hover:bg-primary/10"
          >
            {showSearchPanel ? 'Hide Search' : 'Show Search'}
          </Button>
        </div>

        {/* Search Panel */}
        {showSearchPanel && (
          <div className="mb-6">
            <SearchPanel
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              selectedPriority={selectedPriority}
              onPriorityChange={setSelectedPriority}
              sortBy={sortBy}
              onSortChange={setSortBy}
              totalResults={totalResults}
            />
          </div>
        )}

        {/* Board */}
        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-6 h-full pb-4">
            {filteredColumns.map((column) => (
              <Column
                key={column.id}
                column={column}
                onDeleteTask={handleDeleteTask}
                onEditTask={handleEditTask}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Task Form Modal */}
      <TaskForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        editingTask={editingTask}
        isLoading={isLoading}
      />
    </div>
  );
}
