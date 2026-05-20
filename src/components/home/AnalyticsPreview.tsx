import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ANALYTICS_DATA } from '@/data/mockData';
import SectionHeader from '@/components/ui-custom/SectionHeader';
import dashboardPreview from '@/assets/dashboard-preview.jpg';

export default function AnalyticsPreview() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="📊 Analytics"
          title="Real-Time Insights at "
          highlight="Your Fingertips"
          subtitle="Track growth, engagement, and revenue with beautiful, actionable analytics dashboards."
        />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Weekly Engagement Chart */}
          <div className="glass-card rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-gray-900">Weekly Engagement</h3>
                <p className="text-sm text-gray-500">Users vs Engagement this week</p>
              </div>
              <span className="text-xs bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full font-semibold">↑ 24% vs last week</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={ANALYTICS_DATA.weeklyUsers}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="users" stroke="#F97316" strokeWidth={2} fill="url(#colorUsers)" name="Users" />
                <Area type="monotone" dataKey="engagement" stroke="#4F46E5" strokeWidth={2} fill="url(#colorEngagement)" name="Engagement" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Growth Chart */}
          <div className="glass-card rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-gray-900">Platform Growth</h3>
                <p className="text-sm text-gray-500">Users and communities growth</p>
              </div>
              <span className="text-xs bg-coral-50 text-coral-600 px-3 py-1 rounded-full font-semibold">2025 YTD</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={ANALYTICS_DATA.monthlyGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="communities" fill="#F97316" radius={[4, 4, 0, 0]} name="Communities" />
                <Bar dataKey="users" fill="#4F46E5" radius={[4, 4, 0, 0]} name="Users (÷100)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { label: 'Total Members', value: '1.2M+', change: '+18%', color: 'coral' },
            { label: 'Active Communities', value: '52,400', change: '+34%', color: 'indigo' },
            { label: 'Monthly Events', value: '8,900', change: '+42%', color: 'emerald' },
            { label: 'Creator Revenue', value: '₹10.2Cr', change: '+67%', color: 'amber' },
          ].map(stat => (
            <div key={stat.label} className="glass-card rounded-2xl p-5 text-center hover-lift">
              <p className="text-3xl font-black text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500 mb-2">{stat.label}</p>
              <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">{stat.change} this quarter</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
