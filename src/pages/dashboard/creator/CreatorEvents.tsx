import { useState } from 'react';
import { Calendar, Users, MapPin, Video, Plus, Ticket, Edit, Trash2, Eye } from 'lucide-react';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const CREATOR_EVENTS = [
  { id: '1', title: 'Advanced React Masterclass', date: '2025-06-15', time: '7:00 PM', type: 'Virtual', attendees: 340, maxAttendees: 500, price: 999, status: 'upcoming', revenue: 339660 },
  { id: '2', title: 'Tech Career Bootcamp — Mumbai', date: '2025-06-22', time: '10:00 AM', type: 'In-Person', attendees: 120, maxAttendees: 150, price: 2499, status: 'upcoming', revenue: 299880 },
  { id: '3', title: 'Creator Monetization Workshop', date: '2025-05-10', time: '5:00 PM', type: 'Virtual', attendees: 280, maxAttendees: 300, price: 0, status: 'completed', revenue: 0 },
  { id: '4', title: 'AI Tools for Creators — Live', date: '2025-05-28', time: '6:30 PM', type: 'Virtual', attendees: 490, maxAttendees: 500, price: 499, status: 'completed', revenue: 244510 },
];

const STATUS_COLORS: Record<string, string> = {
  upcoming: 'bg-indigo-50 text-indigo-600',
  completed: 'bg-gray-100 text-gray-500',
  live: 'bg-emerald-50 text-emerald-600',
  cancelled: 'bg-red-50 text-red-500',
};

export default function CreatorEvents() {
  const { user, isAuthenticated } = useAuth();
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all');
  const [showCreate, setShowCreate] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', type: 'Virtual', price: '' });

  if (!isAuthenticated || user?.role !== 'creator') return <Navigate to="/login" replace />;

  const filtered = CREATOR_EVENTS.filter(e => filter === 'all' || e.status === filter);
  const totalRevenue = CREATOR_EVENTS.reduce((sum, e) => sum + e.revenue, 0);
  const totalAttendees = CREATOR_EVENTS.reduce((sum, e) => sum + e.attendees, 0);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date) { toast.error('Please fill required fields'); return; }
    toast.success(`Event "${newEvent.title}" created successfully!`);
    setShowCreate(false);
    setNewEvent({ title: '', date: '', time: '', type: 'Virtual', price: '' });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Events</h1>
              <p className="text-gray-500 mt-1">Host, manage and track your events.</p>
            </div>
            <button
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-coral-500 hover:bg-coral-600 text-white font-semibold rounded-xl transition-all hover-lift shadow-coral text-sm"
            >
              <Plus size={16} /> Create Event
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Events', value: CREATOR_EVENTS.length, icon: Calendar, color: 'text-coral-500', bg: 'bg-coral-50' },
              { label: 'Total Attendees', value: totalAttendees.toLocaleString(), icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-50' },
              { label: 'Total Revenue', value: `₹${(totalRevenue / 1000).toFixed(0)}K`, icon: Ticket, color: 'text-emerald-500', bg: 'bg-emerald-50' },
              { label: 'Avg. Fill Rate', value: '87%', icon: Eye, color: 'text-amber-500', bg: 'bg-amber-50' },
            ].map(card => {
              const Icon = card.icon;
              return (
                <div key={card.label} className="glass-card rounded-2xl p-5 border border-gray-100">
                  <div className={`w-10 h-10 ${card.bg} rounded-xl flex items-center justify-center mb-3`}>
                    <Icon size={18} className={card.color} />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{card.label}</p>
                </div>
              );
            })}
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6">
            {(['all', 'upcoming', 'completed'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${filter === tab ? 'bg-coral-500 text-white shadow-coral' : 'bg-white text-gray-600 border border-gray-200 hover:border-coral-300'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Events List */}
          <div className="space-y-4">
            {filtered.map(event => (
              <div key={event.id} className="glass-card rounded-2xl p-5 border border-gray-100 hover:border-coral-200 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${event.type === 'Virtual' ? 'bg-indigo-50' : 'bg-coral-50'}`}>
                    {event.type === 'Virtual' ? <Video size={20} className="text-indigo-500" /> : <MapPin size={20} className="text-coral-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-bold text-gray-900 text-sm">{event.title}</h3>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${STATUS_COLORS[event.status]}`}>{event.status}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400 flex-wrap">
                      <span className="flex items-center gap-1"><Calendar size={11} /> {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} · {event.time}</span>
                      <span className="flex items-center gap-1"><Users size={11} /> {event.attendees}/{event.maxAttendees} attendees</span>
                      <span className="flex items-center gap-1"><Ticket size={11} /> {event.price === 0 ? 'Free' : `₹${event.price}`}</span>
                    </div>
                    {/* Fill bar */}
                    <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden w-full max-w-xs">
                      <div
                        className="h-full gradient-primary rounded-full"
                        style={{ width: `${Math.min((event.attendees / event.maxAttendees) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {event.revenue > 0 && (
                      <div className="text-right hidden sm:block">
                        <p className="font-bold text-emerald-600 text-sm">₹{(event.revenue / 1000).toFixed(0)}K</p>
                        <p className="text-xs text-gray-400">revenue</p>
                      </div>
                    )}
                    <div className="flex gap-1">
                      <button onClick={() => toast.success(`Viewing "${event.title}"`)} className="p-2 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all text-gray-500">
                        <Eye size={15} />
                      </button>
                      <button onClick={() => toast.success(`Editing "${event.title}"`)} className="p-2 bg-gray-50 hover:bg-coral-50 hover:text-coral-600 rounded-xl transition-all text-gray-500">
                        <Edit size={15} />
                      </button>
                      <button onClick={() => toast.error(`Event deleted`)} className="p-2 bg-gray-50 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all text-gray-500">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Calendar size={48} className="text-gray-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No events yet</h3>
              <p className="text-gray-500 mb-6">Create your first event to get started.</p>
              <button onClick={() => setShowCreate(true)} className="px-6 py-3 bg-coral-500 hover:bg-coral-600 text-white font-semibold rounded-xl transition-all">
                Create Event
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Create Event Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Create New Event</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Event Title *</label>
                <input value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} placeholder="e.g. React Masterclass Live" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-400 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date *</label>
                  <input type="date" value={newEvent.date} onChange={e => setNewEvent({ ...newEvent, date: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-400 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Time</label>
                  <input type="time" value={newEvent.time} onChange={e => setNewEvent({ ...newEvent, time: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-400 text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Type</label>
                  <select value={newEvent.type} onChange={e => setNewEvent({ ...newEvent, type: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-400 text-sm">
                    <option>Virtual</option>
                    <option>In-Person</option>
                    <option>Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Price (₹)</label>
                  <input type="number" value={newEvent.price} onChange={e => setNewEvent({ ...newEvent, price: e.target.value })} placeholder="0 for free" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-400 text-sm" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowCreate(false)} className="flex-1 py-3 border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-all text-sm">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-coral-500 hover:bg-coral-600 text-white font-semibold rounded-xl transition-all text-sm">Create Event</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
