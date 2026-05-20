import { useState } from 'react';
import { Search, Users, TrendingUp, Lock, Globe, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { COMMUNITIES } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import PageTransition from '@/components/ui-custom/PageTransition';
import SectionHeader from '@/components/ui-custom/SectionHeader';

const CATEGORIES = ['All', 'Technology', 'Business', 'Design', 'AI/ML', 'Gaming', 'Content'];

const CATEGORY_GRADIENT: Record<string, string> = {
  Technology: 'from-blue-500 to-cyan-500',
  Business: 'from-amber-500 to-yellow-500',
  Design: 'from-pink-500 to-rose-500',
  'AI/ML': 'from-purple-500 to-violet-500',
  Gaming: 'from-emerald-500 to-teal-500',
  Content: 'from-coral-500 to-orange-500',
};

export default function Communities() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [joinedIds, setJoinedIds] = useState<Set<string>>(new Set());
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const filtered = COMMUNITIES.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || c.category === category;
    return matchSearch && matchCat;
  });

  const handleJoin = (id: string, name: string) => {
    if (!isAuthenticated) {
      toast.error('Please login to join communities');
      navigate('/login');
      return;
    }
    setJoinedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast.success(`Left ${name}`);
      } else {
        next.add(id);
        toast.success(`Joined ${name}! Welcome!`);
      }
      return next;
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Hero */}
        <div className="gradient-hero py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 bg-coral-500 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium mb-4 border border-white/20">50,000+ Communities</span>
            <h1 className="text-5xl font-black mb-4" style={{ fontFamily: 'Plus Jakarta Sans' }}>Find Your Tribe</h1>
            <p className="text-white/70 text-xl mb-8">Discover communities where you belong, connect, and grow together.</p>

            <div className="flex gap-3 max-w-xl mx-auto">
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search communities..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-coral-400 shadow-lg"
                />
              </div>
              <Link to="/register" className="flex items-center gap-2 px-5 py-4 bg-coral-500 hover:bg-coral-600 text-white font-bold rounded-2xl transition-all hover-lift whitespace-nowrap">
                <Plus size={18} /> Create
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap mb-8">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${category === cat ? 'bg-coral-500 text-white shadow-coral' : 'bg-white text-gray-600 hover:border-coral-300 hover:text-coral-600 border border-gray-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="text-sm text-gray-500 mb-6">{filtered.length} communities found</p>

          {/* Communities Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(community => {
              const joined = joinedIds.has(community.id);
              const gradient = CATEGORY_GRADIENT[community.category] || 'from-gray-500 to-gray-600';
              return (
                <div key={community.id} className="glass-card rounded-3xl overflow-hidden hover-lift group border border-gray-100">
                  {/* Header gradient */}
                  <div className={`h-20 bg-gradient-to-br ${gradient} flex items-center justify-center relative`}>
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl font-black text-white shadow-lg">
                      {community.name.charAt(0)}
                    </div>
                    {community.isPrivate && (
                      <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
                        <Lock size={10} /> Private
                      </div>
                    )}
                    {!community.isPrivate && (
                      <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
                        <Globe size={10} /> Public
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-coral-600 transition-colors text-sm">{community.name}</h3>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">{community.description}</p>

                    <div className="flex items-center gap-3 mb-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Users size={12} className="text-coral-500" /> {(community.members / 1000).toFixed(1)}K members</span>
                      <span className="flex items-center gap-1"><TrendingUp size={12} className="text-emerald-500" /> Active</span>
                    </div>

                    <div className="flex gap-1 flex-wrap mb-4">
                      {community.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">#{tag}</span>
                      ))}
                    </div>

                    <button
                      onClick={() => handleJoin(community.id, community.name)}
                      className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${joined ? 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500' : 'bg-coral-500 hover:bg-coral-600 text-white shadow-coral hover-lift'}`}
                    >
                      {joined ? 'Joined' : community.isPrivate ? 'Request to Join' : 'Join Community'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Search size={48} className="text-gray-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No communities found</h3>
              <p className="text-gray-500">Try a different search or category</p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
