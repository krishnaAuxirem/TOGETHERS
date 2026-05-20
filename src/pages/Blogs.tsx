import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { BLOG_POSTS } from '@/data/mockData';
import PageTransition from '@/components/ui-custom/PageTransition';
import SectionHeader from '@/components/ui-custom/SectionHeader';

const CATEGORIES = ['All', 'Strategy', 'Creator Economy', 'Technology', 'Team Building', 'Events', 'Company'];

const CATEGORY_COLORS: Record<string, string> = {
  Strategy: 'bg-blue-100 text-blue-700',
  'Creator Economy': 'bg-coral-100 text-coral-700',
  Technology: 'bg-purple-100 text-purple-700',
  'Team Building': 'bg-emerald-100 text-emerald-700',
  Events: 'bg-amber-100 text-amber-700',
  Company: 'bg-indigo-100 text-indigo-700',
};

export default function Blogs() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = BLOG_POSTS.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || p.category === category;
    return matchSearch && matchCat;
  });

  const featured = BLOG_POSTS.filter(p => p.featured);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Hero */}
        <div className="gradient-hero py-20 text-center text-white">
          <div className="max-w-4xl mx-auto px-4">
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium mb-4 border border-white/20">TOGETHERS Blog</span>
            <h1 className="text-5xl font-black mb-4" style={{ fontFamily: 'Plus Jakarta Sans' }}>Insights for Communities & Creators</h1>
            <p className="text-white/70 text-xl mb-8">Expert articles on community building, creator economy, events, and platform updates.</p>
            <div className="relative max-w-lg mx-auto">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles..." className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-coral-400 shadow-lg" />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Featured Posts */}
          {!search && category === 'All' && (
            <div className="mb-14">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h2>
              <div className="grid lg:grid-cols-2 gap-6">
                {featured.map((post, i) => (
                  <Link key={post.id} to={`/blogs/${post.id}`} className={`glass-card rounded-3xl overflow-hidden hover-lift border border-gray-100 group ${i === 0 ? 'lg:row-span-1' : ''}`}>
                    <div className="h-3 gradient-primary" />
                    <div className="p-8">
                      <div className="flex items-center gap-2 mb-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[post.category] || 'bg-gray-100 text-gray-600'}`}>{post.category}</span>
                        <span className="text-xs bg-coral-50 text-coral-600 px-2.5 py-1 rounded-full font-semibold">Featured</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-coral-600 transition-colors leading-snug">{post.title}</h3>
                      <p className="text-gray-500 text-sm mb-6 leading-relaxed">{post.excerpt}</p>
                      <div className="flex items-center gap-3">
                        <img src={post.authorAvatar} alt={post.author} className="w-9 h-9 rounded-full object-cover" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">{post.author}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <span>{new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                            <span>·</span>
                            <Clock size={11} />
                            <span>{post.readTime} read</span>
                          </div>
                        </div>
                        <ArrowRight size={16} className="text-gray-300 group-hover:text-coral-500 transition-colors" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap mb-8">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${category === cat ? 'bg-coral-500 text-white shadow-coral' : 'bg-white text-gray-600 border border-gray-200 hover:border-coral-300'}`}>{cat}</button>
            ))}
          </div>

          {/* All Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(post => (
              <Link key={post.id} to={`/blogs/${post.id}`} className="glass-card rounded-2xl overflow-hidden hover-lift border border-gray-100 group flex flex-col">
                <div className="h-2 gradient-primary" />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[post.category] || 'bg-gray-100 text-gray-600'}`}>{post.category}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-coral-600 transition-colors flex-1 leading-snug">{post.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <img src={post.authorAvatar} alt={post.author} className="w-8 h-8 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-700 truncate">{post.author}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock size={10} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <BookOpen size={48} className="text-gray-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-500">Try different search terms or categories</p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
