
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Send, MessageCircle, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useData } from '../DataContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const { sendMessage, showNotification, contactContent } = useData();
  
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      subject: '',
      message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.name || !formData.email || !formData.message) {
          return;
      }

      setStatus('sending');
      
      // Simulate network delay for better UX
      setTimeout(() => {
          try {
            sendMessage({
                name: formData.name,
                email: formData.email,
                subject: formData.subject || 'Không có tiêu đề',
                message: formData.message
            });
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            showNotification('success', t('contact.success_msg'));
            
            // Reset status after 3 seconds
            setTimeout(() => setStatus('idle'), 3000);
          } catch (error) {
            setStatus('error');
            showNotification('error', t('contact.error_msg'));
          }
      }, 1000);
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50 dark:bg-[#0B0F19] flex items-center transition-colors duration-500 relative overflow-hidden">
        
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px]"></div>
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-32"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-bold uppercase tracking-widest">
                <MessageCircle className="w-4 h-4" /> {contactContent.badge}
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white mb-8 leading-[0.9]">
              {contactContent.title1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 animate-text-shimmer bg-[length:200%_auto]">{contactContent.title2}</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-xl mb-12 leading-relaxed font-light">
              {contactContent.desc}
            </p>

            <div className="space-y-6">
              {[
                { icon: Mail, title: t('contact.email'), value: contactContent.email, link: `mailto:${contactContent.email}`, color: "text-violet-500", bg: "bg-violet-100 dark:bg-violet-500/10" },
                { icon: Phone, title: t('contact.phone'), value: contactContent.phone, link: `tel:${contactContent.phone.replace(/\./g, '')}`, color: "text-rose-500", bg: "bg-rose-100 dark:bg-rose-500/10" },
                { icon: MapPin, title: t('contact.location'), value: contactContent.address, link: "#", color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-500/10" }
              ].map((item, idx) => (
                <a href={item.link} key={idx} className="flex items-center gap-6 group p-6 rounded-[2rem] bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-violet-200 dark:hover:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${item.color} ${item.bg} group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="w-7 h-7" />
                    </div>
                    <div>
                    <h3 className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-wider mb-1">{item.title}</h3>
                    <p className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-emerald-400 transition-colors">{item.value}</p>
                    </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="bg-white dark:bg-slate-900/80 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-black/50 relative"
          >
            {/* Form Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-cyan-500/5 rounded-[3rem] pointer-events-none"></div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">{contactContent.formTitle}</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">{t('contact.form_name')}</label>
                  <input type="text" id="name" value={formData.name} onChange={handleChange} required className="w-full bg-white dark:bg-black/40 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-violet-500 dark:focus:border-emerald-500 focus:ring-4 focus:ring-violet-500/10 dark:focus:ring-emerald-500/10 transition-all font-medium" placeholder={t('contact.placeholders.name')} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">{t('contact.form_email')}</label>
                  <input type="email" id="email" value={formData.email} onChange={handleChange} required className="w-full bg-white dark:bg-black/40 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-violet-500 dark:focus:border-emerald-500 focus:ring-4 focus:ring-violet-500/10 dark:focus:ring-emerald-500/10 transition-all font-medium" placeholder={t('contact.placeholders.email')} />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">{t('contact.form_subject')}</label>
                <input type="text" id="subject" value={formData.subject} onChange={handleChange} className="w-full bg-white dark:bg-black/40 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-violet-500 dark:focus:border-emerald-500 focus:ring-4 focus:ring-violet-500/10 dark:focus:ring-emerald-500/10 transition-all font-medium" placeholder={t('contact.placeholders.subject')} />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">{t('contact.form_message')}</label>
                <textarea id="message" rows={5} value={formData.message} onChange={handleChange} required className="w-full bg-white dark:bg-black/40 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-violet-500 dark:focus:border-emerald-500 focus:ring-4 focus:ring-violet-500/10 dark:focus:ring-emerald-500/10 transition-all resize-none font-medium" placeholder={t('contact.placeholders.message')}></textarea>
              </div>

              <div className="relative">
                 <button 
                    type="submit" 
                    disabled={status === 'sending' || status === 'success'}
                    className={`group w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl hover:shadow-violet-600/30 dark:hover:shadow-emerald-400/30 hover:-translate-y-1 text-lg ${status === 'success' ? 'bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white dark:text-white' : ''}`}
                 >
                    {status === 'idle' && <>{t('contact.form_send')} <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>}
                    {status === 'sending' && <><Loader2 className="w-5 h-5 animate-spin" /> {t('contact.form_sending')}</>}
                    {status === 'success' && <><CheckCircle2 className="w-5 h-5" /> {t('contact.form_sent')}</>}
                    {status === 'error' && <><AlertCircle className="w-5 h-5" /> {t('contact.form_error')}</>}
                 </button>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
