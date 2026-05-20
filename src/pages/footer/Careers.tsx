import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Briefcase } from 'lucide-react';
import PageTransition from '@/components/ui-custom/PageTransition';
import { toast } from 'sonner';

const JOBS = [
  { title: 'Senior Frontend Engineer', team: 'Engineering', location: 'Mumbai / Remote', type: 'Full-time', level: 'Senior' },
  { title: 'Community Growth Manager', team: 'Growth', location: 'Mumbai', type: 'Full-time', level: 'Mid-level' },
  { title: 'Creator Success Manager', team: 'Creator Relations', location: 'Remote', type: 'Full-time', level: 'Mid-level' },
  { title: 'Product Designer (UI/UX)', team: 'Design', location: 'Mumbai / Bangalore', type: 'Full-time', level: 'Mid-level' },
  { title: 'Data Scientist - Community AI', team: 'AI/ML', location: 'Bangalore', type: 'Full-time', level: 'Senior' },
  { title: 'Content Marketing Lead', team: 'Marketing', location: 'Remote', type: 'Full-time', level: 'Mid-level' },
];

const PERKS = [
  { emoji: '🏠', title: 'Remote-First', desc: 'Work from anywhere in India. We trust you.' },
  { emoji: '💰', title: 'Competitive Pay', desc: 'Top market salaries + ESOP for all employees.' },
  { emoji: '🏥', title: 'Health Insurance', desc: 'Full coverage for you and your family.' },
  { emoji: '📚', title: 'Learning Budget', desc: '₹50,000/year for courses, books, and conferences.' },
  { emoji: '⏰', title: 'Flexible Hours', desc: 'Set your own schedule. Outcomes over hours.' },
  { emoji: '🎉', title: 'Team Events', desc: 'Quarterly offsite, monthly celebrations, and more.' },
];

export default function Careers() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-white pt-20">
        <div className="gradient-hero py-24 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 bg-coral-500 rounded-full blur-3xl animate-float" />
          </div>
          <div className="relative max-w-3xl mx-auto px-4">
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium mb-4 border border-white/20">🚀 We're Hiring!</span>
            <h1 className="text-5xl font-black mb-4" style={{ fontFamily: 'Plus Jakarta Sans' }}>Build the Future of<br /><span className="text-coral-300">Community Together</span></h1>
            <p className="text-white/70 text-xl mb-8">Join a passionate team building India's most impactful social platform. 30+ open roles.</p>
            <a href="#openings" className="inline-flex items-center gap-2 px-8 py-4 bg-coral-500 hover:bg-coral-600 text-white font-bold rounded-2xl transition-all hover-lift shadow-coral">
              View Open Roles <ArrowRight size={18} />
            </a>
          </div>
        </div>

        {/* Perks */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center" style={{ fontFamily: 'Plus Jakarta Sans' }}>Why Join TOGETHERS?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PERKS.map(perk => (
                <div key={perk.title} className="glass-card rounded-2xl p-6 hover-lift border border-gray-100">
                  <div className="text-4xl mb-3">{perk.emoji}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{perk.title}</h3>
                  <p className="text-sm text-gray-500">{perk.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section id="openings" className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center" style={{ fontFamily: 'Plus Jakarta Sans' }}>Open Positions</h2>
            <div className="space-y-4">
              {JOBS.map(job => (
                <div key={job.title} className="glass-card rounded-2xl p-6 hover-lift border border-gray-100 group flex items-center gap-4">
                  <div className="w-12 h-12 bg-coral-50 text-coral-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Briefcase size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 group-hover:text-coral-600 transition-colors">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      <span className="text-sm text-gray-500">{job.team}</span>
                      <span className="text-xs text-gray-300">·</span>
                      <span className="flex items-center gap-1 text-sm text-gray-500"><MapPin size={12} /> {job.location}</span>
                      <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-medium">{job.type}</span>
                      <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-medium">{job.level}</span>
                    </div>
                  </div>
                  <button onClick={() => toast.success('Application submitted! We\'ll be in touch soon.')} className="flex-shrink-0 px-5 py-2.5 bg-coral-500 hover:bg-coral-600 text-white font-semibold rounded-xl transition-all hover-lift text-sm">
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <p className="text-gray-500 mb-4">Don't see your role? We're always looking for exceptional talent.</p>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-coral-500 text-coral-600 hover:bg-coral-500 hover:text-white font-bold rounded-xl transition-all">
                Send Us Your Resume
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
