import { useState } from 'react';
import { DollarSign, TrendingUp, CreditCard, ArrowUpRight, Star, Users, Wallet, Plus, Clock } from 'lucide-react';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';

const REVENUE_DATA = [
  { month: 'Jan', revenue: 45000, subscriptions: 28000, events: 17000 },
  { month: 'Feb', revenue: 67000, subscriptions: 42000, events: 25000 },
  { month: 'Mar', revenue: 89000, subscriptions: 55000, events: 34000 },
  { month: 'Apr', revenue: 112000, subscriptions: 71000, events: 41000 },
  { month: 'May', revenue: 158000, subscriptions: 98000, events: 60000 },
  { month: 'Jun', revenue: 210000, subscriptions: 134000, events: 76000 },
];

const TRANSACTIONS = [
  { id: 'TXN001', type: 'Subscription', desc: 'Pro Member — Arjun Mehta', amount: 799, date: '2 hours ago', status: 'success' },
  { id: 'TXN002', type: 'Event Ticket', desc: 'React Masterclass — Priya S.', amount: 999, date: '5 hours ago', status: 'success' },
  { id: 'TXN003', type: 'Subscription', desc: 'Pro Member — Vikram R.', amount: 799, date: '1 day ago', status: 'success' },
  { id: 'TXN004', type: 'Event Ticket', desc: 'Tech Bootcamp — Meera N.', amount: 2499, date: '1 day ago', status: 'success' },
  { id: 'TXN005', type: 'Payout', desc: 'Weekly payout to HDFC Bank', amount: -85000, date: '3 days ago', status: 'paid' },
  { id: 'TXN006', type: 'Subscription', desc: 'Pro Member — Sneha P.', amount: 799, date: '4 days ago', status: 'success' },
];

const MEMBERSHIP_TIERS = [
  { name: 'Supporter', price: 199, members: 320, perks: ['Early access', 'Discord channel', 'Monthly Q&A'] },
  { name: 'Pro Member', price: 799, members: 420, perks: ['All Supporter perks', 'Exclusive workshops', 'Resource library', '1-on-1 session/month'] },
  { name: 'VIP', price: 2499, members: 100, perks: ['All Pro perks', 'Weekly mentoring', 'Co-creator credits', 'Priority support'] },
];

