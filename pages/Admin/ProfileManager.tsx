
import React, { useState, useRef } from 'react';
import { useData } from '../../DataContext';
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const ProfileManager: React.FC = () => {
  const { cvUrl, updateCv, uploadFile } = useData(); // Added uploadFile
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setMessage(null);
    
    if (!file) return;

    // Check file type
    if (file.type !== 'application/pdf') {
        setMessage({ type: 'error', text: 'Vui lòng chỉ tải lên file định dạng PDF.' });
        return;
    }

    // Check file size (Supabase limit usually higher, but keep safe limit)
    if (file.size > 10 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'File quá lớn! Vui lòng tải file nhỏ hơn 10MB.' });
        return;
    }

    setIsUploading(true);
    try {
        // --- UPDATED LOGIC: Upload to Supabase instead of Base64 ---
        const publicUrl = await uploadFile(file);
        
        // Save the Public URL instead of the file content
        updateCv(publicUrl);
        setMessage({ type: 'success', text: 'Đã tải CV lên Cloud và cập nhật thành công!' });
    } catch (err: any) {
        console.error(err);
        // Error is already alerted by uploadFile if it's a Supabase connection issue
        if (!err.message?.includes('Supabase')) {
             setMessage({ type: 'error', text: 'Lỗi tải file. Vui lòng kiểm tra kết nối mạng.' });
        }
    } finally {
        setIsUploading(false);
        // Reset input
        if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemoveCv = () => {
      if(window.confirm("Bạn có chắc chắn muốn xóa CV hiện tại không?")) {
          updateCv('');
          setMessage({ type: 'success', text: 'Đã xóa CV hiện tại.' });
      }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Hồ sơ & CV</h1>
        <p className="text-slate-500 mt-1">Quản lý CV hiển thị trên trang chủ để nhà tuyển dụng tải về.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-8 max-w-2xl">
        
        <div className="flex items-start gap-6 mb-8">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${cvUrl ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500'}`}>
                <FileText className="w-8 h-8" />
            </div>
            <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {cvUrl ? 'Đã có CV trên hệ thống' : 'Chưa có CV nào'}
                </h3>
                <p className="text-slate-500 text-sm">
                    {cvUrl 
                        ? 'CV của bạn đang được lưu trữ trên Cloud và hiển thị công khai.' 
                        : 'Vui lòng tải lên file PDF. Dung lượng tối đa 10MB.'}
                </p>
                
                {cvUrl && (
                    <div className="mt-3 flex gap-3">
                        <a 
                            href={cvUrl} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-bold text-violet-600 hover:text-violet-700 hover:underline"
                        >
                            Xem CV hiện tại
                        </a>
                        <span className="text-slate-300">|</span>
                        <button 
                            onClick={handleRemoveCv}
                            className="text-sm font-bold text-red-500 hover:text-red-600 hover:underline"
                        >
                            Xóa CV
                        </button>
                    </div>
                )}
            </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-8">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">
                Tải lên CV mới (PDF)
            </label>
            
            <div 
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors cursor-pointer ${isUploading ? 'bg-slate-50 border-slate-300' : 'border-slate-300 hover:border-violet-500 hover:bg-violet-50 dark:border-slate-700 dark:hover:border-violet-500 dark:hover:bg-violet-900/10'}`}
                onClick={() => !isUploading && fileInputRef.current?.click()}
            >
                <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="application/pdf"
                    className="hidden" 
                    disabled={isUploading}
                />
                
                {isUploading ? (
                    <div className="flex flex-col items-center">
                        <Loader2 className="w-8 h-8 text-violet-600 animate-spin mb-2" />
                        <span className="text-slate-500 font-medium">Đang upload lên Supabase Storage...</span>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <Upload className="w-10 h-10 text-slate-400 mb-3" />
                        <span className="text-slate-900 dark:text-white font-bold mb-1">Nhấn để chọn file</span>
                        <span className="text-xs text-slate-500">hoặc kéo thả file vào đây (Max 10MB)</span>
                    </div>
                )}
            </div>

            {message && (
                <div className={`mt-4 p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400'}`}>
                    {message.type === 'success' ? <CheckCircle2 className="w-5 h-5"/> : <AlertCircle className="w-5 h-5"/>}
                    <span className="font-medium">{message.text}</span>
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default ProfileManager;
