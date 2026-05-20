import { useState } from 'react';
import { ShoppingBag, Search, Star, ArrowRight, Heart, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import PageTransition from '@/components/ui-custom/PageTransition';
import SectionHeader from '@/components/ui-custom/SectionHeader';
import marketplaceVisual from '@/assets/marketplace-visual.jpg';

const PRODUCTS = [
  { id: '1', title: 'Creator Starter Kit', desc: 'Complete guide to building 10K followers in 90 days', price: 2999, rating: 4.8, sales: 1240, category: 'Guide', author: 'Arjun Mehta', avatar: 'https://i.pravatar.cc/150?img=12' },
  { id: '2', title: 'Community Manager Template Pack', desc: '50+ templates for managing communities professionally', price: 1499, rating: 4.9, sales: 890, category: 'Templates', author: 'Sneha Patel', avatar: 'https://i.pravatar.cc/150?img=29' },
  { id: '3', title: 'Event Planning Masterclass', desc: '8-hour course on organizing successful events', price: 4999, rating: 4.7, sales: 567, category: 'Course', author: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?img=47' },
  { id: '4', title: 'Social Media Growth Playbook', desc: 'Proven strategies to grow your social presence 10x', price: 999, rating: 4.6, sales: 2100, category: 'Guide', author: 'Ravi Kumar', avatar: 'https://i.pravatar.cc/150?img=33' },
  { id: '5', title: 'AI Tools for Creators', desc: 'How to use AI to 10x your content production', price: 1999, rating: 4.9, sales: 780, category: 'Course', author: 'Vikram Reddy', avatar: 'https://i.pravatar.cc/150?img=22' },
  { id: '6', title: 'Community Monetization Blueprint', desc: 'Turn your community into a Rs.1L/month business', price: 3499, rating: 4.8, sales: 430, category: 'Blueprint', author: 'Meera Nair', avatar: 'https://i.pravatar.cc/150?img=35' },
];

const CATEGORIES = ['All', 'Guide', 'Templates', 'Course', 'Blueprint'];

const FUNDRAISING = [
  { title: 'Rural India Tech Education', goal: 500000, raised: 342000, backers: 234 },
  { title: 'Women Creators Fund 2025', goal: 1000000, raised: 789000, backers: 567 },
  { title: 'Indie Game Dev Bootcamp', goal: 300000, raised: 198000, backers: 145 },
];

export default function Marketplace() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [cartIds, setCartIds] = useState<Set<string>>(new Set());
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());

  const filtered = PRODUCTS.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || p.category === category;
    return matchSearch && matchCat;
  });

  const handleBuy = (id: string, title: string) => {
    setCartIds(prev => new Set([...prev, id]));
    toast.success(`${title} added to cart!`);
  };

  const handleWishlist = (id: string, title: string) => {
    setWishlistIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); toast.info('Removed from wishlist'); }
      else { next.add(id); toast.success('Added to wishlist!'); }
      return next;
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Hero */}
        <div className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${marketplaceVisual})` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/60" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-2xl">
              <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium mb-4 border border-white/20">Creator Marketplace</span>
              <h1 className="text-5xl font-black mb-4" style={{ fontFamily: 'Plus Jakarta Sans' }}>Discover Creator Products & Resources</h1>
              <p className="text-white/70 text-lg mb-8">Buy and sell courses, guides, templates, and digital products from India's top creators.</p>

              <div className="flex gap-3 max-w-lg">
                <div className="flex-1 relative">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-coral-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Categories */}
          <div className="flex gap-2 flex-wrap mb-8">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${category === cat ? 'bg-coral-500 text-white shadow-coral' : 'bg-white text-gray-600 border border-gray-200 hover:border-coral-300'}`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filtered.map(product => (
              <div key={product.id} className="glass-card rounded-3xl overflow-hidden hover-lift border border-gray-100 group">
                <div className="h-3 gradient-primary" />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full">{product.category}</span>
                    <button onClick={() => handleWishlist(product.id, product.title)} className="text-gray-300 hover:text-red-400 transition-colors">
                      <Heart size={18} fill={wishlistIds.has(product.id) ? '#ef4444' : 'none'} className={wishlistIds.has(product.id) ? 'text-red-400' : ''} />
                    </button>
                  </div>

                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-coral-600 transition-colors">{product.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.desc}</p>

                  <div className="flex items-center gap-3 mb-4">
                    <img src={product.avatar} alt={product.author} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="text-xs font-semibold text-gray-700">{product.author}</p>
                      <div className="flex items-center gap-1">
                        <Star size={10} className="text-amber-400" fill="#F59E0B" />
                        <span className="text-xs text-gray-500">{product.rating} · {product.sales.toLocaleString()} sales</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-coral-600">Rs.{product.price.toLocaleString()}</span>
                    <button
                      onClick={() => handleBuy(product.id, product.title)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${cartIds.has(product.id) ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-coral-500 hover:bg-coral-600 text-white shadow-coral hover-lift'}`}
                    >
                      <ShoppingBag size={14} />
                      {cartIds.has(product.id) ? 'In Cart' : 'Buy Now'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Community Fundraising */}
          <div className="mb-16">
            <SectionHeader badge="Community Fundraising" title="Support " highlight="Community Causes" subtitle="Crowdfunding for communities that matter." center={false} />
            <div className="grid md:grid-cols-3 gap-6">
              {FUNDRAISING.map(f => {
                const pct = Math.round((f.raised / f.goal) * 100);
                return (
                  <div key={f.title} className="glass-card rounded-3xl p-6 hover-lift border border-gray-100">
                    <div className="w-10 h-10 bg-coral-50 rounded-xl flex items-center justify-center mb-4">
                      <TrendingUp size={18} className="text-coral-500" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-bold text-coral-600">Rs.{(f.raised / 1000).toFixed(0)}K raised</span>
                        <span className="text-gray-500">of Rs.{(f.goal / 1000).toFixed(0)}K</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full gradient-primary rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>{pct}% funded</span>
                        <span>{f.backers} backers</span>
                      </div>
                    </div>
                    <button onClick={() => toast.success('Thank you for your support!')} className="w-full py-3 bg-coral-500 hover:bg-coral-600 text-white font-semibold rounded-xl transition-all hover-lift text-sm">
                      Support This Cause
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
