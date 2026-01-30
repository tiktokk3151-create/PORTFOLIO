
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Award, Zap, Heart, GraduationCap, CheckCircle2, Building2, Globe, ShoppingBag, Calendar } from 'lucide-react';
import { useData } from '../DataContext';
import { AboutContentData, ExperienceItem } from '../types';
import { useLanguage } from '../LanguageContext';

// Enhanced 3D Icon Component with Pulsing Rings
const Icon3D = ({ icon: Icon, colorFrom, colorTo, delay }: { icon: any, colorFrom: string, colorTo: string, delay: number }) => (
  <div className="relative flex items-center justify-center w-24 h-24">
     {/* Pulsing Rings */}
     <motion.div
        className="absolute inset-0 rounded-[2rem] opacity-20 blur-md"
        style={{ background: `linear-gradient(135deg, ${colorFrom}, ${colorTo})` }}
        animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.2, 0, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: delay }}
     />
    
    <motion.div
      className="relative w-20 h-20 rounded-[1.5rem] flex items-center justify-center z-10 shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
      style={{
        background: `linear-gradient(135deg, ${colorFrom}, ${colorTo})`,
        borderTop: '1px solid rgba(255,255,255,0.5)',
        borderLeft: '1px solid rgba(255,255,255,0.5)',
        borderBottom: '1px solid rgba(0,0,0,0.2)',
        borderRight: '1px solid rgba(0,0,0,0.2)',
      }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay },
        default: { duration: 0.3 }
      }}
    >
      {/* Glossy Overlay */}
      <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-white/40 via-transparent to-black/10 pointer-events-none"></div>
      <div className="absolute top-2 left-2 w-6 h-3 bg-white/40 rounded-full blur-[2px] transform -rotate-12"></div>
      
      <div className="relative z-10 text-white drop-shadow-md">
        <Icon className="w-9 h-9" strokeWidth={2} />
      </div>
    </motion.div>
  </div>
);

// --- SECTIONS ---

const IntroSection = ({ content }: { content: AboutContentData['intro'] }) => {
    const { t } = useLanguage();
    return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-32 pt-24">
        {/* Left Column: Text Content */}
        <motion.div
            className="lg:col-span-7 order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-300 font-bold text-xs uppercase tracking-widest mb-6">
                <Heart className="w-4 h-4 fill-current" /> {content.badge}
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white mb-8 leading-[0.95] tracking-tight">
                {content.title1} 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-fuchsia-500 to-rose-500 dark:from-violet-400 dark:via-fuchsia-400 dark:to-rose-400 animate-text-shimmer bg-[length:200%_auto]"> {content.title2}</span> <br/>
                {content.title3} 
                <span className="relative inline-block ml-3">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 dark:from-amber-300 dark:via-orange-400 dark:to-red-400 animate-text-shimmer bg-[length:200%_auto]">{content.title4}</span>
                    <span className="absolute bottom-3 left-0 w-full h-6 bg-amber-400/20 -z-0 -rotate-2 skew-x-12"></span>
                </span>
            </h1>

            <div className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed font-medium">
                <p className="mb-6">
                  {content.desc1} <strong className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 font-extrabold">{content.desc2_highlight}</strong> {content.desc3}
                </p>
                <p>
                  {content.desc4}
                </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 border-t border-slate-200 dark:border-slate-800 pt-8">
                <div>
                   <h3 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 mb-2">7+</h3>
                   <p className="text-sm font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{content.stat_years}</p>
                </div>
                <div>
                   <h3 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 mb-2">3</h3>
                   <p className="text-sm font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{content.stat_companies}</p>
                </div>
                <div>
                   <h3 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 mb-2">100%</h3>
                   <p className="text-sm font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{content.stat_dedication}</p>
                </div>
            </div>
        </motion.div>

        {/* Right Column: Image Composition */}
        <motion.div
             className="lg:col-span-5 order-1 lg:order-2 relative"
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.2 }}
        >
             <div className="absolute top-10 right-10 w-full h-full bg-slate-200 dark:bg-slate-800 rounded-[3rem] -z-10 transform rotate-6 border border-slate-300 dark:border-slate-700"></div>
             <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full blur-2xl opacity-40"></div>
             
             <div className="relative rounded-[3rem] overflow-hidden shadow-2xl group border-[6px] border-white dark:border-slate-900">
                <img 
                   src={content.mainImage} 
                   alt="Profile" 
                   className="w-full h-[600px] object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60"></div>

                <div className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center text-green-600 dark:text-green-400">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 dark:text-white text-lg">{t('about.open_work')}</p>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">{t('about.ready_challenge')}</p>
                        </div>
                    </div>
                </div>
             </div>

             <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 w-24 h-24 bg-white dark:bg-slate-800 rounded-2xl shadow-xl flex items-center justify-center border border-slate-100 dark:border-slate-700 z-20"
             >
                 <Zap className="w-10 h-10 text-amber-500 fill-amber-500" />
             </motion.div>
        </motion.div>
    </div>
)};

