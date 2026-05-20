import PageTransition from '@/components/ui-custom/PageTransition';
import PricingSection from '@/components/home/PricingSection';
import FAQSection from '@/components/home/FAQSection';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const FEATURE_COMPARISON = [
  { feature: 'Community Access', free: true, pro: true, business: true },
  { feature: 'Social Feed', free: true, pro: true, business: true },
  { feature: 'Direct Messaging', free: '10/day', pro: 'Unlimited', business: 'Unlimited' },
  { feature: 'Events Attended', free: 'Unlimited', pro: 'Unlimited', business: 'Unlimited' },
  { feature: 'Events Hosted', free: false, pro: '100/mo', business: 'Unlimited' },
  { feature: 'Premium Communities', free: false, pro: 'Up to 5', business: 'Unlimited' },
  { feature: 'Creator Monetization', free: false, pro: true, business: true },
  { feature: 'Revenue Analytics', free: false, pro: true, business: true },
  { feature: 'Team Dashboards', free: false, pro: false, business: true },
  { feature: 'Custom Branding', free: false, pro: false, business: true },
  { feature: 'API Access', free: false, pro: false, business: true },
  { feature: 'Priority Support', free: false, pro: true, business: '24/7 Dedicated' },
];

function FeatureValue({ value }: { value: boolean | string }) {
  if (value === true) return <Check size={18} className="text-emerald-500 mx-auto" />;
  if (value === false) return <span className="text-gray-300 text-lg mx-auto block text-center">—</span>;
  return <span className="text-sm text-gray-700 font-medium text-center block">{value}</span>;
}

export default function Pricing() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-white pt-20">
        {/* Hero */}
        <div className="gradient-hero py-20 text-center text-white">
          <div className="max-w-4xl mx-auto px-4">
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium mb-4 border border-white/20">💎 Transparent Pricing</span>
            <h1 className="text-6xl font-black mb-4" style={{ fontFamily: 'Plus Jakarta Sans' }}>Simple, Fair Pricing</h1>
            <p className="text-white/70 text-xl">All prices in Indian Rupees. Start free, upgrade anytime. No hidden fees.</p>
          </div>
        </div>

        <PricingSection />

        {/* Feature Comparison Table */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center" style={{ fontFamily: 'Plus Jakarta Sans' }}>Full Feature Comparison</h2>
            <div className="glass-card rounded-3xl overflow-hidden border border-gray-100">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left p-5 text-gray-500 font-medium text-sm">Features</th>
                    {['Community (Free)', 'Creator Pro (₹799/mo)', 'Business (₹2,499/mo)'].map(plan => (
                      <th key={plan} className="text-center p-5 text-gray-900 font-bold text-sm">{plan}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {FEATURE_COMPARISON.map((row, i) => (
                    <tr key={row.feature} className={`border-b border-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} hover:bg-coral-50/30 transition-colors`}>
                      <td className="p-5 text-sm text-gray-700 font-medium">{row.feature}</td>
                      <td className="p-5"><FeatureValue value={row.free} /></td>
                      <td className="p-5"><FeatureValue value={row.pro} /></td>
                      <td className="p-5"><FeatureValue value={row.business} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Enterprise CTA */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="glass-card rounded-3xl p-12 border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white">
              <span className="text-5xl mb-4 block">🏢</span>
              <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Plus Jakarta Sans' }}>Need Enterprise?</h2>
              <p className="text-gray-500 text-lg mb-8">Custom pricing for large organizations with 500+ users, white-label options, and dedicated infrastructure.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/contact" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all hover-lift">Contact Sales</Link>
                <Link to="/contact" className="px-8 py-4 bg-white border border-gray-200 hover:border-indigo-300 text-gray-700 font-bold rounded-2xl transition-all">Request Demo</Link>
              </div>
            </div>
          </div>
        </section>

        <FAQSection />
      </div>
    </PageTransition>
  );
}
