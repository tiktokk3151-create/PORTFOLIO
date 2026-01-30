
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Layers, Zap, Palette, Code2, MousePointer2, Star, Sparkles, ArrowUpRight, ExternalLink, Cpu, Globe, Terminal, Layout } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { useData } from '../DataContext'; 
import { HomeContentData } from '../types';

// --- SHARED ANIMATION HELPERS ---
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 20,
    duration: 15 + Math.random() * 15,
    size: 2 + Math.random() * 4,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-violet-400/20 dark:bg-white/10 blur-[1px]"
          style={{
            left: `${p.x}%`,
            top: '100%',
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `float-particle ${p.duration}s linear infinite`,
            animationDelay: `-${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const InfiniteMarquee: React.FC<{ children: React.ReactNode; direction?: 'left' | 'right'; speed?: number }> = ({ children, direction = 'left', speed = 30 }) => {
  return (
    <div className="relative w-full overflow-hidden mask-gradient-x">
       <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-50 dark:from-[#0B0F19] to-transparent z-10 pointer-events-none" />
       <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-50 dark:from-[#0B0F19] to-transparent z-10 pointer-events-none" />
      <div className="flex w-max">
        <div className={`flex items-center gap-8 py-4 px-4 ${direction === 'left' ? 'animate-scroll' : 'animate-scroll-reverse'} hover:pause-animation`} style={{ animationDuration: `${speed}s` }}>
          {children}{children}
        </div>
        <div className={`flex items-center gap-8 py-4 px-4 ${direction === 'left' ? 'animate-scroll' : 'animate-scroll-reverse'} hover:pause-animation`} style={{ animationDuration: `${speed}s` }} aria-hidden="true">
          {children}{children}
        </div>
      </div>
    </div>
  );
};

// Text Variants
const sentenceVariants = { hidden: { opacity: 1 }, visible: { opacity: 1, transition: { delayChildren: 0.2, staggerChildren: 0.08 } } };
const letterVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const wordContainerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delayChildren: 1.5, staggerChildren: 0.05 } } };
const wordVariants = { hidden: { opacity: 0, y: 10, filter: 'blur(5px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)' } };
const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 2 } } };
const floatingAnimation = { initial: { y: 0, rotate: 0 }, animate: (custom: number) => ({ y: [0, -15, 0], rotate: [0, 2, -2, 0], transition: { duration: custom, ease: "easeInOut", repeat: Infinity } }) };
const cursorAnimation = { animate: { x: [0, 100, 100, 0, 0], y: [0, 50, -50, 0, 0], scale: [1, 0.9, 1, 0.9, 1], transition: { duration: 8, ease: "easeInOut", repeat: Infinity } } };
const marqueeVariants = { animate: { x: [0, -1000], transition: { x: { repeat: Infinity, repeatType: "loop", duration: 20, ease: "linear" } } } };

const AnimatedText = ({ text, className = "" }: { text: string, className?: string }) => (
  <motion.span className={`inline-block ${className}`} variants={sentenceVariants} initial="hidden" animate="visible">
    {text.split("").map((char, index) => ( <motion.span key={index} variants={letterVariants}>{char}</motion.span> ))}
  </motion.span>
);

const GradientText = ({ text }: { text: string }) => (
  <motion.span className="inline-block relative py-2 whitespace-nowrap" variants={sentenceVariants} initial="hidden" animate="visible">
     <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-500 dark:from-violet-400 dark:via-fuchsia-400 dark:to-amber-400 animate-text-shimmer bg-[length:200%_auto] filter drop-shadow-sm">
        {Array.from(text).map((char, index) => ( <motion.span key={index} variants={letterVariants}>{char}</motion.span> ))}
     </span>
     <span className="absolute inset-0 bg-gradient-to-r from-violet-600/30 via-fuchsia-500/30 to-amber-500/30 blur-2xl -z-10 opacity-50"></span>
  </motion.span>
);

// --- SECTIONS ---

// 1. HERO SECTION
const HeroSection = ({ content, cvUrl }: { content: HomeContentData['hero'], cvUrl: string }) => {
    const { t } = useLanguage();
    
    // Use dynamic content for rotating words if you want, or keep static. 
    // Here we use content.title2 as the primary "Gradient" text.
    
    return (
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
              <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 dark:bg-slate-800/40 border border-violet-200/50 dark:border-violet-700/30 backdrop-blur-md shadow-[0_0_20px_rgba(139,92,246,0.1)] mx-auto lg:mx-0">
                <span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span></span>
                <span className="text-xs font-bold text-violet-700 dark:text-violet-300 uppercase tracking-widest">{content.badge}</span>
              </motion.div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[1] tracking-tight text-slate-900 dark:text-white h-[200px] md:h-auto">
                <AnimatedText text={content.title1} className="whitespace-nowrap" /> <br />
                <span className="inline-block min-w-[300px]">
                     <GradientText text={content.title2} />
                </span>
                <br /><GradientText text={content.title3} />
              </h1>
              <motion.div className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium" variants={wordContainerVariants} initial="hidden" animate="visible">
                  {content.desc}
              </motion.div>
              <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <Link to="/projects" className="group relative px-8 py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold overflow-hidden transition-all shadow-xl hover:shadow-2xl hover:shadow-violet-500/40 hover:-translate-y-1">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center justify-center gap-2 group-hover:text-white">{t('home.btn_explore')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
                </Link>
                <a href={cvUrl || "/resume.pdf"} download="TranQuocTuan_CV.pdf" className="px-8 py-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 backdrop-blur-sm text-slate-700 dark:text-slate-200 hover:text-violet-600 dark:hover:text-white hover:border-violet-300 dark:hover:border-violet-500 transition-all font-bold shadow-sm hover:shadow-lg hover:shadow-violet-500/10 flex items-center justify-center gap-2">
                  {t('home.btn_cv')} <Layers className="w-5 h-5" />
                </a>
              </motion.div>
            </div>
            {/* Visuals */}
            <div className="relative order-1 lg:order-2 h-[500px] flex items-center justify-center perspective-[2000px]">
               <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
                  <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute inset-0 bg-gradient-to-tr from-violet-600/20 to-fuchsia-600/20 dark:from-violet-500/20 dark:to-emerald-500/20 rounded-full blur-[80px]" />
                  <motion.div variants={floatingAnimation} custom={6} initial="initial" animate="animate" className="absolute w-[85%] h-[60%] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/50 dark:border-slate-700 rounded-xl shadow-2xl z-10 flex flex-col overflow-hidden transform -rotate-y-12 rotate-x-6">
                     <div className="h-8 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 gap-2"><div className="w-2.5 h-2.5 rounded-full bg-red-400"></div><div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div><div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div></div>
                     <div className="flex-1 p-6 grid grid-cols-12 gap-4"><div className="col-span-3 bg-slate-100 dark:bg-slate-800 rounded-lg h-full opacity-50"></div><div className="col-span-9 space-y-4"><div className="flex gap-4"><div className="w-2/3 h-24 bg-gradient-to-r from-violet-100 to-fuchsia-100 dark:from-violet-500/20 dark:to-fuchsia-500/20 rounded-lg"></div><div className="w-1/3 h-24 bg-slate-100 dark:bg-slate-800 rounded-lg"></div></div><div className="grid grid-cols-3 gap-4"><div className="h-20 bg-slate-50 dark:bg-slate-800/50 rounded-lg"></div><div className="h-20 bg-slate-50 dark:bg-slate-800/50 rounded-lg"></div><div className="h-20 bg-slate-50 dark:bg-slate-800/50 rounded-lg"></div></div></div></div>
                  </motion.div>
                  <motion.div variants={floatingAnimation} custom={5} initial="initial" animate="animate" className="absolute right-0 bottom-12 w-[35%] h-[65%] bg-slate-900 dark:bg-black rounded-[2rem] border-4 border-slate-800 dark:border-slate-700 shadow-2xl z-20 overflow-hidden transform rotate-6">
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-b-xl z-30"></div>
                     <div className="w-full h-full bg-white dark:bg-slate-900 relative"><div className="p-4 space-y-4 pt-8"><div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 mb-4"></div><div className="h-4 w-3/4 bg-slate-100 dark:bg-slate-800 rounded"></div><div className="h-4 w-1/2 bg-slate-100 dark:bg-slate-800 rounded"></div><div className="h-32 w-full bg-indigo-50 dark:bg-indigo-500/10 rounded-xl mt-4"></div></div></div>
                  </motion.div>
                  <motion.div variants={floatingAnimation} custom={4} initial="initial" animate="animate" className="absolute left-0 top-20 bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 z-30 flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center text-white"><Palette size={20} /></div></motion.div>
                  <motion.div variants={floatingAnimation} custom={7} initial="initial" animate="animate" className="absolute right-10 top-10 bg-slate-800 text-white p-4 rounded-xl shadow-xl z-20 border border-slate-700 font-mono text-[10px]"><div className="flex items-center gap-2 text-emerald-400 mb-1"><Code2 size={12}/> TSX</div><div className="opacity-50">{'<Component />'}</div></motion.div>
                  <motion.div variants={cursorAnimation} animate="animate" className="absolute z-40"><MousePointer2 className="w-8 h-8 text-slate-900 dark:text-white fill-white dark:fill-slate-900 drop-shadow-xl" /></motion.div>
               </motion.div>
            </div>
          </div>
        </div>
      </section>
    );
};

// 2. ABOUT SECTION
const AboutSection = ({ content }: { content: HomeContentData['about'] }) => {
    const { t } = useLanguage();
    const aboutSkills = [
      { name: 'UI Design', icon: Palette, color: 'text-pink-500', bg: 'bg-pink-100 dark:bg-pink-500/20', border: 'border-pink-200 dark:border-pink-500/30' },
      { name: 'UX Research', icon: Layers, color: 'text-violet-500', bg: 'bg-violet-100 dark:bg-violet-500/20', border: 'border-violet-200 dark:border-violet-500/30' },
      { name: 'Frontend', icon: Code2, color: 'text-cyan-500', bg: 'bg-cyan-100 dark:bg-cyan-500/20', border: 'border-cyan-200 dark:border-cyan-500/30' },
      { name: 'Prototyping', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-500/20', border: 'border-amber-200 dark:border-amber-500/30' },
      { name: 'System', icon: Cpu, color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-500/20', border: 'border-emerald-200 dark:border-emerald-500/30' },
    ];
    return (
      <section className="py-32 relative overflow-hidden">
          <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
                  <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative perspective-[1000px]">
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-0 bg-gradient-to-tr from-violet-200 to-fuchsia-200 dark:from-violet-900/30 dark:to-fuchsia-900/30 rounded-[3rem] blur-xl opacity-60 scale-95" />
                      <div className="relative rounded-[2.5rem] overflow-hidden border border-white/40 dark:border-white/10 shadow-2xl group transform rotate-3 hover:rotate-0 transition-all duration-700">
                          <img src={content.image} alt="Profile" className="w-full h-[550px] object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-80"></div>
                      </div>
                      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-6 -right-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-5 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] border border-white/50 dark:border-white/10 flex items-center gap-4 z-20">
                          <div className="relative w-14 h-14"><div className="absolute inset-0 bg-violet-500 rounded-full opacity-20 animate-ping"></div><div className="relative w-full h-full bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-full flex items-center justify-center text-white shadow-lg"><span className="font-black text-xl">7+</span></div></div>
                          <div><p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-0.5">{t('about.stats_years')}</p><p className="font-bold text-slate-900 dark:text-white text-lg leading-none">Experience</p></div>
                      </motion.div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                      <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-fuchsia-100 to-pink-100 dark:from-fuchsia-500/10 dark:to-pink-500/10 text-fuchsia-600 dark:text-fuchsia-400 rounded-full text-xs font-bold uppercase tracking-widest border border-fuchsia-200 dark:border-fuchsia-500/20 shadow-sm">
                          <Star className="w-4 h-4 fill-current animate-spin-slow" /> {content.badge}
                      </motion.div>
                      <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-[1.1]">
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-500 dark:from-violet-400 dark:via-fuchsia-400 dark:to-amber-400 animate-text-shimmer bg-[length:200%_auto]">{content.title}</span>
                      </h2>
                      <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-medium">{content.desc}</p>
                      <div className="flex flex-wrap gap-3 mb-10">
                          {aboutSkills.map((skill, idx) => (
                              <motion.div key={idx} whileHover={{ scale: 1.05, y: -2 }} className={`pl-3 pr-4 py-2.5 rounded-xl ${skill.bg} ${skill.color} font-bold text-sm border ${skill.border} flex items-center gap-2 cursor-default transition-all shadow-sm hover:shadow-md`}>
                                  <motion.div whileHover={{ rotate: [0, -20, 20, 0] }} transition={{ duration: 0.5 }}><skill.icon className="w-4 h-4" strokeWidth={2.5} /></motion.div>{skill.name}
                              </motion.div>
                          ))}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/about" className="inline-flex items-center justify-center gap-2 text-white bg-slate-900 dark:bg-white dark:text-slate-900 px-8 py-4 rounded-2xl font-bold shadow-lg shadow-violet-500/10 hover:shadow-violet-500/30 hover:-translate-y-1 transition-all group overflow-hidden relative">
                            <span className="relative z-10 flex items-center gap-2">{t('home.about_btn')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
                            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-300 dark:to-fuchsia-300 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-100 transition-opacity duration-300"></div>
                        </Link>
                        <Link to="/contact" className="inline-flex items-center justify-center gap-2 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all hover:-translate-y-1">{t('nav.talk')}</Link>
                      </div>
                  </motion.div>
              </div>
          </div>
      </section>
    );
};

// 3. SKILLS SECTION
const SkillsSection = ({ content, t }: { content: HomeContentData['skills'], t: any }) => {
   const skills = {
    software: [
      { name: "Figma", image: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg", bg: "bg-purple-50 dark:bg-purple-900/20", shadow: "shadow-purple-500/20" },
      { name: "Prototype", image: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Joystick.png", bg: "bg-amber-50 dark:bg-amber-900/20", shadow: "shadow-amber-500/20" },
      { name: "Photoshop", image: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg", bg: "bg-blue-50 dark:bg-blue-900/20", shadow: "shadow-blue-500/20" },
      { name: "Illustrator", image: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg", bg: "bg-orange-50 dark:bg-orange-900/20", shadow: "shadow-orange-500/20" },
      { name: "React", image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg", bg: "bg-cyan-50 dark:bg-cyan-900/20", shadow: "shadow-cyan-500/20" },
      { name: "Tailwind", image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg", bg: "bg-sky-50 dark:bg-sky-900/20", shadow: "shadow-sky-500/20" },
      { name: "Motion", image: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Film%20Frames.png", bg: "bg-fuchsia-50 dark:bg-fuchsia-900/20", shadow: "shadow-fuchsia-500/20" },
      { name: "VS Code", image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg", bg: "bg-blue-50 dark:bg-blue-900/20", shadow: "shadow-blue-500/20" }
    ],
    expertise: [
      { name: t('home.skills.web'), image: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Desktop%20Computer.png", gradient: "from-cyan-400 to-teal-500", bg: "bg-cyan-50 dark:bg-cyan-900/20", shadow: "shadow-cyan-500/20", anim: { y: [0, -8, 0] } },
      { name: t('home.skills.mobile'), image: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Mobile%20Phone.png", gradient: "from-emerald-400 to-green-600", bg: "bg-emerald-50 dark:bg-emerald-900/20", shadow: "shadow-emerald-500/20", anim: { y: [0, -8, 0] } },
      { name: t('home.skills.landing'), image: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Laptop.png", gradient: "from-pink-500 to-rose-500", bg: "bg-pink-50 dark:bg-pink-900/20", shadow: "shadow-pink-500/20", anim: { scale: [1, 1.05, 1] } },
      { name: t('home.skills.system'), image: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Gear.png", gradient: "from-indigo-500 to-violet-600", bg: "bg-indigo-50 dark:bg-indigo-900/20", shadow: "shadow-indigo-500/20", anim: { rotate: 360, transition: { duration: 8, ease: "linear", repeat: Infinity } } },
    ]
  };

   return (
      <section className="py-24 relative z-10 overflow-hidden">
        <div className="absolute inset-0 z-0">
             <div className="absolute top-20 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] animate-blob"></div>
             <div className="absolute bottom-20 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                    {content.title1} <span className="text-violet-500">&</span>{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 animate-text-shimmer bg-[length:200%_auto]">{content.title2}</span>
                </motion.h2>
                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium">{content.desc}</motion.p>
            </div>
            <div className="mb-16">
                <InfiniteMarquee direction="left" speed={40}>
                    {skills.software.map((skill, idx) => (
                        <div key={idx} className="flex flex-col items-center justify-center w-[120px] md:w-[150px] flex-shrink-0 group">
                             <div className={`relative w-24 h-24 rounded-2xl ${skill.bg} flex items-center justify-center border border-white/50 dark:border-white/10 ${skill.shadow} mb-4 transition-transform duration-500 group-hover:scale-110`}><img src={skill.image} alt={skill.name} className="w-16 h-16 object-contain" /></div>
                             <span className="font-bold text-slate-700 dark:text-slate-300">{skill.name}</span>
                        </div>
                    ))}
                </InfiniteMarquee>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {skills.expertise.map((skill, idx) => (
                    <motion.div key={skill.name} initial={{ opacity: 0, y: 50, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.05, type: "spring", stiffness: 50 }} className="col-span-1">
                        <motion.div whileHover={{ y: -10, scale: 1.02 }} className={`group relative h-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-[2rem] p-6 shadow-xl hover:shadow-2xl dark:shadow-black/50 overflow-hidden cursor-pointer transition-all duration-300`}>
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${skill.gradient} transition-opacity duration-500`}></div>
                            <div className="flex flex-col items-center text-center space-y-6 relative z-10">
                                <div className={`relative w-28 h-28 rounded-2xl ${skill.bg} flex items-center justify-center border border-white/50 dark:border-white/10 ${skill.shadow} group-hover:shadow-lg transition-all duration-500`}>
                                    <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }} className="w-20 h-20 flex items-center justify-center">
                                        <motion.img src={skill.image} alt={skill.name} whileHover={skill.anim} transition={{ type: "spring", stiffness: 300, damping: 15 }} className="w-full h-full object-contain drop-shadow-xl filter saturate-100 group-hover:saturate-125 transition-all duration-300" />
                                    </motion.div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${skill.gradient} transition-colors">{skill.name}</h3>
                                    <div className={`h-1 w-12 mx-auto rounded-full bg-gradient-to-r ${skill.gradient} opacity-30 group-hover:w-full group-hover:opacity-100 transition-all duration-500`}></div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>
   );
}

