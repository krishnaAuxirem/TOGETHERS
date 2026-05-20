import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import {
  LayoutDashboard, Users, Calendar, MessageSquare, Bell, Settings,
  BarChart2, ShieldCheck, FileText, Star, DollarSign, Briefcase,
  BookOpen, Image, CheckSquare, Globe, LogOut, Menu, X
} from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

const NAV_BY_ROLE: Record<UserRole, NavItem[]> = {
  admin: [
    { label: 'Overview', path: '/dashboard/admin', icon: LayoutDashboard },
    { label: 'Users', path: '/dashboard/admin/users', icon: Users },
    { label: 'Moderation', path: '/dashboard/admin/moderation', icon: ShieldCheck },
    { label: 'Analytics', path: '/dashboard/admin/analytics', icon: BarChart2 },
    { label: 'Blogs', path: '/dashboard/admin/blogs', icon: BookOpen },
    { label: 'Subscriptions', path: '/dashboard/admin/subscriptions', icon: DollarSign },
    { label: 'Settings', path: '/dashboard/admin/settings', icon: Settings },
  ],
  creator: [
    { label: 'Overview', path: '/dashboard/creator', icon: LayoutDashboard },
    { label: 'My Community', path: '/dashboard/creator/community', icon: Globe },
    { label: 'Events', path: '/dashboard/creator/events', icon: Calendar },
    { label: 'Monetization', path: '/dashboard/creator/monetization', icon: DollarSign },
    { label: 'Analytics', path: '/dashboard/creator/analytics', icon: BarChart2 },
    { label: 'Messages', path: '/dashboard/creator/messages', icon: MessageSquare },
    { label: 'Settings', path: '/dashboard/creator/settings', icon: Settings },
  ],
  organizer: [
    { label: 'Overview', path: '/dashboard/organizer', icon: LayoutDashboard },
    { label: 'Groups', path: '/dashboard/organizer/groups', icon: Users },
    { label: 'Events', path: '/dashboard/organizer/events', icon: Calendar },
    { label: 'Analytics', path: '/dashboard/organizer/analytics', icon: BarChart2 },
    { label: 'Moderation', path: '/dashboard/organizer/moderation', icon: ShieldCheck },
    { label: 'Reports', path: '/dashboard/organizer/reports', icon: FileText },
    { label: 'Settings', path: '/dashboard/organizer/settings', icon: Settings },
  ],
  team: [
    { label: 'Overview', path: '/dashboard/team', icon: LayoutDashboard },
    { label: 'Calendar', path: '/dashboard/team/calendar', icon: Calendar },
    { label: 'Tasks', path: '/dashboard/team/tasks', icon: CheckSquare },
    { label: 'Albums', path: '/dashboard/team/albums', icon: Image },
    { label: 'Notes', path: '/dashboard/team/notes', icon: FileText },
    { label: 'Messages', path: '/dashboard/team/messages', icon: MessageSquare },
    { label: 'Settings', path: '/dashboard/team/settings', icon: Settings },
  ],
  user: [
    { label: 'Feed', path: '/dashboard/user', icon: LayoutDashboard },
    { label: 'Discover', path: '/dashboard/user/discover', icon: Globe },
    { label: 'Messages', path: '/dashboard/user/messages', icon: MessageSquare },
    { label: 'Events', path: '/dashboard/user/events', icon: Calendar },
    { label: 'Notifications', path: '/dashboard/user/notifications', icon: Bell },
    { label: 'Saved Posts', path: '/dashboard/user/saved', icon: Star },
    { label: 'Settings', path: '/dashboard/user/settings', icon: Settings },
  ],
};

const ROLE_COLORS: Record<UserRole, string> = {
  admin: 'from-red-500 to-rose-600',
  creator: 'from-coral-500 to-orange-600',
  organizer: 'from-indigo-500 to-violet-600',
  team: 'from-emerald-500 to-teal-600',
  user: 'from-blue-500 to-cyan-600',
};

const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Administrator',
  creator: 'Creator / Influencer',
  organizer: 'Community Organizer',
  team: 'Team Member',
  user: 'Community User',
};

export default function DashboardSidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  if (!user) return null;

  const navItems = NAV_BY_ROLE[user.role];
  const roleColor = ROLE_COLORS[user.role];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-64'} flex-shrink-0 bg-white border-r border-gray-100 flex flex-col transition-all duration-300 shadow-glass min-h-screen`}>
      {/* Header */}
      <div className={`p-4 border-b border-gray-100 flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {!collapsed && (
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-white font-black text-xs">T</span>
            </div>
            <span className="font-black text-base text-gray-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>TOGETHERS</span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
        >
          {collapsed ? <Menu size={16} /> : <X size={16} />}
        </button>
      </div>

      {/* User Profile */}
      <div className={`p-4 border-b border-gray-100 ${collapsed ? 'flex justify-center' : ''}`}>
        {collapsed ? (
          <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
        ) : (
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src={user.avatar} alt={user.name} className="w-11 h-11 rounded-full object-cover ring-2 ring-offset-2 ring-coral-400" />
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 text-sm truncate">{user.name}</p>
              <span className={`inline-block text-xs text-white rounded-full px-2 py-0.5 font-medium bg-gradient-to-r ${roleColor} mt-0.5`}>
                {ROLE_LABELS[user.role]}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map(item => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'} px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                active
                  ? 'bg-gradient-to-r from-coral-50 to-orange-50 text-coral-600 font-semibold border border-coral-100'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-coral-600'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={18} className={`flex-shrink-0 ${active ? 'text-coral-500' : 'text-gray-400 group-hover:text-coral-500'} transition-colors`} />
              {!collapsed && <span className="text-sm">{item.label}</span>}
              {!collapsed && active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-coral-500" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'} w-full px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-colors`}
          title={collapsed ? 'Sign Out' : undefined}
        >
          <LogOut size={18} />
          {!collapsed && <span className="text-sm font-medium">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
