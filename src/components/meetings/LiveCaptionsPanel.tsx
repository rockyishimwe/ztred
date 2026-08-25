"use client";
export const LiveCaptionsPanel: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-ztred-surface-dark border-l border-zinc-200 dark:border-zinc-700">
      <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-700">
        <h2 className="text-xl font-bold">Live Captions</h2>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-hover hover:bg-zinc-100">
            <span className="material-icons">translate</span>
          </button>
          <button className="p-2 rounded-hover hover:bg-zinc-100">
            <span className="material-icons">save_alt</span>
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <div className="flex items-start space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
            AS
          </div>
          <div className="flex-1">
            <p className="font-medium text-zinc-900 dark:text-zinc-100">
              Alex Rivera: Let's review the Q3 budget projections and discuss the resource allocation for the frontend team.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
            SC
          </div>
          <div className="flex-1">
            <p className="font-medium text-zinc-900 dark:text-zinc-100">
              Sarah Chen: I'll share the latest spreadsheet in the files channel. The numbers look good but we need to account for the new hires starting next month.
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">
            MV
          </div>
          <div className="flex-1">
            <p className="font-medium text-zinc-900 dark:text-zinc-100">
              Marcus Vance: The infrastructure costs are higher than expected due to the increased storage requirements for the media processing pipeline.
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-zinc-200 dark:border-zinc-700 flex items-center justify-center p-2">
        <button className="text-zinc-500 hover:text-zinc-700">
          <span className="material-icons">expand_less</span>
          Show less
        </button>
      </div>
    </div>
  );
};