// 4. FEATURED PROJECTS SECTION
const FeaturedSection = ({ content, projects, t }: { content: HomeContentData['featured'], projects: any[], t: any }) => {
    const featuredList = projects.filter(p => p.isFeatured);
    const displayProjects = featuredList.length > 0 ? featuredList : projects.slice(0, 3);
    const featuredProjects = displayProjects.slice(0, 3).map(p => ({
        id: p.id, title: p.title, category: p.category, image: p.image,
        gradient: "from-violet-500 to-fuchsia-500", accent: "text-fuchsia-400", border: "group-hover:border-fuchsia-500/50"
    }));

    // Simple gradient mapping
    if (featuredProjects[1]) { featuredProjects[1].gradient = "from-emerald-500 to-teal-500"; featuredProjects[1].accent = "text-emerald-400"; featuredProjects[1].border = "group-hover:border-emerald-500/50"; }
    if (featuredProjects[2]) { featuredProjects[2].gradient = "from-blue-500 to-cyan-500"; featuredProjects[2].accent = "text-cyan-400"; featuredProjects[2].border = "group-hover:border-cyan-500/50"; }

    return (
      <section className="py-24 bg-slate-50 dark:bg-black/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="absolute -left-20 top-20 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 relative z-10">
                <div>
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 rounded-full text-xs font-bold uppercase tracking-widest border border-indigo-200 dark:border-indigo-500/20">
                         <Sparkles className="w-4 h-4 fill-current" /> {content.badge}
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
                        {content.title1} <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400 animate-text-shimmer bg-[length:200%_auto]">{content.title2}</span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg max-w-lg">{content.desc}</p>
                </div>
                <Link to="/projects" className="group flex items-center gap-3 mt-6 md:mt-0 px-6 py-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-violet-500 dark:hover:border-violet-500/50 shadow-sm hover:shadow-lg hover:shadow-violet-500/10 transition-all">
                    <span className="font-bold text-slate-700 dark:text-slate-200 group-hover:text-violet-600 dark:group-hover:text-white transition-colors">{t('home.view_all')}</span>
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white transition-all"><ArrowRight className="w-4 h-4" /></div>
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProjects.map((item, index) => (
                    <Link to={`/projects/${item.id}`} key={item.id} className="block">
                        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.15 }} whileHover={{ y: -10 }} className={`group relative h-[450px] rounded-[2.5rem] overflow-hidden bg-slate-900 shadow-2xl border-2 border-transparent ${item.border} transition-all duration-500`}>
                            <div className="absolute inset-0"><img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" /> <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent opacity-90 transition-opacity duration-300"></div><div className={`absolute inset-0 bg-gradient-to-t ${item.gradient} opacity-0 group-hover:opacity-40 mix-blend-overlay transition-opacity duration-500`}></div></div>
                            <div className="absolute top-6 left-6 z-20"><span className={`px-4 py-1.5 backdrop-blur-md bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg`}>{item.category}</span></div>
                             <div className="absolute top-6 right-6 z-20 overflow-hidden"><motion.div initial={{ y: -50, opacity: 0 }} whileHover={{ y: 0, opacity: 1 }} className="w-12 h-12 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg transform translate-y-[-150%] group-hover:translate-y-0 transition-transform duration-300 ease-out"><ArrowUpRight className="w-6 h-6" /></motion.div><div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:hidden transition-opacity"><ExternalLink className="w-5 h-5" /></div></div>
                            <div className="absolute bottom-0 left-0 w-full p-8 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"><div className={`h-1 w-12 rounded-full bg-gradient-to-r ${item.gradient} mb-4`}></div><h3 className="text-3xl font-black text-white mb-2 leading-tight">{item.title}</h3><div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"><span className={`text-sm font-bold ${item.accent} flex items-center gap-1`}>{t('projects.view_details')} <ArrowRight className="w-4 h-4" /></span></div></div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
      </section>
    );
};

