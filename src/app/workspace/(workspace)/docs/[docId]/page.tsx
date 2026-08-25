import { DocEditor } from '@/components/collaboration/DocEditor';

export default function DocPage() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden p-4">
      <DocEditor />
    </div>
  );
}