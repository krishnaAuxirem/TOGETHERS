import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import PageTransition from '@/components/ui-custom/PageTransition';

const DEMO_ACCOUNTS = [
  { label: 'Admin', email: 'admin@togethers.com', icon: '👑' },
  { label: 'Creator', email: 'creator@togethers.com', icon: '🌟' },
  { label: 'Organizer', email: 'organizer@togethers.com', icon: '🎯' },
  { label: 'User', email: 'user@togethers.com', icon: '👤' },
  { label: 'Team', email: 'team@togethers.com', icon: '👥' },
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      toast.success('Welcome back! 🎉');
      navigate('/dashboard/user');
    } else {
      toast.error('Invalid email or password. Please register first or try a demo account.');
    }
  };

  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo123');
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex">
        {/* Left Panel */}
        <div className="hidden lg:flex lg:w-1/2 gradient-hero flex-col justify-center items-center p-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 right-20 w-64 h-64 bg-coral-500 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 left-20 w-64 h-64 bg-indigo-500 rounded-full blur-3xl animate-float-delayed" />
          </div>
          <div className="relative text-center text-white">
            <Link to="/" className="flex items-center gap-3 justify-center mb-10">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <span className="text-white font-black text-xl">T</span>
              </div>
              <span className="text-3xl font-black" style={{ fontFamily: 'Plus Jakarta Sans' }}>TOGETHERS</span>
            </Link>
            <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-white/70 text-lg mb-10">Your community is waiting for you.</p>

            <div className="glass rounded-3xl p-6 text-left">
              <p className="text-sm font-semibold text-white/80 mb-4">🔐 Demo Accounts (password: demo123)</p>
              {DEMO_ACCOUNTS.map(acc => (
                <button key={acc.email} onClick={() => handleDemoLogin(acc.email)} className="w-full text-left flex items-center gap-3 p-3 hover:bg-white/10 rounded-xl transition-colors mb-1">
                  <span className="text-xl">{acc.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-white">{acc.label}</p>
                    <p className="text-xs text-white/50">{acc.email}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-white">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
                <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center">
                  <span className="text-white font-black text-xs">T</span>
                </div>
                <span className="font-black text-lg text-gray-900">TOGETHERS</span>
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Plus Jakarta Sans' }}>Sign in to your account</h1>
              <p className="text-gray-500">Don't have an account? <Link to="/register" className="text-coral-500 hover:text-coral-600 font-semibold">Create one free</Link></p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
              <AlertCircle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-amber-800">First time?</p>
                <p className="text-amber-700">Please <Link to="/register" className="font-bold underline">register first</Link> or use a demo account from the left panel.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-400 focus:border-transparent transition-all text-gray-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-400 focus:border-transparent transition-all text-gray-900 pr-12"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-sm text-coral-500 hover:text-coral-600 font-medium">Forgot password?</Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 bg-coral-500 hover:bg-coral-600 text-white font-bold rounded-xl transition-all hover-lift shadow-coral disabled:opacity-60 disabled:cursor-not-allowed text-base"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <><LogIn size={18} /> Sign In</>
                )}
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
                <div className="relative text-center"><span className="bg-white px-4 text-sm text-gray-400">or continue with</span></div>
              </div>

              {['Google', 'LinkedIn'].map(provider => (
                <button key={provider} type="button" onClick={() => { toast.info(`${provider} auth coming soon!`); }} className="w-full flex items-center justify-center gap-3 py-3.5 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-xl transition-all font-semibold text-gray-700 text-sm">
                  <span>{provider === 'Google' ? '🔵' : '💼'}</span> Continue with {provider}
                </button>
              ))}
            </form>

            {/* Mobile demo */}
            <div className="lg:hidden mt-6 bg-gray-50 rounded-2xl p-4">
              <p className="text-xs font-semibold text-gray-500 mb-3">Quick Demo Login</p>
              <div className="flex flex-wrap gap-2">
                {DEMO_ACCOUNTS.map(acc => (
                  <button key={acc.email} onClick={() => handleDemoLogin(acc.email)} className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:border-coral-400 transition-colors">
                    {acc.icon} {acc.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
