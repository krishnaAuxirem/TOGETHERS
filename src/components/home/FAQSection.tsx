import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import SectionHeader from '@/components/ui-custom/SectionHeader';

const FAQS = [
  { q: 'What is TOGETHERS and who is it for?', a: 'TOGETHERS is India\'s premier social collaboration platform designed for community builders, creators, teams, and individuals who want to connect, collaborate, and grow. Whether you\'re a startup founder, content creator, or just looking to join exciting communities — TOGETHERS is for you.' },
  { q: 'Is TOGETHERS free to use?', a: 'Yes! TOGETHERS offers a completely free Community plan with access to communities, events, messaging, and social feeds. Our Creator Pro and Business plans offer advanced features for creators and organizations at transparent pricing in Indian Rupees.' },
  { q: 'How do I become a verified creator?', a: 'Apply for the Creator Pro plan, build your community to 1,000+ members, and maintain consistent engagement. Our team reviews applications within 7 business days. Verified creators get a special badge, monetization access, and priority support.' },
  { q: 'Can I create private communities for my team?', a: 'Absolutely! You can create private, invite-only communities for your team, family, or organization. The Team/Family dashboard includes shared calendars, task boards, collaborative notes, and secure media albums.' },
  { q: 'How does the Creator Monetization program work?', a: 'Creators can earn through premium community memberships, paid events, sponsored content, digital downloads, and tips from followers. TOGETHERS takes a small platform fee, and creators receive 85-92% of all revenue, paid directly to their Indian bank accounts.' },
  { q: 'Is my data secure on TOGETHERS?', a: 'Security is our top priority. We use bank-level encryption, JWT authentication, role-based access controls, and follow all PDPB (India Personal Data Protection) guidelines. Your data is stored on Indian servers and never sold to third parties.' },
  { q: 'Can I integrate TOGETHERS with other tools?', a: 'Business plan subscribers get full API access to integrate with Slack, Notion, Google Workspace, Zoom, and 50+ other productivity tools. Custom integrations are available for enterprise clients.' },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="❓ FAQ"
          title="Frequently Asked "
          highlight="Questions"
          subtitle="Everything you need to know about TOGETHERS."
        />

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className={`glass-card rounded-2xl overflow-hidden border transition-all ${open === i ? 'border-coral-200 shadow-coral/20' : 'border-gray-100'}`}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-5 flex items-start justify-between gap-4"
              >
                <span className="font-semibold text-gray-900 text-sm sm:text-base">{faq.q}</span>
                <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${open === i ? 'bg-coral-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {open === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-500 mb-4">Still have questions?</p>
          <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-coral-500 hover:bg-coral-600 text-white font-semibold rounded-xl transition-all hover-lift shadow-coral">
            Contact Our Team
          </a>
        </div>
      </div>
    </section>
  );
}
