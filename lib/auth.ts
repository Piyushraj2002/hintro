import { User } from './types';
import { storage } from './storage';

// Mock user database - in production, this would be a real database
const MOCK_USERS: Record<string, { username: string; email: string; password: string }> = {
  demo: { username: 'demo', email: 'demo@example.com', password: 'password123' },
  user: { username: 'user', email: 'user@example.com', password: 'user123456' },
};

const AUTH_TOKEN_KEY = 'task-board-auth-token';
const CURRENT_USER_KEY = 'task-board-current-user';

// Generate a simple token (in production, use JWT with proper signing)
function generateToken(username: string): string {
  return `token_${username}_${Date.now()}`;
}

// Validate credentials
export function validateCredentials(username: string, password: string): boolean {
  const user = MOCK_USERS[username];
  if (!user) return false;
  return user.password === password;
}

// Login user
export function loginUser(username: string, password: string): User | null {
  if (!validateCredentials(username, password)) {
    return null;
  }

  const mockUser = MOCK_USERS[username];
  const user: User = {
    id: `user_${username}`,
    username: mockUser.username,
    email: mockUser.email,
  };

  const token = generateToken(username);
  storage.setItem(AUTH_TOKEN_KEY, token);
  storage.setJSON(CURRENT_USER_KEY, user);

  return user;
}

// Logout user
export function logoutUser(): void {
  storage.removeItem(AUTH_TOKEN_KEY);
  storage.removeItem(CURRENT_USER_KEY);
}

// Get current user
export function getCurrentUser(): User | null {
  return storage.getJSON<User>(CURRENT_USER_KEY);
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  const token = storage.getItem(AUTH_TOKEN_KEY);
  const user = getCurrentUser();
  return Boolean(token && user);
}

// Get stored auth token
export function getAuthToken(): string | null {
  return storage.getItem(AUTH_TOKEN_KEY);
}
