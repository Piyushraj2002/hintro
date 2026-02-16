'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X, Search } from 'lucide-react';
import { TaskStatus } from '@/lib/types';

interface SearchPanelProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedStatus: TaskStatus | 'all';
  onStatusChange: (status: TaskStatus | 'all') => void;
  selectedPriority: string;
  onPriorityChange: (priority: string) => void;
  sortBy: 'created' | 'dueDate' | 'priority';
  onSortChange: (sort: 'created' | 'dueDate' | 'priority') => void;
  totalResults: number;
}

export function SearchPanel({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  selectedPriority,
  onPriorityChange,
  sortBy,
  onSortChange,
  totalResults,
}: SearchPanelProps) {
  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedStatus !== 'all' ||
    selectedPriority !== 'all';

  const handleClearFilters = () => {
    onSearchChange('');
    onStatusChange('all');
    onPriorityChange('all');
  };

  return (
    <div className="bg-card border border-border/50 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Search className="w-5 h-5 text-primary" />
          Search & Filter
        </h3>
        {hasActiveFilters && (
          <Button
            size="sm"
            variant="ghost"
            onClick={handleClearFilters}
            className="text-xs text-muted-foreground hover:text-primary"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Search Input */}
      <div>
        <Input
          placeholder="Search tasks by title or description..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border-primary/30 focus:border-primary"
        />
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-3 gap-3">
        {/* Status Filter */}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">
            Status
          </label>
          <Select value={selectedStatus} onValueChange={onStatusChange}>
            <SelectTrigger className="border-primary/30 focus:border-primary text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Priority Filter */}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">
            Priority
          </label>
          <Select value={selectedPriority} onValueChange={onPriorityChange}>
            <SelectTrigger className="border-primary/30 focus:border-primary text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort */}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">
            Sort By
          </label>
          <Select value={sortBy} onValueChange={(val: any) => onSortChange(val)}>
            <SelectTrigger className="border-primary/30 focus:border-primary text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="created">Recently Created</SelectItem>
              <SelectItem value="dueDate">Due Date</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      <div className="text-xs text-muted-foreground">
        Showing <span className="font-semibold text-foreground">{totalResults}</span> task
        {totalResults !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
