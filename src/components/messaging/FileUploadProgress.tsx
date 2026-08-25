"use client";
import { X, CheckCircle, Loader2 } from 'lucide-react';

interface FileUploadProgressProps {
  files: Array<{
    id: string;
    name: string;
    url: string;
    size: number;
    mimeType: string;
    thumbnailUrl?: string;
    duration?: number;
    progress?: number;
  }>;
  onRemove: (id: string) => void;
}

export const FileUploadProgress: React.FC<FileUploadProgressProps> = ({
  files,
  onRemove
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center space-x-3 p-2 bg-zinc-50 dark:bg-zinc-900 rounded-lg"
        >
          {/* File preview */}
          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gray-200 rounded">
            {file.thumbnailUrl && (
              <img
                src={file.thumbnailUrl}
                alt={`${file.name} preview`}
                className="h-10 w-10 object-cover rounded"
              />
            )}
            {!file.thumbnailUrl && (
              <div className="text-xs font-medium">
                {file.mimeType.startsWith('image/') && (
                  <img
                    src="https://via.placeholder.com/40"
                    alt="image preview"
                    className="h-8 w-8 rounded"
                  />
                )}
                {file.mimeType === 'application/pdf' && (
                  <div className="flex h-full w-full items-center justify-center text-xs">
                    📄
                  </div>
                )}
                {file.mimeType.startsWith('video/') && (
                  <div className="flex h-full w-full items-center justify-center text-xs">
                    🎥
                  </div>
                )}
                {file.mimeType.startsWith('audio/') && (
                  <div className="flex h-full w-full items-center justify-center text-xs">
                    🎵
                  </div>
                )}
                {!file.mimeType.startsWith('image/') && !file.mimeType.startsWith('video/') && !file.mimeType.startsWith('audio/') && file.mimeType !== 'application/pdf' && (
                  <div className="flex h-full w-full items-center justify-center text-xs">
                    📎
                  </div>
                )}
              </div>
            )}
          </div>

          {/* File info */}
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex justify-between">
              <p className="font-medium text-zinc-900 dark:text-zinc-100 truncate max-w-xs">{file.name}</p>
              {file.duration && (
                <span className="text-xs text-zinc-500">
                  {Math.floor(file.duration / 60)}:{String(file.duration % 60).padStart(2, '0')}
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-500">
              {Math.round(file.size / 1024)} KB{(file.size > 1024 * 1024) && ` (${(file.size / (1024 * 1024)).toFixed(1)} MB)`}
            </p>
          </div>

          {/* Progress bar for uploads */}
          {file.progress !== undefined && (
            <div className="w-24">
              <div className="bg-zinc-200 dark:bg-zinc-700 h-1.5 rounded overflow-hidden">
                <div
                  className="bg-primary-600 h-1.5"
                  style={{ width: `${file.progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex-shrink-0 flex items-center space-x-2">
            {file.progress === undefined && (
              <button
                onClick={() => onRemove(file.id)}
                className="p-1 rounded-hover hover:bg-zinc-100 text-zinc-500 hover:text-zinc-700"
              >
                <X className="h-3 w-3"/>
              </button>
            )}
            {file.progress !== undefined && file.progress < 100 && (
              <div className="h-3 w-3 flex items-center justify-center text-xs">
                <Loader2 className="h-3 w-3 text-primary-600 animate-spin"/>
              </div>
            )}
            {file.progress === 100 && (
              <button
                onClick={() => onRemove(file.id)}
                className="p-1 rounded-hover hover:bg-zinc-100 text-zinc-500 hover:text-zinc-700"
              >
                <CheckCircle className="h-3 w-3 text-green-500"/>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};