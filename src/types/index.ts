export type UserRole = 'user' | 'organizer' | 'team' | 'creator' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  location?: string;
  joinedAt: string;
  followers: number;
  following: number;
  communities: string[];
  verified?: boolean;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  category: string;
  members: number;
  image?: string;
  isPrivate: boolean;
  tags: string[];
  organizer: string;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  isVirtual: boolean;
  attendees: number;
  maxAttendees: number;
  image?: string;
  category: string;
  organizer: string;
  price: number;
  tags: string[];
}

export interface Post {
  id: string;
  author: string;
  authorAvatar?: string;
  authorRole: UserRole;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  createdAt: string;
  tags: string[];
  liked?: boolean;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'event' | 'message' | 'invite';
  message: string;
  from: string;
  fromAvatar?: string;
  createdAt: string;
  read: boolean;
}

export interface Message {
  id: string;
  from: string;
  fromAvatar?: string;
  content: string;
  createdAt: string;
  read: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}
