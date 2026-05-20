import { useEffect, useState } from 'react';
import { DollarSign, Users, TrendingUp, Star, BarChart2 } from 'lucide-react';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import StatCard from '@/components/ui-custom/StatCard';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { toast } from 'sonner';

const MONTHLY_REVENUE = [
  { month: 'Jan', revenue: 45000, members: 120 },
  { month: 'Feb', revenue: 67000, members: 180 },
  { month: 'Mar', revenue: 89000, members: 250 },
  { month: 'Apr', revenue: 112000, members: 340 },
  { month: 'May', revenue: 158000, members: 480 },
  { month: 'Jun', revenue: 210000, members: 620 },
];

const TOP_CONTENT = [
  { title: 'How I built 40K followers in 6 months', views: 12400, revenue: 24000, type: 'Guide' },
  { title: 'Tech Career Masterclass 2025', views: 8900, revenue: 67000, type: 'Course' },
  { title: 'Startup Pitch Templates Pack', views: 5600, revenue: 18000, type: 'Templates' },
];

export default function CreatorDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => { setTimeout(() => setLoading(false), 1000); }, []);

  if (!isAuthenticated || user?.role !== 'creator') return <Navigate to="/login" replace />;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Creator Studio 🌟</h1>
              <p className="text-gray-500 mt-1">Your creator performance at a glance.</p>
            </div>
            <button onClick={() => toast.success('New content creation mode opened!')} className="px-5 py-2.5 bg-coral-500 hover:bg-coral-600 text-white font-semibold rounded-xl transition-all hover-lift shadow-coral text-sm">
              + Create Content
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <StatCard title="Total Followers" value="45.2K" change="+1.2K" positive icon={<Users size={20} />} color="text-coral-500" bg="bg-coral-50" />
            <StatCard title="Monthly Revenue" value="₹2.1L" change="+24%" positive icon={<DollarSign size={20} />} color="text-emerald-500" bg="bg-emerald-50" />
            <StatCard title="Premium Members" value="840" change="+67" positive icon={<Star size={20} />} color="text-amber-500" bg="bg-amber-50" />
            <StatCard title="Engagement Rate" value="8.4%" change="+1.2%" positive icon={<TrendingUp size={20} />} color="text-indigo-500" bg="bg-indigo-50" />
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Revenue Chart */}
            <div className="glass-card rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900">Revenue Growth</h2>
                <span className="text-xs bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full font-semibold">↑ 24% this month</span>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={MONTHLY_REVENUE}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} />
                  <Tooltip formatter={(v: number) => [`₹${(v/1000).toFixed(1)}K`, 'Revenue']} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }} />
                  <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Member Growth */}
            <div className="glass-card rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900">Member Growth</h2>
                <span className="text-xs bg-coral-50 text-coral-600 px-3 py-1 rounded-full font-semibold">+620 this month</span>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={MONTHLY_REVENUE}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="members" fill="#F97316" radius={[4, 4, 0, 0]} name="New Members" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Content */}
          <div className="glass-card rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">Top Performing Content</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {TOP_CONTENT.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-coral-50 text-coral-600 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{item.title}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-gray-400">{item.views.toLocaleString()} views</span>
                      <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">{item.type}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-600 text-sm">₹{(item.revenue / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-gray-400">revenue</p>
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
