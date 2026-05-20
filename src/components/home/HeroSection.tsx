import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Users, Globe, Zap, Star, Rocket, DollarSign, Award, Calendar } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

const STATS = [
  { value: '1M+', label: 'Community Members' },
  { value: '50K+', label: 'Active Communities' },
  { value: '12K+', label: 'Daily Events' },
  { value: '₹10Cr+', label: 'Creator Earnings' },
];

const FLOATING_CARDS = [
  { Icon: Rocket, text: 'New community created', sub: 'Bangalore Tech Hub', color: 'from-coral-400 to-orange-500' },
  { Icon: DollarSign, text: 'Revenue milestone hit', sub: '₹1L earned today!', color: 'from-emerald-400 to-teal-500' },
  { Icon: Award, text: 'Top creator of the week', sub: '@arjun.mehta', color: 'from-indigo-400 to-violet-500' },
  { Icon: Calendar, text: 'Event sold out!', sub: 'Tech Summit 2025', color: 'from-pink-400 to-rose-500' },
];

const MINI_STATS = [
  { label: 'Members', Icon: Users, color: 'from-coral-500 to-orange-500' },
  { label: 'Communities', Icon: Globe, color: 'from-indigo-500 to-violet-500' },
  { label: 'Events Today', Icon: Zap, color: 'from-emerald-500 to-teal-500' },
];

export default function HeroSection() {
  const [count, setCount] = useState({ members: 0, communities: 0, events: 0 });
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCard(i => (i + 1) % FLOATING_CARDS.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const targets = { members: 1000000, communities: 50000, events: 12000 };
    const duration = 2000;
    const steps = 60;
    const increment = { members: targets.members / steps, communities: targets.communities / steps, events: targets.events / steps };
    let step = 0;
    const timer = setInterval(() => {
      step++;
      if (step >= steps) {
        setCount(targets);
        clearInterval(timer);
      } else {
        setCount({
          members: Math.floor(increment.members * step),
          communities: Math.floor(increment.communities * step),
          events: Math.floor(increment.events * step),
        });
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, []);

  const formatCount = (n: number) => {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M+';
    if (n >= 1000) return (n / 1000).toFixed(0) + 'K+';
    return n.toString();
  };

  const miniValues = [formatCount(count.members), formatCount(count.communities), formatCount(count.events)];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      <div
        className="absolute inset-0 opacity-30 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-950/40" />

      {/* Animated orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-coral-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-float-delayed" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping-slow" />
                <span className="text-sm font-medium text-white/90">India's #1 Social Platform</span>
              </div>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black leading-tight mb-6" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Where{' '}
              <span className="relative">
                <span className="bg-gradient-to-r from-coral-300 to-orange-300 bg-clip-text text-transparent">Communities</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 10 Q75 2 150 6 Q225 10 298 4" stroke="#F97316" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
              {' '}Thrive
            </h1>

            <p className="text-xl text-white/75 mb-8 leading-relaxed max-w-lg">
              Connect with passionate communities, collaborate with creators, attend life-changing events, and build something extraordinary — <span className="text-coral-300 font-semibold">TOGETHER</span>.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link to="/register" className="flex items-center gap-2 px-8 py-4 bg-coral-500 hover:bg-coral-600 text-white font-bold rounded-2xl transition-all hover-lift shadow-coral text-lg group">
                Join Free Today
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/communities" className="flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold rounded-2xl border border-white/20 transition-all text-lg">
                <Play size={18} fill="white" />
                Explore Communities
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/150?img=${i * 7}`} alt="" className="w-10 h-10 rounded-full border-2 border-white/50 object-cover" />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-amber-400" fill="#F59E0B" />)}
                </div>
                <p className="text-sm text-white/70 mt-0.5">Loved by <strong className="text-white">1M+ users</strong></p>
              </div>
            </div>
          </div>

          {/* Right — Visual */}
          <div className="relative hidden lg:block">
            {/* Main dashboard card */}
            <div className="glass rounded-3xl p-6 shadow-2xl border border-white/20 animate-float">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="flex-1 bg-white/10 rounded-lg h-7 flex items-center px-3">
                  <Globe size={12} className="text-white/60 mr-2" />
                  <span className="text-xs text-white/60">togethers.in/dashboard</span>
                </div>
              </div>

              {/* Mini stats */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {MINI_STATS.map((stat, idx) => (
                  <div key={stat.label} className={`bg-gradient-to-br ${stat.color} rounded-xl p-3 text-white text-center`}>
                    <div className="flex items-center justify-center mb-1"><stat.Icon size={18} /></div>
                    <div className="font-bold text-lg leading-tight">{miniValues[idx]}</div>
                    <div className="text-xs opacity-80">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Activity feed */}
              <div className="space-y-2">
                {[
                  { user: 'Arjun M.', action: 'joined Bangalore Tech Hub', time: '2m ago', avatar: 'https://i.pravatar.cc/150?img=12' },
                  { user: 'Priya S.', action: 'created a new event', time: '5m ago', avatar: 'https://i.pravatar.cc/150?img=47' },
                  { user: 'Ravi K.', action: 'earned Creator badge', time: '8m ago', avatar: 'https://i.pravatar.cc/150?img=33' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/10 rounded-xl p-2.5">
                    <img src={item.avatar} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white/90"><strong>{item.user}</strong> {item.action}</p>
                    </div>
                    <span className="text-xs text-white/50 flex-shrink-0">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating notification cards */}
            {FLOATING_CARDS.map((card, i) => (
              <div
                key={i}
                className={`absolute transition-all duration-500 ${i === activeCard ? 'opacity-100 scale-100' : 'opacity-0 scale-90'} ${
                  i === 0 ? '-top-8 -left-12' :
                  i === 1 ? '-bottom-4 -left-8' :
                  i === 2 ? 'top-1/3 -right-12' :
                  '-bottom-8 right-4'
                }`}
              >
                <div className={`glass-dark bg-gradient-to-br ${card.color} rounded-2xl p-3 shadow-xl border border-white/20`}>
                  <div className="flex items-center gap-2">
                    <card.Icon size={20} className="text-white flex-shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-white">{card.text}</p>
                      <p className="text-xs text-white/70">{card.sub}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom stats bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/5 backdrop-blur-md border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map(s => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-black text-white">{s.value}</p>
                <p className="text-xs text-white/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
