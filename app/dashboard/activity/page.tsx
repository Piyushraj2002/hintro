import { ActivityLog } from '@/components/ActivityLog';

export default function ActivityPage() {
  return (
    <div className="bg-background p-6 h-full">
      <ActivityLog showHeader />
    </div>
  );
}
