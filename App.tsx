import React from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AppProvider, useAppState } from './state';
import { Shield, User, Lock } from 'lucide-react';
import LandingPage from './pages/Landing';
import BookingPage from './pages/Booking';
import ConfirmationPage from './pages/Confirmation';
import AdminDashboard from './pages/AdminDashboard';
import ROISummary from './pages/ROISummary';
import DemoGuide from './components/DemoGuide';

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const { isAdminView, toggleAdminView, demo, startDemo, stopDemo } = useAppState();
  const location = useLocation();
  const navigate = useNavigate();

  // Effect to handle view switching based on state if needed,
  // but we rely mainly on the user clicking the toggle.
  React.useEffect(() => {
     if (isAdminView && !location.pathname.startsWith('/admin')) {
         navigate('/admin');
     } else if (!isAdminView && location.pathname.startsWith('/admin')) {
         navigate('/');
     }
  }, [isAdminView, location.pathname, navigate]);

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900">
      {/* Top Mock Browser Bar for Demo Context */}
      <div className="bg-gray-900 text-gray-400 text-xs py-1 px-4 flex justify-between items-center">
        <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="bg-gray-800 px-4 py-0.5 rounded-full flex items-center text-gray-300">
            <Lock size={10} className="mr-1" /> drivemate.demo.app
        </div>
        <div>PROTOTYPE MODE</div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => !demo.isActive && navigate('/')}>
             <div className="bg-navy p-1.5 rounded-lg mr-2">
                <Shield className="text-white w-5 h-5" />
             </div>
             <span className="text-xl font-bold text-navy tracking-tight">DriveMate</span>
          </div>

          <div className="flex items-center space-x-4">
             {!demo.isActive ? (
                 <button
                     onClick={startDemo}
                     className="hidden sm:flex items-center px-3 py-1.5 text-sm font-medium text-navy bg-blue-50 rounded-full hover:bg-blue-100 transition-colors"
                 >
                   ▶ Start Guided Demo
                 </button>
             ) : (
                  <button
                     onClick={stopDemo}
                     className="flex items-center px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 rounded-full hover:bg-red-100 transition-colors"
                 >
                   ■ Stop Demo
                 </button>
             )}

            <button
              onClick={toggleAdminView}
              className={`flex items-center px-3 py-1.5 text-sm font-medium rounded-full transition-all border ${
                isAdminView
                  ? 'bg-navy text-white border-navy'
                  : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
              } ${demo.isActive && (demo.currentStep === 4 || demo.currentStep === 7) ? 'ring-4 ring-yellow-400 animate-pulse' : ''}`}
            >
              <User size={16} className="mr-2" />
              {isAdminView ? 'Admin View' : 'Customer View'}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow bg-gray-50 relative">
        {children}
      </main>

      {/* Demo Overlay Guide */}
      <DemoGuide />

      {/* Footer */}
      {!isAdminView && (
        <footer className="bg-white py-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>© 2025 DriveMate. For demo purposes only.</p>
          <button onClick={() => navigate('/roi')} className="mt-2 text-navy hover:underline">
              Why Digitize? (ROI Summary)
          </button>
        </footer>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/book" element={<BookingPage />} />
            <Route path="/confirmation/:id" element={<ConfirmationPage />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/roi" element={<ROISummary />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </HashRouter>
    </AppProvider>
  );
}