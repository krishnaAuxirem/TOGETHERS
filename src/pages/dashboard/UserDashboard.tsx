import { useState, useEffect } from 'react';
import { Users, MessageSquare, Calendar, Bell, Star, TrendingUp, Heart, Bookmark, Share2 } from 'lucide-react';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import StatCard from '@/components/ui-custom/StatCard';
import { POSTS } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Navigate } from 'react-router-dom';
import { SkeletonCard } from '@/components/ui-custom/SkeletonCard';

export default function UserDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [posts, setPosts] = useState(POSTS);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const handleLike = (id: string) => {
    setPosts(ps => ps.map(p => p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p));
  };

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    const post = {
      id: Date.now().toString(),
      author: user!.name,
      authorAvatar: user!.avatar,
      authorRole: user!.role,
      content: newPost,
      likes: 0,
      comments: 0,
      shares: 0,
      createdAt: 'Just now',
      tags: [],
      liked: false,
    };
    setPosts(ps => [post, ...ps]);
    setNewPost('');
    toast.success('Post shared! 🎉');
  };

  const SUGGESTIONS = [
    { name: 'Meera Nair', role: 'Creator', avatar: 'https://i.pravatar.cc/150?img=35', mutual: 12 },
    { name: 'Vikram Reddy', role: 'Engineer', avatar: 'https://i.pravatar.cc/150?img=22', mutual: 8 },
    { name: 'Aditya Joshi', role: 'Founder', avatar: 'https://i.pravatar.cc/150?img=15', mutual: 5 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
            <p className="text-gray-500 mt-1">Here's what's happening in your community today.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <StatCard title="Connections" value="234" change="+12" positive icon={<Users size={20} />} color="text-coral-500" bg="bg-coral-50" />
            <StatCard title="Unread Messages" value="8" icon={<MessageSquare size={20} />} color="text-indigo-500" bg="bg-indigo-50" />
            <StatCard title="Events RSVP'd" value="5" change="+2" positive icon={<Calendar size={20} />} color="text-emerald-500" bg="bg-emerald-50" />
            <StatCard title="Post Reactions" value="1.2K" change="+18%" positive icon={<Heart size={20} />} color="text-pink-500" bg="bg-pink-50" />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Feed */}
            <div className="lg:col-span-2 space-y-5">
              {/* Post composer */}
              <form onSubmit={handlePost} className="glass-card rounded-2xl p-5 border border-gray-100">
                <div className="flex items-start gap-3">
                  <img src={user?.avatar} alt="" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <textarea
                      value={newPost}
                      onChange={e => setNewPost(e.target.value)}
                      placeholder="Share something with your community..."
                      rows={3}
                      className="w-full resize-none border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-coral-400 transition-all"
                    />
                    <div className="flex justify-end mt-2">
                      <button type="submit" className="px-5 py-2 bg-coral-500 hover:bg-coral-600 text-white text-sm font-semibold rounded-xl transition-all hover-lift">
                        Share Post
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              {/* Feed */}
              {loading ? (
                <div className="space-y-4">{[1,2,3].map(i => <SkeletonCard key={i} />)}</div>
              ) : (
                posts.map(post => (
                  <div key={post.id} className="glass-card rounded-2xl p-5 border border-gray-100 hover-lift">
                    <div className="flex items-center gap-3 mb-4">
                      <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-full object-cover" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900 text-sm">{post.author}</p>
                          <span className="text-xs bg-coral-50 text-coral-600 px-2 py-0.5 rounded-full capitalize">{post.authorRole}</span>
                        </div>
                        <p className="text-xs text-gray-400">{post.createdAt}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">{post.content}</p>
                    <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
                      <button onClick={() => handleLike(post.id)} className={`flex items-center gap-1.5 text-sm transition-colors ${post.liked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}>
                        <Heart size={15} fill={post.liked ? 'currentColor' : 'none'} /> {post.likes.toLocaleString()}
                      </button>
                      <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-indigo-500 transition-colors">
                        <MessageSquare size={15} /> {post.comments}
                      </button>
                      <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-emerald-500 transition-colors ml-auto">
                        <Bookmark size={15} />
                      </button>
                      <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-coral-500 transition-colors" onClick={() => toast.success('Link copied!')}>
                        <Share2 size={15} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Friend Suggestions */}
              <div className="glass-card rounded-2xl p-5 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 text-sm">People You May Know</h3>
                <div className="space-y-4">
                  {SUGGESTIONS.map(s => (
                    <div key={s.name} className="flex items-center gap-3">
                      <img src={s.avatar} alt={s.name} className="w-10 h-10 rounded-full object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm truncate">{s.name}</p>
                        <p className="text-xs text-gray-400">{s.mutual} mutual connections</p>
                      </div>
                      <button onClick={() => toast.success(`Connection request sent to ${s.name}!`)} className="text-xs px-3 py-1.5 bg-coral-50 text-coral-600 hover:bg-coral-500 hover:text-white rounded-lg font-semibold transition-all">
                        Connect
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="glass-card rounded-2xl p-5 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 text-sm">Upcoming Events</h3>
                {[
                  { title: 'Tech Summit 2025', date: 'Jun 15', location: 'Hyderabad' },
                  { title: 'Creator Workshop', date: 'Jun 22', location: 'Online' },
                ].map(e => (
                  <div key={e.title} className="flex items-start gap-3 mb-3 last:mb-0">
                    <div className="w-10 h-10 bg-coral-50 rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-coral-600 leading-none">{e.date.split(' ')[1]}</span>
                      <span className="text-xs text-coral-400">{e.date.split(' ')[0]}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{e.title}</p>
                      <p className="text-xs text-gray-400">{e.location}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Activity Score */}
              <div className="glass-card rounded-2xl p-5 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 text-sm">Your Activity Score</h3>
                <div className="text-center mb-4">
                  <span className="text-4xl font-black text-coral-600">1,240</span>
                  <p className="text-xs text-gray-500">points this week</p>
                </div>
                <div className="space-y-2">
                  {[
                    { action: 'Posts shared', pts: 60, max: 100 },
                    { action: 'Comments made', pts: 45, max: 100 },
                    { action: 'Events attended', pts: 80, max: 100 },
                  ].map(a => (
                    <div key={a.action}>
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>{a.action}</span><span>{a.pts}/100</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full gradient-primary rounded-full" style={{ width: `${a.pts}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