// 5. CTA SECTION
const CtaSection = ({ content, t }: { content: HomeContentData['cta'], t: any }) => {
    return (
      <section className="py-32 relative overflow-hidden">
         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative rounded-[3rem] overflow-hidden bg-slate-900 dark:bg-black border border-white/10 shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-transparent to-fuchsia-600/20 group-hover:from-violet-600/30 group-hover:to-fuchsia-600/30 transition-all duration-500"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]"></div>
                <div className="absolute top-1/2 -translate-x-1/2 left-1/2 w-full overflow-hidden opacity-5 select-none pointer-events-none">
                    <motion.div variants={marqueeVariants} animate="animate" className="whitespace-nowrap text-[10rem] md:text-[15rem] font-black text-white leading-none">LETS BUILD TOGETHER LETS BUILD TOGETHER LETS BUILD TOGETHER</motion.div>
                </div>
                <div className="relative z-10 py-24 px-4 md:px-12 lg:px-20 text-center">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }} className="inline-block mb-6">
                        <span className="px-6 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 font-bold tracking-widest uppercase text-sm shadow-[0_0_20px_rgba(139,92,246,0.3)]">{content.status}</span>
                    </motion.div>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tight leading-tight">
                        {content.title1} <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-400 animate-text-shimmer bg-[length:200%_auto]">{content.title2}</span>
                    </h2>
                    <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">{content.desc}</p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link to="/contact" className="group relative px-10 py-5 bg-white text-slate-900 rounded-2xl font-black text-xl overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transition-all hover:scale-105">
                            <span className="relative z-10 flex items-center gap-2">{t('home.cta_btn')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
                        </Link>
                        <a href="mailto:x6sumo1@gmail.com" className="px-10 py-5 rounded-2xl border border-white/20 hover:bg-white/10 text-white font-bold text-xl transition-all hover:scale-105 flex items-center gap-2">x6sumo1@gmail.com</a>
                    </div>
                </div>
            </motion.div>
         </div>
      </section>
    );
};

