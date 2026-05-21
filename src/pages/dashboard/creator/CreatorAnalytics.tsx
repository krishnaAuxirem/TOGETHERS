import { BarChart2, TrendingUp, Users, Eye, Heart, Share2, ArrowUp, ArrowDown } from 'lucide-react';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';

const GROWTH_DATA = [
  { month: 'Jan', followers: 12000, views: 45000, engagement: 6.2 },
  { month: 'Feb', followers: 16800, views: 62000, engagement: 7.1 },
  { month: 'Mar', followers: 22400, views: 78000, engagement: 7.8 },
  { month: 'Apr', followers: 28900, views: 95000, engagement: 8.0 },
  { month: 'May', followers: 36500, views: 118000, engagement: 8.4 },
  { month: 'Jun', followers: 45200, views: 142000, engagement: 8.7 },
];

const CONTENT_DATA = [
  { type: 'Long Videos', views: 62000, likes: 4800, shares: 1200 },
  { type: 'Short Reels', views: 48000, likes: 7200, shares: 3400 },
  { type: 'Live Sessions', views: 18000, likes: 2100, shares: 560 },
  { type: 'Articles', views: 9200, likes: 980, shares: 310 },
  { type: 'Workshops', views: 5000, likes: 620, shares: 180 },
];

const DEMOGRAPHICS = [
  { name: '18–24', value: 32 },
  { name: '25–34', value: 41 },
  { name: '35–44', value: 18 },
  { name: '45+', value: 9 },
];

const PIE_COLORS = ['#F97316', '#4F46E5', '#10B981', '#F59E0B'];

const TOP_LOCATIONS = [
  { city: 'Mumbai', percent: 28 },
  { city: 'Bengaluru', percent: 22 },
  { city: 'Delhi NCR', percent: 18 },
  { city: 'Hyderabad', percent: 12 },
  { city: 'Pune', percent: 9 },
  { city: 'Others', percent: 11 },
];

const METRIC_CARDS = [
  { label: 'Total Followers', value: '45.2K', change: '+18%', up: true, icon: Users, color: 'text-coral-500', bg: 'bg-coral-50' },
  { label: 'Monthly Views', value: '142K', change: '+23%', up: true, icon: Eye, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { label: 'Avg. Engagement', value: '8.7%', change: '+0.3%', up: true, icon: Heart, color: 'text-pink-500', bg: 'bg-pink-50' },
  { label: 'Share Rate', value: '3.4%', change: '-0.1%', up: false, icon: Share2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
];

export default function CreatorAnalytics() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || user?.role !== 'creator') return <Navigate to="/login" replace />;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Audience Analytics</h1>
            <p className="text-gray-500 mt-1">Deep insights into your followers, content performance, and growth.</p>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {METRIC_CARDS.map(card => {
              const Icon = card.icon;
              return (
                <div key={card.label} className="glass-card rounded-2xl p-5 border border-gray-100">
                  <div className={`w-10 h-10 ${card.bg} rounded-xl flex items-center justify-center mb-3`}>
                    <Icon size={18} className={card.color} />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    {card.up ? <ArrowUp size={12} className="text-emerald-500" /> : <ArrowDown size={12} className="text-red-400" />}
                    <span className={`text-xs font-semibold ${card.up ? 'text-emerald-600' : 'text-red-500'}`}>{card.change}</span>
                    <span className="text-xs text-gray-400">this month</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{card.label}</p>
                </div>
              );
            })}
          </div>

          {/* Follower Growth */}
          <div className="glass-card rounded-2xl p-6 border border-gray-100 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">Follower & View Growth</h2>
              <span className="text-xs bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full font-semibold">Last 6 months</span>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={GROWTH_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                <YAxis yAxisId="left" tick={{ fontSize: 12, fill: '#9CA3AF' }} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: '#9CA3AF' }} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }} formatter={(v: number) => [`${(v / 1000).toFixed(1)}K`]} />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="followers" stroke="#F97316" strokeWidth={2.5} dot={false} name="Followers" />
                <Line yAxisId="right" type="monotone" dataKey="views" stroke="#4F46E5" strokeWidth={2.5} dot={false} name="Views" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {/* Content Performance */}
            <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-4">Content Type Performance</h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={CONTENT_DATA} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11, fill: '#9CA3AF' }} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
                  <YAxis type="category" dataKey="type" tick={{ fontSize: 11, fill: '#6B7280' }} width={80} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }} formatter={(v: number) => [`${(v / 1000).toFixed(1)}K`]} />
                  <Bar dataKey="views" fill="#F97316" radius={[0, 4, 4, 0]} name="Views" />
                  <Bar dataKey="likes" fill="#4F46E5" radius={[0, 4, 4, 0]} name="Likes" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Age Demographics */}
            <div className="glass-card rounded-2xl p-6 border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-4">Age Demographics</h2>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={DEMOGRAPHICS} cx="50%" cy="50%" innerRadius={40} outerRadius={68} dataKey="value">
                    {DEMOGRAPHICS.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                  </Pie>
                  <Tooltip formatter={(v: number) => [`${v}%`]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {DEMOGRAPHICS.map((d, i) => (
                  <div key={d.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[i] }} />
                      <span className="text-gray-600">{d.name}</span>
                    </div>
                    <span className="font-semibold text-gray-800">{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Locations */}
          <div className="glass-card rounded-2xl p-6 border border-gray-100">
            <h2 className="font-bold text-gray-900 mb-5">Top Audience Locations</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {TOP_LOCATIONS.map((loc, i) => (
                <div key={loc.city} className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-400 w-5 text-right">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-800">{loc.city}</span>
                      <span className="text-sm font-bold text-coral-600">{loc.percent}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full gradient-primary rounded-full" style={{ width: `${loc.percent}%` }} />
                    </div>
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
