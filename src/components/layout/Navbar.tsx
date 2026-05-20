import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/contexts/NotificationContext';
import { Bell, Menu, X, ChevronDown, Search, LogOut, Settings, User, LayoutDashboard } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Communities', path: '/communities' },
  { label: 'Events', path: '/events' },
  { label: 'Collaboration', path: '/collaboration' },
  { label: 'Creators', path: '/creators' },
  { label: 'Marketplace', path: '/marketplace' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Blogs', path: '/blogs' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const DASHBOARD_ROUTES: Record<string, string> = {
  admin: '/dashboard/admin',
  creator: '/dashboard/creator',
  organizer: '/dashboard/organizer',
  team: '/dashboard/team',
  user: '/dashboard/user',
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
    setNotifOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardPath = () => {
    if (!user) return '/login';
    return DASHBOARD_ROUTES[user.role] || '/dashboard/user';
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-card border-b border-gray-100' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-coral">
              <span className="text-white font-black text-sm">T</span>
            </div>
            <span className="font-black text-xl tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              <span className="text-gradient-coral">TOGETHER</span>
              <span className="text-gray-900">S</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-coral-50 text-coral-600 font-semibold'
                    : `${isScrolled ? 'text-gray-700 hover:text-coral-600 hover:bg-coral-50' : 'text-white/90 hover:text-white hover:bg-white/10'}`
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {isAuthenticated && user ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => { setNotifOpen(!notifOpen); setUserMenuOpen(false); }}
                    className={`relative p-2 rounded-xl transition-all ${isScrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-white/80 hover:bg-white/10'}`}
                    aria-label="Notifications"
                  >
                    <Bell size={20} />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-coral-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse-glow">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </button>

                  {notifOpen && (
                    <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-card-hover border border-gray-100 z-50">
                      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                        <button onClick={markAllAsRead} className="text-xs text-coral-500 hover:text-coral-600 font-medium">Mark all read</button>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.slice(0, 6).map(n => (
                          <button
                            key={n.id}
                            onClick={() => markAsRead(n.id)}
                            className={`w-full text-left p-3 hover:bg-gray-50 flex items-start gap-3 transition-colors border-b border-gray-50 last:border-0 ${!n.read ? 'bg-coral-50/30' : ''}`}
                          >
                            {n.fromAvatar ? (
                              <img src={n.fromAvatar} alt={n.from} className="w-9 h-9 rounded-full flex-shrink-0 object-cover" />
                            ) : (
                              <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                                <Bell size={16} className="text-indigo-600" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-800 leading-snug">{n.message}</p>
                              <p className="text-xs text-gray-400 mt-1">{n.createdAt}</p>
                            </div>
                            {!n.read && <div className="w-2 h-2 bg-coral-500 rounded-full flex-shrink-0 mt-1" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => { setUserMenuOpen(!userMenuOpen); setNotifOpen(false); }}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all hover:bg-white/10"
                  >
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-coral-400" />
                    <span className={`text-sm font-medium hidden sm:block ${isScrolled ? 'text-gray-800' : 'text-white'}`}>{user.name.split(' ')[0]}</span>
                    <ChevronDown size={14} className={`${isScrolled ? 'text-gray-500' : 'text-white/70'}`} />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-card-hover border border-gray-100 z-50 py-2">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                      </div>
                      <Link to={getDashboardPath()} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-coral-50 hover:text-coral-600 transition-colors">
                        <LayoutDashboard size={16} /> Dashboard
                      </Link>
                      <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-coral-50 hover:text-coral-600 transition-colors">
                        <User size={16} /> Profile
                      </Link>
                      <Link to="/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-coral-50 hover:text-coral-600 transition-colors">
                        <Settings size={16} /> Settings
                      </Link>
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                          <LogOut size={16} /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login" className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white/90 hover:bg-white/10'}`}>
                  Sign In
                </Link>
                <Link to="/register" className="px-4 py-2 rounded-xl text-sm font-semibold bg-coral-500 text-white hover:bg-coral-600 transition-all shadow-coral hover-lift">
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`xl:hidden p-2 rounded-xl ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="xl:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive(link.path) ? 'bg-coral-50 text-coral-600 font-semibold' : 'text-gray-700 hover:bg-gray-50 hover:text-coral-600'}`}
              >
                {link.label}
              </Link>
            ))}
            {!isAuthenticated && (
              <div className="flex gap-2 pt-2 border-t border-gray-100 mt-2">
                <Link to="/login" className="flex-1 py-2.5 text-center rounded-xl text-sm font-semibold border border-gray-200 text-gray-700">Sign In</Link>
                <Link to="/register" className="flex-1 py-2.5 text-center rounded-xl text-sm font-semibold bg-coral-500 text-white">Get Started</Link>
              </div>
            )}
            {isAuthenticated && user && (
              <div className="pt-2 border-t border-gray-100">
                <Link to={getDashboardPath()} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-coral-50 text-coral-600 font-semibold text-sm">
                  <LayoutDashboard size={16} /> Go to Dashboard
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Overlay for menus */}
      {(userMenuOpen || notifOpen) && (
        <div className="fixed inset-0 z-40" onClick={() => { setUserMenuOpen(false); setNotifOpen(false); }} />
      )}
    </nav>
  );
}
