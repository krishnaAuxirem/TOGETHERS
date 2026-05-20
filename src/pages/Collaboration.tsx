import { Link } from 'react-router-dom';
import { Zap, Users, FileText, Calendar, MessageSquare, Video, Lock, Globe, ArrowRight, CheckCircle, Building2, Briefcase } from 'lucide-react';
import PageTransition from '@/components/ui-custom/PageTransition';
import SectionHeader from '@/components/ui-custom/SectionHeader';
import communityVisual from '@/assets/community-visual.jpg';
import collaborBg from '@/assets/collab-bg.jpg';

const FEATURES = [
  { icon: FileText, title: 'Shared Documents', desc: 'Real-time collaborative editing with version history', color: 'text-blue-500', bg: 'bg-blue-50' },
  { icon: CheckCircle, title: 'Task Boards', desc: 'Kanban-style task management for your team', color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { icon: Calendar, title: 'Shared Calendars', desc: 'Sync team schedules and event planning', color: 'text-coral-500', bg: 'bg-coral-50' },
  { icon: MessageSquare, title: 'Group Chat', desc: 'Organized threads and channels for your workspace', color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { icon: Video, title: 'Video Rooms', desc: 'HD video meetings with screen sharing and recording', color: 'text-pink-500', bg: 'bg-pink-50' },
  { icon: Lock, title: 'Private Spaces', desc: 'Secure, encrypted workspaces for sensitive projects', color: 'text-amber-500', bg: 'bg-amber-50' },
];

const SPACE_TYPES = [
  { title: 'Team Workspace', desc: 'For companies and remote teams', members: '2-500', Icon: Building2, color: 'gradient-primary' },
  { title: 'Community Hub', desc: 'For communities and interest groups', members: '10-10,000', Icon: Globe, color: 'gradient-secondary' },
  { title: 'Family Circle', desc: 'Private family group space', members: '2-50', Icon: Users, color: 'from-emerald-500 to-teal-600' },
  { title: 'Project Room', desc: 'Time-limited project collaboration', members: '2-100', Icon: Briefcase, color: 'from-pink-500 to-rose-600' },
];

export default function Collaboration() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-white pt-20">
        {/* Hero */}
        <div className="gradient-hero py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 right-20 w-80 h-80 bg-coral-400 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 left-20 w-80 h-80 bg-indigo-400 rounded-full blur-3xl animate-float-delayed" />
          </div>
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium mb-6 border border-white/20">Collaboration Spaces</span>
            <h1 className="text-6xl font-black mb-6" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              Where Great Teams<br /><span className="text-coral-300">Build Great Things</span>
            </h1>
            <p className="text-white/70 text-xl mb-10 max-w-2xl mx-auto">
              Create powerful collaboration spaces for your team, community, or project. Work together seamlessly, anywhere in India and beyond.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/register" className="px-10 py-4 bg-coral-500 hover:bg-coral-600 text-white font-bold rounded-2xl transition-all hover-lift shadow-coral">
                Create Your Space Free
              </Link>
              <Link to="/pricing" className="px-10 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold rounded-2xl border border-white/20 transition-all">
                View Pricing
              </Link>
            </div>
          </div>
        </div>

        {/* Features */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader badge="Features" title="Everything You Need to " highlight="Collaborate" subtitle="Powerful tools that grow with your team." />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map(f => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="glass-card rounded-2xl p-6 hover-lift group">
                    <div className={`${f.bg} ${f.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon size={22} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                    <p className="text-sm text-gray-500">{f.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Space Types */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader badge="Space Types" title="Choose Your " highlight="Workspace Type" subtitle="Spaces designed for every collaboration need." />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SPACE_TYPES.map(space => {
                const SpaceIcon = space.Icon;
                return (
                  <div key={space.title} className="group cursor-pointer">
                    <div className={`h-32 bg-gradient-to-br ${space.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-lg`}>
                      <SpaceIcon size={40} className="text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-coral-600 transition-colors">{space.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{space.desc}</p>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full"><Users size={10} className="inline mr-1" />{space.members} members</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Visual CTA */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <img src={communityVisual} alt="Collaboration" className="rounded-3xl shadow-2xl w-full object-cover" />
              <div>
                <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 text-sm font-semibold rounded-full mb-4 border border-indigo-100">Why TOGETHERS Spaces?</span>
                <h2 className="text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Plus Jakarta Sans' }}>Built for the Way <span className="text-gradient">Indians Work</span></h2>
                <ul className="space-y-4 mb-8">
                  {[
                    'Works perfectly on low-bandwidth connections',
                    'Hindi and regional language support (coming soon)',
                    'Indian pricing with INR payments',
                    'Data stored on India-based servers',
                    'WhatsApp-style familiar messaging interface',
                    '24/7 support in Indian time zones',
                  ].map(point => (
                    <li key={point} className="flex items-center gap-3 text-gray-700">
                      <div className="w-5 h-5 bg-coral-100 text-coral-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle size={12} />
                      </div>
                      {point}
                    </li>
                  ))}
                </ul>
                <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all hover-lift group">
                  Start Collaborating Free
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
