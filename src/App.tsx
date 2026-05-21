import { lazy, Suspense } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/ui-custom/ScrollToTop';

// Pages
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Communities from './pages/Communities';
import Events from './pages/Events';
import Collaboration from './pages/Collaboration';
import Creators from './pages/Creators';
import Marketplace from './pages/Marketplace';
import Pricing from './pages/Pricing';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/footer/Privacy';
import Terms from './pages/footer/Terms';
import Careers from './pages/footer/Careers';
import HelpCenter from './pages/footer/HelpCenter';

// Dashboards
import UserDashboard from './pages/dashboard/UserDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import CreatorDashboard from './pages/dashboard/CreatorDashboard';
import OrganizerDashboard from './pages/dashboard/OrganizerDashboard';
import TeamDashboard from './pages/dashboard/TeamDashboard';

// Creator Sub-Pages
import CreatorEvents from './pages/dashboard/creator/CreatorEvents';
import CreatorMonetization from './pages/dashboard/creator/CreatorMonetization';
import CreatorAnalytics from './pages/dashboard/creator/CreatorAnalytics';
import CreatorMessages from './pages/dashboard/creator/CreatorMessages';
import CreatorSettings from './pages/dashboard/creator/CreatorSettings';

const queryClient = new QueryClient();

// Pages that don't need Navbar/Footer (full-screen experiences)
const NO_CHROME_PATHS = ['/login', '/register', '/dashboard'];

function AppLayout() {
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner richColors position="top-right" />
      <AuthProvider>
        <NotificationProvider>
          <BrowserRouter>
            <ScrollToTop />
            <AppRoutes />
          </BrowserRouter>
        </NotificationProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

function AppRoutes() {
  return (
    <Routes>
      {/* Auth Routes — no navbar/footer */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard Routes — no navbar/footer */}
      <Route path="/dashboard/user" element={<UserDashboard />} />
      <Route path="/dashboard/user/*" element={<UserDashboard />} />
      <Route path="/dashboard/admin" element={<AdminDashboard />} />
      <Route path="/dashboard/admin/*" element={<AdminDashboard />} />
      <Route path="/dashboard/creator" element={<CreatorDashboard />} />
      <Route path="/dashboard/creator/events" element={<CreatorEvents />} />
      <Route path="/dashboard/creator/monetization" element={<CreatorMonetization />} />
      <Route path="/dashboard/creator/analytics" element={<CreatorAnalytics />} />
      <Route path="/dashboard/creator/messages" element={<CreatorMessages />} />
      <Route path="/dashboard/creator/settings" element={<CreatorSettings />} />
      <Route path="/dashboard/creator/community" element={<CreatorDashboard />} />
      <Route path="/dashboard/organizer" element={<OrganizerDashboard />} />
      <Route path="/dashboard/organizer/*" element={<OrganizerDashboard />} />
      <Route path="/dashboard/team" element={<TeamDashboard />} />
      <Route path="/dashboard/team/*" element={<TeamDashboard />} />

      {/* Public Routes — with navbar + footer */}
      <Route
        path="/*"
        element={
          <PublicLayout />
        }
      />
    </Routes>
  );
}

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/events" element={<Events />} />
          <Route path="/collaboration" element={<Collaboration />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
