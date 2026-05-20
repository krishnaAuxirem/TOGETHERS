import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowRight, Video, Ticket } from 'lucide-react';
import { EVENTS } from '@/data/mockData';
import SectionHeader from '@/components/ui-custom/SectionHeader';

export default function EventsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Events & Activities"
          title="Don't Miss "
          highlight="These Events"
          subtitle="From tech conferences to creative workshops — find events that ignite your passion."
        />

        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {EVENTS.slice(0, 6).map((event, i) => (
            <div key={event.id} className={`relative rounded-2xl overflow-hidden border border-gray-100 hover-lift group bg-white shadow-card ${i === 0 ? 'lg:row-span-1' : ''}`}>
              {/* Colored top bar */}
              <div className={`h-2 w-full ${event.isVirtual ? 'gradient-secondary' : 'gradient-primary'}`} />

              <div className="p-5">
                {/* Badges */}
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${event.isVirtual ? 'bg-indigo-50 text-indigo-600' : 'bg-coral-50 text-coral-600'}`}>
                    {event.isVirtual ? 'Virtual' : 'In-Person'}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{event.category}</span>
                  {event.price === 0 && <span className="text-xs bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full font-semibold">Free</span>}
                </div>

                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-coral-600 transition-colors leading-snug">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{event.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar size={13} className="text-coral-500" />
                    <span>{new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} · {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    {event.isVirtual ? <Video size={13} className="text-indigo-500" /> : <MapPin size={13} className="text-indigo-500" />}
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Users size={13} className="text-emerald-500" />
                    <span>{event.attendees.toLocaleString()} attending · {event.maxAttendees - event.attendees} spots left</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Spots filled</span>
                    <span>{Math.round((event.attendees / event.maxAttendees) * 100)}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full gradient-primary rounded-full transition-all"
                      style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Ticket size={14} className="text-coral-500" />
                    <span className="font-bold text-coral-600">{event.price === 0 ? 'Free' : `₹${event.price}`}</span>
                  </div>
                  <Link to={`/events/${event.id}`} className="px-4 py-2 bg-coral-50 hover:bg-coral-500 text-coral-600 hover:text-white text-sm font-semibold rounded-xl transition-all">
                    RSVP Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/events" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-coral-500 text-coral-600 hover:bg-coral-500 hover:text-white font-bold rounded-2xl transition-all group">
            View All Events
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
