"use client";
import React from 'react';
import { Clock, X } from 'lucide-react';

interface ScheduledMessagePickerProps {
  onSelect: (date: Date) => void;
  onClose: () => void;
}

export const ScheduledMessagePicker: React.FC<ScheduledMessagePickerProps> = ({
  onSelect,
  onClose,
}) => {
  const quickOptions = [
    { label: 'Later today', time: new Date(Date.now() + 4 * 60 * 60 * 1000) },
    { label: 'Tomorrow morning', time: new Date(Date.now() + 24 * 60 * 60 * 1000) },
    { label: 'Next Monday', time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
  ];

  return (
    <div className="bg-theme-card border border-theme rounded-xl shadow-lg w-64 p-4 z-50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-theme-primary">
          Schedule message
        </h3>
        <button
          onClick={onClose}
          className="p-1 text-theme-muted hover:text-theme-primary hover:bg-theme-secondary rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        {quickOptions.map((option) => (
          <button
            key={option.label}
            type="button"
            onClick={() => onSelect(option.time)}
            className="w-full flex items-center space-x-3 p-2 text-left text-sm text-theme-primary hover:bg-theme-secondary rounded-lg transition-colors"
          >
            <Clock className="w-4 h-4 text-theme-muted" />
            <span>{option.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-theme">
        <label className="block text-xs font-medium text-theme-muted mb-1">
          Custom date & time
        </label>
        <input
          type="datetime-local"
          className="w-full bg-theme-input border border-theme rounded-lg px-3 py-2 text-sm text-theme-primary focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-theme-primary/20 transition-all"
          onChange={(e) => {
            if (e.target.value) {
              onSelect(new Date(e.target.value));
            }
          }}
        />
      </div>
    </div>
  );
};
