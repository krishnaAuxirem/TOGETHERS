import { Link } from 'react-router-dom';
import { DollarSign, TrendingUp, Users, Star, ArrowRight } from 'lucide-react';
import creatorVisual from '@/assets/creator-visual.jpg';
import SectionHeader from '@/components/ui-custom/SectionHeader';

const STATS = [
  { value: '₹10Cr+', label: 'Total Creator Earnings', icon: DollarSign, color: 'text-coral-500', bg: 'bg-coral-50' },
  { value: '12,000+', label: 'Active Creators', icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { value: '340%', label: 'Avg Revenue Growth', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { value: '92%', label: 'Creator Satisfaction', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
];

const EARNING_STREAMS = [
  { emoji: '🎟️', title: 'Premium Events', desc: 'Host paid events and workshops for your audience', amount: '₹5K–₹50K per event' },
  { emoji: '👥', title: 'Premium Communities', desc: 'Charge monthly subscriptions for exclusive access', amount: '₹199–₹2,999/month' },
  { emoji: '📦', title: 'Digital Products', desc: 'Sell courses, templates, and digital downloads', amount: '₹999–₹29,999 one-time' },
  { emoji: '💝', title: 'Supporter Tips', desc: 'Receive direct support from your biggest fans', amount: 'Unlimited' },
];

export default function CreatorEconomySection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="💰 Creator Economy"
          title="Turn Your Passion into "
          highlight="Profit"
          subtitle="Join 12,000+ creators earning real income through communities, events, and exclusive content."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {STATS.map(stat => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="glass-card rounded-2xl p-5 hover-lift">
                    <div className={`${stat.bg} ${stat.color} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
                      <Icon size={18} />
                    </div>
                    <p className="text-2xl font-black text-gray-900 mb-1">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-5">4 Ways to Earn on TOGETHERS</h3>
            <div className="space-y-3">
              {EARNING_STREAMS.map(stream => (
                <div key={stream.title} className="flex items-start gap-4 p-4 bg-gray-50 hover:bg-coral-50 rounded-2xl transition-all group cursor-pointer">
                  <span className="text-2xl flex-shrink-0">{stream.emoji}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 group-hover:text-coral-700 text-sm">{stream.title}</p>
                    <p className="text-xs text-gray-500">{stream.desc}</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg whitespace-nowrap">{stream.amount}</span>
                </div>
              ))}
            </div>

            <Link to="/creators" className="inline-flex items-center gap-2 mt-8 px-8 py-4 gradient-primary text-white font-bold rounded-2xl hover-lift shadow-coral group">
              Become a Creator
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="relative">
            <img src={creatorVisual} alt="Creator Economy" className="rounded-3xl shadow-2xl w-full object-cover" />
            <div className="absolute -bottom-6 -left-6 glass-card rounded-2xl p-4 shadow-xl border border-white/60">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img src="https://i.pravatar.cc/150?img=12" alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Arjun Mehta</p>
                  <p className="text-emerald-600 font-bold text-sm">₹2.8L earned last month</p>
                  <p className="text-xs text-gray-500">Creator Pro · Verified ✓</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
