import { GanttChart } from '@/components/tasks/GanttChart';

export default function TaskGanttPage() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden p-4">
      <GanttChart />
    </div>
  );
}