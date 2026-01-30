
import React, { useState } from 'react';
import { useData } from '../../DataContext';
import { Plus, Trash2, Tag, Layers, AlertCircle, Edit2, Save, X, AlertTriangle } from 'lucide-react';

const CategoryManager: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory, showNotification, projects } = useData();
  const [newCatName, setNewCatName] = useState('');
  
  // Edit State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = newCatName.trim();
    
    if (trimmedName) {
        if (categories.some(c => c.name.toLowerCase() === trimmedName.toLowerCase())) {
            showNotification('error', 'Danh mục này đã tồn tại!');
            return;
        }
        addCategory(trimmedName);
        setNewCatName('');
        showNotification('success', 'Đã thêm danh mục mới');
    }
  };

  const startEdit = (cat: {id: string, name: string}) => {
      setEditingId(cat.id);
      setEditName(cat.name);
  };

  const cancelEdit = () => {
      setEditingId(null);
      setEditName('');
  };

  const saveEdit = (id: string) => {
      const trimmed = editName.trim();
      if (!trimmed) {
          showNotification('error', 'Tên danh mục không được để trống');
          return;
      }
      
      // Check duplicate if name changed
      if (trimmed !== id && categories.some(c => c.name.toLowerCase() === trimmed.toLowerCase())) {
           showNotification('error', 'Tên danh mục này đã tồn tại');
           return;
      }

      updateCategory(id, trimmed);
      setEditingId(null);
      showNotification('success', 'Đã cập nhật danh mục và đồng bộ dự án');
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
      e.preventDefault();
      e.stopPropagation();

      // Đếm số dự án đang sử dụng danh mục này
      const usageCount = (projects || []).filter(p => String(p.category) === String(id)).length;

      let confirmMessage = `Bạn có chắc chắn muốn xóa danh mục "${id}"?`;

      if (usageCount > 0) {
          confirmMessage = `⚠️ CẢNH BÁO: Danh mục "${id}" đang được dùng bởi ${usageCount} dự án!\n\nNếu bạn xóa, các dự án này vẫn tồn tại nhưng sẽ mất nhãn danh mục.\n\nBạn có CHẮC CHẮN muốn tiếp tục xóa không?`;
      }

      if (window.confirm(confirmMessage)) {
          try {
            deleteCategory(id);
            showNotification('success', 'Đã xóa danh mục thành công');
          } catch (err) {
            console.error(err);
            showNotification('error', 'Có lỗi xảy ra khi xóa danh mục');
          }
      }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Quản lý Danh mục</h1>
        <p className="text-slate-500 mt-1">Tạo, chỉnh sửa và quản lý các loại dự án (Web, Mobile, Design...).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Add Form */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm h-fit">
              <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-violet-600 dark:text-violet-300">
                      <Plus className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Thêm Danh mục Mới</h3>
              </div>
              
              <form onSubmit={handleAdd} className="space-y-4">
                  <div>
                      <label className="text-sm font-bold text-slate-500 mb-1 block">Tên Danh mục</label>
                      <input 
                        type="text" 
                        value={newCatName}
                        onChange={(e) => setNewCatName(e.target.value)}
                        placeholder="VD: AI, Branding, Marketing..."
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                      />
                  </div>
                  <button 
                    type="submit"
                    disabled={!newCatName.trim()}
                    className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-violet-600/20"
                  >
                      Thêm Ngay
                  </button>
              </form>
          </div>

          {/* List */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-300">
                      <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Danh sách hiện tại</h3>
              </div>

              <div className="flex flex-col gap-3">
                  {categories.map((cat) => {
                      // Calculate usage for UI hint safely
                      const count = (projects || []).filter(p => String(p.category) === String(cat.name)).length;
                      
                      return (
                        <div 
                            key={cat.id} 
                            className="group flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-violet-200 dark:hover:border-violet-900 transition-colors relative"
                        >
                            {editingId === cat.id ? (
                                <div className="flex items-center gap-2 w-full">
                                    <input 
                                        autoFocus
                                        type="text" 
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        className="flex-1 bg-white dark:bg-slate-900 border border-violet-500 rounded-lg px-3 py-2 text-sm outline-none"
                                    />
                                    <button onClick={() => saveEdit(cat.id)} className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"><Save className="w-4 h-4"/></button>
                                    <button onClick={cancelEdit} className="p-2 bg-slate-200 text-slate-600 rounded-lg hover:bg-slate-300"><X className="w-4 h-4"/></button>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center gap-3 select-none">
                                        <div className="p-2 bg-white dark:bg-slate-700 rounded-lg text-slate-400 shadow-sm relative">
                                            <Tag className="w-4 h-4" />
                                            {count > 0 && (
                                                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                                                </span>
                                            )}
                                        </div>
                                        <div>
                                            <span className="font-bold text-slate-800 dark:text-slate-200 block">{cat.name}</span>
                                            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{count} dự án</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 z-10">
                                        <button 
                                            type="button"
                                            onClick={() => startEdit(cat)}
                                            className="p-2 bg-white dark:bg-slate-700 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200 dark:border-slate-600 rounded-xl transition-all shadow-sm active:scale-95"
                                            title="Chỉnh sửa tên"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={(e) => handleDelete(e, cat.id)}
                                            className={`p-2 rounded-xl transition-all shadow-sm active:scale-95 border border-slate-200 dark:border-slate-600 ${count > 0 ? 'bg-amber-50 text-amber-500 hover:bg-amber-100 border-amber-200 dark:bg-amber-900/10 dark:text-amber-500' : 'bg-white dark:bg-slate-700 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30'}`}
                                            title={count > 0 ? "Cảnh báo: Đang có dự án sử dụng" : "Xóa danh mục này"}
                                        >
                                            {count > 0 ? <AlertTriangle className="w-4 h-4" /> : <Trash2 className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                      );
                  })}

                  {categories.length === 0 && (
                      <div className="text-center py-12 flex flex-col items-center justify-center text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                          <AlertCircle className="w-8 h-8 mb-2 opacity-50" />
                          <span>Chưa có danh mục nào.</span>
                      </div>
                  )}
              </div>
          </div>
      </div>
    </div>
  );
};

export default CategoryManager;
