/**
 * Project mock data, shared by the projects list, the `[projectId]` detail
 * route, the task board, the Gantt view and the whiteboard.
 *
 * Previously the list and the detail page each carried their own hardcoded
 * data and the detail page ignored its route segment entirely, so every
 * project opened as "Website Redesign". One source keyed by id fixes both.
 */

import { addDays, format } from 'date-fns';

/** Relative dates keep the demo data evergreen. */
const daysFromNow = (n: number) => format(addDays(new Date(), n), 'MMM d');
const dateFromNow = (n: number) => format(addDays(new Date(), n), 'MMM dd, yyyy');

export const AVATARS = {
  sam: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
  maya: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&auto=format&fit=crop&q=80',
  daniel: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
  jordan: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80',
  lisa: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=80',
} as const;

export type ProjectStatus = 'On Track' | 'At Risk' | 'Off Track';
export type ProjectPriority = 'High' | 'Medium' | 'Low';

export interface ProjectMember {
  name: string;
  role: string;
  avatar: string;
}

export interface ProjectActivity {
  name: string;
  action: string;
  target: string;
  time: string;
  avatar: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  priority: ProjectPriority;
  category: string;
  progress: number;
  status: ProjectStatus;
  /** Short form for the list card, e.g. "Mar 4". */
  dueDate: string;
  /** Long form for the detail header, e.g. "Mar 04, 2026". */
  startDate: string;
  deadline: string;
  createdBy: string;
  team: string[];
  extraCount?: number;
  tasks: {
    total: number;
    todo: number;
    inProgress: number;
    inReview: number;
    done: number;
  };
  members: ProjectMember[];
  activity: ProjectActivity[];
}

