import { lazy, Suspense } from 'react';
import PageTransition from '@/components/ui-custom/PageTransition';
import HeroSection from '@/components/home/HeroSection';
import CommunityHighlights from '@/components/home/CommunityHighlights';
import EventsSection from '@/components/home/EventsSection';
import GamificationSection from '@/components/home/GamificationSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PricingSection from '@/components/home/PricingSection';
import FAQSection from '@/components/home/FAQSection';
import CreatorEconomySection from '@/components/home/CreatorEconomySection';
import AnalyticsPreview from '@/components/home/AnalyticsPreview';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Globe, Users } from 'lucide-react';
import communityVisual from '@/assets/community-visual.jpg';
import collaborBg from '@/assets/collab-bg.jpg';
import SectionHeader from '@/components/ui-custom/SectionHeader';

function AIRecommendationsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="🤖 AI Recommendations"
          title="Smart Recommendations "
          highlight="Powered by AI"
          subtitle="Our AI learns your interests and connects you with communities, events, and people that matter to you."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'Community Matching', desc: 'AI analyzes your interests, skills, and goals to recommend the perfect communities', icon: '🌐', highlight: '94% match accuracy' },
            { title: 'Event Discovery', desc: 'Never miss relevant events with smart notifications based on your calendar and interests', icon: '📅', highlight: '3x more event attendance' },
            { title: 'Connection Suggestions', desc: 'Meet people who share your ambitions with AI-powered connection recommendations', icon: '🤝', highlight: '2M+ connections made' },
          ].map(card => (
            <div key={card.title} className="relative glass-card rounded-3xl p-8 hover-lift group border border-gray-100 overflow-hidden">
              <div className="absolute inset-0 gradient-card opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="text-5xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{card.desc}</p>
                <span className="inline-block bg-coral-50 text-coral-600 text-xs font-bold px-3 py-1.5 rounded-full border border-coral-100">{card.highlight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CollaborationSpacesSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-5" style={{ backgroundImage: `url(${collaborBg})` }} />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-coral-50" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 text-sm font-semibold rounded-full mb-4 border border-indigo-100">
              🚀 Collaboration Spaces
            </span>
            <h2 className="text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              Where Great Ideas <span className="text-gradient">Come to Life</span>
            </h2>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
              Create dedicated spaces for your team, community, or project. Collaborate in real-time with shared documents, task boards, video rooms, and more.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: Zap, title: 'Real-Time Collab', desc: 'Live editing and instant updates' },
                { icon: Shield, title: 'Private Spaces', desc: 'Invite-only secure environments' },
                { icon: Globe, title: 'Global Access', desc: 'Available on all devices' },
                { icon: Users, title: 'Team Management', desc: 'Roles and permissions control' },
              ].map(f => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="flex items-start gap-3 p-4 bg-white rounded-2xl shadow-card">
                    <div className="w-9 h-9 bg-coral-50 text-coral-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{f.title}</p>
                      <p className="text-xs text-gray-500">{f.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link to="/collaboration" className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-indigo transition-all hover-lift group">
              Explore Collaboration
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div>
            <img src={communityVisual} alt="Collaboration" className="rounded-3xl shadow-2xl w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialFeedPreview() {
  const posts = [
    { name: 'Arjun Mehta', role: 'Creator', avatar: 'https://i.pravatar.cc/150?img=12', text: 'Just launched my premium community on TOGETHERS! First 100 members get 50% off forever. Join the Tech Builders community now! 🚀', likes: 2340, comments: 187, time: '2h ago' },
    { name: 'Sneha Patel', role: 'Organizer', avatar: 'https://i.pravatar.cc/150?img=29', text: 'Our Delhi Design Collective just hit 7,000 members! Thank you for being the most supportive design community ever. Something big is coming next week... 🎨', likes: 1890, comments: 234, time: '4h ago' },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="📱 Social Feed"
          title="The Pulse of "
          highlight="Your Community"
          subtitle="Real conversations, real connections, real impact."
        />
        <div className="space-y-6">
          {posts.map((post, i) => (
            <div key={i} className="glass-card rounded-3xl p-6 hover-lift">
              <div className="flex items-center gap-3 mb-4">
                <img src={post.avatar} alt={post.name} className="w-12 h-12 rounded-2xl object-cover" />
                <div>
                  <p className="font-bold text-gray-900">{post.name}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-coral-500 bg-coral-50 px-2 py-0.5 rounded-full font-medium">{post.role}</span>
                    <span className="text-xs text-gray-400">{post.time}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">{post.text}</p>
              <div className="flex items-center gap-6 text-sm text-gray-400 pt-4 border-t border-gray-100">
                <button className="flex items-center gap-1.5 hover:text-coral-500 transition-colors">❤️ {post.likes.toLocaleString()}</button>
                <button className="flex items-center gap-1.5 hover:text-indigo-500 transition-colors">💬 {post.comments}</button>
                <button className="flex items-center gap-1.5 hover:text-emerald-500 transition-colors">🔗 Share</button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all hover-lift group">
            Join the Conversation
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Index() {
  return (
    <PageTransition>
      <HeroSection />
      <CommunityHighlights />
      <AIRecommendationsSection />
      <CollaborationSpacesSection />
      <EventsSection />
      <SocialFeedPreview />
      <GamificationSection />
      <TestimonialsSection />
      <CreatorEconomySection />
      <AnalyticsPreview />
      <PricingSection />
      <FAQSection />
    </PageTransition>
  );
}
