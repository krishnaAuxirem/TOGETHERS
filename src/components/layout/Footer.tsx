import { Link } from 'react-router-dom';
import { Twitter, Instagram, Linkedin, Youtube, Github, Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const COMPANY_LINKS = [
  { label: 'About Us', path: '/about' },
  { label: 'Careers', path: '/careers' },
  { label: 'Blog', path: '/blogs' },
  { label: 'Press Kit', path: '/about#press' },
];

const PRODUCT_LINKS = [
  { label: 'Communities', path: '/communities' },
  { label: 'Events', path: '/events' },
  { label: 'Marketplace', path: '/marketplace' },
  { label: 'Pricing', path: '/pricing' },
];

const CREATOR_LINKS = [
  { label: 'Creator Program', path: '/creators' },
  { label: 'Collaboration', path: '/collaboration' },
  { label: 'Analytics', path: '/dashboard/creator' },
  { label: 'Monetization', path: '/pricing' },
];

const SUPPORT_LINKS = [
  { label: 'Help Center', path: '/help' },
  { label: 'Contact Us', path: '/contact' },
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Terms & Conditions', path: '/terms' },
];

const SOCIAL_LINKS = [
  { icon: Twitter, href: 'https://twitter.com/togethers', label: 'Twitter', color: 'hover:text-[#1DA1F2]' },
  { icon: Instagram, href: 'https://instagram.com/togethers', label: 'Instagram', color: 'hover:text-[#E1306C]' },
  { icon: Linkedin, href: 'https://linkedin.com/company/togethers', label: 'LinkedIn', color: 'hover:text-[#0A66C2]' },
  { icon: Youtube, href: 'https://youtube.com/@togethers', label: 'YouTube', color: 'hover:text-[#FF0000]' },
  { icon: Github, href: 'https://github.com/togethers', label: 'GitHub', color: 'hover:text-gray-900' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setEmail('');
    toast.success('🎉 You\'re subscribed! Welcome to the TOGETHERS community.');
  };

  return (
    <footer className="bg-gray-950 text-gray-300">
      {/* Newsletter Banner */}
      <div className="gradient-hero border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Stay in the Loop 🚀
              </h2>
              <p className="text-white/70 text-lg">Get weekly updates on communities, events, creator tips, and platform news.</p>
            </div>
            <form onSubmit={handleNewsletter} className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-coral-400 transition-colors"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3.5 bg-coral-500 hover:bg-coral-600 text-white font-semibold rounded-xl transition-all hover-lift disabled:opacity-60 whitespace-nowrap"
              >
                {loading ? 'Joining...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <span className="text-white font-black text-base">T</span>
              </div>
              <span className="font-black text-2xl text-white" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>TOGETHERS</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              India's premier social collaboration platform connecting communities, creators, and teams. Unite, collaborate, and grow together.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={14} className="text-coral-500" />
                <span>Mumbai, India 🇮🇳</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Mail size={14} className="text-coral-500" />
                <a href="mailto:hello@togethers.in" className="hover:text-coral-400 transition-colors">hello@togethers.in</a>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Phone size={14} className="text-coral-500" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {[
            { title: 'Company', links: COMPANY_LINKS },
            { title: 'Product', links: PRODUCT_LINKS },
            { title: 'Creators', links: CREATOR_LINKS },
            { title: 'Support', links: SUPPORT_LINKS },
          ].map(section => (
            <div key={section.title}>
              <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map(link => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-400 text-sm hover:text-coral-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} TOGETHERS Technologies Pvt. Ltd. All rights reserved. Made with ❤️ in India.
            </p>
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`text-gray-500 ${color} transition-colors`}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
