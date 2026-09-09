/**
 * Document mock data, shared by the docs list and the `[docId]` editor route.
 * Split out so the editor can title itself from its route segment instead of
 * always showing "Project Proposal - Q3 Initiatives".
 */

export interface DocItem {
  id: string;
  title: string;
  description: string;
  updated: string;
  readTime: string;
  starred: boolean;
  /** Seed content for the editor. */
  body: string;
  collaborators: number;
  hasOverview?: boolean;
  overviewText?: string;
  keyOutcomes?: string[];
}

export const DOCS: DocItem[] = [
  {
    id: 'doc_1',
    title: 'Product Requirements Doc',
    description:
      'The complete PRD for the Q3 launch including scope, milestones and success metrics.',
    updated: '2h ago',
    readTime: '4 min read',
    starred: false,
    collaborators: 3,
    body: 'Scope, milestones and success metrics for the Q3 launch. Start writing…',
    hasOverview: true,
    overviewText:
      'The complete PRD for the Q3 launch including scope, milestones and success metrics. This shared document keeps the team aligned on decisions, scope, and next steps.',
    keyOutcomes: [
      'Keep decisions and requirements visible to the whole workspace',
    ],
  },
  {
    id: 'doc_2',
    title: 'Brand Guidelines',
    description:
      'Logo usage, color palette, typography and tone of voice for the Zenith brand.',
    updated: '3d ago',
    readTime: '4 min read',
    starred: false,
    collaborators: 2,
    body: 'Logo usage, colour, typography and tone of voice. Start writing…',
  },
  {
    id: 'doc_3',
    title: 'Sprint Planning Notes',
    description: 'Notes from weekly sprint planning and retrospective sessions.',
    updated: '5d ago',
    readTime: '4 min read',
    starred: false,
    collaborators: 5,
    body: 'Weekly planning and retro notes. Start writing…',
  },
  {
    id: 'doc_4',
    title: 'API Documentation',
    description:
      'REST API reference, authentication, rate limits and deployment workflows.',
    updated: '1w ago',
    readTime: '4 min read',
    starred: false,
    collaborators: 1,
    body: 'REST reference, auth, rate limits and deploys. Start writing…',
  },
];

export const DEFAULT_DOC_ID = 'doc_1';

export const getDoc = (id: string | undefined): DocItem =>
  DOCS.find((d) => d.id === id) ?? DOCS.find((d) => d.id === DEFAULT_DOC_ID)!;
