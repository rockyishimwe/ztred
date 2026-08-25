"use client";
import React, { useState } from 'react';
import { Calendar, Clock, X, Plus } from 'lucide-react';

interface ScheduledMessagePickerProps {
  onTimeSelected: (time: Date) => void;
  onCancel: () => void;
}

export const ScheduledMessagePicker: React.FC<ScheduledMessagePickerProps> = ({
  onTimeSelected,
  onCancel
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<Date>(new Date());

  const handleSubmit = () => {
    const date = new Date(selectedDate);
    date.setHours(selectedTime.getHours(), selectedTime.getMinutes(), 0, 0);
    onTimeSelected(date);
  };

  return (
    <div className="bg-white dark:bg-ztred-surface-dark border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg w-48 p-4 z-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Schedule Message
        </h3>
        <button onClick={onCancel} className="p-1 rounded-hover hover:bg-zinc-100">
          <X className="h-4 w-4 text-zinc-500 hover:text-zinc-700"/>
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">
            Date
          </label>
          <input
            type="date"
            value={selectedDate.toISOString().split('T')[0]}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">
            Time
          </label>
          <input
            type="time"
            value={selectedTime.toISOString().slice(0, 5)}
            onChange={(e) => setSelectedTime(new Date(`1970-01-01T${e.target.value}:00`))}
            className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-zinc-200 dark:border-zinc-700">
          <button
            onClick={onCancel}
            className="p-2 rounded-hover hover:bg-zinc-100 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="p-2 rounded-hover bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm"
          >
            Schedule
          </button>
        </div>
      </div>
    </div>
  );
};