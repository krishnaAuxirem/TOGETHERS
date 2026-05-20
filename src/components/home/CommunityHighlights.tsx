import { Link } from 'react-router-dom';
import { Users, ArrowRight, TrendingUp } from 'lucide-react';
import { COMMUNITIES } from '@/data/mockData';
import SectionHeader from '@/components/ui-custom/SectionHeader';

const CATEGORY_COLORS: Record<string, string> = {
  Technology: 'bg-blue-100 text-blue-700',
  Business: 'bg-amber-100 text-amber-700',
  Design: 'bg-pink-100 text-pink-700',
  'AI/ML': 'bg-purple-100 text-purple-700',
  Gaming: 'bg-green-100 text-green-700',
  Content: 'bg-coral-100 text-coral-700',
};

export default function CommunityHighlights() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Community Highlights"
          title="Trending "
          highlight="Communities"
          subtitle="Join thousands of passionate groups across technology, business, design, gaming, and more."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {COMMUNITIES.slice(0, 8).map((community, i) => (
            <div
              key={community.id}
              className="glass-card rounded-2xl p-5 hover-lift group cursor-pointer border border-gray-100"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-coral-400 to-indigo-500 flex items-center justify-center text-2xl font-bold text-white shadow-coral">
                  {community.name.charAt(0)}
                </div>
                {i < 3 && (
                  <div className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full font-semibold">
                    <TrendingUp size={10} />
                    Hot
                  </div>
                )}
              </div>

              <h3 className="font-bold text-gray-900 mb-1 text-sm leading-snug group-hover:text-coral-600 transition-colors">
                {community.name}
              </h3>
              <p className="text-xs text-gray-500 mb-3 line-clamp-2">{community.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-gray-600">
                  <Users size={13} />
                  <span className="text-xs font-semibold">{(community.members / 1000).toFixed(1)}K</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[community.category] || 'bg-gray-100 text-gray-600'}`}>
                  {community.category}
                </span>
              </div>

              <div className="mt-4 flex gap-1 flex-wrap">
                {community.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">#{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/communities" className="inline-flex items-center gap-2 px-8 py-4 bg-coral-500 hover:bg-coral-600 text-white font-bold rounded-2xl transition-all hover-lift shadow-coral group">
            Explore All Communities
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