export default function CreatorMonetization() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'memberships'>('overview');

  if (!isAuthenticated || user?.role !== 'creator') return <Navigate to="/login" replace />;

  const totalRevenue = REVENUE_DATA.reduce((s, d) => s + d.revenue, 0);
  const pendingPayout = 85000;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Monetization</h1>
              <p className="text-gray-500 mt-1">Track your earnings, payouts, and memberships.</p>
            </div>
            <button
              onClick={() => toast.success('Withdrawal initiated! Funds reach your bank in 2-3 days.')}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-all hover-lift text-sm"
            >
              <Wallet size={16} /> Withdraw ₹{(pendingPayout / 1000).toFixed(0)}K
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Earned', value: `₹${(totalRevenue / 1000).toFixed(0)}K`, sub: 'Lifetime', icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-50' },
              { label: 'This Month', value: '₹2.1L', sub: '+24% vs last', icon: TrendingUp, color: 'text-coral-500', bg: 'bg-coral-50' },
              { label: 'Paid Members', value: '840', sub: 'Active subscriptions', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
              { label: 'Pending Payout', value: `₹${(pendingPayout / 1000).toFixed(0)}K`, sub: 'Available', icon: CreditCard, color: 'text-indigo-500', bg: 'bg-indigo-50' },
            ].map(card => {
              const Icon = card.icon;
              return (
                <div key={card.label} className="glass-card rounded-2xl p-5 border border-gray-100">
                  <div className={`w-10 h-10 ${card.bg} rounded-xl flex items-center justify-center mb-3`}>
                    <Icon size={18} className={card.color} />
                  </div>
                  <p className="text-xl font-bold text-gray-900">{card.value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{card.label}</p>
                  <p className="text-xs text-gray-300 mt-0.5">{card.sub}</p>
                </div>
              );
            })}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {(['overview', 'transactions', 'memberships'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${activeTab === tab ? 'bg-coral-500 text-white shadow-coral' : 'bg-white text-gray-600 border border-gray-200 hover:border-coral-300'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="glass-card rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900">Revenue Breakdown</h2>
                <span className="text-xs bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full font-semibold">Last 6 months</span>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={REVENUE_DATA}>
                  <defs>
                    <linearGradient id="colorSubs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F97316" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorEvts" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} tickFormatter={v => `₹${(v / 1000).toFixed(0)}K`} />
                  <Tooltip formatter={(v: number, name: string) => [`₹${(v / 1000).toFixed(1)}K`, name === 'subscriptions' ? 'Subscriptions' : 'Events']} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }} />
                  <Area type="monotone" dataKey="subscriptions" stroke="#F97316" strokeWidth={2} fill="url(#colorSubs)" name="subscriptions" />
                  <Area type="monotone" dataKey="events" stroke="#4F46E5" strokeWidth={2} fill="url(#colorEvts)" name="events" />
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-coral-500" />
                  <span className="text-gray-600">Subscriptions</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-indigo-600" />
                  <span className="text-gray-600">Events</span>
                </div>
              </div>
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div className="glass-card rounded-2xl border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">Recent Transactions</h2>
              </div>
              <div className="divide-y divide-gray-50">
                {TRANSACTIONS.map(txn => (
                  <div key={txn.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${txn.amount > 0 ? 'bg-emerald-50' : 'bg-indigo-50'}`}>
                      {txn.amount > 0 ? <ArrowUpRight size={16} className="text-emerald-500" /> : <CreditCard size={16} className="text-indigo-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm">{txn.desc}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                        <span className="bg-gray-100 px-2 py-0.5 rounded-full">{txn.type}</span>
                        <Clock size={10} />
                        <span>{txn.date}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className={`font-bold text-sm ${txn.amount > 0 ? 'text-emerald-600' : 'text-indigo-600'}`}>
                        {txn.amount > 0 ? '+' : ''}₹{Math.abs(txn.amount).toLocaleString()}
                      </p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${txn.status === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'}`}>
                        {txn.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Memberships Tab */}
          {activeTab === 'memberships' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">Manage your membership tiers and pricing.</p>
                <button onClick={() => toast.success('New tier creation opened!')} className="flex items-center gap-2 px-4 py-2 bg-coral-500 hover:bg-coral-600 text-white font-semibold rounded-xl transition-all text-sm">
                  <Plus size={14} /> New Tier
                </button>
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                {MEMBERSHIP_TIERS.map((tier, i) => (
                  <div key={tier.name} className={`glass-card rounded-2xl p-6 border transition-all hover-lift ${i === 1 ? 'border-coral-300 ring-2 ring-coral-100' : 'border-gray-100'}`}>
                    {i === 1 && <div className="text-xs font-bold text-coral-600 bg-coral-50 px-3 py-1 rounded-full inline-block mb-3">Most Popular</div>}
                    <h3 className="font-bold text-gray-900 text-lg">{tier.name}</h3>
                    <div className="flex items-baseline gap-1 my-2">
                      <span className="text-3xl font-black text-coral-600">₹{tier.price}</span>
                      <span className="text-gray-400 text-sm">/mo</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
                      <Users size={13} />
                      <span><strong className="text-gray-900">{tier.members}</strong> active members</span>
                    </div>
                    <ul className="space-y-2 mb-5">
                      {tier.perks.map(perk => (
                        <li key={perk} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-4 h-4 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                          </div>
                          {perk}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => toast.success(`Editing ${tier.name} tier...`)}
                      className="w-full py-2.5 border border-gray-200 hover:border-coral-400 hover:text-coral-600 text-gray-600 font-semibold rounded-xl transition-all text-sm"
                    >
                      Edit Tier
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
