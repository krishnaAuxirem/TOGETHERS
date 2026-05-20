import { useState } from 'react';
import { Calendar, MapPin, Users, Ticket, Search, Filter, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { EVENTS } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import PageTransition from '@/components/ui-custom/PageTransition';
import eventsVisual from '@/assets/events-visual.jpg';

const FILTER_OPTS = ['All', 'Virtual', 'In-Person', 'Free', 'Paid'];

export default function Events() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [rsvpIds, setRsvpIds] = useState<Set<string>>(new Set());
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const filtered = EVENTS.filter(e => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) || e.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === 'All' ? true :
      filter === 'Virtual' ? e.isVirtual :
      filter === 'In-Person' ? !e.isVirtual :
      filter === 'Free' ? e.price === 0 :
      e.price > 0;
    return matchSearch && matchFilter;
  });

  const handleRSVP = (id: string, title: string) => {
    if (!isAuthenticated) {
      toast.error('Please login to RSVP for events');
      navigate('/login');
      return;
    }
    setRsvpIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast.info('RSVP cancelled');
      } else {
        next.add(id);
        toast.success(`RSVP confirmed for ${title}! 🎉 Check your email for details.`);
      }
      return next;
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Hero */}
        <div className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${eventsVisual})` }} />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900/60" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium mb-4 border border-white/20">📅 12,000+ Events Monthly</span>
            <h1 className="text-5xl font-black mb-4" style={{ fontFamily: 'Plus Jakarta Sans' }}>Discover Amazing Events</h1>
            <p className="text-white/70 text-xl mb-8">Virtual and in-person events across India. Learn, network, and grow.</p>

            <div className="flex gap-3 max-w-xl mx-auto">
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search events..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-coral-400"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filters */}
          <div className="flex gap-2 flex-wrap mb-8">
            {FILTER_OPTS.map(opt => (
              <button
                key={opt}
                onClick={() => setFilter(opt)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${filter === opt ? 'bg-coral-500 text-white shadow-coral' : 'bg-white text-gray-600 border border-gray-200 hover:border-coral-300 hover:text-coral-600'}`}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(event => {
              const rsvpd = rsvpIds.has(event.id);
              const fillPercent = Math.round((event.attendees / event.maxAttendees) * 100);
              return (
                <div key={event.id} className="glass-card rounded-3xl overflow-hidden hover-lift border border-gray-100 group">
                  <div className={`h-3 ${event.isVirtual ? 'gradient-secondary' : 'gradient-primary'}`} />
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${event.isVirtual ? 'bg-indigo-50 text-indigo-600' : 'bg-coral-50 text-coral-600'}`}>
                        {event.isVirtual ? <span className="flex items-center gap-1"><Video size={10} /> Virtual</span> : <span className="flex items-center gap-1"><MapPin size={10} /> In-Person</span>}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{event.category}</span>
                    </div>

                    <h3 className="font-bold text-gray-900 mb-2 text-base group-hover:text-coral-600 transition-colors">{event.title}</h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{event.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar size={13} className="text-coral-500 flex-shrink-0" />
                        <span>{new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} · {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <MapPin size={13} className="text-indigo-500 flex-shrink-0" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Users size={13} className="text-emerald-500 flex-shrink-0" />
                        <span>{event.attendees.toLocaleString()}/{event.maxAttendees.toLocaleString()} attending</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Spots filled</span>
                        <span className={fillPercent >= 90 ? 'text-red-500 font-semibold' : ''}>{fillPercent}%{fillPercent >= 90 ? ' — Almost Full!' : ''}</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${fillPercent >= 90 ? 'bg-red-400' : 'gradient-primary'}`} style={{ width: `${fillPercent}%` }} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Ticket size={14} className="text-coral-500" />
                        <span className="font-bold text-coral-600 text-sm">{event.price === 0 ? 'Free' : `₹${event.price.toLocaleString()}`}</span>
                      </div>
                      <button
                        onClick={() => handleRSVP(event.id, event.title)}
                        className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${rsvpd ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-coral-500 hover:bg-coral-600 text-white shadow-coral hover-lift'}`}
                      >
                        {rsvpd ? '✓ RSVP\'d' : 'RSVP Now'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-500">Try different filters or search terms</p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