const Home: React.FC = () => {
  const { t } = useLanguage();
  const { projects, cvUrl, homeLayout, homeContent } = useData(); 

  // Function to render sections based on layout ID
  const renderSection = (id: string) => {
      switch (id) {
          case 'hero':
              return <HeroSection content={homeContent.hero} cvUrl={cvUrl} />;
          case 'about':
              return <AboutSection content={homeContent.about} />;
          case 'skills':
              return <SkillsSection content={homeContent.skills} t={t} />;
          case 'featured':
              return <FeaturedSection content={homeContent.featured} projects={projects} t={t} />;
          case 'cta':
              return <CtaSection content={homeContent.cta} t={t} />;
          default:
              return null;
      }
  };

  return (
    <div className="overflow-hidden bg-slate-50 dark:bg-[#0B0F19] transition-colors duration-500 relative">
      {/* 1. Global Decorative Grid & Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
         <FloatingParticles />
         <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-violet-500 opacity-20 blur-[100px] dark:opacity-30 animate-blob"></div>
         <div className="absolute right-0 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-fuchsia-500 opacity-10 blur-[120px] dark:opacity-20 animate-blob" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* RENDER DYNAMIC SECTIONS */}
      {homeLayout
        .filter(section => section.visible) // Only show visible sections
        .map(section => (
          <React.Fragment key={section.id}>
            {renderSection(section.id)}
          </React.Fragment>
        ))
      }

    </div>
  );
};

export default Home;
