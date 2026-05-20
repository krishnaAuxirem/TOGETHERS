import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Eye, EyeOff, UserPlus, Check, User, Star, Target, Users } from 'lucide-react';
import { UserRole } from '@/types';
import PageTransition from '@/components/ui-custom/PageTransition';

const ROLES: { value: UserRole; label: string; desc: string; Icon: React.ElementType }[] = [
  { value: 'user', label: 'Community Member', desc: 'Join communities and attend events', Icon: User },
  { value: 'creator', label: 'Creator / Influencer', desc: 'Build audience and monetize content', Icon: Star },
  { value: 'organizer', label: 'Community Organizer', desc: 'Manage groups and organize events', Icon: Target },
  { value: 'team', label: 'Team / Family', desc: 'Collaborate with your team privately', Icon: Users },
];

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>('user');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const passwordStrength = (): { level: number; label: string; color: string } => {
    if (!password) return { level: 0, label: '', color: '' };
    if (password.length < 6) return { level: 1, label: 'Weak', color: 'bg-red-400' };
    if (password.length < 10) return { level: 2, label: 'Fair', color: 'bg-amber-400' };
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) return { level: 4, label: 'Strong', color: 'bg-emerald-500' };
    return { level: 3, label: 'Good', color: 'bg-blue-500' };
  };

  const strength = passwordStrength();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (!agreed) {
      toast.error('Please agree to the Terms & Conditions');
      return;
    }
    setLoading(true);
    const success = await register(name, email, password, role);
    setLoading(false);
    if (success) {
      toast.success('Account created successfully! Welcome to TOGETHERS!');
      const dashboardRoutes: Record<UserRole, string> = {
        admin: '/dashboard/admin',
        creator: '/dashboard/creator',
        organizer: '/dashboard/organizer',
        team: '/dashboard/team',
        user: '/dashboard/user',
      };
      navigate(dashboardRoutes[role]);
    } else {
      toast.error('This email is already registered. Please login instead.');
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex">
        {/* Left Panel */}
        <div className="hidden lg:flex lg:w-1/2 gradient-hero flex-col justify-center items-center p-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-64 h-64 bg-coral-500 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 right-20 w-64 h-64 bg-indigo-500 rounded-full blur-3xl animate-float-delayed" />
          </div>
          <div className="relative text-center text-white">
            <Link to="/" className="flex items-center gap-3 justify-center mb-8">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <span className="text-white font-black text-xl">T</span>
              </div>
              <span className="text-3xl font-black" style={{ fontFamily: 'Plus Jakarta Sans' }}>TOGETHERS</span>
            </Link>
            <h2 className="text-4xl font-bold mb-4">Join 1M+ Members</h2>
            <p className="text-white/70 text-lg mb-10">India's fastest-growing community platform.</p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { stat: '50K+', label: 'Communities' },
                { stat: '12K', label: 'Daily Events' },
                { stat: 'Rs.10Cr+', label: 'Creator Revenue' },
                { stat: '94%', label: 'Satisfaction Rate' },
              ].map(s => (
                <div key={s.label} className="glass rounded-2xl p-4 text-center">
                  <div className="text-xl font-bold text-white">{s.stat}</div>
                  <div className="text-xs text-white/60">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-white overflow-y-auto">
          <div className="w-full max-w-md py-8">
            <div className="mb-6">
              <Link to="/" className="flex items-center gap-2 mb-6 lg:hidden">
                <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center">
                  <span className="text-white font-black text-xs">T</span>
                </div>
                <span className="font-black text-lg text-gray-900">TOGETHERS</span>
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Plus Jakarta Sans' }}>Create your account</h1>
              <p className="text-gray-500">Already have one? <Link to="/login" className="text-coral-500 hover:text-coral-600 font-semibold">Sign in</Link></p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">I want to join as...</label>
                <div className="grid grid-cols-2 gap-2">
                  {ROLES.map(r => {
                    const RoleIcon = r.Icon;
                    return (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => setRole(r.value)}
                        className={`relative text-left p-3 rounded-xl border-2 transition-all ${role === r.value ? 'border-coral-500 bg-coral-50' : 'border-gray-100 hover:border-gray-200 bg-gray-50'}`}
                      >
                        {role === r.value && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-coral-500 rounded-full flex items-center justify-center">
                            <Check size={11} className="text-white" />
                          </div>
                        )}
                        <RoleIcon size={18} className="mb-1 text-coral-500" />
                        <p className="font-semibold text-gray-900 text-xs">{r.label}</p>
                        <p className="text-xs text-gray-400 mt-0.5 leading-tight">{r.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-400 focus:border-transparent transition-all" required />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-400 focus:border-transparent transition-all" required />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 6 characters" className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-400 focus:border-transparent transition-all pr-12" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {password && (
                  <div className="mt-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map(l => (
                        <div key={l} className={`h-1 flex-1 rounded-full ${l <= strength.level ? strength.color : 'bg-gray-100'} transition-all`} />
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Strength: {strength.label}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Repeat your password" className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-400 focus:border-transparent transition-all" required />
              </div>

              <div className="flex items-start gap-3">
                <button type="button" onClick={() => setAgreed(!agreed)} className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${agreed ? 'bg-coral-500 border-coral-500' : 'border-gray-300'}`}>
                  {agreed && <Check size={12} className="text-white" />}
                </button>
                <p className="text-sm text-gray-600">
                  I agree to TOGETHERS{' '}
                  <Link to="/terms" className="text-coral-500 hover:underline font-medium">Terms & Conditions</Link> and{' '}
                  <Link to="/privacy" className="text-coral-500 hover:underline font-medium">Privacy Policy</Link>
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 bg-coral-500 hover:bg-coral-600 text-white font-bold rounded-xl transition-all hover-lift shadow-coral disabled:opacity-60 text-base"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><UserPlus size={18} /> Create Account</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
