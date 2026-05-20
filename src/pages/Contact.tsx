import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import { toast } from 'sonner';
import PageTransition from '@/components/ui-custom/PageTransition';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setForm({ name: '', email: '', subject: '', message: '' });
    toast.success('Message sent! We will get back to you within 24 hours.');
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Hero */}
        <div className="gradient-hero py-20 text-center text-white">
          <div className="max-w-3xl mx-auto px-4">
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium mb-4 border border-white/20">Contact Us</span>
            <h1 className="text-5xl font-black mb-4" style={{ fontFamily: 'Plus Jakarta Sans' }}>We'd Love to Hear From You</h1>
            <p className="text-white/70 text-xl">Our team typically responds within 4-6 hours on business days.</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-5">
              {[
                { icon: Mail, title: 'Email Us', value: 'hello@togethers.in', sub: 'We reply within 6 hours', href: 'mailto:hello@togethers.in', color: 'text-coral-500', bg: 'bg-coral-50' },
                { icon: Phone, title: 'Call Us', value: '+91 98765 43210', sub: 'Mon-Fri, 9AM to 7PM IST', href: 'tel:+919876543210', color: 'text-indigo-500', bg: 'bg-indigo-50' },
                { icon: MapPin, title: 'Visit Us', value: 'BKC, Mumbai 400051', sub: 'India HQ', href: '#', color: 'text-emerald-500', bg: 'bg-emerald-50' },
                { icon: MessageSquare, title: 'Live Chat', value: 'Start a conversation', sub: 'Available 24/7 via app', href: '#', color: 'text-amber-500', bg: 'bg-amber-50' },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <a key={item.title} href={item.href} className="block glass-card rounded-2xl p-5 hover-lift border border-gray-100 group">
                    <div className="flex items-start gap-4">
                      <div className={`${item.bg} ${item.color} w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                        <p className="text-gray-700 text-sm font-medium">{item.value}</p>
                        <p className="text-xs text-gray-400">{item.sub}</p>
                      </div>
                    </div>
                  </a>
                );
              })}

              <div className="glass-card rounded-2xl p-5 border border-gray-100 bg-gradient-to-br from-coral-50 to-indigo-50">
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={16} className="text-coral-500" />
                  <h3 className="font-semibold text-gray-900 text-sm">Business Hours</h3>
                </div>
                <div className="space-y-1 text-sm">
                  {[
                    { day: 'Mon - Fri', hours: '9:00 AM - 7:00 PM IST' },
                    { day: 'Saturday', hours: '10:00 AM - 4:00 PM IST' },
                    { day: 'Sunday', hours: 'Closed' },
                  ].map(h => (
                    <div key={h.day} className="flex justify-between">
                      <span className="text-gray-500">{h.day}</span>
                      <span className="font-medium text-gray-700">{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="glass-card rounded-3xl p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Plus Jakarta Sans' }}>Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                      <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your full name" className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-400 transition-all" required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                      <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="you@example.com" className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-400 transition-all" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
                    <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-400 transition-all bg-white" required>
                      <option value="">Select a subject</option>
                      {['General Inquiry', 'Technical Support', 'Creator Program', 'Partnership', 'Media / Press', 'Billing & Payments', 'Report an Issue'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                    <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Tell us how we can help you..." rows={6} className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-400 transition-all resize-none" required />
                  </div>
                  <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-4 bg-coral-500 hover:bg-coral-600 text-white font-bold rounded-xl transition-all hover-lift shadow-coral disabled:opacity-60">
                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send size={18} /> Send Message</>}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
