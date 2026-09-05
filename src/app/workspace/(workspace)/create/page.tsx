"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight, ArrowLeft, Check,
  Plus, X, Users, Link2
} from 'lucide-react';

const WORKSPACE_COLORS = [
  { name: 'Purple', color: '#7C3AED' },
  { name: 'Pink', color: '#EC4899' },
  { name: 'Green', color: '#10B981' },
  { name: 'Orange', color: '#F59E0B' },
  { name: 'Blue', color: '#3B82F6' },
  { name: 'Red', color: '#EF4444' },
];

const TEAM_TYPES = ['Startup', 'Agency', 'Enterprise', 'Personal'];

interface Invitee {
  email: string;
  role: 'Member' | 'Admin' | 'Guest';
}

export default function CreateWorkspacePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [workspaceName, setWorkspaceName] = useState('');
  const [workspaceDescription, setWorkspaceDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState('#7C3AED');
  const [selectedTeamType, setSelectedTeamType] = useState('Startup');
  const [inviteEmailInput, setInviteEmailInput] = useState('');
  const [invitees, setInvitees] = useState<Invitee[]>([
    { email: 'sam.rivera@zenith.com', role: 'Member' },
  ]);
  const [isCreating, setIsCreating] = useState(false);

  const addInvitee = () => {
    const email = inviteEmailInput.trim();
    if (email && email.includes('@') && !invitees.find(i => i.email === email)) {
      setInvitees([...invitees, { email, role: 'Member' }]);
      setInviteEmailInput('');
    }
  };

  const removeInvitee = (email: string) => {
    setInvitees(invitees.filter(i => i.email !== email));
  };

  const goToFinishing = () => {
    setIsCreating(true);
    const params = new URLSearchParams();
    params.set('name', workspaceName || 'Untitled');
    params.set('invites', String(invitees.length));
    setTimeout(() => {
      router.push(`/workspace/finishing?${params.toString()}`);
    }, 1200);
  };

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      goToFinishing();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center overflow-y-auto py-8 px-4">
      <div className="w-full max-w-xl">
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-0 mb-10">
          {/* Back arrow */}
          {step > 1 && (
            <button
              onClick={handleBack}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-theme-muted hover:text-theme-primary hover:bg-theme-secondary transition-colors mr-3"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          {[
            { num: 1, label: 'Details' },
            { num: 2, label: 'Invite' },
          ].map((s, i) => (
            <React.Fragment key={s.num}>
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step > s.num
                      ? 'bg-purple-600 text-theme-primary'
                      : step === s.num
                      ? 'bg-purple-600 text-theme-primary shadow-lg shadow-purple-600/30'
                      : 'bg-theme-card text-theme-muted border border-theme'
                  }`}
                >
                  {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span
                  className={`text-sm font-medium ${
                    step === s.num ? 'text-theme-primary' : 'text-theme-muted'
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < 1 && (
                <div
                  className={`w-20 h-0.5 rounded-full mx-3 ${
                    step > s.num ? 'bg-purple-600' : 'bg-theme-card'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Form Card */}
        <div className="bgCard borderCard rounded-2xl p-8">
          {/* Step 1: Details */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-theme-primary">
                  Create a workspace
                </h1>
                <p className="text-theme-muted text-sm mt-1">
                  Set up a shared space for your team to collaborate.
                </p>
              </div>

              {/* Workspace Icon + Name */}
              <div className="flex items-center gap-4">
                <button className="w-16 h-16 rounded-2xl flex items-center justify-center text-theme-primary shadow-lg shrink-0 transition-colors hover:opacity-90"
                  style={{ backgroundColor: selectedColor }}
                >
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </button>
                <div className="flex-1">
                  <label className="text-xs font-medium text-theme-muted mb-1 block">
                    Workspace name
                  </label>
                  <input
                    type="text"
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                    placeholder="Acme Inc."
                    className="w-full bgCard borderCard rounded-xl px-4 py-3 text-theme-primary placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-sm transition-all"
                  />
                </div>
              </div>

              {/* Color Picker */}
              <div>
                <label className="text-xs font-medium text-theme-muted mb-3 block">
                  Workspace color
                </label>
                <div className="flex items-center gap-3">
                  {WORKSPACE_COLORS.map((c) => (
                    <button
                      key={c.color}
                      onClick={() => setSelectedColor(c.color)}
                      className={`w-9 h-9 rounded-full transition-all ${
                        selectedColor === c.color
                          ? 'ring-2 ring-offset-2 ring-offset-[#141824] scale-110'
                          : 'hover:scale-105'
                      }`}
                      style={{
                        backgroundColor: c.color,
                        ...(selectedColor === c.color ? { boxShadow: `0 0 0 2px #141824, 0 0 0 4px ${c.color}` } : {}),
                      }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Team Type */}
              <div>
                <label className="text-xs font-medium text-theme-muted mb-3 block">
                  What describes your team?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {TEAM_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedTeamType(type)}
                      className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                        selectedTeamType === type
                          ? 'bg-purple-950/40 border-purple-600/50 text-theme-primary'
                          : 'bg-theme-surface border-theme text-theme-muted hover:border-theme hover:text-theme-secondary'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Invite */}
          {step === 2 && (
            <div className="space-y-5">
              {/* People Icon */}
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-400" />
              </div>

              {/* Title */}
              <div>
                <h1 className="text-2xl font-bold text-theme-primary">
                  Invite your team
                </h1>
                <p className="text-theme-muted text-sm mt-1">
                  Add teammates to <span className="text-theme-primary font-semibold">{workspaceName || 'dddd'}</span>. They&apos;ll get an email invite.
                </p>
              </div>

              {/* Email Input with + Button */}
              <div className="flex items-center gap-3">
                <input
                  type="email"
                  value={inviteEmailInput}
                  onChange={(e) => setInviteEmailInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addInvitee(); } }}
                  placeholder="name@company.com"
                  className="flex-1 bgCard borderCard rounded-xl px-4 py-3 text-theme-primary placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-sm transition-all"
                />
                <button
                  onClick={addInvitee}
                  className="w-11 h-11 rounded-xl bg-purple-600 hover:bg-purple-700 flex items-center justify-center text-theme-primary shadow-lg shadow-purple-600/25 transition-all shrink-0"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Added Invitees */}
              <div className="space-y-2">
                {invitees.map((invitee) => (
                  <div
                    key={invitee.email}
                    className="flex items-center gap-3 p-3 bgCard borderCard rounded-xl"
                  >
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-theme-primary text-xs font-bold shrink-0">
                      {invitee.email.charAt(0).toUpperCase()}
                    </div>
                    <span className="flex-1 text-sm text-theme-primary truncate">
                      {invitee.email}
                    </span>
                    <span className="text-xs text-theme-muted shrink-0">
                      {invitee.role}
                    </span>
                    <button
                      onClick={() => removeInvitee(invitee.email)}
                      className="w-6 h-6 rounded-md flex items-center justify-center text-theme-muted hover:text-theme-secondary hover:bg-theme-secondary transition-all shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Invite Link */}
              <div className="flex items-center gap-3 p-3 bgCard borderCard rounded-xl">
                <Link2 className="w-4 h-4 text-theme-muted shrink-0" />
                <span className="flex-1 text-sm text-theme-muted truncate">
                  zenith.com/invite/{workspaceName.toLowerCase().replace(/\s+/g, '-') || 'dddd'}
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(`zenith.com/invite/${workspaceName.toLowerCase().replace(/\s+/g, '-') || 'dddd'}`);
                  }}
                  className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors shrink-0"
                >
                  Copy link
                </button>
              </div>

              {/* Bottom Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={goToFinishing}
                  disabled={isCreating}
                  className="flex-1 py-3 rounded-xl border border-theme text-theme-secondary font-semibold text-sm hover:bg-theme-secondary transition-all disabled:opacity-50"
                >
                  {isCreating ? 'Creating...' : 'Skip for now'}
                </button>
                <button
                  onClick={goToFinishing}
                  disabled={isCreating}
                  className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-theme-primary font-semibold text-sm shadow-lg shadow-purple-600/25 transition-all disabled:opacity-50"
                >
                  {isCreating ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating...
                    </span>
                  ) : 'Send invites'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Continue Button (Step 1 only) */}
        {step === 1 && (
          <button
            onClick={handleNext}
            disabled={!workspaceName.trim()}
            className={`w-full mt-4 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all ${
              !workspaceName.trim()
                ? 'bg-theme-card text-theme-muted cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700 text-theme-primary shadow-lg shadow-purple-600/25'
            }`}
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
