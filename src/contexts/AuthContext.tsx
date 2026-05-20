import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole, AuthState } from '@/types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: User[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    email: 'admin@togethers.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=47',
    bio: 'Platform Administrator | Building Communities',
    location: 'Mumbai, India',
    joinedAt: '2024-01-15',
    followers: 12450,
    following: 234,
    communities: ['tech', 'design', 'startup'],
    verified: true,
  },
  {
    id: '2',
    name: 'Arjun Mehta',
    email: 'creator@togethers.com',
    role: 'creator',
    avatar: 'https://i.pravatar.cc/150?img=12',
    bio: 'Digital Creator | Tech Influencer',
    location: 'Bangalore, India',
    joinedAt: '2024-02-20',
    followers: 45200,
    following: 890,
    communities: ['tech', 'startup'],
    verified: true,
  },
  {
    id: '3',
    name: 'Sneha Patel',
    email: 'organizer@togethers.com',
    role: 'organizer',
    avatar: 'https://i.pravatar.cc/150?img=29',
    bio: 'Community Organizer | Event Specialist',
    location: 'Delhi, India',
    joinedAt: '2024-03-10',
    followers: 3200,
    following: 450,
    communities: ['events', 'social'],
    verified: false,
  },
  {
    id: '4',
    name: 'Ravi Kumar',
    email: 'user@togethers.com',
    role: 'user',
    avatar: 'https://i.pravatar.cc/150?img=33',
    bio: 'Tech Enthusiast | Community Member',
    location: 'Hyderabad, India',
    joinedAt: '2024-04-05',
    followers: 234,
    following: 312,
    communities: ['tech', 'gaming'],
    verified: false,
  },
  {
    id: '5',
    name: 'Kavita Singh',
    email: 'team@togethers.com',
    role: 'team',
    avatar: 'https://i.pravatar.cc/150?img=25',
    bio: 'Team Lead | Collaboration Expert',
    location: 'Pune, India',
    joinedAt: '2024-03-20',
    followers: 890,
    following: 234,
    communities: ['team', 'work'],
    verified: false,
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true,
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('togethers_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setState({ user, isAuthenticated: true, loading: false });
      } catch {
        localStorage.removeItem('togethers_user');
        setState(s => ({ ...s, loading: false }));
      }
    } else {
      setState(s => ({ ...s, loading: false }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 1200));
    const savedUsers = JSON.parse(localStorage.getItem('togethers_registered_users') || '[]');
    const allUsers = [...DEMO_USERS, ...savedUsers];
    const user = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user && (password.length >= 6 || DEMO_USERS.find(du => du.email === email))) {
      localStorage.setItem('togethers_user', JSON.stringify(user));
      setState({ user, isAuthenticated: true, loading: false });
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string, role: UserRole): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 1500));
    const savedUsers = JSON.parse(localStorage.getItem('togethers_registered_users') || '[]');
    const existing = [...DEMO_USERS, ...savedUsers].find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) return false;

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
      bio: '',
      location: 'India',
      joinedAt: new Date().toISOString().split('T')[0],
      followers: 0,
      following: 0,
      communities: [],
      verified: false,
    };

    savedUsers.push({ ...newUser, password });
    localStorage.setItem('togethers_registered_users', JSON.stringify(savedUsers));
    localStorage.setItem('togethers_user', JSON.stringify(newUser));
    setState({ user: newUser, isAuthenticated: true, loading: false });
    return true;
  };

  const logout = () => {
    localStorage.removeItem('togethers_user');
    setState({ user: null, isAuthenticated: false, loading: false });
  };

  const updateUser = (updates: Partial<User>) => {
    if (!state.user) return;
    const updatedUser = { ...state.user, ...updates };
    localStorage.setItem('togethers_user', JSON.stringify(updatedUser));
    setState(s => ({ ...s, user: updatedUser }));
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
