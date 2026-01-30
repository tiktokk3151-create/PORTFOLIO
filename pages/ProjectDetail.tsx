
import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Calendar, User, Code2, Layers, ArrowRight, Star, Share2, X, Maximize2, Sparkles, ChevronLeft, ChevronRight, Play, Heart, Check, MessageCircle } from 'lucide-react';
import { useData } from '../DataContext'; 
import { useLanguage } from '../LanguageContext';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const { language, t } = useLanguage();
  const { projects } = useData(); 
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Like Interaction State
  const [liked, setLiked] = useState(false);

  // Refs and State for Carousel
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const project = projects.find(p => p.id === Number(id));
  
  // Get other projects excluding current one
  const otherProjects = projects.filter(p => p.id !== Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
    setLiked(false); // Reset like state on page change
  }, [id]);

  // Handle "L" key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key.toLowerCase() === 'l') {
        setLiked(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Disable right click on specific elements
  const preventRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  // Auto Scroll Logic
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const autoScroll = setInterval(() => {
      if (!isPaused) {
        const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        // If we are close to the end, scroll back to start, otherwise scroll right
        if (scrollContainer.scrollLeft >= maxScrollLeft - 10) {
           scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
           // Scroll by roughly one card width + gap
           scrollContainer.scrollBy({ left: 400, behavior: 'smooth' });
        }
      }
    }, 3000); // 3 seconds interval

    return () => clearInterval(autoScroll);
  }, [isPaused]);

  // Manual Scroll Handler
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
        const scrollAmount = 400;
        scrollRef.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white relative overflow-hidden">
        <h2 className="text-4xl font-black mb-4 relative z-10">Project Not Found</h2>
        <button onClick={() => navigate('/projects')} className="px-6 py-3 rounded-full bg-violet-600 text-white font-bold hover:bg-violet-700 transition-all relative z-10">
          {t('projects.back')}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#0B0F19] min-h-screen transition-colors duration-500 pb-20 relative overflow-hidden">
      
      {/* Hero Image Parallax */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <motion.div style={{ y: y1 }} className="absolute inset-0 w-full h-full">
            <div className="absolute inset-0 bg-slate-900/40 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0B0F19] via-slate-900/20 to-transparent z-10 h-full w-full" />
            <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover select-none"
                onContextMenu={preventRightClick}
            />
        </motion.div>
        
        <div className="absolute bottom-0 left-0 w-full z-20 pb-16 pt-32 px-4 bg-gradient-to-t from-white dark:from-[#0B0F19] to-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Link to="/projects" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-white mb-6 transition-all group">
                        <div className="w-8 h-8 rounded-full bg-white/50 dark:bg-white/10 flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white transition-colors">
                            <ArrowLeft className="w-4 h-4" /> 
                        </div>
                        <span className="font-bold">{t('projects.back')}</span>
                    </Link>
                    
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <motion.h1 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white mb-4 drop-shadow-2xl leading-[0.9] tracking-tight"
                            >
                                <span className="bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-slate-800 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-500">
                                {project.title}
                                </span>
                            </motion.h1>
                            <div className="flex flex-wrap gap-3">
                                <span className="px-4 py-1.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-full text-sm font-bold shadow-lg shadow-violet-500/20 tracking-wide uppercase">
                                    {project.category}
                                </span>
                                {project.year && (
                                     <span className="px-4 py-1.5 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm font-bold">
                                        {project.year}
                                     </span>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
                {/* Description */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-slate-900/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl"
                >
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <Star className="w-5 h-5 text-amber-500 fill-amber-500" /> {t('projects.overview')}
                    </h3>
                    <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        {project.description}
                    </p>
                </motion.div>

                {/* Video Player Section */}
                {project.video && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white border-l-4 border-red-500 pl-4 flex items-center gap-2">
                            Demo Video <Play className="w-6 h-6 fill-current text-red-500" />
                        </h3>
                        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-black aspect-video relative group">
                            <video 
                                src={project.video} 
                                controls 
                                className="w-full h-full object-contain"
                                poster={project.image}
                            >
                                Trình duyệt của bạn không hỗ trợ thẻ video.
                            </video>
                        </div>
                    </motion.div>
                )}

                {/* Gallery - UPDATED: Clickable Lightbox + Protected Images */}
                <motion.div 
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     className="space-y-12"
                >
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white border-l-4 border-violet-500 pl-4">{t('projects.visuals')}</h3>
                    
                    <div className="flex flex-col gap-12">
                        {project.gallery?.map((img, idx) => (
                            <motion.div 
                                key={idx} 
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                onClick={() => setSelectedImage(img)}
                                className="relative group rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 cursor-zoom-in"
                            >
                                 {/* Hover Overlay with Zoom Icon */}
                                 <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-all z-10 duration-500 flex items-center justify-center">
                                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300">
                                        <Maximize2 className="w-10 h-10 text-white" />
                                    </div>
                                 </div>
                                 
                                 <img 
                                    src={img} 
                                    alt={`Visual Journey ${idx + 1}`} 
                                    className="w-full h-auto object-cover transform group-hover:scale-[1.01] transition-transform duration-700 ease-out select-none"
                                    loading="lazy"
                                    onContextMenu={preventRightClick} // Disable right click
                                />
                            </motion.div>
                        )) || (
                            <div className="w-full h-96 bg-slate-100 dark:bg-slate-800/50 rounded-[2.5rem] flex items-center justify-center text-slate-400 font-bold border-2 border-dashed border-slate-300 dark:border-slate-700">
                                Gallery Content Loading...
                            </div>
                        )}
                    </div>
                </motion.div>
                
                {/* --- THANKS FOR VISITING SECTION --- */}
                {project.thanksTitle && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center pt-24 pb-8"
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
                            {project.thanksTitle} <span className="inline-block animate-bounce">👋</span>
                        </h2>
                        
                        {project.thanksMessage && (
                            <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-8 max-w-2xl mx-auto">
                                {project.thanksMessage}
                            </h3>
                        )}

                        {project.thanksDescription && (
                            <p className="text-slate-500 dark:text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed mb-10 font-medium">
                                {project.thanksDescription}
                            </p>
                        )}
                        
                        {/* Interactive Like Component */}
                        <div className="flex items-center justify-center gap-3 mb-10 text-slate-900 dark:text-white font-bold text-lg select-none">
                            <span>Don't forget to</span>
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setLiked(!liked)}
                                className={`
                                    inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl transition-all duration-300 border
                                    ${liked
                                        ? 'bg-pink-500 text-white border-pink-600 shadow-lg shadow-pink-500/30'
                                        : 'bg-pink-50 dark:bg-pink-500/10 text-pink-500 border-pink-200 dark:border-pink-500/30 hover:border-pink-300 hover:shadow-sm'
                                    }
                                `}
                            >
                                <Heart className={`w-5 h-5 transition-colors duration-300 ${liked ? 'fill-white' : 'fill-pink-500'}`} />
                                <span className="tracking-wide">Press "L"</span>
                            </motion.button>
                            <span>to support the shot.</span>
                        </div>

                        {project.thanksLinkText && (
                            <div className="flex flex-col items-center gap-2">
                                <p className="text-slate-500 dark:text-slate-400 mb-2">I'm here with you today with a new design for stock.</p>
                                <a 
                                    href={project.thanksLinkUrl || "#"} 
                                    className="group relative inline-flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white pb-1"
                                >
                                    <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                                        <MessageCircle className="w-4 h-4" strokeWidth={3} />
                                    </div>
                                    {project.thanksLinkText}
                                    <span className="absolute bottom-0 left-8 right-0 h-0.5 bg-fuchsia-500 origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-300"></span>
                                    <span className="absolute bottom-0 left-8 right-0 h-0.5 bg-emerald-500 origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                                </a>
                            </div>
                        )}
                    </motion.div>
                )}

            </div>

            {/* Sidebar / Info */}
            <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="bg-white dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl shadow-violet-500/5"
                    >
                        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-800 pb-4 uppercase tracking-widest">{t('projects.details')}</h3>
                        
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                                    <User className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">{t('projects.client')}</p>
                                    <p className="font-bold text-lg text-slate-900 dark:text-white">{project.client || "Confidential"}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">{t('projects.year')}</p>
                                    <p className="font-bold text-lg text-slate-900 dark:text-white">{project.year || "2024"}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                                    <Share2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">{t('projects.role')}</p>
                                    <p className="font-bold text-lg text-slate-900 dark:text-white">{project.role || "Lead Developer"}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                             <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-widest">{t('projects.stack')}</h4>
                             <div className="flex flex-wrap gap-2">
                                {project.technologies.map(tech => (
                                    <span key={tech} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-violet-100 dark:hover:bg-violet-500/20 hover:text-violet-700 dark:hover:text-violet-300 transition-colors cursor-default border border-transparent hover:border-violet-200 dark:hover:border-violet-500/30">
                                        {tech}
                                    </span>
                                ))}
                             </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>

        {/* Other Projects Section - Horizontal Scroll */}
        <div className="mt-12 pt-12 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-violet-500" />
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white">
                        {language === 'vi' ? 'Các dự án khác' : 'Other Featured Projects'}
                    </h3>
                </div>
                
                {/* Navigation Buttons */}
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => scroll('left')}
                        className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-violet-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                        aria-label="Scroll Left"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={() => scroll('right')}
                        className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-violet-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                        aria-label="Scroll Right"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
            
            <motion.div 
                ref={scrollRef}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory hide-scrollbar cursor-grab active:cursor-grabbing"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {otherProjects.map((p, idx) => (
                    <Link 
                        key={p.id} 
                        to={`/projects/${p.id}`}
                        className="flex-shrink-0 w-[300px] md:w-[400px] snap-center group"
                    >
                        <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-4 border border-slate-200 dark:border-slate-800 shadow-lg">
                            <img 
                                src={p.image} 
                                alt={p.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 select-none"
                                onContextMenu={preventRightClick}
                            />
                            <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-bold border border-white/30 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                    {language === 'vi' ? 'Xem chi tiết' : 'View Project'}
                                </div>
                            </div>
                            <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold rounded-lg uppercase tracking-wider">
                                    {p.category}
                                </span>
                            </div>
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                            {p.title}
                        </h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">
                            {p.description}
                        </p>
                    </Link>
                ))}
            </motion.div>
        </div>

      </div>

      {/* Lightbox / Zoom Modal */}
      <AnimatePresence>
        {selectedImage && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
                onClick={() => setSelectedImage(null)}
            >
                {/* Close Button */}
                <button 
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-20"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Main Image */}
                <motion.img 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    src={selectedImage} 
                    alt="Zoomed Project View" 
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl select-none"
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
                    onContextMenu={preventRightClick} // Disable right click inside modal
                />
            </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ProjectDetail;
