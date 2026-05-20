import { Link } from 'react-router-dom';
import { Check, Zap, Crown, Building2 } from 'lucide-react';
import { PRICING_PLANS } from '@/data/mockData';
import SectionHeader from '@/components/ui-custom/SectionHeader';

const PLAN_ICONS = [Zap, Crown, Building2];

export default function PricingSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Pricing"
          title="Simple, Transparent "
          highlight="Pricing"
          subtitle="Start free. Scale as you grow. All prices in Indian Rupees."
        />

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PRICING_PLANS.map((plan, i) => {
            const Icon = PLAN_ICONS[i];
            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 border-2 transition-all hover-lift ${
                  plan.popular
                    ? 'border-coral-500 shadow-coral bg-gradient-to-b from-coral-50 to-white scale-105'
                    : 'border-gray-100 bg-white shadow-card hover:border-coral-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-coral-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-coral">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${plan.popular ? 'gradient-primary shadow-coral' : 'bg-gray-100'}`}>
                  <Icon size={22} className={plan.popular ? 'text-white' : 'text-gray-600'} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                <p className="text-gray-500 text-sm mb-6">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-5xl font-black text-gray-900">{plan.price === 0 ? '₹0' : `₹${plan.price.toLocaleString('en-IN')}`}</span>
                  <span className="text-gray-400 text-sm">/{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.popular ? 'bg-coral-100' : 'bg-gray-100'}`}>
                        <Check size={11} className={plan.popular ? 'text-coral-600' : 'text-gray-600'} />
                      </div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={plan.price === 0 ? '/register' : '/pricing'}
                  className={`block w-full text-center py-3.5 rounded-xl font-bold transition-all ${
                    plan.popular
                      ? 'bg-coral-500 hover:bg-coral-600 text-white shadow-coral hover-lift'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            );
          })}
        </div>

        <p className="text-center text-sm text-gray-400 mt-10">
          All plans include 14-day free trial. No credit card required for free plan. GST applicable on paid plans.
        </p>
      </div>
    </section>
  );
}
