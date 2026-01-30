
import React, { useState } from 'react';
import { useData } from '../../DataContext';
import { Trash2, Mail, Clock, MailOpen, CheckSquare, Square, CheckCircle2 } from 'lucide-react';

const InboxManager: React.FC = () => {
  const { messages, deleteMessage, deleteMessages, markAsRead, markAllAsRead, showNotification } = useData();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Selection Logic
  const handleSelectAll = () => {
      if (selectedIds.length === messages.length) {
          setSelectedIds([]);
      } else {
          setSelectedIds(messages.map(m => m.id));
      }
  };

  const handleSelectOne = (id: number) => {
      if (selectedIds.includes(id)) {
          setSelectedIds(selectedIds.filter(sid => sid !== id));
      } else {
          setSelectedIds([...selectedIds, id]);
      }
  };

  // Actions
  const handleBulkDelete = () => {
      if (selectedIds.length === 0) return;
      if (window.confirm(`Bạn có chắc chắn muốn xóa ${selectedIds.length} tin nhắn đã chọn?`)) {
          deleteMessages(selectedIds);
          setSelectedIds([]);
          showNotification('success', 'Đã xóa tin nhắn thành công.');
      }
  };

  const handleDeleteOne = (e: React.MouseEvent, id: number) => {
      e.stopPropagation(); // Prevent marking as read when clicking delete
      if (window.confirm('Bạn có chắc chắn muốn xóa tin nhắn này?')) {
          deleteMessage(id);
          showNotification('success', 'Đã xóa tin nhắn.');
      }
  };

  const handleMarkAllRead = () => {
      markAllAsRead();
      showNotification('success', 'Đã đánh dấu tất cả là đã đọc.');
  };

  const handleMessageClick = (id: number, currentReadStatus: boolean) => {
      if (!currentReadStatus) {
          markAsRead(id);
      }
  };

  const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('vi-VN', {
          day: '2-digit', month: '2-digit', year: 'numeric',
          hour: '2-digit', minute: '2-digit'
      }).format(date);
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
        <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">Hộp thư đến</h1>
            <p className="text-slate-500 mt-1">
                Quản lý tin nhắn liên hệ từ khách hàng. 
                <span className="ml-2 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-xs font-bold text-slate-600 dark:text-slate-300">
                    {messages.length} tin nhắn
                </span>
            </p>
        </div>
        
        {messages.length > 0 && (
            <div className="flex items-center gap-2">
                {selectedIds.length > 0 ? (
                    <button 
                        onClick={handleBulkDelete}
                        className="flex items-center gap-2 bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg font-bold text-sm hover:bg-red-200 dark:hover:bg-red-500/20 transition-colors"
                    >
                        <Trash2 className="w-4 h-4" /> Xóa ({selectedIds.length})
                    </button>
                ) : (
                    <button 
                        onClick={handleMarkAllRead}
                        className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                        <MailOpen className="w-4 h-4" /> Đã đọc tất cả
                    </button>
                )}
            </div>
        )}
      </div>

      {messages.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-400">
                  <Mail className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Hộp thư trống</h3>
              <p className="text-slate-500 mt-2">Hiện tại chưa có tin nhắn nào từ khách hàng.</p>
          </div>
      ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              {/* Table Header / Toolbar */}
              <div className="flex items-center gap-4 p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                  <button 
                    onClick={handleSelectAll}
                    className="p-2 text-slate-400 hover:text-violet-600 transition-colors"
                    title="Chọn tất cả"
                  >
                      {selectedIds.length === messages.length && messages.length > 0 ? (
                          <CheckSquare className="w-5 h-5 text-violet-600" />
                      ) : (
                          <Square className="w-5 h-5" />
                      )}
                  </button>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                      {selectedIds.length > 0 ? `Đã chọn ${selectedIds.length}` : 'Danh sách tin nhắn'}
                  </span>
              </div>

              {/* Message List */}
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {messages.map((msg) => (
                      <div 
                        key={msg.id} 
                        onClick={() => handleMessageClick(msg.id, msg.read)}
                        className={`group flex flex-col md:flex-row gap-4 p-4 md:items-start cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50 ${!msg.read ? 'bg-violet-50/30 dark:bg-violet-900/10' : ''}`}
                      >
                          {/* Left: Checkbox & Avatar */}
                          <div className="flex items-start gap-4">
                               <div 
                                onClick={(e) => { e.stopPropagation(); handleSelectOne(msg.id); }}
                                className="mt-1 p-2 text-slate-300 hover:text-violet-600 cursor-pointer"
                               >
                                   {selectedIds.includes(msg.id) ? (
                                       <CheckSquare className="w-5 h-5 text-violet-600" />
                                   ) : (
                                       <Square className="w-5 h-5" />
                                   )}
                               </div>

                               <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold uppercase flex-shrink-0 text-sm relative ${!msg.read ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                                   {msg.name.charAt(0)}
                                   {!msg.read && (
                                       <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                                   )}
                               </div>
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                               <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-1">
                                   <h3 className={`text-base truncate pr-4 ${!msg.read ? 'font-black text-slate-900 dark:text-white' : 'font-medium text-slate-600 dark:text-slate-400'}`}>
                                       {msg.subject}
                                   </h3>
                                   <span className="text-xs font-medium text-slate-400 flex-shrink-0 flex items-center gap-1">
                                      <Clock className="w-3 h-3" /> {formatDate(msg.date)}
                                   </span>
                               </div>
                               
                               <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                                   <span className="font-bold text-slate-700 dark:text-slate-300">{msg.name}</span>
                                   <span>&lt;{msg.email}&gt;</span>
                               </div>

                               <p className={`text-sm leading-relaxed line-clamp-2 ${!msg.read ? 'text-slate-800 dark:text-slate-200 font-medium' : 'text-slate-500 dark:text-slate-500'}`}>
                                   {msg.message}
                               </p>
                               
                               {/* Expandable full content implies clicking goes to detail or expands inline. For now, expand inline if needed or stick to row click.
                                   Let's create a visual separator if it's open, but for this list view, the row click marks read is enough. 
                               */}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 md:self-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={(e) => handleDeleteOne(e, msg.id)}
                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                                title="Xóa"
                              >
                                  <Trash2 className="w-4 h-4" />
                              </button>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      )}
    </div>
  );
};

export default InboxManager;
