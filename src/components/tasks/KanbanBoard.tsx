"use client";
import React, { useState } from 'react';
import { CheckSquare, Edit, Trash2, Clock, MessageSquareMore, Users, Search } from 'lucide-react';
import { Task } from '@/types/api';

interface KanbanBoardProps {
  tasks: Array<Task>;
  projects: Array<{
    id: string;
    name: string;
  }>;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, projects }) => {
  const [filter, setFilter] = useState<{ status?: string; assignee?: string }>({});
  const [activeProject, setActiveProject] = useState<string>(projects[0]?.id || '');

  const projectTasks = tasks.filter(task =>
    task.projectId === activeProject &&
    (!filter.status || task.status === filter.status) &&
    (!filter.assignee || task.assigneeId === filter.assignee)
  );

  const statusColumns = [
    { id: 'todo', label: 'To Do', color: 'gray' },
    { id: 'in_progress', label: 'In Progress', color: 'blue' },
    { id: 'review', label: 'Review', color: 'yellow' },
    { id: 'done', label: 'Done', color: 'green' }
  ];

  return (
    <div className="space-y-6">
      {/* Board controls */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            {projects.find(p => p.id === activeProject)?.name || 'Project Tasks'}
          </h2>
          <button
            onClick={() => setActiveProject(projects[1]?.id || activeProject)}
            className="p-2 rounded-hover hover:bg-zinc-100 text-sm"
          >
            Switch Project
          </button>
        </div>
        <div className="flex-1 space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-zinc-400"/>
            </div>
          </div>
          <button
            onClick={() => {}}
            className="p-2 rounded-hover hover:bg-zinc-100"
          >
            <MessageSquareMore className="h-4 w-4 text-zinc-600 hover:text-zinc-800"/>
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFilter({})}
            className={`p-2 rounded-hover hover:bg-zinc-100 ${!filter.status && !filter.assignee ? 'bg-primary-100 text-primary-600' : 'text-zinc-500'}`}
          >
            Clear Filters
          </button>
          <button
            onClick={() => setFilter(prev => ({ ...prev, assignee: undefined }))}
            className="p-2 rounded-hover hover:bg-zinc-100 text-sm"
          >
            Assignee
          </button>
          <button
            onClick={() => setFilter(prev => ({ ...prev, status: undefined }))}
            className="p-2 rounded-hover hover:bg-zinc-100 text-sm"
          >
            Status
          </button>
        </div>
      </div>

      {/* Filter dropdowns would go here in a full implementation */}

      {/* Kanban columns */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
        {statusColumns.map((column) => {
          const columnTasks = projectTasks.filter(task => task.status === column.id);

          return (
            <div key={column.id} className="bg-white dark:bg-ztred-surface-dark border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
              <div className={`px-4 py-3 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between bg-${column.color}-50 dark:bg-${column.color}-900/20`}>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">{column.label}</h3>
                <span className="text-xs text-zinc-500">{columnTasks.length} tasks</span>
              </div>
              <div className="min-h-[200px] py-2 space-y-2 overflow-y-auto">
                {columnTasks.length === 0 ? (
                  <div className="text-center py-4 text-zinc-400">
                    No tasks in this column
                    <button
                      onClick={() => {}}
                      className="mt-2 p-2 rounded-hover text-sm text-primary-600 hover:text-primary-700"
                    >
                      + Add task
                    </button>
                  </div>
                ) : (
                  <>
                    {columnTasks.map((task) => (
                      <div
                        key={task.id}
                        className="mb-2"
                      >
                        <div className="bg-white dark:bg-ztred-surface-dark border border-zinc-200 dark:border-zinc-700 rounded-lg p-3 shadow-sm">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-2">
                                {task.title}
                              </h4>
                              <p className="text-xs text-zinc-500 line-clamp-1">
                                {task.description || 'No description'}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2 text-xs">
                              {task.priority === 'urgent' && (
                                <div className="w-2 h-2 bg-red-500 rounded"></div>
                              )}
                              {task.priority === 'high' && (
                                <div className="w-2 h-2 bg-orange-500 rounded"></div>
                              )}
                              {task.priority === 'medium' && (
                                <div className="w-2 h-2 bg-yellow-500 rounded"></div>
                              )}
                              {task.priority === 'low' && (
                                <div className="w-2 h-2 bg-green-500 rounded"></div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-3 text-xs mt-2">
                            {task.assigneeAvatar && (
                              <img
                                src={task.assigneeAvatar}
                                alt={`${task.assigneeName}'s avatar`}
                                className="h-8 w-8 rounded-full border-2 border-white dark:border-zinc-900"
                              />
                            )}
                            {!task.assigneeAvatar && task.assigneeName && (
                              <div className="h-8 w-8 bg-gray-300 dark:bg-zinc-700 rounded-full flex items-center justify-center text-xs font-medium">
                                {task.assigneeName.charAt(0).toUpperCase()}
                              </div>
                            )}
                            <div className="flex-1 space-x-2">
                              {task.assigneeName && (
                                <span className="text-sm font-medium">{task.assigneeName}</span>
                              )}
                              {task.dueDate && (
                                <span className="text-xs flex items-center space-x-1">
                                  <Clock className="h-3 w-3 text-zinc-500"/>
                                  {new Date(task.dueDate).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => {}}
                                className="p-1 rounded-hover hover:bg-zinc-100"
                              >
                                <Users className="h-3 w-3 text-zinc-600 hover:text-zinc-800"/>
                              </button>
                              <button
                                onClick={() => {}}
                                className="p-1 rounded-hover hover:bg-zinc-100"
                              >
                                <MessageSquareMore className="h-3 w-3 text-zinc-600 hover:text-zinc-800"/>
                              </button>
                            </div>
                          </div>
                          <div className="mt-2 flex items-center space-x-2 text-xs">
                            <span className="flex-1">
                              Est: {task.estimatedHours?.toFixed(1)}h |
                              Spent: {task.actualHours?.toFixed(1)}h
                            </span>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => {}}
                                className="p-1 rounded-hover hover:bg-zinc-100"
                              >
                                <CheckSquare className="h-3 w-3 text-zinc-600 hover:text-zinc-800"/>
                              </button>
                              <button
                                onClick={() => {}}
                                className="p-1 rounded-hover hover:bg-zinc-100 text-destructive"
                              >
                                <Trash2 className="h-3 w-3 text-zinc-600 hover:text-zinc-800"/>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add task button */}
      <div className="flex justify-center">
        <button
          onClick={() => {}}
          className="w-full max-w-md px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg flex items-center justify-center space-x-2"
        >
          <CheckSquare className="h-4 w-4"/>
          Add Task
        </button>
      </div>
    </div>
  );
};