export const PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete brand overhaul and asset update',
    priority: 'High',
    category: 'Design',
    progress: 72,
    status: 'On Track',
    dueDate: daysFromNow(39),
    startDate: dateFromNow(-25),
    deadline: dateFromNow(39),
    createdBy: 'Sam Rivera',
    team: [AVATARS.sam, AVATARS.maya, AVATARS.daniel],
    extraCount: 1,
    tasks: { total: 12, todo: 4, inProgress: 5, inReview: 1, done: 2 },
    members: [
      { name: 'Sam Rivera', role: 'Admin', avatar: AVATARS.sam },
      { name: 'Lisa Park', role: 'Editor', avatar: AVATARS.lisa },
      { name: 'Jordan Lee', role: 'Editor', avatar: AVATARS.jordan },
      { name: 'Daniel Kim', role: 'Viewer', avatar: AVATARS.daniel },
    ],
    activity: [
      {
        name: 'Sam Rivera',
        action: 'moved "Design header" to',
        target: 'In Progress',
        time: '10m ago',
        avatar: AVATARS.sam,
      },
      {
        name: 'Lisa Park',
        action: 'completed "User flow wireframes"',
        target: '',
        time: '1h ago',
        avatar: AVATARS.lisa,
      },
      {
        name: 'Jordan Lee',
        action: 'commented on "Content mapping review"',
        target: '',
        time: '4h ago',
        avatar: AVATARS.jordan,
      },
    ],
  },
  {
    id: '2',
    name: 'Mobile App v2',
    description: 'iOS and Android updates for checkout flows',
    priority: 'High',
    category: 'Engineering',
    progress: 45,
    status: 'At Risk',
    dueDate: daysFromNow(57),
    startDate: dateFromNow(-12),
    deadline: dateFromNow(57),
    createdBy: 'Jordan Lee',
    team: [AVATARS.jordan, AVATARS.sam],
    tasks: { total: 18, todo: 7, inProgress: 6, inReview: 3, done: 2 },
    members: [
      { name: 'Jordan Lee', role: 'Admin', avatar: AVATARS.jordan },
      { name: 'Sam Rivera', role: 'Editor', avatar: AVATARS.sam },
      { name: 'Daniel Kim', role: 'Editor', avatar: AVATARS.daniel },
    ],
    activity: [
      {
        name: 'Jordan Lee',
        action: 'flagged "Checkout regression" as',
        target: 'Blocked',
        time: '25m ago',
        avatar: AVATARS.jordan,
      },
      {
        name: 'Daniel Kim',
        action: 'opened "Apple Pay sheet dismisses early"',
        target: '',
        time: '3h ago',
        avatar: AVATARS.daniel,
      },
    ],
  },
  {
    id: '3',
    name: 'Q3 Marketing Campaign',
    description: 'Global product drop and media campaign',
    priority: 'Medium',
    category: 'Marketing',
    progress: 88,
    status: 'On Track',
    dueDate: daysFromNow(24),
    startDate: dateFromNow(-40),
    deadline: dateFromNow(24),
    createdBy: 'Maya Chen',
    team: [AVATARS.maya, AVATARS.daniel, AVATARS.jordan],
    extraCount: 2,
    tasks: { total: 22, todo: 2, inProgress: 3, inReview: 2, done: 15 },
    members: [
      { name: 'Maya Chen', role: 'Admin', avatar: AVATARS.maya },
      { name: 'Lisa Park', role: 'Editor', avatar: AVATARS.lisa },
      { name: 'Daniel Kim', role: 'Viewer', avatar: AVATARS.daniel },
    ],
    activity: [
      {
        name: 'Maya Chen',
        action: 'approved "Launch film final cut"',
        target: '',
        time: '1h ago',
        avatar: AVATARS.maya,
      },
      {
        name: 'Lisa Park',
        action: 'moved "Press kit" to',
        target: 'Done',
        time: '6h ago',
        avatar: AVATARS.lisa,
      },
    ],
  },
  {
    id: '4',
    name: 'API Integration',
    description: 'ERP backend connection & data synchronizer',
    priority: 'High',
    category: 'Backend',
    progress: 23,
    status: 'Off Track',
    dueDate: daysFromNow(34),
    startDate: dateFromNow(-8),
    deadline: dateFromNow(34),
    createdBy: 'Daniel Kim',
    team: [AVATARS.jordan],
    tasks: { total: 15, todo: 9, inProgress: 4, inReview: 1, done: 1 },
    members: [
      { name: 'Daniel Kim', role: 'Admin', avatar: AVATARS.daniel },
      { name: 'Jordan Lee', role: 'Editor', avatar: AVATARS.jordan },
    ],
    activity: [
      {
        name: 'Daniel Kim',
        action: 'moved the deadline for',
        target: 'Sync worker',
        time: '2h ago',
        avatar: AVATARS.daniel,
      },
    ],
  },
  {
    id: '5',
    name: 'Brand Guidelines Update',
    description: 'Defining layout grid and visual elements',
    priority: 'Low',
    category: 'Design',
    progress: 60,
    status: 'On Track',
    dueDate: daysFromNow(52),
    startDate: dateFromNow(-30),
    deadline: dateFromNow(52),
    createdBy: 'Lisa Park',
    team: [AVATARS.maya, AVATARS.sam, AVATARS.daniel],
    tasks: { total: 9, todo: 2, inProgress: 2, inReview: 1, done: 4 },
    members: [
      { name: 'Lisa Park', role: 'Admin', avatar: AVATARS.lisa },
      { name: 'Maya Chen', role: 'Editor', avatar: AVATARS.maya },
    ],
    activity: [
      {
        name: 'Lisa Park',
        action: 'updated "Type scale" in',
        target: 'Foundations',
        time: '30m ago',
        avatar: AVATARS.lisa,
      },
    ],
  },
  {
    id: '6',
    name: 'User Research Study',
    description: 'Testing new workspace flows with cohorts',
    priority: 'Medium',
    category: 'Research',
    progress: 35,
    status: 'At Risk',
    dueDate: daysFromNow(70),
    startDate: dateFromNow(-5),
    deadline: dateFromNow(70),
    createdBy: 'Maya Chen',
    team: [AVATARS.sam, AVATARS.maya, AVATARS.daniel, AVATARS.jordan],
    extraCount: 1,
    tasks: { total: 11, todo: 6, inProgress: 3, inReview: 1, done: 1 },
    members: [
      { name: 'Maya Chen', role: 'Admin', avatar: AVATARS.maya },
      { name: 'Sam Rivera', role: 'Viewer', avatar: AVATARS.sam },
    ],
    activity: [
      {
        name: 'Maya Chen',
        action: 'scheduled 4 sessions for',
        target: 'Cohort B',
        time: '45m ago',
        avatar: AVATARS.maya,
      },
    ],
  },
];

export const DEFAULT_PROJECT_ID = '1';

/**
 * Resolve a route segment to a project, falling back to the default when the
 * id is unknown so a stale bookmark renders something rather than crashing.
 */
export const getProject = (id: string | undefined): Project =>
  PROJECTS.find((p) => p.id === id) ??
  PROJECTS.find((p) => p.id === DEFAULT_PROJECT_ID)!;

export const PRIORITY_COLORS: Record<string, { bg: string; text: string }> = {
  High: { bg: 'bg-red-500/20', text: 'text-red-400' },
  Medium: { bg: 'bg-orange-500/20', text: 'text-orange-400' },
  Low: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
};

export const STATUS_COLORS: Record<string, string> = {
  'On Track': 'bg-emerald-500',
  'At Risk': 'bg-orange-500',
  'Off Track': 'bg-red-500',
};
