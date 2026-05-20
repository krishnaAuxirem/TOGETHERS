import { useEffect, useState } from 'react';
import { Users, Calendar, TrendingUp, ShieldCheck, BarChart2 } from 'lucide-react';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import StatCard from '@/components/ui-custom/StatCard';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';
import { COMMUNITIES, EVENTS } from '@/data/mockData';

const ENGAGEMENT_DATA = [
  { week: 'W1', posts: 45, events: 3, members: 120 },
  { week: 'W2', posts: 67, events: 5, members: 180 },
  { week: 'W3', posts: 89, events: 4, members: 240 },
  { week: 'W4', posts: 112, events: 7, members: 310 },
];

export default function OrganizerDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => { setTimeout(() => setLoading(false), 800); }, []);

  if (!isAuthenticated || user?.role !== 'organizer') return <Navigate to="/login" replace />;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Organizer Hub</h1>
              <p className="text-gray-500 mt-1">Manage your communities and events.</p>
            </div>
            <button onClick={() => toast.success('New community creation form opened!')} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all hover-lift text-sm">
              + New Group
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <StatCard title="Communities Managed" value="8" change="+2" positive icon={<Users size={20} />} color="text-indigo-500" bg="bg-indigo-50" />
            <StatCard title="Total Members" value="32.5K" change="+1.8K" positive icon={<TrendingUp size={20} />} color="text-coral-500" bg="bg-coral-50" />
            <StatCard title="Events This Month" value="12" change="+4" positive icon={<Calendar size={20} />} color="text-emerald-500" bg="bg-emerald-50" />
            <StatCard title="Moderation Queue" value="5" change="-3" positive icon={<ShieldCheck size={20} />} color="text-amber-500" bg="bg-amber-50" />
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Engagement Chart */}
            <div className="glass-card rounded-2xl p-6 border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-4">Weekly Community Engagement</h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={ENGAGEMENT_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="posts" fill="#F97316" radius={[4, 4, 0, 0]} name="Posts" />
                  <Bar dataKey="members" fill="#4F46E5" radius={[4, 4, 0, 0]} name="New Members" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Upcoming Events */}
            <div className="glass-card rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900">Upcoming Events</h2>
                <button onClick={() => toast.success('Event creation form opened!')} className="text-sm text-coral-500 font-semibold hover:text-coral-600">+ Add Event</button>
              </div>
              <div className="space-y-3">
                {EVENTS.slice(0, 4).map(e => (
                  <div key={e.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-coral-50 transition-colors group">
                    <div className="w-10 h-10 bg-coral-100 rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-coral-600">{new Date(e.date).getDate()}</span>
                      <span className="text-xs text-coral-400">{new Date(e.date).toLocaleString('en', { month: 'short' })}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate group-hover:text-coral-700">{e.title}</p>
                      <p className="text-xs text-gray-400">{e.attendees} attending</p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${e.isVirtual ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'}`}>
                      {e.isVirtual ? 'Virtual' : 'In-Person'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* My Communities */}
          <div className="glass-card rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-gray-900">My Communities</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {COMMUNITIES.slice(0, 4).map(c => (
                <div key={c.id} className="flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors">
                  <div className="w-11 h-11 gradient-primary rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {c.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">{c.name}</p>
                    <p className="text-xs text-gray-400">{c.members.toLocaleString()} members · {c.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => toast.success(`Managing ${c.name}`)} className="text-xs px-3 py-1.5 bg-coral-50 text-coral-600 hover:bg-coral-500 hover:text-white rounded-lg transition-all font-medium">Manage</button>
                    <button onClick={() => toast.info('Analytics opened')} className="text-xs px-3 py-1.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-500 hover:text-white rounded-lg transition-all font-medium">Analytics</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