const EducationSection = ({ content }: { content: AboutContentData['education'] }) => {
    const { t } = useLanguage();
    return (
    <div className="max-w-5xl mx-auto mb-32">
         <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-900 shadow-xl dark:shadow-none border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 md:p-12 relative overflow-hidden group"
         >
             <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100 dark:bg-slate-800 rounded-full blur-3xl -z-0 transform translate-x-1/2 -translate-y-1/2 transition-all duration-500 group-hover:bg-violet-100 dark:group-hover:bg-violet-900/20"></div>
             
             <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                <div className="w-24 h-24 bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-600/20 dark:to-indigo-600/20 text-violet-600 dark:text-violet-300 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-inner rotate-3">
                    <GraduationCap className="w-12 h-12" strokeWidth={1.5} />
                </div>
                <div className="text-center md:text-left flex-1">
                    <div className="text-sm font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest mb-2 flex items-center justify-center md:justify-start gap-2">
                       <Award className="w-4 h-4" /> {content.title}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2">{content.school}</h3>
                    <p className="text-xl text-slate-600 dark:text-slate-400">{content.major} <span className="font-bold text-slate-900 dark:text-white bg-violet-100 dark:bg-violet-900/50 px-2 py-0.5 rounded">{content.major_val}</span></p>
                </div>
                <div className="bg-white dark:bg-slate-800/50 px-8 py-4 rounded-2xl border border-slate-100 dark:border-slate-700 text-center shadow-lg">
                    <span className="block text-xs font-bold text-slate-400 uppercase mb-1">{content.grade}</span>
                    <span className="block text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">{content.grade_val}</span>
                </div>
             </div>
         </motion.div>
    </div>
)};

// Helpers for Experience Theme
const getExpTheme = (theme: string) => {
    switch(theme) {
        case 'purple': return { from: '#8B5CF6', to: '#EC4899', shadow: 'shadow-purple-500/30', border: 'group-hover:border-purple-500/50', gradient: 'from-violet-500 to-fuchsia-500' };
        case 'blue': return { from: '#3B82F6', to: '#06B6D4', shadow: 'shadow-blue-500/30', border: 'group-hover:border-blue-500/50', gradient: 'from-blue-500 to-cyan-500' };
        case 'green': return { from: '#10B981', to: '#14B8A6', shadow: 'shadow-emerald-500/30', border: 'group-hover:border-emerald-500/50', gradient: 'from-emerald-500 to-teal-500' };
        default: return { from: '#3B82F6', to: '#06B6D4', shadow: 'shadow-blue-500/30', border: 'group-hover:border-blue-500/50', gradient: 'from-blue-500 to-cyan-500' };
    }
}

