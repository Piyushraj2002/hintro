export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type ActivityType = 'created' | 'updated' | 'deleted' | 'moved' | 'login' | 'logout';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  id: TaskStatus;
  title: string;
  tasks: Task[];
}

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Activity {
  id: string;
  type: ActivityType;
  userId: string;
  description: string;
  taskId?: string;
  timestamp: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface TaskBoardState {
  tasks: Task[];
  columns: Column[];
  isLoading: boolean;
  error: string | null;
}

export interface AppContextType {
  auth: AuthState;
  taskBoard: TaskBoardState;
  activities: Activity[];
}
