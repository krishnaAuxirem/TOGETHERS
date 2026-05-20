import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Share2, Heart, Star } from 'lucide-react';
import { BLOG_POSTS } from '@/data/mockData';
import { useState } from 'react';
import { toast } from 'sonner';
import PageTransition from '@/components/ui-custom/PageTransition';

const FULL_CONTENT = `The Indian digital landscape is undergoing a transformation unlike anything we've seen before. Communities are no longer just interest groups — they're becoming economic engines, career launchers, and life-changing networks.

## The Rise of Community-Led Growth

Traditional marketing is losing its edge. Brands that invest millions in ads are being outpaced by companies that invest in community. Why? Because communities create trust, and trust drives every purchase decision.

When Arjun Mehta launched his Tech Builders community on TOGETHERS, he had zero marketing budget. Six months later, he had 45,000 members and multiple revenue streams — all organic, all community-driven.

## The Numbers Don't Lie

Our research across 10,000+ communities on TOGETHERS reveals striking patterns:
- Communities grow 3x faster when members actively contribute content
- Events organized within communities have 70% higher attendance rates  
- Premium community members have 4x higher lifetime value
- Word-of-mouth referrals account for 80% of new community members

## What Makes Indian Communities Different

Indian communities have a unique characteristic: they're deeply relational. Unlike Western communities that are often interest-based, Indian communities combine interests with relationships, culture, and shared identity.

This is why platforms built for the West don't fully serve the Indian market. TOGETHERS was built understanding that an Indian tech community is not just about technology — it's about connection, mentorship, and collective progress.

## Building Your Community Strategy

**Step 1: Define Your Community's Purpose**
The most successful communities have a clear "north star" — a defining purpose beyond just "networking." Ask: What transformation does my community offer members?

**Step 2: Create Regular Touchpoints**
Weekly events, daily discussions, monthly milestones — successful communities have rhythms. Members should know when to show up and what to expect.

**Step 3: Recognize and Reward Early Contributors**
Your first 100 members will make or break your community. Treat them like co-founders. Feature them, give them access, and make them feel ownership.

**Step 4: Monetize Authentically**
The best monetization comes from solving real problems your community faces. Courses, events, mentorship — these succeed because they're aligned with what members actually need.

## The Future is Community

As we move through 2025, one thing is clear: the communities, creators, and brands that invest in genuine human connection will win. The era of broadcast media is over. The era of community is here.

TOGETHERS exists to make this possible for every Indian creator, organizer, and community builder — regardless of their starting point or resources.

Your community is waiting to be built. The question is: will you start today?`;

export default function BlogDetail() {
  const { id } = useParams();
  const [liked, setLiked] = useState(false);
  const post = BLOG_POSTS.find(p => p.id === id) || BLOG_POSTS[0];
  const related = BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <PageTransition>
      <div className="min-h-screen bg-white pt-20">
        {/* Hero */}
        <div className="gradient-hero py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 bg-coral-500 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <Link to="/blogs" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors text-sm">
              <ArrowLeft size={16} /> Back to Blog
            </Link>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-semibold bg-white/20 text-white px-3 py-1 rounded-full">{post.category}</span>
              {post.featured && <span className="text-xs bg-coral-500/80 text-white px-3 py-1 rounded-full font-semibold">Featured</span>}
            </div>
            <h1 className="text-4xl lg:text-5xl font-black mb-6 leading-tight" style={{ fontFamily: 'Plus Jakarta Sans' }}>{post.title}</h1>
            <div className="flex items-center gap-4">
              <img src={post.authorAvatar} alt={post.author} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <p className="font-semibold">{post.author}</p>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <span>{new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <span>·</span>
                  <Clock size={13} />
                  <span>{post.readTime} read</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              {/* Excerpt */}
              <p className="text-xl text-gray-600 mb-8 leading-relaxed font-medium border-l-4 border-coral-500 pl-6 italic">{post.excerpt}</p>

              {/* Full content */}
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                {FULL_CONTENT.split('\n\n').map((para, i) => {
                  if (para.startsWith('## ')) {
                    return <h2 key={i} className="text-2xl font-bold text-gray-900 mt-8 mb-4" style={{ fontFamily: 'Plus Jakarta Sans' }}>{para.replace('## ', '')}</h2>;
                  }
                  if (para.startsWith('**')) {
                    return <h3 key={i} className="text-lg font-bold text-gray-900 mt-6 mb-2">{para.replace(/\*\*/g, '')}</h3>;
                  }
                  if (para.startsWith('- ')) {
                    return <ul key={i} className="list-disc list-inside space-y-2 mb-4 text-gray-600">{para.split('\n').map((item, j) => <li key={j}>{item.replace('- ', '')}</li>)}</ul>;
                  }
                  return <p key={i} className="mb-4 text-gray-600 leading-relaxed">{para}</p>;
                })}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-100">
                {post.tags.map(tag => (
                  <span key={tag} className="text-sm text-coral-600 bg-coral-50 px-3 py-1.5 rounded-full font-medium border border-coral-100">#{tag}</span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 mt-6">
                <button onClick={() => { setLiked(!liked); toast.success(liked ? 'Unliked' : 'Liked!'); }} className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all ${liked ? 'bg-red-50 text-red-500 border border-red-200' : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500'}`}>
                  <Heart size={16} fill={liked ? 'currentColor' : 'none'} /> {liked ? 'Liked!' : 'Like'}
                </button>
                <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!'); }} className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                  <Share2 size={16} /> Share
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="glass-card rounded-2xl p-5 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 text-sm">About the Author</h3>
                <img src={post.authorAvatar} alt={post.author} className="w-16 h-16 rounded-2xl object-cover mb-3" />
                <p className="font-semibold text-gray-900 text-sm">{post.author}</p>
                <p className="text-xs text-gray-500 mt-1">Community Lead at TOGETHERS</p>
              </div>

              <div className="glass-card rounded-2xl p-5 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 text-sm">Related Posts</h3>
                <div className="space-y-4">
                  {related.map(r => (
                    <Link key={r.id} to={`/blogs/${r.id}`} className="block hover:text-coral-600 transition-colors">
                      <p className="text-sm font-medium text-gray-800 hover:text-coral-600 leading-snug">{r.title}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                        <Clock size={10} /><span>{r.readTime}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
