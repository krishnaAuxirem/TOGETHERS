import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, BookOpen, MessageSquare, Video, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '@/components/ui-custom/PageTransition';

const HELP_CATEGORIES = [
  { icon: '🚀', title: 'Getting Started', articles: 12, desc: 'Setup, onboarding, and first steps' },
  { icon: '👥', title: 'Communities', articles: 18, desc: 'Creating and managing communities' },
  { icon: '📅', title: 'Events', articles: 15, desc: 'Hosting and attending events' },
  { icon: '💰', title: 'Creator Monetization', articles: 24, desc: 'Earning, payments, and billing' },
  { icon: '🔐', title: 'Account & Security', articles: 10, desc: 'Login, privacy, and security' },
  { icon: '📱', title: 'Mobile App', articles: 8, desc: 'Using TOGETHERS on mobile' },
];

const FAQS = [
  { q: 'How do I reset my password?', a: 'Go to the Login page, click "Forgot Password", enter your email address, and we\'ll send you a reset link within 2 minutes.' },
  { q: 'How do I create a new community?', a: 'Click "Create Community" from the Communities page. Choose public or private, set a name and description, add tags, and you\'re ready to invite members.' },
  { q: 'When do creator payouts happen?', a: 'Creator earnings are processed every Tuesday and Friday. Funds reach your bank account within 2-3 business days after processing.' },
  { q: 'Can I change my role/account type?', a: 'Currently, you can upgrade your role (e.g., User to Creator) by going to Settings > Account > Change Role. Downgrades require contacting support.' },
  { q: 'How do I report inappropriate content?', a: 'Click the three-dot menu (⋯) on any post, comment, or profile and select "Report". Our moderation team reviews all reports within 24 hours.' },
];

export default function HelpCenter() {
  const [search, setSearch] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="gradient-hero py-20 text-center text-white">
          <div className="max-w-3xl mx-auto px-4">
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium mb-4 border border-white/20">❓ Help Center</span>
            <h1 className="text-5xl font-black mb-4" style={{ fontFamily: 'Plus Jakarta Sans' }}>How Can We Help?</h1>
            <p className="text-white/70 text-xl mb-8">Search our knowledge base or contact our support team.</p>
            <div className="relative max-w-lg mx-auto">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search help articles..." className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-coral-400 shadow-lg" />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {HELP_CATEGORIES.map(cat => (
              <button key={cat.title} className="glass-card rounded-2xl p-6 hover-lift border border-gray-100 text-left group">
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="font-bold text-gray-900 group-hover:text-coral-600 transition-colors mb-1">{cat.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{cat.desc}</p>
                <span className="text-xs text-coral-500 font-semibold">{cat.articles} articles</span>
              </button>
            ))}
          </div>

          {/* Popular FAQs */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Plus Jakarta Sans' }}>Popular Questions</h2>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <div key={i} className={`glass-card rounded-2xl overflow-hidden border transition-all ${openFaq === i ? 'border-coral-200' : 'border-gray-100'}`}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left px-6 py-4 flex items-center justify-between gap-4">
                    <span className="font-semibold text-gray-900 text-sm">{faq.q}</span>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${openFaq === i ? 'bg-coral-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {openFaq === i ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </div>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-4">
                      <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: MessageSquare, title: 'Live Chat', desc: 'Chat with our support team in real-time', action: 'Start Chat', color: 'bg-coral-500' },
              { icon: Mail, title: 'Email Support', desc: 'Send us an email, we reply within 6 hours', action: 'Send Email', href: '/contact', color: 'bg-indigo-600' },
              { icon: Video, title: 'Video Call', desc: 'Book a 30-min call with our support team', action: 'Book Session', color: 'bg-emerald-600' },
            ].map(item => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="glass-card rounded-2xl p-6 hover-lift border border-gray-100 text-center">
                  <div className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{item.desc}</p>
                  {item.href ? (
                    <Link to={item.href} className={`inline-block px-5 py-2.5 ${item.color} hover:opacity-90 text-white font-semibold rounded-xl transition-all text-sm`}>{item.action}</Link>
                  ) : (
                    <button className={`px-5 py-2.5 ${item.color} hover:opacity-90 text-white font-semibold rounded-xl transition-all text-sm`}>{item.action}</button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
