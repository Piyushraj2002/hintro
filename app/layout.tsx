import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'
import { AuthProvider } from './context/AuthContext'
import { TaskBoardProvider } from './context/TaskBoardContext'
import { ActivityProvider } from './context/ActivityContext'
import { ToastProvider } from '@/components/providers/ToastProvider'
import { ErrorBoundary } from '@/components/ErrorBoundary'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Task Board',
  description: 'Manage your tasks with an intuitive board',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-background text-foreground">
        <ErrorBoundary>
          <ToastProvider />
          <AuthProvider>
            <TaskBoardProvider>
              <ActivityProvider>
                {children}
              </ActivityProvider>
            </TaskBoardProvider>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
