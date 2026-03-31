import { Post, User, Comment } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    email: 'marcus@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
  },
  {
    id: '3',
    name: 'Emma Davis',
    email: 'emma@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
  },
  {
    id: '4',
    name: 'Alex Rodriguez',
    email: 'alex@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  },
];

export const currentUser: User = mockUsers[0];

export const mockComments: Comment[] = [
  {
    id: 'c1',
    postId: 'p1',
    userId: '2',
    user: mockUsers[1],
    content: 'This is amazing! Love your work.',
    likes: ['3', '4'],
    replies: [
      {
        id: 'r1',
        commentId: 'c1',
        userId: '1',
        user: mockUsers[0],
        content: 'Thanks! Appreciate it 🙏',
        likes: ['2'],
        createdAt: new Date(Date.now() - 3600000).toISOString(),
      },
    ],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'c2',
    postId: 'p1',
    userId: '3',
    user: mockUsers[2],
    content: 'Absolutely incredible! How did you do this?',
    likes: ['1', '4'],
    replies: [],
    createdAt: new Date(Date.now() - 43200000).toISOString(),
  },
];

export const mockPosts: Post[] = [
  {
    id: 'p1',
    userId: '1',
    user: mockUsers[0],
    content: 'Just launched my new design system! Took months of work but super excited to share it with the community. Any feedback appreciated! 🚀',
    likes: ['2', '3', '4'],
    comments: mockComments,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: 'p2',
    userId: '2',
    user: mockUsers[1],
    content: 'Working on a new mobile app prototype. The UI is looking so smooth with these animations! Tell me what you think.',
    likes: ['1', '3'],
    comments: [
      {
        id: 'c3',
        postId: 'p2',
        userId: '1',
        user: mockUsers[0],
        content: 'The animations are buttery smooth!',
        likes: ['2'],
        replies: [],
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ],
    createdAt: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: 'p3',
    userId: '3',
    user: mockUsers[2],
    content: 'Finally finished my portfolio redesign! Really happy with how it turned out. Check it out and let me know what you think.',
    likes: ['1', '2', '4'],
    comments: [],
    createdAt: new Date(Date.now() - 432000000).toISOString(),
  },
  {
    id: 'p4',
    userId: '4',
    user: mockUsers[3],
    content: 'Building in public! Currently working on integrating real-time collaboration into my design tool. Progress has been smooth so far.',
    likes: ['1', '2', '3'],
    comments: [],
    createdAt: new Date(Date.now() - 604800000).toISOString(),
  },
];
