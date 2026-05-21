import { useState } from 'react';
import { Settings, User, Bell, Shield, CreditCard, Globe, Palette, Save, Camera, Check } from 'lucide-react';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const SETTING_TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'privacy', label: 'Privacy & Security', icon: Shield },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'integrations', label: 'Integrations', icon: Globe },
];

const NOTIFICATION_OPTIONS = [
  { key: 'new_subscriber', label: 'New Subscriber', desc: 'When someone joins your premium community', default: true },
  { key: 'new_comment', label: 'New Comment', desc: 'When someone comments on your content', default: true },
  { key: 'event_rsvp', label: 'Event RSVP', desc: 'When someone registers for your event', default: true },
  { key: 'revenue_milestone', label: 'Revenue Milestones', desc: 'When you hit a revenue milestone', default: true },
  { key: 'weekly_report', label: 'Weekly Report', desc: 'Receive weekly analytics digest by email', default: false },
  { key: 'platform_updates', label: 'Platform Updates', desc: 'News and updates from TOGETHERS', default: false },
];

export default function CreatorSettings() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState<Record<string, boolean>>(
    Object.fromEntries(NOTIFICATION_OPTIONS.map(o => [o.key, o.default]))
  );
  const [profile, setProfile] = useState({
    name: user?.name || '',
    bio: 'Full-stack developer & tech educator. Building India\'s largest React community.',
    website: 'https://arjunmehta.dev',
    twitter: '@arjunmehta_dev',
    instagram: '@arjunmehta',
    youtube: 'ArjunMehtaDev',
    location: 'Mumbai, India',
    category: 'Technology',
  });

  if (!isAuthenticated || user?.role !== 'creator') return <Navigate to="/login" replace />;

  const handleSave = () => toast.success('Settings saved successfully!');
  const toggleNotif = (key: string) => setNotifications(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-500 mt-1">Manage your creator account, preferences, and integrations.</p>
          </div>

          <div className="flex gap-6">
            {/* Tabs Sidebar */}
            <div className="w-48 flex-shrink-0">
              <div className="glass-card rounded-2xl border border-gray-100 p-2">
                {SETTING_TABS.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-0.5 ${activeTab === tab.id ? 'bg-coral-50 text-coral-600 font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                    >
                      <Icon size={16} className={activeTab === tab.id ? 'text-coral-500' : 'text-gray-400'} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="glass-card rounded-2xl border border-gray-100 p-6">
                  <h2 className="font-bold text-gray-900 mb-6">Creator Profile</h2>

                  {/* Avatar */}
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                    <div className="relative">
                      <img src={user?.avatar} alt={user?.name} className="w-20 h-20 rounded-2xl object-cover" />
                      <button
                        onClick={() => toast.success('Photo upload opened!')}
                        className="absolute -bottom-1 -right-1 w-7 h-7 bg-coral-500 text-white rounded-xl flex items-center justify-center shadow-coral hover:bg-coral-600 transition-all"
                      >
                        <Camera size={13} />
                      </button>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user?.name}</p>
                      <p className="text-sm text-gray-400">Creator · {user?.email}</p>
                      <button onClick={() => toast.success('Profile photo upload opened!')} className="mt-1.5 text-xs text-coral-500 hover:text-coral-600 font-medium">
                        Change photo
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Display Name</label>
                        <input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-coral-400" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Location</label>
                        <input value={profile.location} onChange={e => setProfile({ ...profile, location: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-coral-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Bio</label>
                      <textarea value={profile.bio} onChange={e => setProfile({ ...profile, bio: e.target.value })} rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-coral-400 resize-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Website</label>
                      <input value={profile.website} onChange={e => setProfile({ ...profile, website: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-coral-400" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Twitter / X</label>
                        <input value={profile.twitter} onChange={e => setProfile({ ...profile, twitter: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-coral-400" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Instagram</label>
                        <input value={profile.instagram} onChange={e => setProfile({ ...profile, instagram: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-coral-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Creator Category</label>
                      <select value={profile.category} onChange={e => setProfile({ ...profile, category: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-coral-400">
                        <option>Technology</option>
                        <option>Business</option>
                        <option>Design</option>
                        <option>Finance</option>
                        <option>Wellness</option>
                        <option>Education</option>
                        <option>Entertainment</option>
                      </select>
                    </div>
                    <div className="pt-2">
                      <button onClick={handleSave} className="flex items-center gap-2 px-6 py-3 bg-coral-500 hover:bg-coral-600 text-white font-semibold rounded-xl transition-all shadow-coral text-sm">
                        <Save size={15} /> Save Profile
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="glass-card rounded-2xl border border-gray-100 p-6">
                  <h2 className="font-bold text-gray-900 mb-6">Notification Preferences</h2>
                  <div className="space-y-4">
                    {NOTIFICATION_OPTIONS.map(opt => (
                      <div key={opt.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{opt.label}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{opt.desc}</p>
                        </div>
                        <button
                          onClick={() => toggleNotif(opt.key)}
                          className={`w-11 h-6 rounded-full transition-all flex-shrink-0 relative ${notifications[opt.key] ? 'bg-coral-500' : 'bg-gray-200'}`}
                        >
                          <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${notifications[opt.key] ? 'left-5' : 'left-0.5'}`} />
                        </button>
                      </div>
                    ))}
                    <button onClick={handleSave} className="flex items-center gap-2 px-6 py-3 bg-coral-500 hover:bg-coral-600 text-white font-semibold rounded-xl transition-all shadow-coral text-sm mt-2">
                      <Save size={15} /> Save Preferences
                    </button>
                  </div>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === 'privacy' && (
                <div className="space-y-4">
                  <div className="glass-card rounded-2xl border border-gray-100 p-6">
                    <h2 className="font-bold text-gray-900 mb-4">Privacy Settings</h2>
                    <div className="space-y-3">
                      {[
                        { label: 'Public Profile', desc: 'Allow anyone to view your creator profile', enabled: true },
                        { label: 'Show Follower Count', desc: 'Display your follower count publicly', enabled: true },
                        { label: 'Allow DMs from non-members', desc: 'Non-members can send you direct messages', enabled: false },
                        { label: 'Show Revenue Stats', desc: 'Display your revenue badges on profile', enabled: false },
                      ].map(setting => (
                        <div key={setting.label} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{setting.label}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{setting.desc}</p>
                          </div>
                          <button
                            onClick={() => toast.success('Privacy setting updated!')}
                            className={`w-11 h-6 rounded-full transition-all flex-shrink-0 relative ${setting.enabled ? 'bg-coral-500' : 'bg-gray-200'}`}
                          >
                            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${setting.enabled ? 'left-5' : 'left-0.5'}`} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="glass-card rounded-2xl border border-red-100 bg-red-50/30 p-6">
                    <h3 className="font-bold text-red-700 mb-2">Danger Zone</h3>
                    <p className="text-sm text-gray-500 mb-4">Irreversible actions — proceed with caution.</p>
                    <div className="flex gap-3">
                      <button onClick={() => toast.error('Account deactivation requires email confirmation.')} className="px-4 py-2.5 border border-red-200 text-red-500 hover:bg-red-50 font-semibold rounded-xl transition-all text-sm">
                        Deactivate Account
                      </button>
                      <button onClick={() => toast.error('Account deletion requires contacting support.')} className="px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all text-sm">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Billing Tab */}
              {activeTab === 'billing' && (
                <div className="glass-card rounded-2xl border border-gray-100 p-6">
                  <h2 className="font-bold text-gray-900 mb-6">Billing & Payouts</h2>
                  <div className="bg-gradient-to-r from-coral-500 to-orange-500 rounded-2xl p-5 text-white mb-6">
                    <p className="text-sm font-medium text-white/80 mb-1">Creator Pro Plan</p>
                    <p className="text-3xl font-black">₹799<span className="text-lg font-normal text-white/70">/month</span></p>
                    <p className="text-sm text-white/70 mt-1">Next billing: July 1, 2025</p>
                    <div className="flex items-center gap-1.5 mt-3">
                      <Check size={14} className="text-white/80" />
                      <span className="text-sm text-white/80">Unlimited communities · Events · Analytics</span>
                    </div>
                  </div>
                  <div className="mb-6">
                    <p className="font-semibold text-gray-900 mb-3 text-sm">Payout Account</p>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                        <CreditCard size={18} className="text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm">HDFC Bank ···· 4521</p>
                        <p className="text-xs text-gray-400">Primary payout account</p>
                      </div>
                      <button onClick={() => toast.success('Bank details update form opened!')} className="text-xs text-coral-500 hover:text-coral-600 font-semibold">Edit</button>
                    </div>
                  </div>
                  <button onClick={() => toast.success('Billing portal opened!')} className="w-full py-3 border border-gray-200 hover:border-coral-400 text-gray-600 hover:text-coral-600 font-semibold rounded-xl transition-all text-sm">
                    Manage Subscription & Invoices
                  </button>
                </div>
              )}

              {/* Appearance Tab */}
              {activeTab === 'appearance' && (
                <div className="glass-card rounded-2xl border border-gray-100 p-6">
                  <h2 className="font-bold text-gray-900 mb-6">Appearance</h2>
                  <div className="space-y-5">
                    <div>
                      <p className="font-semibold text-gray-800 text-sm mb-3">Theme Mode</p>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { label: 'Light', desc: 'Clean & bright', active: true },
                          { label: 'Dark', desc: 'Easy on eyes', active: false },
                          { label: 'Auto', desc: 'System default', active: false },
                        ].map(theme => (
                          <button
                            key={theme.label}
                            onClick={() => toast.success(`${theme.label} mode selected!`)}
                            className={`p-4 rounded-xl border-2 text-left transition-all ${theme.active ? 'border-coral-500 bg-coral-50' : 'border-gray-200 hover:border-gray-300'}`}
                          >
                            <p className="font-semibold text-gray-900 text-sm">{theme.label}</p>
                            <p className="text-xs text-gray-400">{theme.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm mb-3">Accent Color</p>
                      <div className="flex gap-3">
                        {['#F97316', '#4F46E5', '#10B981', '#F59E0B', '#EC4899', '#06B6D4'].map(color => (
                          <button
                            key={color}
                            onClick={() => toast.success(`Accent color updated!`)}
                            className="w-9 h-9 rounded-xl border-2 border-white shadow-md hover:scale-110 transition-transform"
                            style={{ background: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Integrations Tab */}
              {activeTab === 'integrations' && (
                <div className="glass-card rounded-2xl border border-gray-100 p-6">
                  <h2 className="font-bold text-gray-900 mb-6">Connected Integrations</h2>
                  <div className="space-y-3">
                    {[
                      { name: 'YouTube', desc: 'Sync your YouTube videos to your creator page', connected: true, color: 'bg-red-100 text-red-600' },
                      { name: 'Instagram', desc: 'Cross-post content to Instagram automatically', connected: true, color: 'bg-pink-100 text-pink-600' },
                      { name: 'Razorpay', desc: 'Process payments and subscriptions', connected: true, color: 'bg-blue-100 text-blue-600' },
                      { name: 'Zoom', desc: 'Host webinars and virtual events', connected: false, color: 'bg-indigo-100 text-indigo-600' },
                      { name: 'Notion', desc: 'Share Notion pages with your community', connected: false, color: 'bg-gray-100 text-gray-700' },
                      { name: 'Mailchimp', desc: 'Sync subscriber emails for email campaigns', connected: false, color: 'bg-amber-100 text-amber-700' },
                    ].map(integration => (
                      <div key={integration.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${integration.color}`}>
                            {integration.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{integration.name}</p>
                            <p className="text-xs text-gray-400">{integration.desc}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => toast.success(integration.connected ? `${integration.name} disconnected!` : `${integration.name} connected!`)}
                          className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${integration.connected ? 'bg-emerald-50 text-emerald-600 hover:bg-red-50 hover:text-red-500' : 'bg-coral-50 text-coral-600 hover:bg-coral-500 hover:text-white'}`}
                        >
                          {integration.connected ? 'Connected' : 'Connect'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
