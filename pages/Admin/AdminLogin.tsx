import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../DataContext';
import { Lock, AlertCircle } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useData();
  const navigate = useNavigate();

  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Mật khẩu không chính xác (Gợi ý: admin123)');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-violet-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-violet-600/30">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-white">Admin Portal</h1>
          <p className="text-slate-400 mt-2">Vui lòng xác thực quyền truy cập</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2">Mật khẩu bảo mật</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
              placeholder="Nhập mật khẩu..."
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-violet-600/20"
          >
            Đăng nhập hệ thống
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;