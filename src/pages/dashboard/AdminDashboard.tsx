import { useEffect, useState } from 'react';
import { Users, ShieldCheck, BarChart2, BookOpen, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import StatCard from '@/components/ui-custom/StatCard';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ANALYTICS_DATA } from '@/data/mockData';
import { toast } from 'sonner';

const RECENT_USERS = [
  { name: 'Arjun Mehta', email: 'arjun@email.com', role: 'creator', status: 'active', joined: '2 hours ago', avatar: 'https://i.pravatar.cc/150?img=12' },
  { name: 'Meera Nair', email: 'meera@email.com', role: 'user', status: 'active', joined: '5 hours ago', avatar: 'https://i.pravatar.cc/150?img=35' },
  { name: 'Vikram Reddy', email: 'vikram@email.com', role: 'organizer', status: 'pending', joined: '1 day ago', avatar: 'https://i.pravatar.cc/150?img=22' },
  { name: 'Anjali Gupta', email: 'anjali@email.com', role: 'creator', status: 'active', joined: '2 days ago', avatar: 'https://i.pravatar.cc/150?img=41' },
];

const ROLE_COLORS: Record<string, string> = {
  admin: 'bg-red-100 text-red-700',
  creator: 'bg-coral-100 text-coral-700',
  organizer: 'bg-indigo-100 text-indigo-700',
  user: 'bg-blue-100 text-blue-700',
  team: 'bg-emerald-100 text-emerald-700',
};

const PIE_COLORS = ['#F97316', '#4F46E5', '#10B981', '#F59E0B', '#6B7280'];

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (!isAuthenticated || user?.role !== 'admin') return <Navigate to="/login" replace />;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">Full platform overview and management controls.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <StatCard title="Total Users" value="1.2M" change="+18%" positive icon={<Users size={20} />} color="text-coral-500" bg="bg-coral-50" />
            <StatCard title="Communities" value="52,400" change="+34%" positive icon={<BarChart2 size={20} />} color="text-indigo-500" bg="bg-indigo-50" />
            <StatCard title="Creator Revenue" value="₹10.2Cr" change="+67%" positive icon={<DollarSign size={20} />} color="text-emerald-500" bg="bg-emerald-50" />
            <StatCard title="Reports Pending" value="23" change="-5" positive={false} icon={<AlertTriangle size={20} />} color="text-amber-500" bg="bg-amber-50" />
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {/* Growth Chart */}
            <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900">Platform Growth</h2>
                <span className="text-xs bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full font-semibold">↑ 34% this month</span>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={ANALYTICS_DATA.monthlyGrowth}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F97316" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }} />
                  <Area type="monotone" dataKey="users" stroke="#F97316" strokeWidth={2} fill="url(#colorRevenue)" name="Users" />
                  <Area type="monotone" dataKey="communities" stroke="#4F46E5" strokeWidth={2} fill="none" name="Communities" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Category Breakdown */}
            <div className="glass-card rounded-2xl p-6 border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-4">Community Categories</h2>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={ANALYTICS_DATA.topCategories} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value">
                    {ANALYTICS_DATA.topCategories.map((_, index) => (
                      <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {ANALYTICS_DATA.topCategories.map((cat, i) => (
                  <div key={cat.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: PIE_COLORS[i] }} />
                      <span className="text-gray-600">{cat.name}</span>
                    </div>
                    <span className="font-semibold text-gray-800">{cat.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Users Table */}
          <div className="glass-card rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-gray-900">Recent Registrations</h2>
              <button className="text-sm text-coral-500 hover:text-coral-600 font-medium">View All Users →</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">User</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">Role</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">Status</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">Joined</th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {RECENT_USERS.map(u => (
                    <tr key={u.email} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-full object-cover" />
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{u.name}</p>
                            <p className="text-xs text-gray-400">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${ROLE_COLORS[u.role]}`}>{u.role}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${u.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{u.joined}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button onClick={() => toast.success(`${u.name} approved!`)} className="text-xs px-3 py-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white rounded-lg transition-all font-medium">Approve</button>
                          <button onClick={() => toast.error(`${u.name} suspended`)} className="text-xs px-3 py-1.5 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all font-medium">Suspend</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
