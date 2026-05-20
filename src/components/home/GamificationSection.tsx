import { Trophy, Star, Zap, Award, Target, Medal } from 'lucide-react';
import SectionHeader from '@/components/ui-custom/SectionHeader';

const BADGES = [
  { icon: Trophy, label: 'Community Champion', desc: '1000+ contributions', color: 'from-amber-400 to-yellow-500', glow: 'shadow-amber-200' },
  { icon: Star, label: 'Top Creator', desc: '10K+ followers', color: 'from-coral-400 to-orange-500', glow: 'shadow-coral-200' },
  { icon: Zap, label: 'Event Organizer', desc: '50+ events hosted', color: 'from-indigo-400 to-violet-500', glow: 'shadow-indigo-200' },
  { icon: Award, label: 'Super Connector', desc: '500+ connections', color: 'from-emerald-400 to-teal-500', glow: 'shadow-emerald-200' },
  { icon: Target, label: 'Goal Crusher', desc: 'All goals completed', color: 'from-pink-400 to-rose-500', glow: 'shadow-pink-200' },
  { icon: Medal, label: 'Early Adopter', desc: 'Joined in first 1K', color: 'from-cyan-400 to-blue-500', glow: 'shadow-cyan-200' },
];

const LEADERBOARD = [
  { rank: 1, name: 'Arjun Mehta', points: 48920, avatar: 'https://i.pravatar.cc/150?img=12', badge: '🏆' },
  { rank: 2, name: 'Meera Nair', points: 42150, avatar: 'https://i.pravatar.cc/150?img=35', badge: '🥈' },
  { rank: 3, name: 'Vikram Reddy', points: 38400, avatar: 'https://i.pravatar.cc/150?img=22', badge: '🥉' },
  { rank: 4, name: 'Priya Sharma', points: 34200, avatar: 'https://i.pravatar.cc/150?img=47', badge: '⭐' },
  { rank: 5, name: 'Aditya Joshi', points: 28900, avatar: 'https://i.pravatar.cc/150?img=15', badge: '⭐' },
];

export default function GamificationSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-80 h-80 bg-coral-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-500 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="🎮 Gamification"
          title="Earn Badges, "
          highlight="Level Up"
          subtitle="Get rewarded for every contribution, event, and connection. The more you engage, the more you earn."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Badges Grid */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white/90">Achievement Badges</h3>
            <div className="grid grid-cols-3 gap-4">
              {BADGES.map((badge, i) => {
                const Icon = badge.icon;
                return (
                  <div key={i} className="glass rounded-2xl p-4 text-center hover-lift group cursor-pointer">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${badge.color} shadow-lg ${badge.glow} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon size={26} className="text-white" />
                    </div>
                    <p className="text-xs font-semibold text-white/90 mb-0.5">{badge.label}</p>
                    <p className="text-xs text-white/50">{badge.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Leaderboard */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white/90">🏆 Weekly Leaderboard</h3>
            <div className="space-y-3">
              {LEADERBOARD.map(entry => (
                <div key={entry.rank} className={`flex items-center gap-4 glass rounded-2xl p-4 hover-lift ${entry.rank === 1 ? 'border border-amber-400/30 bg-amber-400/5' : ''}`}>
                  <div className="w-8 text-center">
                    <span className="text-xl">{entry.badge}</span>
                  </div>
                  <img src={entry.avatar} alt={entry.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-white text-sm">{entry.name}</p>
                    <div className="h-1.5 bg-white/10 rounded-full mt-1.5 overflow-hidden">
                      <div
                        className="h-full gradient-primary rounded-full"
                        style={{ width: `${(entry.points / LEADERBOARD[0].points) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-coral-400">{entry.points.toLocaleString()}</p>
                    <p className="text-xs text-white/40">pts</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 glass rounded-2xl p-5 border border-coral-400/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold">#42</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">Your Rank</p>
                  <p className="text-xs text-white/50">1,240 points this week</p>
                </div>
                <span className="text-xs text-emerald-400 font-semibold">↑ 8 ranks</span>
              </div>
              <p className="text-xs text-white/60">Keep engaging to climb the leaderboard and unlock exclusive rewards!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
