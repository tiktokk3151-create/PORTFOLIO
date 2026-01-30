import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 pt-16 pb-12 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">GIN PORTFOLIO</span>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-3 max-w-xs">{t('footer.desc')}</p>
          </div>
          <div className="flex space-x-4">
            {[Github, Linkedin, Twitter, Mail].map((Icon, idx) => (
              <a 
                key={idx}
                href="#" 
                className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-emerald-400 hover:border-violet-200 dark:hover:border-emerald-500/30 hover:scale-110 transition-all duration-300 shadow-sm"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 dark:text-slate-500">
          <div className="flex items-center gap-2">
             <p>&copy; {new Date().getFullYear()} {t('footer.rights')}</p>
             <Link to="/admin" className="opacity-10 hover:opacity-100 transition-opacity duration-300 ml-2 text-xs font-medium hover:text-violet-500 dark:hover:text-violet-400">
               Admin
             </Link>
          </div>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-slate-800 dark:hover:text-slate-300 transition-colors">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;