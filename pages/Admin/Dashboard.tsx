
import React from 'react';
import { useData } from '../../DataContext';
import { FolderKanban, Users, Eye, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { projects, messages, totalVisits } = useData();

  const stats = [
    { title: 'Tổng dự án', value: projects.length, icon: FolderKanban, color: 'bg-violet-500', text: 'text-violet-500' },
    { title: 'Lượt truy cập', value: totalVisits.toLocaleString(), icon: Eye, color: 'bg-cyan-500', text: 'text-cyan-500' },
    { title: 'Hộp thư đến', value: messages.length, icon: Users, color: 'bg-emerald-500', text: 'text-emerald-500' },
    { title: 'Trạng thái', value: 'Online', icon: Activity, color: 'bg-amber-500', text: 'text-amber-500' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Tổng quan</h1>
          <p className="text-slate-500 mt-1">Chào mừng trở lại, Administrator.</p>
        </div>
        <div className="text-sm text-slate-400 bg-white dark:bg-slate-900 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
           Hệ thống hoạt động bình thường
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">{stat.title}</p>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">{stat.value}</h3>
            </div>
            <div className={`w-12 h-12 rounded-xl ${stat.color} bg-opacity-10 flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.text}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
           <div className="flex justify-between items-center mb-4">
               <h3 className="text-lg font-bold text-slate-900 dark:text-white">Tin nhắn mới nhất</h3>
               <Link to="/admin/inbox" className="text-sm text-violet-500 hover:text-violet-600 font-bold">Xem tất cả</Link>
           </div>
           
           <div className="space-y-4">
              {messages.length > 0 ? (
                  messages.slice(0, 3).map(msg => (
                      <div key={msg.id} className="flex items-start gap-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors border-b border-slate-50 dark:border-slate-800 last:border-0">
                          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-500 flex-shrink-0">
                              {msg.name.charAt(0)}
                          </div>
                          <div>
                              <div className="flex justify-between w-full">
                                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{msg.name}</h4>
                                  <span className="text-xs text-slate-400">{new Date(msg.date).toLocaleDateString()}</span>
                              </div>
                              <p className="text-xs text-slate-500 mt-1 line-clamp-1">{msg.subject}</p>
                          </div>
                      </div>
                  ))
              ) : (
                  <p className="text-slate-400 text-center py-4 text-sm">Chưa có tin nhắn nào.</p>
              )}
           </div>
        </div>
        
        <div className="bg-gradient-to-br from-violet-600 to-indigo-700 p-8 rounded-2xl text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
            <h3 className="text-xl font-bold mb-2 relative z-10">Mẹo quản trị</h3>
            <p className="opacity-90 relative z-10">Bạn có thể quản lý tin nhắn khách hàng trực tiếp tại phần Hộp thư. Đừng quên kiểm tra thường xuyên!</p>
            <Link to="/admin/inbox" className="inline-block mt-6 bg-white text-violet-700 px-6 py-2 rounded-lg font-bold text-sm shadow-lg hover:bg-opacity-90 transition-all relative z-10">
                Đến hộp thư
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
