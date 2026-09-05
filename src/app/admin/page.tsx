"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  Server,
  Activity,
  Users,
  Database,
  Search,
  Lock,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Settings,
  Key,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'organizations' | 'security' | 'audit'>('overview');

  const orgs = [
    { id: '1', name: 'Skyline Ventures', slug: 'skyline', members: 1240, plan: 'Enterprise Pro', status: 'Active', storage: '1.2 TB', anomalies: false },
    { id: '2', name: 'Redwood Labs', slug: 'redwood', members: 350, plan: 'Enterprise', status: 'Active', storage: '480 GB', anomalies: false },
    { id: '3', name: 'UX/UI Guild', slug: 'ux-guild', members: 85, plan: 'Team', status: 'Warning', storage: '120 GB', anomalies: true },
    { id: '4', name: 'Acme Innovation', slug: 'acme', members: 380, plan: 'Enterprise', status: 'Active', storage: '650 GB', anomalies: false },
  ];

  return (
    <div className="min-h-screen bg-theme-primary text-theme-primary flex flex-col font-sans">
      {/* Admin Top Header */}
      <header className="h-16 border-b border-theme px-6 flex items-center justify-between bg-theme-card">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 rounded-lg hover:bg-theme-secondary text-theme-muted hover:text-theme-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-purple-600 flex items-center justify-center font-bold text-sm">
              Z
            </div>
            <span className="font-bold text-base text-theme-primary">ZTRED Super Admin Dashboard</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/workspace/channels/general"
            className="text-xs bg-purple-600 hover:bg-purple-500 text-theme-primary font-semibold px-4 py-2 rounded-md transition-colors"
          >
            Open Workspace App
          </Link>
        </div>
      </header>

      {/* Main Admin Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex border-b border-theme gap-6 text-sm font-semibold">
          {(['overview', 'organizations', 'security', 'audit'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 capitalize transition-colors ${
                activeTab === tab
                  ? 'border-b-2 border-purple-500 text-purple-400'
                  : 'text-theme-muted hover:text-theme-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* System Health Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-theme-card border border-theme">
            <div className="flex items-center justify-between text-theme-muted text-xs font-mono mb-2">
              <span>STORAGE USED</span>
              <Database className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-theme-primary">24.8%</div>
            <span className="text-xs text-emerald-400 mt-1 block">+1.2% vs last week</span>
          </div>

          <div className="p-5 rounded-2xl bg-theme-card border border-theme">
            <div className="flex items-center justify-between text-theme-muted text-xs font-mono mb-2">
              <span>MEMORY LOAD</span>
              <Server className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-bold text-theme-primary">62.1%</div>
            <span className="text-xs text-theme-muted mt-1 block">7.4 / 12.0 GB allocation</span>
          </div>

          <div className="p-5 rounded-2xl bg-theme-card border border-theme">
            <div className="flex items-center justify-between text-theme-muted text-xs font-mono mb-2">
              <span>UPTIME</span>
              <Activity className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-emerald-400">99.99%</div>
            <span className="text-xs text-theme-muted mt-1 block">Last incident: 42d ago</span>
          </div>

          <div className="p-5 rounded-2xl bg-theme-card border border-theme">
            <div className="flex items-center justify-between text-theme-muted text-xs font-mono mb-2">
              <span>ACTIVE ORGS</span>
              <Users className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl font-bold text-theme-primary">142</div>
            <span className="text-xs text-sky-400 mt-1 block">2.055 total members</span>
          </div>
        </div>

        {/* Organizations Table */}
        <div className="p-6 rounded-2xl bg-theme-card border border-theme space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-theme-primary">Organization Management</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search organizations..."
                className="pl-8 pr-3 py-1.5 bg-theme-input border border-theme rounded-md text-xs text-theme-primary focus:outline-none focus:border-purple-500"
              />
              <Search className="w-3.5 h-3.5 text-theme-muted absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-theme text-theme-muted font-mono uppercase">
                  <th className="pb-3 font-semibold">Organization Name</th>
                  <th className="pb-3 font-semibold">Members</th>
                  <th className="pb-3 font-semibold">Plan</th>
                  <th className="pb-3 font-semibold">Storage</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Security Alert</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-theme">
                {orgs.map((org) => (
                  <tr key={org.id} className="hover:bg-theme-input/50 transition-colors">
                    <td className="py-3 font-semibold text-theme-primary">{org.name}</td>
                    <td className="py-3 font-mono text-theme-secondary">{org.members}</td>
                    <td className="py-3 text-purple-400 font-semibold">{org.plan}</td>
                    <td className="py-3 font-mono text-theme-muted">{org.storage}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        org.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {org.status}
                      </span>
                    </td>
                    <td className="py-3">
                      {org.anomalies ? (
                        <span className="flex items-center gap-1 text-amber-400 font-semibold">
                          <ShieldAlert className="w-4 h-4" />
                          <span>Anomaly Alert</span>
                        </span>
                      ) : (
                        <span className="text-theme-muted">Clean</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}