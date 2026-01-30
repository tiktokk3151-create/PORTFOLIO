
import React, { useEffect, useState, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUp, CheckCircle2, AlertCircle, Info, X, Loader2 } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import CustomCursor from './components/CustomCursor';
import { ThemeProvider } from './ThemeContext';
import { LanguageProvider } from './LanguageContext';
import { DataProvider, useData } from './DataContext';

// --- LAZY LOAD ADMIN MODULES (Code Splitting) ---
const AdminLogin = React.lazy(() => import('./pages/Admin/AdminLogin'));
const AdminLayout = React.lazy(() => import('./pages/Admin/AdminLayout'));
const Dashboard = React.lazy(() => import('./pages/Admin/Dashboard'));
const ProjectManager = React.lazy(() => import('./pages/Admin/ProjectManager'));
const ProfileManager = React.lazy(() => import('./pages/Admin/ProfileManager'));
const HomeManager = React.lazy(() => import('./pages/Admin/HomeManager'));
const AboutManager = React.lazy(() => import('./pages/Admin/AboutManager'));
const ContactManager = React.lazy(() => import('./pages/Admin/ContactManager'));
const InboxManager = React.lazy(() => import('./pages/Admin/InboxManager'));
const CategoryManager = React.lazy(() => import('./pages/Admin/CategoryManager'));
const Guideline = React.lazy(() => import('./pages/Admin/Guideline'));
const DevOpsCenter = React.lazy(() => import('./pages/Admin/DevOpsCenter'));

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Protected Route Component
const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const { isAuthenticated } = useData();
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

// Global Notification Toast
const NotificationToast = () => {
    const { notification, hideNotification } = useData();

    return (
        <AnimatePresence>
            {notification && (
                <motion.div
                    initial={{ opacity: 0, y: 50, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: 20, x: '-50%' }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="fixed bottom-8 left-1/2 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-md min-w-[300px] max-w-[90vw]"
                >
                    <div className={`
                        p-2 rounded-full flex-shrink-0
                        ${notification.type === 'success' ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : ''}
                        ${notification.type === 'error' ? 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400' : ''}
                        ${notification.type === 'info' ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400' : ''}
                    `}>
                        {notification.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
                        {notification.type === 'error' && <AlertCircle className="w-5 h-5" />}
                        {notification.type === 'info' && <Info className="w-5 h-5" />}
                    </div>
                    
                    <div className="flex-1 mr-2">
                        <p className="font-bold text-slate-900 dark:text-white text-sm">{notification.message}</p>
                    </div>

                    <button 
                        onClick={hideNotification}
                        className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Loading Fallback for Suspense
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0B0F19]">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="w-10 h-10 text-violet-600 animate-spin" />
      <p className="text-slate-500 text-sm font-bold animate-pulse">Loading modules...</p>
    </div>
  </div>
);

// Main App Content separate to use Hooks
const AppContent = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [showTopBtn, setShowTopBtn] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="flex flex-col min-h-screen font-sans antialiased transition-colors duration-300 relative cursor-none md:cursor-auto">
      {/* Global Notifications */}
      <NotificationToast />

      {/* Custom Cursor - Disable on Admin for usability */}
      {!isAdminRoute && <CustomCursor />}

      {/* Scroll Progress Bar - Disable on Admin */}
      {!isAdminRoute && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-500 origin-left z-[100]"
          style={{ scaleX }}
        ></motion.div>
      )}

      <ScrollToTop />
      
      {/* Conditionally render Navbar/Footer based on route */}
      {!isAdminRoute && <Navbar />}
      
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Routes - Eagerly Loaded for SEO/Speed */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Admin Routes - Lazy Loaded */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="inbox" element={<InboxManager />} />
              <Route path="devops" element={<DevOpsCenter />} />
              <Route path="home-manager" element={<HomeManager />} />
              <Route path="about-manager" element={<AboutManager />} />
              <Route path="contact-manager" element={<ContactManager />} />
              <Route path="projects" element={<ProjectManager />} />
              <Route path="categories" element={<CategoryManager />} />
              <Route path="profile" element={<ProfileManager />} />
              <Route path="guideline" element={<Guideline />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      
      {!isAdminRoute && <Footer />}

      {/* Back to Top Button */}
      {!isAdminRoute && (
        <motion.button
          onClick={goToTop}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: showTopBtn ? 1 : 0, scale: showTopBtn ? 1 : 0 }}
          className="fixed bottom-8 right-8 w-12 h-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-violet-600 dark:text-violet-400 rounded-full shadow-xl flex items-center justify-center z-40 hover:bg-violet-600 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-colors duration-300"
        >
            <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <DataProvider>
            <Router>
              <AppContent />
            </Router>
        </DataProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;