const ExperienceSection = ({ content }: { content: AboutContentData['experience'] }) => {
    const { t } = useLanguage();
    return (
    <div className="max-w-5xl mx-auto mb-32">
        <div className="text-center mb-24 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-32 bg-gradient-to-r from-violet-500/20 via-transparent to-fuchsia-500/20 blur-3xl rounded-full"></div>
            <h3 className="text-5xl md:text-7xl font-black mb-6 relative z-10">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-300 dark:to-white animate-text-shimmer bg-[length:200%_auto] tracking-tight">
                  {content.title}
                </span>
            </h3>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-medium">{content.desc}</p>
        </div>
        
        <div className="relative space-y-24">
             <div className="absolute left-[47px] top-10 bottom-10 w-1 bg-slate-200 dark:bg-slate-800/50 rounded-full md:block hidden"></div>
             <div className="absolute left-[47px] top-10 bottom-10 w-1 bg-gradient-to-b from-violet-500 via-fuchsia-500 to-cyan-500 rounded-full hidden md:block opacity-50 blur-[1px]"></div>

            {content.items.map((item, index) => {
                const styles = getExpTheme(item.colorTheme);
                return (
                  <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className="relative flex flex-col md:flex-row gap-12 items-start group"
                  >
                      <div className="flex-shrink-0 relative z-20 mx-auto md:mx-0">
                         <Icon3D 
                            icon={Briefcase} 
                            colorFrom={styles.from} 
                            colorTo={styles.to} 
                            delay={index * 0.5} 
                         />
                      </div>

                      <motion.div 
                         whileHover={{ scale: 1.02, y: -5 }}
                         className={`flex-1 w-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700 rounded-[2.5rem] p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden z-10 ${styles.shadow}`}
                      >
                          <div className={`absolute inset-0 rounded-[2.5rem] border-2 border-transparent ${styles.border} transition-colors duration-500 pointer-events-none`}></div>
                          <div className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none`}></div>
                          
                          <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4 relative z-10">
                              <div>
                                  <h4 className={`text-3xl font-black text-slate-800 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${styles.gradient} mb-2 transition-all duration-300`}>{item.role}</h4>
                                  <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-bold text-lg tracking-wide">
                                     <div className={`p-1.5 rounded-lg bg-gradient-to-br ${styles.gradient} text-white`}>
                                       <Building2 className="w-4 h-4" /> 
                                     </div>
                                     {item.company}
                                  </div>
                              </div>
                              <span className={`self-start md:self-center px-6 py-2.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r ${styles.gradient} shadow-lg shadow-black/5`}>
                                  <Calendar className="w-4 h-4 inline-block mr-2 mb-0.5" />
                                  {item.year}
                              </span>
                          </div>

                          <div className="text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white text-lg leading-relaxed font-medium relative z-10 border-t border-slate-200 dark:border-slate-800 pt-8 pl-2 transition-colors duration-300 whitespace-pre-wrap">
                              {item.desc}
                          </div>
                      </motion.div>
                  </motion.div>
                );
            })}
        </div>
    </div>
)};

const HobbiesSection = ({ content }: { content: AboutContentData['hobbies'] }) => {
    const { t } = useLanguage();
    return (
    <div className="max-w-6xl mx-auto mt-32">
         <div className="text-center mb-16">
            <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-2">{content.title}</h3>
            <div className="h-1.5 w-20 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full mx-auto"></div>
         </div>
         
         <div className="flex flex-nowrap overflow-x-auto pb-12 gap-6 justify-start lg:justify-center px-4 snap-x">
            {content.items.map((hobby, idx) => (
                <motion.div
                    key={hobby.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, type: "spring" }}
                    className="flex-shrink-0 snap-center"
                >
                     <motion.div
                        whileHover={{ y: -10, scale: 1.05 }}
                        className={`group w-40 h-52 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 rounded-[2rem] p-4 shadow-xl dark:shadow-black/50 flex flex-col items-center justify-center text-center relative overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300`}
                     >
                        <div className={`w-24 h-24 mb-6 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-white/50 dark:border-white/10 group-hover:scale-110 transition-transform duration-500`}>
                            <motion.img 
                                src={hobby.image} 
                                alt={hobby.name}
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
                                className="w-16 h-16 object-contain drop-shadow-md"
                            />
                        </div>

                        <span className="font-bold text-slate-800 dark:text-slate-200">
                            {hobby.name}
                        </span>
                     </motion.div>
                </motion.div>
            ))}
         </div>
    </div>
)};

const About: React.FC = () => {
  const { aboutLayout, aboutContent } = useData();

  const renderSection = (id: string) => {
      switch(id) {
          case 'intro': return <IntroSection content={aboutContent.intro} />;
          case 'education': return <EducationSection content={aboutContent.education} />;
          case 'experience': return <ExperienceSection content={aboutContent.experience} />;
          case 'hobbies': return <HobbiesSection content={aboutContent.hobbies} />;
          default: return null;
      }
  };

  return (
    <div className="pb-20 min-h-screen bg-slate-50 dark:bg-[#0B0F19] transition-colors duration-500 relative overflow-hidden">
        
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
         <div className="absolute top-1/4 left-[-100px] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-1/4 right-[-100px] w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
         {aboutLayout
            .filter(section => section.visible)
            .map(section => (
                <React.Fragment key={section.id}>
                    {renderSection(section.id)}
                </React.Fragment>
            ))
         }
      </div>
    </div>
  );
};

export default About;
