'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { LoginForm } from '@/components/auth/LoginForm';
import { Leaf } from 'lucide-react';

export default function LoginPage() {
  const { auth } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (auth.isAuthenticated && !auth.isLoading) {
      router.push('/dashboard');
    }
  }, [auth.isAuthenticated, auth.isLoading, router]);

  if (auth.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary/20">
        <div className="text-center">
          <div className="inline-block animate-spin">
            <Leaf className="w-12 h-12 text-primary" />
          </div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary/20 px-4">
      <div className="w-full flex flex-col items-center gap-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold text-primary">Task Board</h1>
          </div>
          <p className="text-muted-foreground">Organize your work with ease</p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
