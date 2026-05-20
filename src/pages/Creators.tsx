import { Link } from 'react-router-dom';
import { ArrowRight, DollarSign, TrendingUp, Users, Star, Play, CheckCircle } from 'lucide-react';
import PageTransition from '@/components/ui-custom/PageTransition';
import SectionHeader from '@/components/ui-custom/SectionHeader';
import creatorVisual from '@/assets/creator-visual.jpg';

const TOP_CREATORS = [
  { name: 'Arjun Mehta', niche: 'Tech & Startups', followers: '45.2K', earning: 'Rs.2.8L/mo', avatar: 'https://i.pravatar.cc/150?img=12' },
  { name: 'Meera Nair', niche: 'Lifestyle & Travel', followers: '38.9K', earning: 'Rs.1.9L/mo', avatar: 'https://i.pravatar.cc/150?img=35' },
  { name: 'Vikram Reddy', niche: 'Finance & Investing', followers: '62.1K', earning: 'Rs.4.2L/mo', avatar: 'https://i.pravatar.cc/150?img=22' },
  { name: 'Anjali Gupta', niche: 'Fitness & Wellness', followers: '29.4K', earning: 'Rs.1.2L/mo', avatar: 'https://i.pravatar.cc/150?img=41' },
  { name: 'Rithvik Sharma', niche: 'Gaming & Esports', followers: '89.3K', earning: 'Rs.6.1L/mo', avatar: 'https://i.pravatar.cc/150?img=17' },
  { name: 'Priya Iyer', niche: 'Education & Learning', followers: '51.7K', earning: 'Rs.3.4L/mo', avatar: 'https://i.pravatar.cc/150?img=44' },
];

const JOURNEY_STEPS = [
  { step: '01', title: 'Build Your Profile', desc: 'Create your creator profile, verify your identity, and showcase your niche and expertise.' },
  { step: '02', title: 'Grow Your Audience', desc: 'Use AI recommendations to reach the right audience. Get discovered through trending communities.' },
  { step: '03', title: 'Create Premium Content', desc: 'Launch premium communities, host paid events, sell digital products, and receive tips.' },
  { step: '04', title: 'Earn & Scale', desc: 'Get paid directly to your Indian bank account. Analytics to track and grow your revenue.' },
];

export default function Creators() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-white pt-20">
        {/* Hero */}
        <div className="gradient-hero py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 right-1/4 w-80 h-80 bg-coral-400 rounded-full blur-3xl animate-float" />
          </div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium mb-6 border border-white/20">Creator Program</span>
                <h1 className="text-6xl font-black mb-6" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                  Build. Grow.<br /><span className="text-coral-300">Monetize.</span>
                </h1>
                <p className="text-white/70 text-xl mb-8">Join 12,000+ creators earning Rs.10Cr+ monthly. Turn your passion into a thriving business on India's fastest-growing creator platform.</p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/register" className="flex items-center gap-2 px-8 py-4 bg-coral-500 hover:bg-coral-600 text-white font-bold rounded-2xl transition-all hover-lift shadow-coral">
                    Start Creating Today
                    <ArrowRight size={18} />
                  </Link>
                  <button className="flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/20 transition-all">
                    <Play size={18} fill="white" /> Watch Stories
                  </button>
                </div>
              </div>
              <div className="hidden lg:block">
                <img src={creatorVisual} alt="Creator Economy" className="rounded-3xl shadow-2xl w-full object-cover h-80" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: 'Rs.10Cr+', label: 'Total Paid to Creators', icon: DollarSign, color: 'coral' },
                { value: '12,000+', label: 'Active Creators', icon: Users, color: 'indigo' },
                { value: '340%', label: 'Avg Revenue Growth', icon: TrendingUp, color: 'emerald' },
                { value: '4.9/5', label: 'Creator Satisfaction', icon: Star, color: 'amber' },
              ].map(stat => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center glass-card rounded-2xl p-6 hover-lift">
                    <div className={`w-12 h-12 bg-${stat.color}-50 text-${stat.color}-500 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                      <Icon size={22} />
                    </div>
                    <p className="text-3xl font-black text-gray-900 mb-1">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Creator Journey */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader badge="Creator Journey" title="Your Path to " highlight="Creator Success" subtitle="Four simple steps from zero to thriving creator." />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {JOURNEY_STEPS.map((step, idx) => (
                <div key={step.step} className="glass-card rounded-2xl p-6 hover-lift relative overflow-hidden group">
                  <div className="text-6xl font-black text-gray-100 absolute -top-2 -right-2 group-hover:text-coral-100 transition-colors">{step.step}</div>
                  <div className="relative">
                    <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center mb-4">
                      <span className="text-white font-bold text-sm">{idx + 1}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Top Creators */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader badge="Top Creators" title="Meet Our " highlight="Star Creators" subtitle="Real creators, real earnings, real impact." />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TOP_CREATORS.map(creator => (
                <div key={creator.name} className="glass-card rounded-3xl p-6 hover-lift group border border-gray-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <img src={creator.avatar} alt={creator.name} className="w-14 h-14 rounded-2xl object-cover" />
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-coral-500 rounded-full flex items-center justify-center">
                        <CheckCircle size={11} className="text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-coral-600 transition-colors">{creator.name}</h3>
                      <p className="text-sm text-gray-500">{creator.niche}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                      <p className="font-bold text-gray-900 text-sm">{creator.followers}</p>
                      <p className="text-xs text-gray-500">Followers</p>
                    </div>
                    <div className="bg-coral-50 rounded-xl p-3 text-center">
                      <p className="font-bold text-coral-600 text-sm">{creator.earning}</p>
                      <p className="text-xs text-gray-500">Monthly Earn</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 gradient-hero">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-5xl font-black mb-6" style={{ fontFamily: 'Plus Jakarta Sans' }}>Ready to Start Earning?</h2>
            <p className="text-white/70 text-xl mb-10">Join thousands of creators already earning on TOGETHERS. Apply for Creator Pro and start your journey today.</p>
            <Link to="/register" className="inline-flex items-center gap-2 px-12 py-5 bg-coral-500 hover:bg-coral-600 text-white font-black text-lg rounded-2xl transition-all hover-lift shadow-coral group">
              Apply for Creator Pro
              <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
