
import React, { useState, useRef } from 'react';
import { useData } from '../../DataContext';
import { Project } from '../../types';
import { Plus, Edit2, Trash2, X, Image as ImageIcon, Save, Upload, Link as LinkIcon, Loader2, Star, Video, Heart } from 'lucide-react';

const ProjectManager: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject, categories, uploadFile } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<Project>>({});
  const [isUploading, setIsUploading] = useState(false);
  
  // Refs for file inputs
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = (project: Project) => {
    setEditingProject({
        ...project,
        gallery: project.gallery || []
    });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProject({
      id: Date.now(),
      title: '',
      category: categories.length > 0 ? categories[0].name : 'Web',
      image: '', 
      description: '',
      technologies: [],
      client: '',
      year: new Date().getFullYear().toString(),
      role: '',
      gallery: [],
      video: '',
      isFeatured: false,
      thanksTitle: 'Thanks for Visiting',
      thanksMessage: 'Your Likes and Feedback are well appreciated.',
      thanksDescription: '',
      thanksLinkText: "Let's talk with me",
      thanksLinkUrl: '/#/contact'
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa dự án này?')) {
        deleteProject(id);
    }
  };

  const handleToggleFeatured = (project: Project) => {
      updateProject({ ...project, isFeatured: !project.isFeatured });
  };

  const handleSave = (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    
    // Manual validation
    if (!editingProject.title || !editingProject.title.trim()) {
        alert("Vui lòng nhập tên dự án");
        return;
    }

    const isExisting = projects.some(p => p.id === editingProject.id);
    
    const projectToSave = {
        ...editingProject,
        gallery: editingProject.gallery || [],
        isFeatured: editingProject.isFeatured || false
    } as Project;

    try {
        if (isExisting) {
            updateProject(projectToSave);
        } else {
            addProject(projectToSave);
        }
        setIsModalOpen(false);
    } catch (error: any) {
        console.error("Save error:", error);
        if (error.name === 'QuotaExceededError' || error.code === 22 || error.message?.toLowerCase().includes('quota')) {
            alert("⚠️ LỖI: BỘ NHỚ TRÌNH DUYỆT ĐÃ ĐẦY!\n\nLý do: Ảnh đang được lưu trực tiếp vào trình duyệt.\n\nGiải pháp: Vào Admin > DevOps > Cấu hình Supabase và tạo bucket 'portfolio' để upload ảnh lên mây.");
        } else {
            alert("Có lỗi xảy ra khi lưu dự án: " + error.message);
        }
    }
  };

  const updateTech = (techString: string) => {
      setEditingProject({ ...editingProject, technologies: techString.split(',').map(t => t.trim()) });
  }

  // --- IMAGE HANDLING LOGIC ---

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (file.size > 2 * 1024 * 1024) { 
          alert("Ảnh lớn hơn 2MB có thể gây chậm. Vui lòng chờ xử lý...");
      }

      setIsUploading(true);
      try {
          const imageUrl = await uploadFile(file);
          setEditingProject(prev => ({ ...prev, image: imageUrl }));
      } catch (err) {
          console.error("Error uploading image", err);
          alert("Lỗi khi tải ảnh.");
      } finally {
          setIsUploading(false);
      }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      setIsUploading(true);
      try {
          const newImages: string[] = [];
          for (let i = 0; i < files.length; i++) {
              if (files[i].size > 2 * 1024 * 1024) {
                 // warning logic handled in uploadFile or ignored
              }
              const imageUrl = await uploadFile(files[i]);
              newImages.push(imageUrl);
          }
          setEditingProject(prev => ({
              ...prev,
              gallery: [...(prev.gallery || []), ...newImages]
          }));
      } catch (err) {
          console.error("Error uploading gallery", err);
      } finally {
          setIsUploading(false);
      }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (file.size > 15 * 1024 * 1024) {
          alert("Video quá lớn (>15MB). Vui lòng dùng Link YouTube/Vimeo.");
          return;
      }

      setIsUploading(true);
      try {
          const videoUrl = await uploadFile(file);
          setEditingProject(prev => ({ ...prev, video: videoUrl }));
      } catch (err) {
          console.error("Error uploading video", err);
          alert("Lỗi khi tải video.");
      } finally {
          setIsUploading(false);
      }
  };

  const removeGalleryImage = (indexToRemove: number) => {
      setEditingProject(prev => ({
          ...prev,
          gallery: prev.gallery?.filter((_, index) => index !== indexToRemove)
      }));
  };

  const addGalleryUrl = () => {
      const url = prompt("Nhập đường dẫn URL hình ảnh:");
      if (url) {
          setEditingProject(prev => ({
              ...prev,
              gallery: [...(prev.gallery || []), url]
          }));
      }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">Quản lý Dự án</h1>
            <p className="text-slate-500 mt-1">Thêm, sửa, xóa và quản lý hình ảnh dự án.</p>
        </div>
        <button 
            onClick={handleAddNew}
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-violet-600/20 transition-all hover:scale-105"
        >
            <Plus className="w-5 h-5" /> Thêm Dự án
        </button>
      </div>

      {/* Projects List Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                    <tr>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Hình ảnh</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tên dự án</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Danh mục</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Nổi bật</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Hành động</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {projects.map((project) => (
                        <tr key={project.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="px-6 py-4">
                                {project.image ? (
                                    <img src={project.image} alt="" className="w-16 h-12 object-cover rounded-lg shadow-sm" />
                                ) : (
                                    <div className="w-16 h-12 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                                        <ImageIcon className="w-6 h-6 text-slate-400" />
                                    </div>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                <div className="font-bold text-slate-900 dark:text-white">{project.title}</div>
                                <div className="text-xs text-slate-500 truncate max-w-[200px]">{project.description}</div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                                    {project.category}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <button 
                                    onClick={() => handleToggleFeatured(project)}
                                    className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
                                    title="Nhấn để bật/tắt nổi bật"
                                >
                                    <Star 
                                        className={`w-5 h-5 transition-all ${project.isFeatured ? 'fill-amber-400 text-amber-400 scale-110' : 'text-slate-300 dark:text-slate-600'}`} 
                                    />
                                </button>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <button 
                                        onClick={() => handleEdit(project)}
                                        className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                                        title="Chỉnh sửa"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(project.id)}
                                        className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
                                        title="Xóa"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

      {/* --- ADD / EDIT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-4xl h-[90vh] shadow-2xl border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in duration-200 flex flex-col overflow-hidden">
                
                {/* Use div instead of form for wrapper to prevent default enter submit, handled manually */}
                <div className="flex flex-col h-full">
                    
                    {/* Modal Header - Fixed */}
                    <div className="bg-white dark:bg-slate-900 p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center z-30 flex-shrink-0 relative">
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                                {projects.some(p => p.id === editingProject.id) ? 'Chỉnh sửa Dự án' : 'Thêm Dự án Mới'}
                            </h2>
                            {isUploading && <span className="text-sm text-violet-500 flex items-center gap-1 mt-1"><Loader2 className="w-3 h-3 animate-spin"/> Đang xử lý (Upload lên Supabase)...</span>}
                        </div>
                        <button type="button" onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                            <X className="w-6 h-6 text-slate-500" />
                        </button>
                    </div>
                    
                    {/* Scrollable Content Body */}
                    <div className="flex-1 overflow-y-auto p-8 space-y-8 relative z-10">
                        
                        {/* Section 1: General Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Tên Dự án <span className="text-red-500">*</span></label>
                                <input 
                                    type="text" 
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                                    value={editingProject.title}
                                    onChange={e => setEditingProject({...editingProject, title: e.target.value})}
                                    placeholder="VD: Website Bán Hàng"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Danh mục</label>
                                <select 
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                                    value={editingProject.category}
                                    onChange={e => setEditingProject({...editingProject, category: e.target.value})}
                                >
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Featured Toggle */}
                        <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                            <button
                                type="button"
                                onClick={() => setEditingProject(prev => ({ ...prev, isFeatured: !prev.isFeatured }))}
                                className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${editingProject.isFeatured ? 'bg-violet-600' : 'bg-slate-300 dark:bg-slate-600'}`}
                            >
                                <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${editingProject.isFeatured ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                            <div>
                                <span className="block text-sm font-bold text-slate-700 dark:text-slate-300">Đánh dấu là Dự án Nổi bật</span>
                                <span className="text-xs text-slate-500">Dự án này sẽ xuất hiện trên trang chủ.</span>
                            </div>
                        </div>


                        {/* Section 2: Thumbnail Image */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex justify-between">
                                <span>Ảnh đại diện (Thumbnail)</span>
                                <span className="text-xs font-normal text-slate-400">Khuyên dùng: Tỉ lệ 4:3, Max 2MB</span>
                            </label>
                            
                            <div className="flex gap-6 items-start">
                                {/* Preview Box */}
                                <div className="w-32 h-24 flex-shrink-0 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 overflow-hidden flex items-center justify-center relative group">
                                    {editingProject.image ? (
                                        <>
                                            <img src={editingProject.image} className="w-full h-full object-cover" alt="Preview" />
                                            <button 
                                                type="button"
                                                onClick={() => setEditingProject({...editingProject, image: ''})}
                                                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </>
                                    ) : <ImageIcon className="w-8 h-8 text-slate-400" />}
                                </div>

                                {/* Inputs */}
                                <div className="flex-1 space-y-3">
                                    <div className="flex gap-2">
                                        <input 
                                            type="text" 
                                            className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-violet-500 outline-none transition-all text-sm"
                                            value={editingProject.image}
                                            onChange={e => setEditingProject({...editingProject, image: e.target.value})}
                                            placeholder="Dán link URL ảnh hoặc tải lên..."
                                        />
                                        <input 
                                            type="file" 
                                            ref={thumbnailInputRef}
                                            onChange={handleThumbnailUpload}
                                            className="hidden" 
                                            accept=".png, .jpg, .jpeg, .webp, image/png, image/jpeg, image/webp"
                                        />
                                        <button 
                                            type="button"
                                            onClick={() => thumbnailInputRef.current?.click()}
                                            disabled={isUploading}
                                            className="bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-300 px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-violet-200 dark:hover:bg-violet-500/30 transition-colors flex items-center gap-2 whitespace-nowrap"
                                        >
                                            <Upload className="w-4 h-4" /> Tải lên
                                        </button>
                                    </div>
                                    <p className="text-xs text-slate-500">Hỗ trợ JPG, PNG, WebP. Tự động lưu vào Supabase nếu đã cấu hình.</p>
                                </div>
                            </div>
                        </div>

                        {/* Section 2.5: Video Upload */}
                        <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex justify-between">
                                <span>Video giới thiệu (Tùy chọn)</span>
                                <span className="text-xs font-normal text-slate-400">Khuyên dùng: Link URL hoặc file &lt; 15MB</span>
                            </label>
                            
                            <div className="flex gap-6 items-start">
                                {/* Preview Box */}
                                <div className="w-32 h-24 flex-shrink-0 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 overflow-hidden flex items-center justify-center relative group">
                                    {editingProject.video ? (
                                        <>
                                            <video src={editingProject.video} className="w-full h-full object-cover" muted />
                                            <button 
                                                type="button"
                                                onClick={() => setEditingProject({...editingProject, video: ''})}
                                                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </>
                                    ) : <Video className="w-8 h-8 text-slate-400" />}
                                </div>

                                {/* Inputs */}
                                <div className="flex-1 space-y-3">
                                    <div className="flex gap-2">
                                        <input 
                                            type="text" 
                                            className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-violet-500 outline-none transition-all text-sm"
                                            value={editingProject.video || ''}
                                            onChange={e => setEditingProject({...editingProject, video: e.target.value})}
                                            placeholder="Dán link URL video (MP4)..."
                                        />
                                        <input 
                                            type="file" 
                                            ref={videoInputRef}
                                            onChange={handleVideoUpload}
                                            className="hidden" 
                                            accept="video/*"
                                        />
                                        <button 
                                            type="button"
                                            onClick={() => videoInputRef.current?.click()}
                                            disabled={isUploading}
                                            className="bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-300 px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-violet-200 dark:hover:bg-violet-500/30 transition-colors flex items-center gap-2 whitespace-nowrap"
                                        >
                                            <Upload className="w-4 h-4" /> Tải lên
                                        </button>
                                    </div>
                                    <p className="text-xs text-slate-500">
                                        <span className="text-amber-500 font-bold">Lời khuyên:</span> Sử dụng Link YouTube/Vimeo giúp web tải nhanh hơn.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Gallery Management */}
                        <div className="space-y-4 border-t border-slate-100 dark:border-slate-800 pt-6">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                    Bộ sưu tập hình ảnh (Gallery)
                                </label>
                                <div className="flex gap-2">
                                    <input 
                                        type="file" 
                                        ref={galleryInputRef}
                                        onChange={handleGalleryUpload}
                                        className="hidden" 
                                        accept=".png, .jpg, .jpeg, .webp, image/png, image/jpeg, image/webp"
                                        multiple 
                                    />
                                    <button 
                                        type="button"
                                        onClick={addGalleryUrl}
                                        className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1"
                                    >
                                        <LinkIcon className="w-3 h-3" /> URL
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => galleryInputRef.current?.click()}
                                        className="px-3 py-1.5 rounded-lg bg-violet-600 text-white text-xs font-bold hover:bg-violet-700 flex items-center gap-1 shadow-md"
                                    >
                                        <Plus className="w-3 h-3" /> Thêm ảnh
                                    </button>
                                </div>
                            </div>

                            {/* Gallery Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 min-h-[120px]">
                                {editingProject.gallery && editingProject.gallery.length > 0 ? (
                                    editingProject.gallery.map((img, idx) => (
                                        <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                                            <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <button 
                                                    type="button"
                                                    onClick={() => removeGalleryImage(idx)}
                                                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-sm"
                                                    title="Xóa ảnh này"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-md">
                                                #{idx + 1}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full flex flex-col items-center justify-center text-slate-400 py-4">
                                        <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                                        <p className="text-sm">Chưa có hình ảnh nào trong bộ sưu tập.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Section 4: Detailed Text Info */}
                        <div className="space-y-4 border-t border-slate-100 dark:border-slate-800 pt-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Mô tả chi tiết</label>
                                <textarea 
                                    rows={4}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none transition-all resize-none"
                                    value={editingProject.description}
                                    onChange={e => setEditingProject({...editingProject, description: e.target.value})}
                                    placeholder="Mô tả về dự án, mục tiêu, kết quả..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Khách hàng</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                                        value={editingProject.client}
                                        onChange={e => setEditingProject({...editingProject, client: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Năm thực hiện</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                                        value={editingProject.year}
                                        onChange={e => setEditingProject({...editingProject, year: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Công nghệ (cách nhau bởi dấu phẩy)</label>
                                <input 
                                    type="text" 
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                                    value={editingProject.technologies?.join(', ')}
                                    onChange={e => updateTech(e.target.value)}
                                    placeholder="React, Tailwind, Node.js..."
                                />
                            </div>
                        </div>

                        {/* Section 5: Thanks / Footer Content */}
                        <div className="space-y-4 border-t border-slate-100 dark:border-slate-800 pt-6">
                            <div className="flex items-center gap-2 mb-2">
                                <Heart className="w-5 h-5 text-pink-500" />
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Phần "Cảm ơn & Theo dõi"</h3>
                            </div>
                            <p className="text-xs text-slate-500 mb-4">Phần này hiển thị ở cuối trang chi tiết dự án (Tiêu đề, lời cảm ơn, link mạng xã hội...).</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Tiêu đề (VD: Thanks for Visiting)</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                                        value={editingProject.thanksTitle || ''}
                                        onChange={e => setEditingProject({...editingProject, thanksTitle: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Lời nhắn (VD: Your Likes...)</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                                        value={editingProject.thanksMessage || ''}
                                        onChange={e => setEditingProject({...editingProject, thanksMessage: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Mô tả ngắn / Branding</label>
                                <textarea 
                                    rows={2}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none transition-all resize-none"
                                    value={editingProject.thanksDescription || ''}
                                    onChange={e => setEditingProject({...editingProject, thanksDescription: e.target.value})}
                                    placeholder="We position Global Smart Technology Studio..."
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Text Nút Liên Hệ</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                                        value={editingProject.thanksLinkText || ''}
                                        onChange={e => setEditingProject({...editingProject, thanksLinkText: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Link Liên Hệ (URL)</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-violet-500 outline-none transition-all"
                                        value={editingProject.thanksLinkUrl || ''}
                                        onChange={e => setEditingProject({...editingProject, thanksLinkUrl: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Footer Actions - Fixed at Bottom */}
                    <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3 flex-shrink-0 z-50 relative">
                        <button 
                            type="button" 
                            onClick={() => setIsModalOpen(false)}
                            className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                            Hủy bỏ
                        </button>
                        <button 
                            type="button" 
                            onClick={handleSave}
                            disabled={isUploading}
                            className={`px-6 py-3 rounded-xl font-bold bg-violet-600 text-white hover:bg-violet-700 shadow-lg shadow-violet-600/20 transition-all flex items-center gap-2 cursor-pointer ${isUploading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isUploading ? <Loader2 className="w-5 h-5 animate-spin"/> : <Save className="w-5 h-5" />} 
                            {isUploading ? 'Đang tải lên...' : 'Lưu Dự Án'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManager;
