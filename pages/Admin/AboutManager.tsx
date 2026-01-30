
import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../../DataContext';
import { useLanguage } from '../../LanguageContext';
import { Reorder, motion, AnimatePresence } from 'framer-motion';
import { GripVertical, Eye, EyeOff, Edit, ChevronDown, ChevronUp, Save, CheckCircle2, Plus, Trash2, Link, Upload, Loader2, Image as ImageIcon } from 'lucide-react';
import { AboutSectionConfig, AboutContentData, ExperienceItem } from '../../types';

const AboutManager: React.FC = () => {
  const { aboutLayout, updateAboutLayout, aboutContent, updateAllAboutContent } = useData();
  const { language, toggleLanguage } = useLanguage(); 
  
  const [items, setItems] = useState<AboutSectionConfig[]>(aboutLayout);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [localContent, setLocalContent] = useState<AboutContentData>(aboutContent);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync Layout from Context
  useEffect(() => {
      setItems(aboutLayout);
  }, [aboutLayout]);

  // CRITICAL FIX: Sync Content from Context when it finishes loading from LocalStorage
  useEffect(() => {
      setLocalContent(aboutContent);
  }, [aboutContent]);
  
  const handleSave = () => {
      updateAboutLayout(items);
      updateAllAboutContent(localContent);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
  };

  const toggleVisibility = (id: string) => {
      const newItems = items.map(item => 
          item.id === id ? { ...item, visible: !item.visible } : item
      );
      setItems(newItems);
  };

  // Generic Field Updater
  const updateField = (section: keyof AboutContentData, field: string, value: string) => {
      setLocalContent(prev => ({
          ...prev,
          [section]: {
              ...prev[section],
              [field]: value
          }
      }));
  };

  // Helper for Image Upload
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
          // Only supports intro main image upload for now based on UI location
          updateField('intro', 'mainImage', base64);
      } catch (err) {
          console.error("Lỗi upload ảnh", err);
          alert("Có lỗi khi xử lý ảnh.");
      } finally {
          setIsUploading(false);
      }
  };

  // --- EXP SPECIFIC ---
  const updateExperienceItem = (id: number, field: keyof ExperienceItem, value: string) => {
      setLocalContent(prev => ({
          ...prev,
          experience: {
              ...prev.experience,
              items: prev.experience.items.map(item => item.id === id ? { ...item, [field]: value } : item)
          }
      }));
  };

  const addExperienceItem = () => {
      const newItem: ExperienceItem = {
          id: Date.now(),
          role: 'New Role',
          company: 'Company Name',
          year: '2025',
          desc: 'Job description...',
          colorTheme: 'purple'
      };
      setLocalContent(prev => ({
          ...prev,
          experience: {
              ...prev.experience,
              items: [newItem, ...prev.experience.items]
          }
      }));
  };

  const removeExperienceItem = (id: number) => {
      if(window.confirm('Xóa mục kinh nghiệm này?')) {
          setLocalContent(prev => ({
              ...prev,
              experience: {
                  ...prev.experience,
                  items: prev.experience.items.filter(item => item.id !== id)
              }
          }));
      }
  };

  const renderEditForm = (id: string) => {
      switch(id) {
          case 'intro':
              return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                      {/* Image Uploader */}
                      <div className="md:col-span-2 space-y-2">
                          <label className="text-xs font-bold text-slate-500">Ảnh Chính (Chân dung)</label>
                          <div className="flex gap-4 items-start">
                              <div className="w-24 h-32 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 overflow-hidden flex items-center justify-center relative group">
                                  {localContent.intro.mainImage ? (
                                      <img src={localContent.intro.mainImage} className="w-full h-full object-cover" alt="Preview" />
                                  ) : <ImageIcon className="w-8 h-8 text-slate-400" />}
                              </div>
                              <div className="flex-1">
                                  <div className="flex gap-2 mb-2">
                                      <button 
                                          type="button"
                                          onClick={() => fileInputRef.current?.click()}
                                          disabled={isUploading}
                                          className="bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-300 px-4 py-2 rounded-lg font-bold text-sm hover:bg-violet-200 transition-colors flex items-center gap-2"
                                      >
                                          {isUploading ? <Loader2 className="w-4 h-4 animate-spin"/> : <Upload className="w-4 h-4" />}
                                          Tải ảnh mới
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
                                      value={localContent.intro.mainImage} 
                                      onChange={e => updateField('intro', 'mainImage', e.target.value)} 
                                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-xs text-slate-500" 
                                      placeholder="Hoặc dán link ảnh URL..."
                                  />
                              </div>
                          </div>
                      </div>

                      <div><label className="text-xs font-bold text-slate-500">Badge</label><input type="text" value={localContent.intro.badge} onChange={e => updateField('intro', 'badge', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                      <div><label className="text-xs font-bold text-slate-500">Tiêu đề 1</label><input type="text" value={localContent.intro.title1} onChange={e => updateField('intro', 'title1', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                      <div><label className="text-xs font-bold text-slate-500">Tiêu đề 2 (Gradient)</label><input type="text" value={localContent.intro.title2} onChange={e => updateField('intro', 'title2', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                      <div><label className="text-xs font-bold text-slate-500">Tiêu đề 3</label><input type="text" value={localContent.intro.title3} onChange={e => updateField('intro', 'title3', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                      <div><label className="text-xs font-bold text-slate-500">Tiêu đề 4 (Gradient)</label><input type="text" value={localContent.intro.title4} onChange={e => updateField('intro', 'title4', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                      <div className="md:col-span-2"><label className="text-xs font-bold text-slate-500">Mô tả (Đoạn 1)</label><textarea rows={2} value={localContent.intro.desc1} onChange={e => updateField('intro', 'desc1', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                      <div className="md:col-span-2"><label className="text-xs font-bold text-slate-500">Điểm nhấn (Bold)</label><input type="text" value={localContent.intro.desc2_highlight} onChange={e => updateField('intro', 'desc2_highlight', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm font-bold" /></div>
                      <div className="md:col-span-2"><label className="text-xs font-bold text-slate-500">Mô tả (Đoạn 2)</label><textarea rows={2} value={localContent.intro.desc4} onChange={e => updateField('intro', 'desc4', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                      <div className="md:col-span-2 pt-2 border-t border-slate-100 dark:border-slate-800"><p className="font-bold text-sm mb-2">Thống kê (Stats)</p></div>
                      <div><label className="text-xs font-bold text-slate-500">Label 1</label><input type="text" value={localContent.intro.stat_years} onChange={e => updateField('intro', 'stat_years', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                      <div><label className="text-xs font-bold text-slate-500">Label 2</label><input type="text" value={localContent.intro.stat_companies} onChange={e => updateField('intro', 'stat_companies', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                      <div><label className="text-xs font-bold text-slate-500">Label 3</label><input type="text" value={localContent.intro.stat_dedication} onChange={e => updateField('intro', 'stat_dedication', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                  </div>
              );
          case 'education':
              return (
                  <div className="grid grid-cols-1 gap-4 pt-4">
                       <div><label className="text-xs font-bold text-slate-500">Tiêu đề Section</label><input type="text" value={localContent.education.title} onChange={e => updateField('education', 'title', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                       <div><label className="text-xs font-bold text-slate-500">Trường học</label><input type="text" value={localContent.education.school} onChange={e => updateField('education', 'school', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                       <div className="grid grid-cols-2 gap-4">
                            <div><label className="text-xs font-bold text-slate-500">Label Chuyên ngành</label><input type="text" value={localContent.education.major} onChange={e => updateField('education', 'major', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                            <div><label className="text-xs font-bold text-slate-500">Tên Chuyên ngành</label><input type="text" value={localContent.education.major_val} onChange={e => updateField('education', 'major_val', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                            <div><label className="text-xs font-bold text-slate-500">Label Xếp loại</label><input type="text" value={localContent.education.grade} onChange={e => updateField('education', 'grade', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                            <div><label className="text-xs font-bold text-slate-500">Giá trị Xếp loại</label><input type="text" value={localContent.education.grade_val} onChange={e => updateField('education', 'grade_val', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                       </div>
                  </div>
              );
          case 'experience':
              return (
                 <div className="pt-4 space-y-6">
                      <div className="grid grid-cols-1 gap-4">
                         <div><label className="text-xs font-bold text-slate-500">Tiêu đề Chính</label><input type="text" value={localContent.experience.title} onChange={e => updateField('experience', 'title', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                         <div><label className="text-xs font-bold text-slate-500">Mô tả ngắn</label><input type="text" value={localContent.experience.desc} onChange={e => updateField('experience', 'desc', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                      </div>
                      
                      <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                          <div className="flex justify-between items-center mb-4">
                              <h4 className="font-bold text-sm">Danh sách Công việc</h4>
                              <button onClick={addExperienceItem} className="text-xs bg-violet-100 text-violet-600 px-2 py-1 rounded hover:bg-violet-200 font-bold flex items-center gap-1"><Plus className="w-3 h-3"/> Thêm</button>
                          </div>
                          <div className="space-y-4">
                              {localContent.experience.items.map((item, idx) => (
                                  <div key={item.id} className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 relative group">
                                      <button onClick={() => removeExperienceItem(item.id)} className="absolute top-2 right-2 p-1.5 bg-red-100 text-red-500 rounded hover:bg-red-200"><Trash2 className="w-3 h-3" /></button>
                                      <div className="grid grid-cols-2 gap-2 mb-2 pr-8">
                                          <input type="text" placeholder="Vị trí (Role)" value={item.role} onChange={e => updateExperienceItem(item.id, 'role', e.target.value)} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-1.5 text-xs font-bold" />
                                          <input type="text" placeholder="Công ty" value={item.company} onChange={e => updateExperienceItem(item.id, 'company', e.target.value)} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-1.5 text-xs" />
                                          <input type="text" placeholder="Năm (VD: 2020-2023)" value={item.year} onChange={e => updateExperienceItem(item.id, 'year', e.target.value)} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-1.5 text-xs" />
                                          <select value={item.colorTheme} onChange={e => updateExperienceItem(item.id, 'colorTheme', e.target.value)} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-1.5 text-xs">
                                              <option value="purple">Purple</option>
                                              <option value="blue">Blue</option>
                                              <option value="green">Green</option>
                                              <option value="pink">Pink</option>
                                              <option value="orange">Orange</option>
                                          </select>
                                      </div>
                                      <textarea placeholder="Mô tả công việc..." rows={2} value={item.desc} onChange={e => updateExperienceItem(item.id, 'desc', e.target.value)} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-1.5 text-xs" />
                                  </div>
                              ))}
                          </div>
                      </div>
                 </div>
              );
          case 'hobbies':
               return (
                  <div className="grid grid-cols-1 gap-4 pt-4">
                       <div><label className="text-xs font-bold text-slate-500">Tiêu đề Section</label><input type="text" value={localContent.hobbies.title} onChange={e => updateField('hobbies', 'title', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded p-2 text-sm" /></div>
                       <p className="text-xs text-slate-400 italic">Hiện tại chỉ hỗ trợ chỉnh sửa tiêu đề mục sở thích. Nội dung các icon được cố định theo cấu trúc hình ảnh/icon phức tạp.</p>
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
                <h1 className="text-3xl font-black text-slate-900 dark:text-white">Quản lý trang About</h1>
                <div className="flex bg-white dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700 shadow-sm">
                    <button onClick={() => language !== 'vi' && toggleLanguage()} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${language === 'vi' ? 'bg-violet-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>VI</button>
                    <button onClick={() => language !== 'en' && toggleLanguage()} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${language === 'en' ? 'bg-violet-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>EN</button>
                </div>
            </div>
          <p className="text-slate-500 mt-1">Sắp xếp bố cục và chỉnh sửa chi tiết nội dung giới thiệu bản thân.</p>
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
    </div>
  );
};

export default AboutManager;
