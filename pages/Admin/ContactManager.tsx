
import React, { useState, useEffect } from 'react';
import { useData } from '../../DataContext';
import { useLanguage } from '../../LanguageContext';
import { ContactContentData } from '../../types';
import { Save, CheckCircle2 } from 'lucide-react';

const ContactManager: React.FC = () => {
  const { contactContent, updateContactContent } = useData();
  const { language, toggleLanguage } = useLanguage(); 
  
  const [localContent, setLocalContent] = useState<ContactContentData>(contactContent);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');

  // Sync Content from Context
  useEffect(() => {
      setLocalContent(contactContent);
  }, [contactContent]);
  
  const handleSave = () => {
      updateContactContent(localContent);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
  };

  const updateField = (field: keyof ContactContentData, value: string) => {
      setLocalContent(prev => ({
          ...prev,
          [field]: value
      }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
           <div className="flex items-center gap-4">
                <h1 className="text-3xl font-black text-slate-900 dark:text-white">Quản lý Trang Liên hệ</h1>
                <div className="flex bg-white dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700 shadow-sm">
                    <button onClick={() => language !== 'vi' && toggleLanguage()} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${language === 'vi' ? 'bg-violet-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>VI</button>
                    <button onClick={() => language !== 'en' && toggleLanguage()} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${language === 'en' ? 'bg-violet-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}>EN</button>
                </div>
            </div>
          <p className="text-slate-500 mt-1">Chỉnh sửa thông tin liên hệ và nội dung hiển thị trên trang Contact.</p>
        </div>
        <button 
            onClick={handleSave}
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-violet-600/20 transition-all hover:scale-105"
        >
            {saveStatus === 'saved' ? <CheckCircle2 className="w-5 h-5" /> : <Save className="w-5 h-5" />}
            {saveStatus === 'saved' ? 'Đã Lưu!' : 'Lưu Thay Đổi'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8">
          {/* Main Info Section */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  Thông tin Giới thiệu
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                      <label className="text-xs font-bold text-slate-500 mb-1 block">Badge (Nhãn nhỏ)</label>
                      <input 
                        type="text" 
                        value={localContent.badge} 
                        onChange={e => updateField('badge', e.target.value)} 
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-violet-500 outline-none" 
                      />
                  </div>
                  <div>
                      <label className="text-xs font-bold text-slate-500 mb-1 block">Tiêu đề Form</label>
                      <input 
                        type="text" 
                        value={localContent.formTitle} 
                        onChange={e => updateField('formTitle', e.target.value)} 
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-violet-500 outline-none" 
                      />
                  </div>
                  <div>
                      <label className="text-xs font-bold text-slate-500 mb-1 block">Tiêu đề lớn 1</label>
                      <input 
                        type="text" 
                        value={localContent.title1} 
                        onChange={e => updateField('title1', e.target.value)} 
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-violet-500 outline-none" 
                      />
                  </div>
                  <div>
                      <label className="text-xs font-bold text-slate-500 mb-1 block">Tiêu đề lớn 2 (Hiệu ứng Gradient)</label>
                      <input 
                        type="text" 
                        value={localContent.title2} 
                        onChange={e => updateField('title2', e.target.value)} 
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-violet-500 outline-none" 
                      />
                  </div>
                  <div className="md:col-span-2">
                      <label className="text-xs font-bold text-slate-500 mb-1 block">Mô tả</label>
                      <textarea 
                        rows={3} 
                        value={localContent.desc} 
                        onChange={e => updateField('desc', e.target.value)} 
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-violet-500 outline-none resize-none" 
                      />
                  </div>
              </div>
          </div>

          {/* Contact Details Section */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  Thông tin Liên hệ Chi tiết
              </h3>
              <div className="space-y-4">
                  <div>
                      <label className="text-xs font-bold text-slate-500 mb-1 block">Email</label>
                      <input 
                        type="text" 
                        value={localContent.email} 
                        onChange={e => updateField('email', e.target.value)} 
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-violet-500 outline-none" 
                      />
                  </div>
                  <div>
                      <label className="text-xs font-bold text-slate-500 mb-1 block">Số điện thoại</label>
                      <input 
                        type="text" 
                        value={localContent.phone} 
                        onChange={e => updateField('phone', e.target.value)} 
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-violet-500 outline-none" 
                      />
                  </div>
                  <div>
                      <label className="text-xs font-bold text-slate-500 mb-1 block">Địa chỉ</label>
                      <input 
                        type="text" 
                        value={localContent.address} 
                        onChange={e => updateField('address', e.target.value)} 
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-violet-500 outline-none" 
                      />
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default ContactManager;
