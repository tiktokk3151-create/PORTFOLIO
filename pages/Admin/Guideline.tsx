
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Layout, Type, Palette, MousePointer2, Layers, Box, Zap, 
    AlertCircle, CheckCircle2, Loader2, ArrowRight, Star, 
    Minus, Plus, Info, Lock, Search, Grid, Smartphone, Monitor,
    FileText, MessageSquare, Terminal, Component, Image as ImageIcon,
    AlertTriangle, ShieldCheck, ToggleLeft, Disc, MinusCircle,
    Users, Globe, Move, Maximize, FileJson, GitCommit, Eye, X,
    ChevronLeft, ChevronRight, Bell, Home
} from 'lucide-react';

// --- SUB-COMPONENTS FOR CONSISTENCY ---

const SectionHeader = ({ title, desc, icon: Icon }: { title: string, desc: string, icon?: any }) => (
    <div className="mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 mb-2">
            {Icon && <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg text-violet-600 dark:text-violet-400"><Icon className="w-6 h-6" /></div>}
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">{title}</h2>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-3xl">{desc}</p>
    </div>
);

const SubSection = ({ title, children }: { title: string, children?: React.ReactNode }) => (
    <div className="mb-12">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-violet-500 rounded-full"></span>
            {title}
        </h3>
        {children}
    </div>
);

const FlowStep = ({ label, sub, type = 'default' }: { label: string, sub: string, type?: 'start' | 'end' | 'default' }) => {
    let bgClass = "bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white";
    
    if (type === 'start') {
        bgClass = "bg-slate-900 dark:bg-slate-200 text-white dark:text-slate-900 border-slate-900 dark:border-slate-200";
    } else if (type === 'end') {
        bgClass = "bg-emerald-500 text-white border-emerald-500";
    }

    return (
        <div className="flex flex-col items-center gap-2">
            <div className={`px-5 py-2.5 border rounded-xl font-bold text-sm shadow-sm whitespace-nowrap ${bgClass}`}>
                {label}
            </div>
            <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wide">{sub}</span>
        </div>
    );
};

const CodeBlock = ({ code, language = "json" }: { code: string, language?: string }) => (
    <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 my-2">
        <div className="bg-slate-950 px-4 py-1 border-b border-slate-800 flex justify-between items-center">
            <span className="text-[10px] text-slate-500 font-mono uppercase">{language}</span>
            <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div><div className="w-2.5 h-2.5 rounded-full bg-amber-500/20"></div><div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20"></div></div>
        </div>
        <div className="p-4 font-mono text-xs text-slate-300 overflow-x-auto">
            <pre>{code}</pre>
        </div>
    </div>
);

const ColorCard = ({ name, hex, usage, bgClass, textClass = "text-slate-500" }: { name: string, hex: string, usage: string, bgClass: string, textClass?: string }) => (
    <div className="flex flex-col gap-2">
        <div className={`h-24 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 ${bgClass} flex items-end p-3`}>
            <span className="bg-white/90 dark:bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-xs font-mono font-bold uppercase">{hex}</span>
        </div>
        <div>
            <p className="font-bold text-slate-900 dark:text-white text-sm">{name}</p>
            <p className={`text-xs ${textClass}`}>{usage}</p>
        </div>
    </div>
);

const Guideline: React.FC = () => {
  const [activeTab, setActiveTab] = useState('product');

  const tabs = [
      { id: 'product', label: '1. Product / UX', icon: Layout },
      { id: 'foundation', label: '2. Foundation', icon: Palette },
      { id: 'components', label: '3. Components', icon: Component },
      { id: 'patterns', label: '4. Patterns', icon: Grid },
      { id: 'content', label: '5. Content', icon: FileText },
      { id: 'dev', label: '6. Dev Handoff', icon: Terminal },
  ];

  return (
    <div className="max-w-7xl mx-auto pb-24">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center text-white font-black text-xl">DS</div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white">Design System</h1>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-lg">Hệ thống quy chuẩn thiết kế và phát triển cho Gin Portfolio - v1.2</p>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 mb-10 pb-2 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-slate-50 dark:bg-[#0f1115] z-40 pt-4 hide-scrollbar">
          {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-t-xl font-bold transition-all text-sm ${activeTab === tab.id ? 'bg-white dark:bg-slate-900 text-violet-600 dark:text-violet-400 border-b-2 border-violet-600 dark:border-violet-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              >
                  <tab.icon className="w-4 h-4" /> {tab.label}
              </button>
          ))}
      </div>

      {/* Main Content Area */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-sm min-h-[60vh]">
          
          {/* ---------------- 1. PRODUCT / UX FOUNDATION ---------------- */}
          {activeTab === 'product' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <SectionHeader title="Product / UX Foundation" desc="Định hướng cốt lõi, luồng người dùng và cấu trúc thông tin của sản phẩm." icon={Layout} />

                  <SubSection title="1.1 Product Overview">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center mb-4"><Star className="w-5 h-5"/></div>
                              <h4 className="font-bold text-lg mb-2">Mục tiêu sản phẩm</h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400">Xây dựng thương hiệu cá nhân chuyên nghiệp, trưng bày Portfolio các dự án UI/UX & Dev để thu hút nhà tuyển dụng và khách hàng.</p>
                          </div>
                          <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mb-4"><Users className="w-5 h-5"/></div>
                              <h4 className="font-bold text-lg mb-2">Đối tượng người dùng</h4>
                              <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc list-inside space-y-1">
                                  <li>HR / Recruiters (Cần xem CV, Info nhanh)</li>
                                  <li>Clients (Cần xem dự án mẫu, liên hệ)</li>
                                  <li>Developers (Tham khảo code/design)</li>
                              </ul>
                          </div>
                          <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                              <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-full flex items-center justify-center mb-4"><Monitor className="w-5 h-5"/></div>
                              <h4 className="font-bold text-lg mb-2">Ngữ cảnh sử dụng</h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400">Web Responsive (Desktop cho Recruiters xem hồ sơ chi tiết, Mobile cho việc truy cập nhanh từ link social).</p>
                          </div>
                      </div>
                  </SubSection>

                  <SubSection title="1.2 User Flows (Happy Paths)">
                      <p className="text-sm text-slate-500 mb-6">Mô tả hành trình lý tưởng của 2 nhóm người dùng chính: Khách truy cập (Visitor) và Quản trị viên (Admin).</p>
                      
                      <div className="space-y-8">
                          {/* Visitor Flow */}
                          <div>
                              <h4 className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                  <Globe className="w-4 h-4"/> Visitor Journey
                              </h4>
                              <div className="bg-slate-50 dark:bg-slate-800/30 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-x-auto">
                                  <div className="flex items-center gap-4 min-w-max">
                                      <FlowStep label="Landing Page" sub="Entry Point" type="start" />
                                      <ArrowRight className="text-slate-300" />
                                      <FlowStep label="Scan Profile" sub="Hero / About" />
                                      <ArrowRight className="text-slate-300" />
                                      <FlowStep label="Explore Work" sub="Project List" />
                                      <ArrowRight className="text-slate-300" />
                                      <FlowStep label="Deep Dive" sub="Case Study" />
                                      <ArrowRight className="text-slate-300" />
                                      <FlowStep label="Connect" sub="Contact / CV" type="end" />
                                  </div>
                              </div>
                          </div>

                          {/* Admin Flow */}
                          <div>
                              <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                  <Lock className="w-4 h-4"/> Admin Journey
                              </h4>
                              <div className="bg-slate-50 dark:bg-slate-800/30 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-x-auto">
                                  <div className="flex items-center gap-4 min-w-max">
                                      <FlowStep label="Login" sub="Authentication" type="start" />
                                      <ArrowRight className="text-slate-300" />
                                      <FlowStep label="Dashboard" sub="Overview" />
                                      <ArrowRight className="text-slate-300" />
                                      <FlowStep label="Content Mgr" sub="CMS / Projects" />
                                      <ArrowRight className="text-slate-300" />
                                      <FlowStep label="Check Inbox" sub="Feedback" />
                                      <ArrowRight className="text-slate-300" />
                                      <FlowStep label="System Update" sub="Maintenance" type="end" />
                                  </div>
                              </div>
                          </div>
                      </div>
                  </SubSection>

                  <SubSection title="1.3 Information Architecture (Sitemap)">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="border border-slate-200 dark:border-slate-700 rounded-2xl p-6">
                              <h4 className="font-bold mb-4 flex items-center gap-2"><Globe className="w-4 h-4 text-blue-500"/> Public Client</h4>
                              <ul className="space-y-3 text-sm font-mono text-slate-600 dark:text-slate-400 pl-4 border-l-2 border-slate-200 dark:border-slate-700">
                                  <li>/ <span className="text-slate-400">// Home (Hero, About Summary, Featured, CTA)</span></li>
                                  <li>/about <span className="text-slate-400">// Chi tiết về tôi, Kinh nghiệm, Hobbies</span></li>
                                  <li>/projects <span className="text-slate-400">// Danh sách dự án (Filterable)</span></li>
                                  <li>/projects/:id <span className="text-slate-400">// Chi tiết dự án (Gallery, Video)</span></li>
                                  <li>/contact <span className="text-slate-400">// Form liên hệ</span></li>
                              </ul>
                          </div>
                          <div className="border border-slate-200 dark:border-slate-700 rounded-2xl p-6 bg-slate-50 dark:bg-slate-800/20">
                              <h4 className="font-bold mb-4 flex items-center gap-2"><Lock className="w-4 h-4 text-red-500"/> Admin Portal (CMS)</h4>
                              <ul className="space-y-3 text-sm font-mono text-slate-600 dark:text-slate-400 pl-4 border-l-2 border-slate-200 dark:border-slate-700">
                                  <li>/admin/dashboard <span className="text-slate-400">// Thống kê tổng quan</span></li>
                                  <li>/admin/inbox <span className="text-slate-400">// Quản lý tin nhắn</span></li>
                                  <li>/admin/projects <span className="text-slate-400">// CRUD Dự án</span></li>
                                  <li>/admin/categories <span className="text-slate-400">// Quản lý danh mục</span></li>
                                  <li>/admin/*-manager <span className="text-slate-400">// CMS cho Home, About, Contact</span></li>
                              </ul>
                          </div>
                      </div>
                  </SubSection>
              </div>
          )}

          {/* ---------------- 2. DESIGN FOUNDATION ---------------- */}
          {activeTab === 'foundation' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <SectionHeader title="Design Foundation" desc="Hệ thống màu sắc, typography và lưới làm nền tảng cho giao diện." icon={Palette} />

                  <SubSection title="2.1 Color System">
                      <div className="space-y-8">
                          <div>
                              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Primary & Brand</h4>
                              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                  <ColorCard name="Violet 50" hex="#F5F3FF" usage="Background tint" bgClass="bg-violet-50" />
                                  <ColorCard name="Violet 100" hex="#EDE9FE" usage="Hover background" bgClass="bg-violet-100" />
                                  <ColorCard name="Violet 500" hex="#8B5CF6" usage="Focus rings, Borders" bgClass="bg-violet-500" textClass="text-white" />
                                  <ColorCard name="Violet 600" hex="#7C3AED" usage="Primary Buttons" bgClass="bg-violet-600" textClass="text-white" />
                                  <ColorCard name="Violet 900" hex="#4C1D95" usage="Dark Text" bgClass="bg-violet-900" textClass="text-white" />
                              </div>
                          </div>
                          <div>
                              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Neutral (Slate)</h4>
                              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                  <ColorCard name="Slate 50" hex="#F8FAFC" usage="Light BG" bgClass="bg-slate-50" />
                                  <ColorCard name="Slate 200" hex="#E2E8F0" usage="Borders" bgClass="bg-slate-200" />
                                  <ColorCard name="Slate 500" hex="#64748B" usage="Body Text" bgClass="bg-slate-500" textClass="text-white" />
                                  <ColorCard name="Slate 800" hex="#1E293B" usage="Dark Surface" bgClass="bg-slate-800" textClass="text-white" />
                                  <ColorCard name="Slate 900" hex="#0F172A" usage="Dark BG / Headings" bgClass="bg-slate-900" textClass="text-white" />
                              </div>
                          </div>
                          <div>
                              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Semantic Status</h4>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                  <ColorCard name="Success" hex="#10B981" usage="Emerald-500" bgClass="bg-emerald-500" textClass="text-white" />
                                  <ColorCard name="Error" hex="#EF4444" usage="Red-500" bgClass="bg-red-500" textClass="text-white" />
                                  <ColorCard name="Warning" hex="#F59E0B" usage="Amber-500" bgClass="bg-amber-500" textClass="text-white" />
                                  <ColorCard name="Info" hex="#3B82F6" usage="Blue-500" bgClass="bg-blue-500" textClass="text-white" />
                              </div>
                          </div>
                      </div>
                  </SubSection>

                  <SubSection title="2.2 Typography System">
                      <div className="bg-slate-50 dark:bg-slate-800/30 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
                          <div className="flex justify-between items-end mb-8 border-b border-slate-200 dark:border-slate-700 pb-4">
                              <div>
                                  <p className="text-sm text-slate-500">Typeface</p>
                                  <p className="text-2xl font-black text-slate-900 dark:text-white">Nunito</p>
                                  <p className="text-xs text-slate-400 font-mono">Google Fonts (Sans-serif)</p>
                              </div>
                              <div className="text-right hidden md:block">
                                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Weights</p>
                                  <div className="flex gap-2 mt-2">
                                      <span className="w-8 h-8 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-light text-xs">300</span>
                                      <span className="w-8 h-8 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-normal text-xs">400</span>
                                      <span className="w-8 h-8 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-xs">700</span>
                                      <span className="w-8 h-8 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-black text-xs">900</span>
                                  </div>
                              </div>
                          </div>

                          <div className="space-y-8">
                              {/* Display */}
                              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-slate-200 dark:border-slate-700 pb-6">
                                  <div className="md:col-span-3">
                                      <p className="text-sm font-bold text-slate-900 dark:text-white">Display</p>
                                      <p className="text-xs text-violet-600 font-mono mt-1">text-6xl</p>
                                      <p className="text-[10px] text-slate-400 mt-0.5">60px / 3.75rem</p>
                                  </div>
                                  <div className="md:col-span-9">
                                      <p className="text-6xl font-black text-slate-900 dark:text-white truncate">The quick brown fox</p>
                                  </div>
                              </div>

                              {/* H1 */}
                              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-slate-200 dark:border-slate-700 pb-6">
                                  <div className="md:col-span-3">
                                      <p className="text-sm font-bold text-slate-900 dark:text-white">Heading 1</p>
                                      <p className="text-xs text-violet-600 font-mono mt-1">text-5xl</p>
                                      <p className="text-[10px] text-slate-400 mt-0.5">48px / 3rem</p>
                                  </div>
                                  <div className="md:col-span-9">
                                      <p className="text-5xl font-black text-slate-900 dark:text-white truncate">The quick brown fox</p>
                                  </div>
                              </div>

                              {/* H2 */}
                              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-slate-200 dark:border-slate-700 pb-6">
                                  <div className="md:col-span-3">
                                      <p className="text-sm font-bold text-slate-900 dark:text-white">Heading 2</p>
                                      <p className="text-xs text-violet-600 font-mono mt-1">text-4xl</p>
                                      <p className="text-[10px] text-slate-400 mt-0.5">36px / 2.25rem</p>
                                  </div>
                                  <div className="md:col-span-9">
                                      <p className="text-4xl font-bold text-slate-900 dark:text-white truncate">The quick brown fox</p>
                                  </div>
                              </div>

                              {/* H3 */}
                              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-slate-200 dark:border-slate-700 pb-6">
                                  <div className="md:col-span-3">
                                      <p className="text-sm font-bold text-slate-900 dark:text-white">Heading 3</p>
                                      <p className="text-xs text-violet-600 font-mono mt-1">text-2xl</p>
                                      <p className="text-[10px] text-slate-400 mt-0.5">24px / 1.5rem</p>
                                  </div>
                                  <div className="md:col-span-9">
                                      <p className="text-2xl font-bold text-slate-900 dark:text-white truncate">The quick brown fox</p>
                                  </div>
                              </div>

                              {/* Body */}
                              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b border-slate-200 dark:border-slate-700 pb-6">
                                  <div className="md:col-span-3">
                                      <p className="text-sm font-bold text-slate-900 dark:text-white">Body</p>
                                      <p className="text-xs text-violet-600 font-mono mt-1">text-base</p>
                                      <p className="text-[10px] text-slate-400 mt-0.5">16px / 1rem</p>
                                  </div>
                                  <div className="md:col-span-9">
                                      <p className="text-base text-slate-600 dark:text-slate-400">
                                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                      </p>
                                  </div>
                              </div>

                              {/* Small / Caption */}
                              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                  <div className="md:col-span-3">
                                      <p className="text-sm font-bold text-slate-900 dark:text-white">Caption</p>
                                      <p className="text-xs text-violet-600 font-mono mt-1">text-xs</p>
                                      <p className="text-[10px] text-slate-400 mt-0.5">12px / 0.75rem</p>
                                  </div>
                                  <div className="md:col-span-9">
                                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                                          The quick brown fox jumps over the lazy dog
                                      </p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </SubSection>

                  <SubSection title="2.3 Spacing & Layout">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                              <h4 className="font-bold mb-4">Base Unit: 4px (Tailwind Scale)</h4>
                              <div className="space-y-2">
                                  <div className="flex items-center gap-4"><div className="w-1 h-4 bg-violet-500"></div> <span className="text-xs font-mono">w-1 (4px)</span></div>
                                  <div className="flex items-center gap-4"><div className="w-2 h-4 bg-violet-500"></div> <span className="text-xs font-mono">w-2 (8px) - Small gap</span></div>
                                  <div className="flex items-center gap-4"><div className="w-4 h-4 bg-violet-500"></div> <span className="text-xs font-mono">w-4 (16px) - Standard padding</span></div>
                                  <div className="flex items-center gap-4"><div className="w-8 h-4 bg-violet-500"></div> <span className="text-xs font-mono">w-8 (32px) - Section gap</span></div>
                              </div>
                          </div>
                          <div>
                              <h4 className="font-bold mb-4">Grid System</h4>
                              <div className="grid grid-cols-12 gap-2 text-center text-xs text-white">
                                  <div className="bg-violet-400 py-2 col-span-1">1</div>
                                  <div className="bg-violet-400 py-2 col-span-1">1</div>
                                  <div className="bg-violet-400 py-2 col-span-1">1</div>
                                  <div className="bg-violet-400 py-2 col-span-1">1</div>
                                  <div className="bg-violet-400 py-2 col-span-1">1</div>
                                  <div className="bg-violet-400 py-2 col-span-1">1</div>
                                  <div className="bg-violet-400 py-2 col-span-1">1</div>
                                  <div className="bg-violet-400 py-2 col-span-1">1</div>
                                  <div className="bg-violet-400 py-2 col-span-1">1</div>
                                  <div className="bg-violet-400 py-2 col-span-1">1</div>
                                  <div className="bg-violet-400 py-2 col-span-1">1</div>
                                  <div className="bg-violet-400 py-2 col-span-1">1</div>
                                  
                                  <div className="bg-violet-500 py-2 col-span-4">4 (Mobile)</div>
                                  <div className="bg-violet-500 py-2 col-span-4">4</div>
                                  <div className="bg-violet-500 py-2 col-span-4">4</div>

                                  <div className="bg-violet-600 py-2 col-span-6">6 (Tablet)</div>
                                  <div className="bg-violet-600 py-2 col-span-6">6</div>
                              </div>
                          </div>
                      </div>
                  </SubSection>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <SubSection title="2.4 Iconography">
                          <div className="flex flex-wrap gap-6 p-6 border border-slate-200 dark:border-slate-700 rounded-2xl">
                              <div className="text-center space-y-2">
                                  <Layout className="w-6 h-6 mx-auto" strokeWidth={2} />
                                  <p className="text-xs text-slate-500">Regular (2px)</p>
                              </div>
                              <div className="text-center space-y-2">
                                  <Layout className="w-6 h-6 mx-auto" strokeWidth={1} />
                                  <p className="text-xs text-slate-500">Thin (1px)</p>
                              </div>
                              <div className="text-center space-y-2">
                                  <Layout className="w-6 h-6 mx-auto text-violet-600" strokeWidth={2} />
                                  <p className="text-xs text-slate-500">Colored</p>
                              </div>
                              <div className="text-center space-y-2">
                                  <div className="w-8 h-8 bg-slate-900 rounded flex items-center justify-center text-white mx-auto"><Layout className="w-4 h-4" /></div>
                                  <p className="text-xs text-slate-500">Inverted</p>
                              </div>
                          </div>
                          <p className="mt-4 text-sm text-slate-500">Library: <strong>Lucide React</strong>. Style: Rounded, 2px Stroke Default.</p>
                      </SubSection>

                      <SubSection title="2.5 Elevation & Depth">
                          <div className="grid grid-cols-2 gap-6">
                              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-6 flex flex-col items-center border border-slate-100 dark:border-slate-800">
                                  <span className="text-xs font-bold text-slate-500 mb-1">shadow-sm</span>
                                  <span className="text-[10px] text-slate-400 font-mono text-center">0 1px 2px 0<br/>rgb(0 0 0 / 0.05)</span>
                              </div>
                              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-6 flex flex-col items-center border border-slate-100 dark:border-slate-800">
                                  <span className="text-xs font-bold text-slate-500 mb-1">shadow-md</span>
                                  <span className="text-[10px] text-slate-400 font-mono text-center">0 4px 6px -1px<br/>rgb(0 0 0 / 0.1)</span>
                              </div>
                              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl p-6 flex flex-col items-center border border-slate-100 dark:border-slate-800">
                                  <span className="text-xs font-bold text-slate-500 mb-1">shadow-xl</span>
                                  <span className="text-[10px] text-slate-400 font-mono text-center">0 20px 25px -5px<br/>rgb(0 0 0 / 0.1)</span>
                              </div>
                              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl p-6 flex flex-col items-center border border-slate-100 dark:border-slate-800">
                                  <span className="text-xs font-bold text-slate-500 mb-1">shadow-2xl</span>
                                  <span className="text-[10px] text-slate-400 font-mono text-center">0 25px 50px -12px<br/>rgb(0 0 0 / 0.25)</span>
                              </div>
                          </div>
                      </SubSection>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <SubSection title="2.6 Corner Radius">
                          <div className="space-y-4">
                              <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 rounded-lg"></div>
                                  <div>
                                      <p className="font-bold text-sm">rounded-lg</p>
                                      <p className="text-xs font-mono text-slate-500">0.5rem (8px)</p>
                                  </div>
                              </div>
                              <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 rounded-xl"></div>
                                  <div>
                                      <p className="font-bold text-sm">rounded-xl</p>
                                      <p className="text-xs font-mono text-slate-500">0.75rem (12px)</p>
                                  </div>
                              </div>
                              <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 rounded-2xl"></div>
                                  <div>
                                      <p className="font-bold text-sm">rounded-2xl</p>
                                      <p className="text-xs font-mono text-slate-500">1rem (16px)</p>
                                  </div>
                              </div>
                              <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 rounded-3xl"></div>
                                  <div>
                                      <p className="font-bold text-sm">rounded-3xl</p>
                                      <p className="text-xs font-mono text-slate-500">1.5rem (24px)</p>
                                  </div>
                              </div>
                          </div>
                      </SubSection>

                      <SubSection title="2.7 Motion System">
                          <div className="flex flex-col gap-6">
                              <div className="flex gap-4">
                                  <motion.div 
                                    whileHover={{ scale: 1.1 }}
                                    className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-xl flex items-center justify-center flex-col text-center cursor-pointer"
                                  >
                                      <Move className="w-6 h-6 mb-1" />
                                      <span className="text-[10px] font-bold">Interact Me</span>
                                  </motion.div>
                                  <div className="space-y-2 text-xs text-slate-500 flex-1">
                                      <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                                          <span>Type</span>
                                          <span className="font-mono text-slate-900 dark:text-white">Spring (Physics)</span>
                                      </div>
                                      <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                                          <span>Stiffness</span>
                                          <span className="font-mono text-slate-900 dark:text-white">300</span>
                                      </div>
                                      <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                                          <span>Damping</span>
                                          <span className="font-mono text-slate-900 dark:text-white">30</span>
                                      </div>
                                      <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                                          <span>Mass</span>
                                          <span className="font-mono text-slate-900 dark:text-white">1</span>
                                      </div>
                                  </div>
                              </div>
                              
                              <div className="grid grid-cols-3 gap-2">
                                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-center">
                                      <p className="text-xs font-bold text-slate-900 dark:text-white">Fast</p>
                                      <p className="text-[10px] text-slate-500 font-mono">200ms</p>
                                  </div>
                                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-center">
                                      <p className="text-xs font-bold text-slate-900 dark:text-white">Normal</p>
                                      <p className="text-[10px] text-slate-500 font-mono">300ms</p>
                                  </div>
                                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-center">
                                      <p className="text-xs font-bold text-slate-900 dark:text-white">Slow</p>
                                      <p className="text-[10px] text-slate-500 font-mono">500ms</p>
                                  </div>
                              </div>
                          </div>
                      </SubSection>
                  </div>
              </div>
          )}

          {/* ---------------- 3. COMPONENT SYSTEM ---------------- */}
          {activeTab === 'components' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <SectionHeader title="Component System" desc="Thư viện các thành phần UI có thể tái sử dụng." icon={Component} />

                  <SubSection title="3.1 Basic Components">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {/* Buttons */}
                          <div className="space-y-4 p-6 border border-slate-200 dark:border-slate-700 rounded-2xl">
                              <h4 className="font-bold text-sm uppercase tracking-wider text-slate-500">Buttons</h4>
                              <div className="flex flex-wrap gap-4">
                                  <button className="bg-violet-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-violet-700 transition-all">Primary</button>
                                  <button className="bg-white text-slate-700 border border-slate-200 px-4 py-2 rounded-xl font-bold hover:bg-slate-50 transition-all">Secondary</button>
                                  <button className="text-violet-600 px-4 py-2 font-bold hover:bg-violet-50 rounded-xl transition-all">Ghost</button>
                                  <button className="bg-white text-slate-700 w-10 h-10 border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-50"><Plus className="w-5 h-5"/></button>
                              </div>
                          </div>

                          {/* Inputs */}
                          <div className="space-y-4 p-6 border border-slate-200 dark:border-slate-700 rounded-2xl">
                              <h4 className="font-bold text-sm uppercase tracking-wider text-slate-500">Inputs & Controls</h4>
                              <div className="space-y-3">
                                  <input type="text" placeholder="Default Input" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500" />
                                  <div className="flex items-center gap-4">
                                      <label className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-5 h-5 text-violet-600"/> Radio Selected</label>
                                      <label className="flex items-center gap-2 text-sm text-slate-400"><MinusCircle className="w-5 h-5"/> Unchecked</label>
                                      <ToggleLeft className="w-8 h-8 text-slate-300" />
                                  </div>
                              </div>
                          </div>
                      </div>
                  </SubSection>

                  <SubSection title="3.2 Interactive States (Button Example)">
                        <p className="text-sm text-slate-500 mb-6">Trạng thái đầy đủ của một thành phần tương tác (Primary Button) để đảm bảo trải nghiệm người dùng liền mạch và khả năng tiếp cận (A11y).</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                            {/* Default */}
                            <div className="flex flex-col gap-3 items-center p-4 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                                <button className="bg-violet-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-violet-600/20">
                                    Default
                                </button>
                                <div className="text-center">
                                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Default</p>
                                    <p className="text-[10px] text-slate-400 font-mono mt-1">bg-violet-600</p>
                                </div>
                            </div>

                            {/* Hover */}
                            <div className="flex flex-col gap-3 items-center p-4 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                                <button className="bg-violet-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-violet-600/20 cursor-pointer">
                                    Hover
                                </button>
                                <div className="text-center">
                                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Hover</p>
                                    <p className="text-[10px] text-slate-400 font-mono mt-1">hover:bg-violet-700</p>
                                </div>
                            </div>

                            {/* Pressed */}
                            <div className="flex flex-col gap-3 items-center p-4 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                                <button className="bg-violet-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-none transform scale-95">
                                    Pressed
                                </button>
                                <div className="text-center">
                                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Active</p>
                                    <p className="text-[10px] text-slate-400 font-mono mt-1">active:scale-95</p>
                                </div>
                            </div>

                            {/* Focus */}
                            <div className="flex flex-col gap-3 items-center p-4 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                                <button className="bg-violet-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-violet-600/20 ring-4 ring-violet-500/30 ring-offset-2 dark:ring-offset-slate-900">
                                    Focus
                                </button>
                                <div className="text-center">
                                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Focus-Visible</p>
                                    <p className="text-[10px] text-slate-400 font-mono mt-1">focus:ring-4</p>
                                </div>
                            </div>

                            {/* Disabled */}
                            <div className="flex flex-col gap-3 items-center p-4 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                                <button disabled className="bg-violet-600 text-white px-5 py-2.5 rounded-xl font-bold opacity-50 cursor-not-allowed">
                                    Disabled
                                </button>
                                <div className="text-center">
                                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Disabled</p>
                                    <p className="text-[10px] text-slate-400 font-mono mt-1">opacity-50</p>
                                </div>
                            </div>

                            {/* Loading */}
                            <div className="flex flex-col gap-3 items-center p-4 border border-slate-100 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                                <button className="bg-violet-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-violet-600/20 opacity-80 cursor-wait flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" /> Processing
                                </button>
                                <div className="text-center">
                                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Loading</p>
                                    <p className="text-[10px] text-slate-400 font-mono mt-1">Icon + Opacity</p>
                                </div>
                            </div>
                        </div>
                  </SubSection>

                  <SubSection title="3.3 Advanced Components">
                      <div className="space-y-8">
                          {/* Cards */}
                          <div className="p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-200 dark:border-slate-700">
                              <h4 className="font-bold text-sm uppercase tracking-wider text-slate-500 mb-4">Project Card</h4>
                              <div className="max-w-sm bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg">
                                  <div className="h-32 bg-slate-200 dark:bg-slate-800 flex items-center justify-center"><ImageIcon className="text-slate-400"/></div>
                                  <div className="p-4">
                                      <span className="text-xs font-bold text-violet-600 uppercase">Category</span>
                                      <h3 className="font-bold text-lg text-slate-900 dark:text-white mt-1">Project Title</h3>
                                      <p className="text-sm text-slate-500 mt-2">Description goes here...</p>
                                  </div>
                              </div>
                          </div>

                          {/* Table */}
                          <div className="p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-200 dark:border-slate-700">
                              <h4 className="font-bold text-sm uppercase tracking-wider text-slate-500 mb-4">Data Table (Admin)</h4>
                              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                                  <table className="w-full text-sm text-left">
                                      <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700">
                                          <tr><th className="p-3">ID</th><th className="p-3">Name</th><th className="p-3">Status</th></tr>
                                      </thead>
                                      <tbody>
                                          <tr className="border-b border-slate-50 dark:border-slate-800"><td className="p-3">#001</td><td className="p-3">Project A</td><td className="p-3"><span className="text-emerald-500 bg-emerald-100 px-2 py-0.5 rounded text-xs font-bold">Active</span></td></tr>
                                          <tr><td className="p-3">#002</td><td className="p-3">Project B</td><td className="p-3"><span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded text-xs font-bold">Draft</span></td></tr>
                                      </tbody>
                                  </table>
                              </div>
                          </div>

                          {/* Modal Example */}
                          <div className="p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-200 dark:border-slate-700">
                              <h4 className="font-bold text-sm uppercase tracking-wider text-slate-500 mb-4">Modal / Dialog</h4>
                              <div className="relative h-64 bg-slate-200 dark:bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center border border-slate-200 dark:border-slate-800">
                                  {/* Backdrop */}
                                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
                                  {/* Modal Box */}
                                  <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-2xl max-w-xs w-full m-4 border border-slate-200 dark:border-slate-700">
                                      <div className="flex justify-between items-center mb-4">
                                          <h3 className="font-bold text-lg text-slate-900 dark:text-white">Confirm Action</h3>
                                          <div className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"><X className="w-4 h-4 text-slate-500"/></div>
                                      </div>
                                      <p className="text-sm text-slate-500 mb-6">Are you sure you want to delete this item? This action cannot be undone.</p>
                                      <div className="flex justify-end gap-3">
                                          <button className="px-4 py-2 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">Cancel</button>
                                          <button className="px-4 py-2 rounded-lg text-sm font-bold bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20">Delete</button>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          {/* Badges & Chips */}
                          <div className="p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-200 dark:border-slate-700">
                              <h4 className="font-bold text-sm uppercase tracking-wider text-slate-500 mb-4">Badges & Chips</h4>
                              <div className="flex flex-wrap gap-4">
                                  <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-600 text-xs font-bold border border-violet-200">Primary</span>
                                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-600 text-xs font-bold border border-emerald-200 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Success</span>
                                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-600 text-xs font-bold border border-amber-200 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> Warning</span>
                                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200">Neutral</span>
                                  <span className="px-3 py-1 rounded bg-slate-900 text-white text-xs font-mono">v1.2.0</span>
                              </div>
                          </div>
                      </div>
                  </SubSection>

                  <SubSection title="3.4 Feedback & Navigation (New)">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {/* Toasts / Alerts */}
                          <div className="p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-200 dark:border-slate-700">
                              <h4 className="font-bold text-sm uppercase tracking-wider text-slate-500 mb-4">Toast Notifications</h4>
                              <div className="space-y-3">
                                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400">
                                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                                      <span className="text-sm font-bold">Action Completed Successfully</span>
                                  </div>
                                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-100 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400">
                                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                      <span className="text-sm font-bold">Error: Something went wrong</span>
                                  </div>
                                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-400">
                                      <Info className="w-5 h-5 flex-shrink-0" />
                                      <span className="text-sm font-bold">New update available</span>
                                  </div>
                              </div>
                          </div>

                          {/* Navigation & Skeleton */}
                          <div className="space-y-6">
                              <div className="p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-200 dark:border-slate-700">
                                  <h4 className="font-bold text-sm uppercase tracking-wider text-slate-500 mb-4">Navigation (Pagination & Breadcrumbs)</h4>
                                  <div className="space-y-6">
                                      <div className="flex items-center text-sm text-slate-500">
                                          <Home className="w-4 h-4 mr-1"/> <span className="mx-1">/</span> Projects <span className="mx-1">/</span> <span className="text-violet-600 font-bold">Detail</span>
                                      </div>
                                      <div className="flex gap-2">
                                          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800"><ChevronLeft className="w-4 h-4"/></button>
                                          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-violet-600 text-white font-bold">1</button>
                                          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800">2</button>
                                          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800">...</button>
                                          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800"><ChevronRight className="w-4 h-4"/></button>
                                      </div>
                                  </div>
                              </div>

                              <div className="p-6 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-200 dark:border-slate-700">
                                  <h4 className="font-bold text-sm uppercase tracking-wider text-slate-500 mb-4">Skeleton Loading</h4>
                                  <div className="flex gap-4 animate-pulse">
                                      <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                                      <div className="flex-1 space-y-2">
                                          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                                          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </SubSection>

                  <SubSection title="3.5 Component Behavior (UX Rules)">
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-400">
                          <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5"/> <strong>Hover State:</strong> Mọi element tương tác (button, link, card) phải có hover effect (thường là opacity, scale hoặc border color).</li>
                          <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5"/> <strong>Disabled State:</strong> Nút bị vô hiệu hóa phải có Opacity 50% và cursor-not-allowed.</li>
                          <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5"/> <strong>Feedback:</strong> Khi Submit form phải có Loading spinner thay thế icon/text.</li>
                          <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5"/> <strong>Validation:</strong> Input lỗi phải có viền đỏ và text lỗi hiển thị ngay bên dưới.</li>
                      </ul>
                  </SubSection>
              </div>
          )}

          {/* ---------------- 4. PATTERNS & TEMPLATES ---------------- */}
          {activeTab === 'patterns' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <SectionHeader title="Patterns & Templates" desc="Các mẫu giao diện và trạng thái hệ thống phổ biến." icon={Grid} />

                  <SubSection title="4.1 Page Templates">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-slate-50 dark:bg-slate-800/20">
                              <h4 className="font-bold text-sm mb-2">Dashboard Layout</h4>
                              <div className="flex gap-1 h-20">
                                  <div className="w-1/4 bg-slate-300 dark:bg-slate-600 rounded"></div>
                                  <div className="w-3/4 flex flex-col gap-1">
                                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                                      <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded"></div>
                                  </div>
                              </div>
                          </div>
                          <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-slate-50 dark:bg-slate-800/20">
                              <h4 className="font-bold text-sm mb-2">Detail Page</h4>
                              <div className="flex flex-col gap-1 h-20">
                                  <div className="h-1/3 bg-slate-300 dark:bg-slate-600 rounded"></div>
                                  <div className="flex gap-1 flex-1">
                                      <div className="w-2/3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded"></div>
                                      <div className="w-1/3 bg-slate-100 dark:bg-slate-800 rounded"></div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </SubSection>

                  <SubSection title="4.2 System States">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Empty */}
                          <div className="p-8 border border-slate-100 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center text-center h-48 bg-slate-50 dark:bg-slate-800/50">
                              <Box className="w-10 h-10 text-slate-300 mb-3" />
                              <p className="text-sm font-bold text-slate-900 dark:text-white">No Data Found</p>
                              <p className="text-xs text-slate-400 mt-1">Empty State Pattern</p>
                          </div>

                          {/* Loading */}
                          <div className="p-8 border border-slate-100 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center text-center h-48 bg-slate-50 dark:bg-slate-800/50">
                              <Loader2 className="w-10 h-10 text-violet-600 animate-spin mb-3" />
                              <p className="text-sm font-bold text-slate-500">Loading State...</p>
                          </div>

                          {/* Error */}
                          <div className="p-8 border border-red-100 dark:border-red-900/30 rounded-2xl flex flex-col items-center justify-center text-center h-48 bg-red-50 dark:bg-red-900/10">
                              <AlertCircle className="w-10 h-10 text-red-500 mb-3" />
                              <p className="text-sm font-bold text-red-600">System Error</p>
                              <p className="text-xs text-red-400 mt-1">Please try again.</p>
                          </div>
                      </div>
                  </SubSection>
              </div>
          )}

          {/* ---------------- 5. CONTENT & MICROCOPY ---------------- */}
          {activeTab === 'content' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <SectionHeader title="Content & UX Writing" desc="Hướng dẫn về giọng văn và ngôn ngữ trong sản phẩm." icon={MessageSquare} />

                  <SubSection title="5.1 Tone & Voice">
                      <div className="flex gap-4 mb-6">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">Professional</span>
                          <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-bold">Enthusiastic</span>
                          <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-bold">Direct</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 mb-4">
                          Sử dụng ngôn ngữ <strong>"Tôi" (I/My)</strong> để thể hiện tính cá nhân của Portfolio. Giọng văn tự tin nhưng khiêm tốn, tập trung vào giải pháp và giá trị mang lại.
                      </p>
                  </SubSection>

                  <SubSection title="5.2 Text Guideline (Do vs Don't)">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="border border-emerald-200 bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-2xl">
                              <h4 className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2 mb-4"><CheckCircle2 className="w-5 h-5"/> Do (Nên dùng)</h4>
                              <ul className="space-y-2 text-sm">
                                  <li>"Gửi tin nhắn" (Rõ ràng hành động)</li>
                                  <li>"Vui lòng nhập Email" (Lịch sự)</li>
                                  <li>"Thành công! Đã gửi tin nhắn." (Xác nhận rõ)</li>
                              </ul>
                          </div>
                          <div className="border border-red-200 bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl">
                              <h4 className="font-bold text-red-700 dark:text-red-400 flex items-center gap-2 mb-4"><AlertTriangle className="w-5 h-5"/> Don't (Tránh)</h4>
                              <ul className="space-y-2 text-sm">
                                  <li>"Gửi" (Quá cộc lốc)</li>
                                  <li>"Sai rồi" (Đổ lỗi người dùng)</li>
                                  <li>"Operation completed successfully" (Quá kỹ thuật)</li>
                              </ul>
                          </div>
                      </div>
                  </SubSection>
              </div>
          )}

          {/* ---------------- 6. DEV HANDOFF ---------------- */}
          {activeTab === 'dev' && (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <SectionHeader title="Developer Handoff" desc="Thông số kỹ thuật, token và quy ước code." icon={Terminal} />

                  <SubSection title="6.1 Tech Stack">
                      <div className="bg-slate-900 text-slate-300 p-6 rounded-2xl font-mono text-sm overflow-x-auto border border-slate-800">
                          <p className="text-emerald-400 mb-2">// Core</p>
                          <p>React 18 (TypeScript)</p>
                          <p>Vite (Build Tool)</p>
                          <br/>
                          <p className="text-emerald-400 mb-2">// UI & Styling</p>
                          <p>Tailwind CSS v3.4 (Utility-first)</p>
                          <p>Framer Motion (Animation)</p>
                          <p>Lucide React (Icons)</p>
                          <br/>
                          <p className="text-emerald-400 mb-2">// Data</p>
                          <p>Context API + LocalStorage (Mock Backend)</p>
                      </div>
                  </SubSection>

                  <SubSection title="6.2 Naming Convention">
                      <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                          <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-violet-500"/> <strong>Components:</strong> PascalCase (e.g., <code>ProjectCard.tsx</code>, <code>Navbar.tsx</code>)</li>
                          <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-violet-500"/> <strong>Functions/Vars:</strong> camelCase (e.g., <code>handleSave</code>, <code>isActive</code>)</li>
                          <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-violet-500"/> <strong>Interfaces/Types:</strong> PascalCase (e.g., <code>ProjectData</code>, <code>UserRole</code>)</li>
                      </ul>
                  </SubSection>

                  <SubSection title="6.3 Responsive Rules">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl text-center">
                              <Smartphone className="w-6 h-6 mx-auto mb-2 text-slate-400"/>
                              <p className="font-bold">Mobile</p>
                              <p className="text-xs font-mono text-slate-500">&lt; 640px (sm)</p>
                              <p className="text-xs mt-1">1 Column, Stacked</p>
                          </div>
                          <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl text-center">
                              <div className="flex justify-center gap-1 mb-2"><Smartphone className="w-6 h-6 text-slate-400"/><Smartphone className="w-6 h-6 text-slate-400"/></div>
                              <p className="font-bold">Tablet</p>
                              <p className="text-xs font-mono text-slate-500">&gt;= 768px (md)</p>
                              <p className="text-xs mt-1">2 Columns</p>
                          </div>
                          <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl text-center">
                              <Monitor className="w-6 h-6 mx-auto mb-2 text-slate-400"/>
                              <p className="font-bold">Desktop</p>
                              <p className="text-xs font-mono text-slate-500">&gt;= 1024px (lg)</p>
                              <p className="text-xs mt-1">3-4 Columns, Sidebar</p>
                          </div>
                      </div>
                  </SubSection>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <SubSection title="6.4 Design Tokens (JSON)">
                          <div className="flex items-center gap-2 mb-2 text-violet-600 font-bold text-sm"><FileJson className="w-4 h-4"/> tailwind.config.js (Theme Extract)</div>
                          <CodeBlock code={`{
  "colors": {
    "primary": "violet-600",
    "secondary": "slate-500",
    "success": "emerald-500",
    "warning": "amber-500",
    "error": "red-500"
  },
  "spacing": {
    "base": "4px",
    "section": "80px"
  },
  "borderRadius": {
    "card": "1.5rem",
    "btn": "0.75rem"
  }
}`} />
                      </SubSection>

                      <SubSection title="6.5 Accessibility (A11y)">
                          <div className="flex items-center gap-2 mb-4 text-emerald-600 font-bold text-sm"><Eye className="w-4 h-4"/> WCAG 2.1 Compliance</div>
                          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Contrast Ratio: AA (4.5:1) for Text</li>
                              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Focus States: Visible outlines for keyboard nav</li>
                              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> ARIA Labels: For icon-only buttons</li>
                              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Semantic HTML: Correct heading hierarchy (H1-H6)</li>
                          </ul>
                      </SubSection>
                  </div>

                  <SubSection title="6.6 System Versioning">
                      <div className="flex items-center gap-2 mb-4 font-bold"><GitCommit className="w-4 h-4 text-slate-400"/> Changelog</div>
                      <div className="space-y-4 border-l-2 border-slate-200 dark:border-slate-800 pl-4 ml-1">
                          <div className="relative">
                              <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-violet-600"></div>
                              <p className="text-xs font-mono text-slate-400 mb-1">v1.2 (Current)</p>
                              <p className="font-bold text-sm">Added Design System Guideline page.</p>
                          </div>
                          <div className="relative">
                              <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                              <p className="text-xs font-mono text-slate-400 mb-1">v1.1</p>
                              <p className="font-bold text-sm text-slate-500">Integrated CMS for Home & About pages.</p>
                          </div>
                          <div className="relative">
                              <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                              <p className="text-xs font-mono text-slate-400 mb-1">v1.0</p>
                              <p className="font-bold text-sm text-slate-500">Initial Release (Portfolio MVP).</p>
                          </div>
                      </div>
                  </SubSection>
                  
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl flex items-start gap-3">
                      <Info className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-amber-800 dark:text-amber-200">
                          <strong>Lưu ý cho Developer:</strong> Luôn sử dụng các biến màu và spacing của Tailwind (vd: <code>bg-violet-600</code>, <code>p-4</code>) thay vì hardcode giá trị pixel hoặc mã màu hex để đảm bảo tính nhất quán và hỗ trợ Dark Mode tự động.
                      </div>
                  </div>
              </div>
          )}

      </div>
    </div>
  );
};

export default Guideline;
