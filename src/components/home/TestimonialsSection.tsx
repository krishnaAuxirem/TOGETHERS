import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/data/mockData';
import SectionHeader from '@/components/ui-custom/SectionHeader';

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const prev = () => {
    setDirection('left');
    setActive(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const next = () => {
    setDirection('right');
    setActive(i => (i + 1) % TESTIMONIALS.length);
  };

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="💬 Testimonials"
          title="What Our "
          highlight="Community Says"
          subtitle="Real stories from real people who transformed their lives with TOGETHERS."
        />

        <div className="max-w-4xl mx-auto">
          {/* Main testimonial */}
          <div className="glass-card rounded-3xl p-8 lg:p-12 mb-8 relative">
            <Quote className="absolute top-8 right-8 text-coral-100 w-16 h-16" />
            <div className="flex items-center gap-4 mb-6">
              <img
                src={TESTIMONIALS[active].avatar}
                alt={TESTIMONIALS[active].name}
                className="w-16 h-16 rounded-2xl object-cover shadow-card"
              />
              <div>
                <h4 className="font-bold text-gray-900 text-lg">{TESTIMONIALS[active].name}</h4>
                <p className="text-gray-500 text-sm">{TESTIMONIALS[active].role} · {TESTIMONIALS[active].location}</p>
                <div className="flex items-center gap-0.5 mt-1">
                  {Array.from({ length: TESTIMONIALS[active].rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400" fill="#F59E0B" />
                  ))}
                </div>
              </div>
            </div>
            <blockquote className="text-gray-700 text-lg leading-relaxed italic">
              "{TESTIMONIALS[active].text}"
            </blockquote>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all ${i === active ? 'w-8 bg-coral-500' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={prev} className="w-10 h-10 rounded-xl bg-white border border-gray-200 hover:border-coral-500 hover:text-coral-600 flex items-center justify-center transition-all">
                <ChevronLeft size={18} />
              </button>
              <button onClick={next} className="w-10 h-10 rounded-xl bg-coral-500 hover:bg-coral-600 text-white flex items-center justify-center transition-all">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Mini testimonial cards */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {TESTIMONIALS.filter((_, i) => i !== active).slice(0, 3).map(t => (
              <button key={t.id} onClick={() => setActive(TESTIMONIALS.indexOf(t))} className="text-left glass-card rounded-2xl p-4 hover-lift">
                <div className="flex items-center gap-3 mb-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 italic">"{t.text}"</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
