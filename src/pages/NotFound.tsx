import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md px-4">
        <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl font-black text-gray-300">404</span>
        </div>
        <h1 className="text-6xl font-black text-gray-900 mb-4" style={{ fontFamily: 'Plus Jakarta Sans' }}>404</h1>
        <h2 className="text-2xl font-bold text-gray-700 mb-3">Page Not Found</h2>
        <p className="text-gray-500 mb-8">Oops! The page you're looking for doesn't exist or has been moved.</p>
        <div className="flex gap-3 justify-center">
          <Link to="/" className="px-6 py-3 bg-coral-500 hover:bg-coral-600 text-white font-semibold rounded-xl transition-all hover-lift shadow-coral">
            Go Home
          </Link>
          <Link to="/communities" className="px-6 py-3 bg-white border border-gray-200 text-gray-700 hover:border-coral-400 font-semibold rounded-xl transition-all">
            Explore Communities
          </Link>
        </div>
      </div>
    </div>
  );
}
