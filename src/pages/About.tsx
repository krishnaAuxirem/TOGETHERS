import { Link } from 'react-router-dom';
import { Users, Globe, Target, Heart, ArrowRight, Linkedin } from 'lucide-react';
import PageTransition from '@/components/ui-custom/PageTransition';
import SectionHeader from '@/components/ui-custom/SectionHeader';
import aboutTeam from '@/assets/about-team.jpg';

const TEAM = [
  { name: 'Priya Sharma', role: 'CEO & Co-Founder', avatar: 'https://i.pravatar.cc/150?img=47', linkedin: '#' },
  { name: 'Arjun Mehta', role: 'CTO & Co-Founder', avatar: 'https://i.pravatar.cc/150?img=12', linkedin: '#' },
  { name: 'Sneha Patel', role: 'Head of Communities', avatar: 'https://i.pravatar.cc/150?img=29', linkedin: '#' },
  { name: 'Ravi Kumar', role: 'Head of Product', avatar: 'https://i.pravatar.cc/150?img=33', linkedin: '#' },
  { name: 'Kavita Singh', role: 'Head of Creator Relations', avatar: 'https://i.pravatar.cc/150?img=25', linkedin: '#' },
  { name: 'Vikram Reddy', role: 'Head of Engineering', avatar: 'https://i.pravatar.cc/150?img=22', linkedin: '#' },
];

const VALUES = [
  { icon: Users, title: 'Community First', desc: 'Every decision we make puts community members at the center. Their growth is our growth.', color: 'text-coral-500', bg: 'bg-coral-50' },
  { icon: Heart, title: 'Authentic Connections', desc: 'We build tools that foster genuine relationships, not vanity metrics or hollow engagement.', color: 'text-red-500', bg: 'bg-red-50' },
  { icon: Target, title: 'Creator Empowerment', desc: 'We believe every creator deserves the tools to build a sustainable, thriving business.', color: 'text-indigo-500', bg: 'bg-indigo-50' },
  { icon: Globe, title: 'India-First, World-Class', desc: 'Built in India, for India, with global standards. Proudly serving the world\'s largest democracy.', color: 'text-emerald-500', bg: 'bg-emerald-50' },
];

const MILESTONES = [
  { year: '2023', event: 'TOGETHERS founded in Mumbai by Priya & Arjun' },
  { year: 'Q1 2024', event: 'Crossed 100,000 users — first major milestone' },
  { year: 'Q2 2024', event: 'Raised Rs.15Cr Series A from top Indian VCs' },
  { year: 'Q3 2024', event: 'Launched Creator Monetization Program' },
  { year: 'Q4 2024', event: 'Hit 1 million users and Rs.10Cr creator earnings' },
  { year: '2025', event: 'Expanding to Southeast Asia — Singapore launch Q3' },
];

export default function About() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-white pt-20">
        {/* Hero */}
        <div className="gradient-hero py-24 relative overflow-hidden text-white text-center">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-1/4 w-64 h-64 bg-coral-500 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-indigo-500 rounded-full blur-3xl animate-float-delayed" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4">
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium mb-4 border border-white/20">About TOGETHERS</span>
            <h1 className="text-6xl font-black mb-6" style={{ fontFamily: 'Plus Jakarta Sans' }}>Building India's<br /><span className="text-coral-300">Community Future</span></h1>
            <p className="text-white/70 text-xl max-w-2xl mx-auto">We're on a mission to connect 100 million Indians through meaningful communities, shared experiences, and collaborative growth.</p>
          </div>
        </div>

        {/* Mission */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-1.5 bg-coral-50 text-coral-600 text-sm font-semibold rounded-full mb-4 border border-coral-100">Our Mission</span>
                <h2 className="text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                  We Believe in the <span className="text-gradient">Power of Together</span>
                </h2>
                <p className="text-gray-500 text-lg mb-6 leading-relaxed">
                  TOGETHERS was born from a simple belief: that when people with shared passions come together, extraordinary things happen. We build the infrastructure for those connections.
                </p>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  Founded in 2023 by Priya Sharma and Arjun Mehta in Mumbai, we've grown to serve over 1 million members across India — from tech founders in Bangalore to creative communities in Kerala. Our platform has enabled Rs.10Cr+ in creator earnings and facilitated thousands of meaningful collaborations.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {[{ v: '1M+', l: 'Members' }, { v: '50K+', l: 'Communities' }, { v: 'Rs.10Cr+', l: 'Creator Revenue' }].map(s => (
                    <div key={s.l} className="text-center glass-card rounded-2xl p-4">
                      <p className="text-2xl font-black text-coral-600">{s.v}</p>
                      <p className="text-xs text-gray-500">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <img src={aboutTeam} alt="TOGETHERS Team" className="rounded-3xl shadow-2xl w-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader badge="Our Values" title="What We " highlight="Stand For" subtitle="The principles that guide every decision we make." />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {VALUES.map(v => {
                const Icon = v.icon;
                return (
                  <div key={v.title} className="glass-card rounded-2xl p-6 hover-lift text-center">
                    <div className={`${v.bg} ${v.color} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <Icon size={24} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader badge="Our Journey" title="From Idea to " highlight="1 Million Users" />
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-coral-500 to-indigo-500" />
              <div className="space-y-6">
                {MILESTONES.map((m, i) => (
                  <div key={i} className="flex items-start gap-6 pl-16 relative">
                    <div className="absolute left-0 w-12 h-12 bg-white border-2 border-coral-500 rounded-2xl flex items-center justify-center shadow-card">
                      <span className="text-xs font-bold text-coral-600 text-center leading-tight">{m.year.slice(0, 4)}</span>
                    </div>
                    <div className="glass-card rounded-2xl p-4 flex-1 hover-lift">
                      <span className="text-xs font-bold text-coral-500 uppercase tracking-wide">{m.year}</span>
                      <p className="font-semibold text-gray-900 mt-1">{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader badge="The Team" title="Meet the People " highlight="Behind TOGETHERS" subtitle="A passionate team of community builders, engineers, and creators." />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TEAM.map(member => (
                <div key={member.name} className="glass-card rounded-3xl p-6 hover-lift text-center border border-gray-100 group">
                  <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-2xl object-cover mx-auto mb-4 group-hover:scale-105 transition-transform" />
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-coral-600 transition-colors">{member.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{member.role}</p>
                  <a href={member.linkedin} className="inline-flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-700 font-medium">
                    <Linkedin size={12} /> LinkedIn Profile
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 gradient-hero text-center text-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-4xl font-black mb-4" style={{ fontFamily: 'Plus Jakarta Sans' }}>Join Our Mission</h2>
            <p className="text-white/70 text-xl mb-8">We're hiring passionate people who believe in the power of community.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/careers" className="px-8 py-4 bg-coral-500 hover:bg-coral-600 text-white font-bold rounded-2xl transition-all hover-lift shadow-coral">View Open Positions</Link>
              <Link to="/contact" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/20 transition-all">Get in Touch</Link>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
