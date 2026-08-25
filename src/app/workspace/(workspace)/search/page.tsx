export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Search</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search messages, people, files..."
              className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="space-y-4">
            <div className="border-b pb-2">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Messages</h3>
              <p className="text-zinc-500">No messages found</p>
            </div>
            <div className="border-b pb-2">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">People</h3>
              <p className="text-zinc-500">No people found</p>
            </div>
            <div className="border-b pb-2">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Files</h3>
              <p className="text-zinc-500">No files found</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}