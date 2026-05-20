import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Notification } from '@/types';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (n: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: '1', type: 'follow', message: 'Arjun Mehta started following you', from: 'Arjun Mehta', fromAvatar: 'https://i.pravatar.cc/150?img=12', createdAt: '2 min ago', read: false },
  { id: '2', type: 'like', message: 'Sneha Patel liked your post', from: 'Sneha Patel', fromAvatar: 'https://i.pravatar.cc/150?img=29', createdAt: '10 min ago', read: false },
  { id: '3', type: 'comment', message: 'Ravi Kumar commented: "Great insight!"', from: 'Ravi Kumar', fromAvatar: 'https://i.pravatar.cc/150?img=33', createdAt: '25 min ago', read: false },
  { id: '4', type: 'event', message: 'Tech Summit 2025 starts in 2 hours', from: 'TOGETHERS Events', createdAt: '1 hour ago', read: true },
  { id: '5', type: 'invite', message: 'You were invited to join "Bangalore Founders" community', from: 'Community Bot', createdAt: '3 hours ago', read: true },
  { id: '6', type: 'message', message: 'You have a new message from Kavita Singh', from: 'Kavita Singh', fromAvatar: 'https://i.pravatar.cc/150?img=25', createdAt: '5 hours ago', read: true },
];

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(ns => ns.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(ns => ns.map(n => ({ ...n, read: true })));
  };

  const addNotification = (n: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
    const newN: Notification = { ...n, id: Date.now().toString(), createdAt: 'Just now', read: false };
    setNotifications(ns => [newN, ...ns]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider');
  return ctx;
}
