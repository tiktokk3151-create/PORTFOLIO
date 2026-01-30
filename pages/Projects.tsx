
import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowUpRight, Sparkles, Filter, Globe, Smartphone, Palette, Cuboid as Cube, Tag } from 'lucide-react';
import { useData } from '../DataContext'; 
import { useLanguage } from '../LanguageContext';

// Helper for category icons
const getCategoryIcon = (cat: string) => {
    const lowerCat = cat.toLowerCase();
    if (lowerCat.includes('web')) return <Globe size={14} />;
    if (lowerCat.includes('mobile') || lowerCat.includes('app')) return <Smartphone size={14} />;
    if (lowerCat.includes('design') || lowerCat.includes('ui/ux')) return <Palette size={14} />;
    if (lowerCat.includes('blockchain') || lowerCat.includes('crypto')) return <Cube size={14} />;
    return <Tag size={14} />;
}

// Helper for Category Colors
const getCategoryColor = (cat: string) => {
    const lowerCat = cat.toLowerCase();
    if (lowerCat.includes('web')) return 'bg-cyan-500 text-white shadow-cyan-500/30';
    if (lowerCat.includes('mobile') || lowerCat.includes('app')) return 'bg-rose-500 text-white shadow-rose-500/30';
    if (lowerCat.includes('design')) return 'bg-amber-500 text-white shadow-amber-500/30';
    if (lowerCat.includes('blockchain')) return 'bg-violet-500 text-white shadow-violet-500/30';
    // Fallback random-ish distribution based on length
    if (cat.length % 3 === 0) return 'bg-emerald-500 text-white shadow-emerald-500/30';
    if (cat.length % 3 === 1) return 'bg-fuchsia-500 text-white shadow-fuchsia-500/30';
    return 'bg-blue-500 text-white shadow-blue-500/30';
}

const Projects: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const { t } = useLanguage();
  const { projects, categories } = useData(); 

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  // Combine static 'All' with dynamic categories
  const filterOptions = ['All', ...categories.map(c => c.name)];

  return (
    <div className="pt-24 pb-24 min-h-screen bg-slate-50 dark:bg-[#0B0F19] transition-colors duration-500 relative overflow-hidden">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
         <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-violet-500/5 to-transparent"></div>
         
         {/* Moving Blobs */}
         <motion.div 
            animate={{ x: [-100, 100, -100], y: [-50, 50, -50], scale: [1, 1.2, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[100px]"
         ></motion.div>
         <motion.div 
            animate={{ x: [50, -50, 50], y: [100, -100, 100], scale: [1, 1.1, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-40 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]"
         ></motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm backdrop-blur-md"
          >
             <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
             </span>
             <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest">{t('projects.badge')}</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight"
          >
            {t('projects.title')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-500 dark:from-violet-400 dark:via-fuchsia-400 dark:to-amber-400 animate-text-shimmer bg-[length:200%_auto]">{t('projects.title_suffix')}</span>
          </motion.h1>
        </div>

        {/* Filter Section */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
           <LayoutGroup>
              {filterOptions.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`relative px-6 py-2.5 rounded-full text-sm font-bold transition-colors duration-300 ${
                    filter === cat ? 'text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {filter === cat && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-slate-900 dark:bg-white rounded-full shadow-lg"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 flex items-center gap-2 ${filter === cat ? 'text-white dark:text-slate-900' : ''}`}>
                      {filter !== 'All' && getCategoryIcon(cat)}
                      {cat === 'All' ? t('projects.cats.All') : cat}
                  </span>
                </button>
              ))}
           </LayoutGroup>
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                key={project.id}
                className="group relative h-full"
              >
                  {/* Card Container */}
                  <Link to={`/projects/${project.id}`} className="block h-full relative z-10">
                     <div className="h-full bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-violet-500/20 dark:hover:shadow-violet-900/20 transition-all duration-500 group-hover:-translate-y-2 flex flex-col">
                        
                        {/* Image Section */}
                        <div className="relative aspect-[4/3] overflow-hidden">
                            <img 
                                src={project.image} 
                                alt={project.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Gradient Overlay on Image */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60"></div>
                            
                            {/* Floating Category Badge */}
                            <div className="absolute top-4 left-4">
                                <span className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg backdrop-blur-md ${getCategoryColor(project.category)}`}>
                                   {getCategoryIcon(project.category)} {project.category}
                                </span>
                            </div>

                            {/* Center Action Button (appears on hover) */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 transform scale-50 group-hover:scale-100 transition-transform duration-300">
                                    <ArrowUpRight className="w-8 h-8" />
                                </div>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-6 flex flex-col flex-grow relative bg-white dark:bg-[#121620]">
                            {/* Hover Border Gradient (bottom part) */}
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent group-hover:via-violet-500 transition-all duration-500"></div>

                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-1">
                                {project.title}
                            </h3>
                            
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">
                                {project.description}
                            </p>

                            <div className="mt-auto flex items-center justify-between">
                                {/* Tech Stack Pills */}
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.slice(0, 3).map((tech, i) => (
                                        <span key={i} className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide border border-slate-200 dark:border-slate-700 group-hover:border-violet-200 dark:group-hover:border-violet-500/30 transition-colors">
                                            {tech}
                                        </span>
                                    ))}
                                    {project.technologies.length > 3 && (
                                        <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                                            +{project.technologies.length - 3}
                                        </span>
                                    )}
                                </div>

                                {/* Link Icon */}
                                {project.link && (
                                   <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-violet-500 group-hover:bg-violet-50 dark:group-hover:bg-violet-500/10 transition-colors">
                                       <ExternalLink size={14} />
                                   </div>
                                )}
                            </div>
                        </div>
                     </div>
                     
                     {/* Glow Effect behind card */}
                     <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-[2.1rem] blur opacity-0 group-hover:opacity-30 transition duration-500 -z-10"></div>
                  </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
            <div className="text-center py-20">
                <div className="inline-block p-6 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                    <Filter className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">No projects found</h3>
                <p className="text-slate-500">Try selecting a different category.</p>
            </div>
        )}

      </div>
    </div>
  );
};

export default Projects;
