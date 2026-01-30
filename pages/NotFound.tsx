import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const NotFound: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] flex items-center justify-center relative overflow-hidden">
        
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 text-center px-4">
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative inline-block">
                <h1 className="text-[10rem] md:text-[14rem] font-black leading-none select-none tracking-tighter">
                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-slate-300 to-slate-50 dark:from-slate-700 dark:to-slate-900 relative z-10">404</span>
                    <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 blur-xl opacity-50 animate-pulse">404</span>
                </h1>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-violet-600 dark:text-white font-bold text-2xl md:text-4xl whitespace-nowrap bg-white/50 dark:bg-slate-900/50 backdrop-blur-md px-8 py-4 rounded-2xl border border-violet-200 dark:border-violet-900 shadow-xl">
                   <AlertTriangle className="inline-block w-8 h-8 mr-2 -mt-1 text-amber-500 animate-bounce" />
                   {t('notfound.title')}
                </div>
            </div>
        </motion.div>

        <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 dark:text-slate-400 mt-8 mb-12 max-w-lg mx-auto font-medium"
        >
            {t('notfound.desc')}
        </motion.p>

        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
        >
            <Link 
                to="/" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold shadow-lg hover:scale-105 hover:shadow-violet-500/25 transition-all"
            >
                <Home className="w-5 h-5" /> {t('notfound.btn')}
            </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;