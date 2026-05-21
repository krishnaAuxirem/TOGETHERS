import { useState } from 'react';
import { MessageSquare, Send, Search, Phone, Video, MoreVertical, Circle } from 'lucide-react';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const CONVERSATIONS = [
  { id: '1', name: 'Arjun Mehta', role: 'Pro Member', lastMsg: 'Thanks for the masterclass session!', time: '2m ago', unread: 2, online: true, avatar: 'https://i.pravatar.cc/150?img=12' },
  { id: '2', name: 'Priya Sharma', role: 'VIP Member', lastMsg: 'When is the next workshop?', time: '15m ago', unread: 1, online: true, avatar: 'https://i.pravatar.cc/150?img=47' },
  { id: '3', name: 'Vikram Reddy', role: 'Supporter', lastMsg: 'The React course was amazing!', time: '1h ago', unread: 0, online: false, avatar: 'https://i.pravatar.cc/150?img=22' },
  { id: '4', name: 'Sneha Patel', role: 'Pro Member', lastMsg: 'Can you share the resources?', time: '3h ago', unread: 0, online: false, avatar: 'https://i.pravatar.cc/150?img=29' },
  { id: '5', name: 'Community Group', role: 'React Devs India · 840 members', lastMsg: 'Great session today everyone!', time: '5h ago', unread: 12, online: true, avatar: 'https://i.pravatar.cc/150?img=33' },
];

const INITIAL_MESSAGES = [
  { id: '1', from: 'them', text: 'Hey! Just wanted to say the React masterclass was incredible!', time: '10:00 AM' },
  { id: '2', from: 'me', text: 'Thank you so much! Really glad it helped you!', time: '10:02 AM' },
  { id: '3', from: 'them', text: 'Quick question — will there be a recording available?', time: '10:05 AM' },
  { id: '4', from: 'me', text: 'Yes! Recordings are available for all Pro members within 24 hours. Check your member portal.', time: '10:07 AM' },
  { id: '5', from: 'them', text: 'Perfect! Also, when is the next session on Next.js?', time: '10:09 AM' },
  { id: '6', from: 'me', text: 'Planning it for next Friday evening! Stay tuned to the community feed for the announcement.', time: '10:11 AM' },
  { id: '7', from: 'them', text: 'Thanks for the masterclass session!', time: '10:15 AM' },
];

export default function CreatorMessages() {
  const { user, isAuthenticated } = useAuth();
  const [activeChat, setActiveChat] = useState(CONVERSATIONS[0]);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [newMsg, setNewMsg] = useState('');
  const [search, setSearch] = useState('');

  if (!isAuthenticated || user?.role !== 'creator') return <Navigate to="/login" replace />;

  const filtered = CONVERSATIONS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), from: 'me', text: newMsg, time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }]);
    setNewMsg('');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Conversations */}
          <div className="w-72 flex-shrink-0 bg-white border-r border-gray-100 flex flex-col">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900 mb-3">Messages</h2>
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search conversations..."
                  className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-coral-400"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filtered.map(conv => (
                <button
                  key={conv.id}
                  onClick={() => setActiveChat(conv)}
                  className={`w-full text-left px-4 py-3.5 hover:bg-gray-50 transition-colors border-b border-gray-50 flex items-center gap-3 ${activeChat.id === conv.id ? 'bg-coral-50' : ''}`}
                >
                  <div className="relative flex-shrink-0">
                    <img src={conv.avatar} alt={conv.name} className="w-10 h-10 rounded-full object-cover" />
                    {conv.online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-900 text-sm truncate">{conv.name}</p>
                      <span className="text-xs text-gray-400 flex-shrink-0 ml-1">{conv.time}</span>
                    </div>
                    <p className="text-xs text-gray-400 truncate mt-0.5">{conv.lastMsg}</p>
                  </div>
                  {conv.unread > 0 && (
                    <div className="w-5 h-5 bg-coral-500 text-white text-xs rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {conv.unread}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-3 shadow-sm flex-shrink-0">
              <div className="relative">
                <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-full object-cover" />
                {activeChat.online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />}
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900">{activeChat.name}</p>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  {activeChat.online ? <><Circle size={8} className="text-emerald-400 fill-emerald-400" /> Online</> : 'Offline'} · {activeChat.role}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => toast.success('Starting voice call...')} className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-500">
                  <Phone size={18} />
                </button>
                <button onClick={() => toast.success('Starting video call...')} className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-500">
                  <Video size={18} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-500">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                  {msg.from === 'them' && (
                    <img src={activeChat.avatar} alt={activeChat.name} className="w-8 h-8 rounded-full object-cover mr-2 self-end flex-shrink-0" />
                  )}
                  <div className={`max-w-xs lg:max-w-md ${msg.from === 'me' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                    <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.from === 'me' ? 'bg-coral-500 text-white rounded-br-sm' : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm'}`}>
                      {msg.text}
                    </div>
                    <span className="text-xs text-gray-400 px-1">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} className="bg-white border-t border-gray-100 p-4 flex items-center gap-3 flex-shrink-0">
              <input
                value={newMsg}
                onChange={e => setNewMsg(e.target.value)}
                placeholder={`Message ${activeChat.name}...`}
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-coral-400"
              />
              <button
                type="submit"
                disabled={!newMsg.trim()}
                className="p-3 bg-coral-500 hover:bg-coral-600 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
