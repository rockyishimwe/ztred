export default function NotificationSettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Notification Settings</h1>
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Channel Notifications</h2>
            <form className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                    #
                  </div>
                  <div>
                    <p className="font-medium">#general</p>
                    <p className="text-sm text-gray-500">Company-wide announcements</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-primary-600"
                  />
                  <span className="text-sm text-gray-600">All messages</span>
                </div>
                <div className="relative">
                  <select className="pl-2 pr-8 border border-gray-300 rounded-lg">
                    <option value="all">All messages</option>
                    <option value="mentions">Only mentions & DMs</option>
                    <option value="none">Nothing</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">
                    #
                  </div>
                  <div>
                    <p className="font-medium">#random</p>
                    <p className="text-sm text-gray-500">Random fun stuff</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    defaultChecked={false}
                    className="h-4 w-4 text-primary-600"
                  />
                  <span className="text-sm text-gray-600">All messages</span>
                </div>
                <div className="relative">
                  <select className="pl-2 pr-8 border border-gray-300 rounded-lg">
                    <option value="all">All messages</option>
                    <option value="mentions">Only mentions & DMs</option>
                    <option value="none">Nothing</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Save Changes
              </button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
            <form className="space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-primary-600"
                />
                <label className="text-sm font-medium text-gray-700">
                  Desktop notifications
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  defaultChecked={false}
                  className="h-4 w-4 text-primary-600"
                />
                <label className="text-sm font-medium text-gray-700">
                  Email notifications
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-primary-600"
                />
                <label className="text-sm font-medium text-gray-700">
                  Mobile push notifications
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  defaultChecked={false}
                  className="h-4 w-4 text-primary-600"
                />
                <label className="text-sm font-medium text-gray-700">
                  Sound notifications
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}