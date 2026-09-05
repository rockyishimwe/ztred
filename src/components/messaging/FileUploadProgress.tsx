"use client";
import React from 'react';
import { File, X, CheckCircle, AlertCircle } from 'lucide-react';

interface FileUploadProgressProps {
  files: Array<{
    name: string;
    progress: number;
    status: 'uploading' | 'complete' | 'error';
    size: number;
  }>;
  onRemove: (index: number) => void;
}

export const FileUploadProgress: React.FC<FileUploadProgressProps> = ({
  files,
  onRemove,
}) => {
  return (
    <div className="space-y-2 p-3 bg-theme-secondary rounded-xl border border-theme">
      {files.map((file, index) => (
        <div
          key={index}
          className="flex items-center space-x-3 p-2 bg-theme-card rounded-lg border border-theme"
        >
          <div className="flex-shrink-0 h-10 w-10 bg-theme-primary-subtle rounded-lg flex items-center justify-center">
            <File className="w-5 h-5 text-theme-on-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-theme-primary truncate max-w-xs">{file.name}</p>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex-1 bg-theme-secondary h-1.5 rounded overflow-hidden">
                <div
                  className={`h-full rounded transition-all duration-300 ${
                    file.status === 'complete'
                      ? 'bg-theme-success'
                      : file.status === 'error'
                      ? 'bg-theme-danger'
                      : 'bg-theme-primary'
                  }`}
                  style={{ width: `${file.progress}%` }}
                />
              </div>
              <span className="text-xs text-theme-muted">
                {file.status === 'complete' ? (
                  <CheckCircle className="w-4 h-4 text-theme-success" />
                ) : file.status === 'error' ? (
                  <AlertCircle className="w-4 h-4 text-theme-danger" />
                ) : (
                  `${file.progress}%`
                )}
              </span>
            </div>
          </div>
          <button
            onClick={() => onRemove(index)}
            className="p-1 text-theme-muted hover:text-theme-danger hover:bg-theme-secondary rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
