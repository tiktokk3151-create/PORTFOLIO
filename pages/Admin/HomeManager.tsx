
import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../../DataContext';
import { useLanguage } from '../../LanguageContext';
import { Reorder, motion, AnimatePresence } from 'framer-motion';
import { GripVertical, Eye, EyeOff, Edit, ChevronDown, ChevronUp, Save, CheckCircle2, Upload, Loader2, Image as ImageIcon } from 'lucide-react';
import { HomeSectionConfig, HomeContentData } from '../../types';

const HomeManager: React.FC = () => {
  const { homeLayout, updateHomeLayout, homeContent, updateAllHomeContent } = useData();
  const { language, toggleLanguage } = useLanguage(); 
  
  const [items, setItems] = useState<HomeSectionConfig[]>(homeLayout);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [localContent, setLocalContent] = useState<HomeContentData>(homeContent);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
      setItems(homeLayout);
  }, [homeLayout]);

  // CRITICAL FIX: Sync Content from Context when it finishes loading from LocalStorage
  useEffect(() => {
      setLocalContent(homeContent);
  }, [homeContent]);
  
  // Sync when saving
  const handleSave = () => {
      // 1. Save Layout Order
      updateHomeLayout(items);
      
      // 2. Save Content - ONE SHOT to avoid race conditions
      updateAllHomeContent(localContent);

      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
  };

  const toggleVisibility = (id: string) => {
      const newItems = items.map(item => 
          item.id === id ? { ...item, visible: !item.visible } : item
      );
      setItems(newItems);
  };

  const updateField = (section: keyof HomeContentData, field: string, value: string) => {
      setLocalContent(prev => ({
          ...prev,
          [section]: {
              ...prev[section],
              [field]: value
          }
      }));
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (file.size > 2 * 1024 * 1024) { 
          alert("Ảnh quá lớn! Vui lòng chọn ảnh < 2MB.");
          return;
      }

      setIsUploading(true);
      try {
          const base64 = await convertFileToBase64(file);
          updateField('about', 'image', base64);
      } catch (err) {
          console.error("Lỗi upload ảnh", err);
          alert("Có lỗi khi xử lý ảnh.");
      } finally {
          setIsUploading(false);
      }
  };

  const renderEditForm = (id: string) => {
      switch(id) {
          case 'hero':
              return (
                  <div className="grid grid-cols-1 gap-4 pt-4">
                      <div><label className="text-xs font-bold text-slate-500">Badge</label><input type="text" value={localContent.hero.badge} onChange={e => updateField('hero', 'badge', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                      <div><label className="text-xs font-bold text-slate-500">Dòng 1 (Tĩnh)</label><input type="text" value={localContent.hero.title1} onChange={e => updateField('hero', 'title1', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                      <div><label className="text-xs font-bold text-slate-500">Dòng 2 (Hiệu ứng chữ)</label><input type="text" value={localContent.hero.title2} onChange={e => updateField('hero', 'title2', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                      <div><label className="text-xs font-bold text-slate-500">Dòng 3 (Tĩnh)</label><input type="text" value={localContent.hero.title3} onChange={e => updateField('hero', 'title3', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                      <div><label className="text-xs font-bold text-slate-500">Mô tả</label><textarea rows={3} value={localContent.hero.desc} onChange={e => updateField('hero', 'desc', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                  </div>
              );
          case 'about':
              return (
                  <div className="grid grid-cols-1 gap-4 pt-4">
                       <div>
                          <label className="text-xs font-bold text-slate-500">Ảnh đại diện (Về tôi)</label>
                          <div className="flex gap-4 items-start mt-1">
                              <div className="w-20 h-24 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden flex items-center justify-center">
                                  {localContent.about.image ? (
                                      <img src={localContent.about.image} className="w-full h-full object-cover" alt="Preview" />
                                  ) : <ImageIcon className="w-6 h-6 text-slate-400" />}
                              </div>
                              <div className="flex-1">
                                  <div className="flex gap-2 mb-2">
                                      <button 
                                          type="button"
                                          onClick={() => fileInputRef.current?.click()}
                                          disabled={isUploading}
                                          className="bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-300 px-3 py-1.5 rounded-lg font-bold text-xs hover:bg-violet-200 transition-colors flex items-center gap-2"
                                      >
                                          {isUploading ? <Loader2 className="w-3 h-3 animate-spin"/> : <Upload className="w-3 h-3" />}
                                          Tải ảnh
                                      </button>
                                      <input 
                                          type="file" 
                                          ref={fileInputRef}
                                          onChange={handleImageUpload}
                                          className="hidden" 
                                          accept="image/*"
                                      />
                                  </div>
                                  <input 
                                      type="text" 
                                      value={localContent.about.image || ''} 
                                      onChange={e => updateField('about', 'image', e.target.value)} 
                                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-xs text-slate-500" 
                                      placeholder="Link ảnh..."
                                  />
                              </div>
                          </div>
                       </div>
                       <div><label className="text-xs font-bold text-slate-500">Badge</label><input type="text" value={localContent.about.badge} onChange={e => updateField('about', 'badge', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                       <div><label className="text-xs font-bold text-slate-500">Tiêu đề chính</label><input type="text" value={localContent.about.title} onChange={e => updateField('about', 'title', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                       <div><label className="text-xs font-bold text-slate-500">Mô tả</label><textarea rows={3} value={localContent.about.desc} onChange={e => updateField('about', 'desc', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                  </div>
              );
          case 'skills':
              return (
                 <div className="grid grid-cols-1 gap-4 pt-4">
                       <div><label className="text-xs font-bold text-slate-500">Tiêu đề 1</label><input type="text" value={localContent.skills.title1} onChange={e => updateField('skills', 'title1', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                       <div><label className="text-xs font-bold text-slate-500">Tiêu đề 2 (Gradient)</label><input type="text" value={localContent.skills.title2} onChange={e => updateField('skills', 'title2', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                       <div><label className="text-xs font-bold text-slate-500">Mô tả</label><textarea rows={3} value={localContent.skills.desc} onChange={e => updateField('skills', 'desc', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                  </div>
              );
          case 'featured':
              return (
                 <div className="grid grid-cols-1 gap-4 pt-4">
                       <div><label className="text-xs font-bold text-slate-500">Badge</label><input type="text" value={localContent.featured.badge} onChange={e => updateField('featured', 'badge', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                       <div><label className="text-xs font-bold text-slate-500">Tiêu đề 1</label><input type="text" value={localContent.featured.title1} onChange={e => updateField('featured', 'title1', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                       <div><label className="text-xs font-bold text-slate-500">Tiêu đề 2 (Gradient)</label><input type="text" value={localContent.featured.title2} onChange={e => updateField('featured', 'title2', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                       <div><label className="text-xs font-bold text-slate-500">Mô tả</label><textarea rows={3} value={localContent.featured.desc} onChange={e => updateField('featured', 'desc', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                  </div>
              );
          case 'cta':
              return (
                  <div className="grid grid-cols-1 gap-4 pt-4">
                       <div><label className="text-xs font-bold text-slate-500">Trạng thái</label><input type="text" value={localContent.cta.status} onChange={e => updateField('cta', 'status', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                       <div><label className="text-xs font-bold text-slate-500">Tiêu đề 1</label><input type="text" value={localContent.cta.title1} onChange={e => updateField('cta', 'title1', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                       <div><label className="text-xs font-bold text-slate-500">Tiêu đề 2 (Gradient)</label><input type="text" value={localContent.cta.title2} onChange={e => updateField('cta', 'title2', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                       <div><label className="text-xs font-bold text-slate-500">Mô tả</label><textarea rows={3} value={localContent.cta.desc} onChange={e => updateField('cta', 'desc', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                  </div>
              );
          default: return null;
      }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
           <div className="flex items-center gap-4">
                <h1 className="text-3xl font-black text-slate-900 dark:text-white">Giao diện Trang chủ</h1>
                <div className="flex bg-white dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700 shadow-sm">
                    <button onClick={() => language !== 'vi' && toggleLanguage()} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${language === 'vi' ? 'bg-violet-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>VI</button>
                    <button onClick={() => language !== 'en' && toggleLanguage()} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${language === 'en' ? 'bg-violet-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>EN</button>
                </div>
            </div>
          <p className="text-slate-500 mt-1">Sắp xếp thứ tự, ẩn hiện và chỉnh sửa nội dung các phần hiển thị.</p>
        </div>
        <button 
            onClick={handleSave}
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-violet-600/20 transition-all hover:scale-105"
        >
            {saveStatus === 'saved' ? <CheckCircle2 className="w-5 h-5" /> : <Save className="w-5 h-5" />}
            {saveStatus === 'saved' ? 'Đã Lưu!' : 'Lưu Thay Đổi'}
        </button>
      </div>

      <div className="bg-slate-100 dark:bg-[#0B0F19] rounded-3xl p-6 border border-slate-200 dark:border-slate-800">
          <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-4">
              {items.map((item) => (
                  <Reorder.Item key={item.id} value={item} className="cursor-grab active:cursor-grabbing">
                      <div className={`bg-white dark:bg-slate-900 rounded-2xl border ${item.visible ? 'border-slate-200 dark:border-slate-700' : 'border-slate-200/50 dark:border-slate-800 opacity-60'} shadow-sm p-4 transition-all`}>
                          <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                  <div className="p-2 text-slate-400 hover:text-violet-500">
                                      <GripVertical className="w-6 h-6" />
                                  </div>
                                  <div>
                                      <h3 className="font-bold text-slate-900 dark:text-white text-lg">{item.label}</h3>
                                      <span className="text-xs text-slate-400 font-mono uppercase bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">ID: {item.id}</span>
                                  </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                  <button 
                                    onClick={() => toggleVisibility(item.id)}
                                    className={`p-2 rounded-lg transition-colors ${item.visible ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' : 'text-slate-400 bg-slate-100 dark:bg-slate-800'}`}
                                    title={item.visible ? "Đang hiện" : "Đang ẩn"}
                                  >
                                      {item.visible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                                  </button>
                                  
                                  <button 
                                    onClick={() => setExpandedSection(expandedSection === item.id ? null : item.id)}
                                    className={`p-2 rounded-lg transition-colors flex items-center gap-2 ${expandedSection === item.id ? 'bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-300' : 'bg-slate-50 text-slate-500 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400'}`}
                                  >
                                      <Edit className="w-4 h-4" />
                                      <span className="text-xs font-bold">Nội dung</span>
                                      {expandedSection === item.id ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
                                  </button>
                              </div>
                          </div>

                          <AnimatePresence>
                              {expandedSection === item.id && (
                                  <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                  >
                                      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 cursor-auto" onPointerDown={(e) => e.stopPropagation()}>
                                          {renderEditForm(item.id)}
                                      </div>
                                  </motion.div>
                              )}
                          </AnimatePresence>
                      </div>
                  </Reorder.Item>
              ))}
          </Reorder.Group>
      </div>

      <div className="mt-6 text-center text-slate-500 text-sm">
          Kéo thả các thẻ để thay đổi thứ tự hiển thị trên trang chủ.
      </div>
    </div>
  );
};

export default HomeManager;
