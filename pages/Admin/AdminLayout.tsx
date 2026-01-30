
import React from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Type, LogOut, Home, UserCircle, LayoutTemplate, User, Mail, Layers, Phone, BookOpen, Palette, CloudCog } from 'lucide-react';
import { useData } from '../../DataContext';

const AdminLayout: React.FC = () => {
  const { logout, messages } = useData();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const unreadCount = messages.filter(m => !m.read).length;

  const navItems = [
    { name: 'Tổng quan', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Hộp thư', path: '/admin/inbox', icon: Mail },
    { name: 'DevOps Center', path: '/admin/devops', icon: CloudCog },
    { name: 'Quản lý Danh mục', path: '/admin/categories', icon: Layers },
    { name: 'Giao diện Trang chủ', path: '/admin/home-manager', icon: LayoutTemplate },
    { name: 'Quản lý trang About', path: '/admin/about-manager', icon: User },
    { name: 'Quản lý Liên hệ', path: '/admin/contact-manager', icon: Phone },
    { name: 'Quản lý Dự án', path: '/admin/projects', icon: FolderKanban },
    { name: 'Hồ sơ & CV', path: '/admin/profile', icon: UserCircle },
    { name: 'Design System', path: '/admin/guideline', icon: Palette },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f1115] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white fixed h-full z-20 flex flex-col border-r border-slate-800">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
            <span className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">G</span>
            ADMIN
          </h2>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium relative
                ${isActive 
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
              `}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
              {/* Badge for Inbox - Only show if there are unread messages */}
              {item.name === 'Hộp thư' && unreadCount > 0 && (
                  <span className="absolute right-4 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                      {unreadCount}
                  </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white transition-colors">
             <Home className="w-5 h-5" /> Quay về Website
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" /> Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;