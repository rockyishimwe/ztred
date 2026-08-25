export default function AppearanceSettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Appearance Settings</h1>
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Theme</h2>
            <form className="space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="theme"
                  defaultChecked
                  className="h-4 w-4 text-primary-600"
                />
                <label className="text-sm font-medium text-gray-700">
                  Light
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="theme"
                  className="h-4 w-4 text-primary-600"
                />
                <label className="text-sm font-medium text-gray-700">
                  Dark
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="theme"
                  className="h-4 w-4 text-primary-600"
                />
                <label className="text-sm font-medium text-gray-700">
                  System
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-primary-600"
                />
                <label className="text-sm font-medium text-gray-700">
                  Follow system theme
                </label>
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
            <h2 className="text-xl font-semibold mb-4">Accessibility</h2>
            <form className="space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-primary-600"
                />
                <label className="text-sm font-medium text-gray-700">
                  Reduce motion
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-primary-600"
                />
                <label className="text-sm font-medium text-gray-700">
                  High contrast mode
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  defaultChecked={false}
                  className="h-4 w-4 text-primary-600"
                />
                <label className="text-sm font-medium text-gray-700">
                  Screen reader optimizations
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-primary-600"
                />
                <label className="text-sm font-medium text-gray-700">
                  Keyboard navigation enhancements
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}