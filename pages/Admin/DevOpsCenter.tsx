
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../DataContext';
import { 
    GitBranch, Cloud, Database, Rocket, Terminal, 
    CheckCircle2, AlertTriangle, ShieldCheck, RefreshCw, 
    Link as LinkIcon, Lock, Activity, Server, Clock, Play, Key,
    Bot, Code2, Cpu, FileCode
} from 'lucide-react';

const DevOpsCenter: React.FC = () => {
  const { devOpsConfig, updateDevOpsConfig, showNotification } = useData();
  const [activeTab, setActiveTab] = useState<'deploy' | 'config' | 'ai'>('deploy');
  
  // Real Terminal State
  const [logs, setLogs] = useState<string[]>([]);
  const [isBuilding, setIsBuilding] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // AI Architect State
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [generationStep, setGenerationStep] = useState<'idle' | 'thinking' | 'coding' | 'done'>('idle');

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Handle Deployment Logic (Real Fetch)
  const handleDeploy = async () => {
      if (!devOpsConfig.cloudflare.deployHookUrl) {
          showNotification('error', 'Chưa cấu hình Cloudflare Deploy Hook!');
          setActiveTab('config');
          return;
      }

      setIsBuilding(true);
      setLogs([]); // Clear old logs
      
      const addLog = (msg: string) => {
          setLogs(prev => [...prev, `${new Date().toLocaleTimeString()} ${msg}`]);
      };

      addLog("🚀 Starting deployment sequence...");
      addLog(`> Target: ${devOpsConfig.cloudflare.projectName || 'Unknown Project'}`);
      addLog("> Sending secure webhook trigger to Cloudflare API...");

      try {
          // REAL FETCH CALL TO CLOUDFLARE
          await fetch(devOpsConfig.cloudflare.deployHookUrl, {
              method: 'POST',
              mode: 'no-cors', // Necessary because Cloudflare hooks don't return CORS headers for browser fetch
          });

          addLog("✔ Webhook sent successfully!");
          addLog("------------------------------------------------");
          addLog("NOTE: Cloudflare has received the build signal.");
          addLog("Build process is running on Cloudflare servers.");
          addLog("Please check your Cloudflare Dashboard for live progress.");
          addLog("------------------------------------------------");
          
          setIsBuilding(false);
          updateDevOpsConfig({
              ...devOpsConfig,
              cloudflare: {
                  ...devOpsConfig.cloudflare,
                  lastDeploy: new Date().toLocaleString(),
                  status: 'success'
              }
          });
          showNotification('success', 'Đã gửi lệnh Deploy thành công!');

      } catch (error) {
          console.error(error);
          addLog(`> ❌ ERROR: Failed to trigger webhook. ${error}`);
          setIsBuilding(false);
          showNotification('error', 'Lỗi kết nối đến Cloudflare.');
      }
  };

  const handleGenerateCode = () => {
      // ... (AI code generation logic remains same for demo purposes, or can be hooked to real API if available)
      if (!prompt.trim()) return;
      setIsGenerating(true);
      setGenerationStep('thinking');
      setGeneratedCode('');

      setTimeout(() => {
          setGenerationStep('coding');
          setGeneratedCode(`// Example Supabase Edge Function Structure\n// Prompt: ${prompt}\n\nimport { serve } from "https://deno.land/std@0.168.0/http/server.ts"\n\nserve(async (req) => {\n  return new Response(\n    JSON.stringify({ message: "Hello from Real Edge Function" }),\n    { headers: { "Content-Type": "application/json" } },\n  )\n})`);
          setIsGenerating(false);
          setGenerationStep('done');
      }, 2000);
  };

  const saveConfig = () => {
      let newConfig = { ...devOpsConfig };
      if (newConfig.github.repoUrl) newConfig.github.connected = true;
      if (newConfig.cloudflare.deployHookUrl) newConfig.cloudflare.connected = true;
      if (newConfig.supabase.projectUrl && newConfig.supabase.anonKey) {
          newConfig.supabase.connected = true;
      } else {
          newConfig.supabase.connected = false;
      }
      
      updateDevOpsConfig(newConfig);
      showNotification('success', 'Đã lưu cấu hình DevOps');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
             <Cloud className="w-8 h-8 text-violet-600" /> DevOps Center
          </h1>
          <p className="text-slate-500 mt-1">Trung tâm điều khiển hạ tầng, kết nối GitHub & Triển khai tự động.</p>
        </div>
        
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button 
                onClick={() => setActiveTab('deploy')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'deploy' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
                <Rocket className="w-4 h-4" /> Deploy
            </button>
            <button 
                onClick={() => setActiveTab('config')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'config' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
                <Server className="w-4 h-4" /> Configuration
            </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'deploy' && (
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
                {/* Status Cards */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className={`p-4 rounded-2xl border ${devOpsConfig.github.connected ? 'bg-slate-900 text-white border-slate-800' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                            <div className="flex justify-between items-start mb-4">
                                <GitBranch className="w-6 h-6" />
                                {devOpsConfig.github.connected ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertTriangle className="w-5 h-5" />}
                            </div>
                            <h3 className="font-bold text-sm uppercase tracking-wider mb-1">GitHub Repo</h3>
                            <p className="text-xs truncate opacity-70">{devOpsConfig.github.repoUrl || 'Not Connected'}</p>
                        </div>

                        <div className={`p-4 rounded-2xl border ${devOpsConfig.cloudflare.connected ? 'bg-orange-500 text-white border-orange-600' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                            <div className="flex justify-between items-start mb-4">
                                <Cloud className="w-6 h-6" />
                                {devOpsConfig.cloudflare.connected ? <Activity className="w-5 h-5 text-white animate-pulse" /> : <AlertTriangle className="w-5 h-5" />}
                            </div>
                            <h3 className="font-bold text-sm uppercase tracking-wider mb-1">Cloudflare</h3>
                            <p className="text-xs truncate opacity-70">{devOpsConfig.cloudflare.status === 'success' ? 'Live' : 'Ready'}</p>
                        </div>

                        <div className={`p-4 rounded-2xl border ${devOpsConfig.supabase.connected ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                            <div className="flex justify-between items-start mb-4">
                                <Database className="w-6 h-6" />
                                {devOpsConfig.supabase.connected ? <Lock className="w-5 h-5 text-emerald-200" /> : <AlertTriangle className="w-5 h-5" />}
                            </div>
                            <h3 className="font-bold text-sm uppercase tracking-wider mb-1">Supabase DB</h3>
                            <p className="text-xs truncate opacity-70">{devOpsConfig.supabase.connected ? 'Connected' : 'Not Configured'}</p>
                        </div>
                    </div>

                    {/* Terminal Window */}
                    <div className="bg-[#1e1e1e] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl h-[400px] flex flex-col font-mono text-sm">
                        <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-black/20">
                            <Terminal className="w-4 h-4 text-slate-400" />
                            <span className="text-slate-300 text-xs">Deployment Logs</span>
                            <div className="ml-auto flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50"></div>
                            </div>
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto space-y-1 text-slate-300">
                            {logs.length === 0 && !isBuilding && (
                                <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-50">
                                    <Rocket className="w-12 h-12 mb-4" />
                                    <p>Ready to deploy. Waiting for trigger...</p>
                                </div>
                            )}
                            {logs.map((log, idx) => (
                                <div key={idx} className="border-b border-white/5 pb-0.5 mb-0.5 last:border-0 animate-in fade-in slide-in-from-left-2 duration-300">
                                    <span className="text-green-500 mr-2">$</span>
                                    {log}
                                </div>
                            ))}
                            <div ref={terminalEndRef} />
                        </div>
                    </div>
                </div>

                {/* Actions Panel */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 h-fit">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Actions</h3>
                    
                    <div className="space-y-4">
                        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Last Deployed</p>
                            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                <Clock className="w-4 h-4" />
                                <span className="font-mono text-sm">{devOpsConfig.cloudflare.lastDeploy || 'Never'}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleDeploy}
                            disabled={isBuilding}
                            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all ${isBuilding ? 'bg-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:scale-[1.02] hover:shadow-violet-500/30'}`}
                        >
                            {isBuilding ? (
                                <><RefreshCw className="w-5 h-5 animate-spin" /> Sending Trigger...</>
                            ) : (
                                <><Rocket className="w-5 h-5" /> Trigger Cloudflare</>
                            )}
                        </button>
                        
                        <div className="text-xs text-slate-400 text-center px-4">
                            <ShieldCheck className="w-3 h-3 inline mr-1" />
                            Secure webhook trigger
                        </div>
                    </div>
                </div>
            </motion.div>
        )}

        {/* TAB 2: CONFIGURATION */}
        {activeTab === 'config' && (
             <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
            >
                {/* GitHub Config */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                        <div className="p-2 bg-slate-900 rounded-lg text-white"><GitBranch className="w-6 h-6" /></div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">GitHub Repository</h3>
                            <p className="text-xs text-slate-500">Kết nối source code để theo dõi commit.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 block">Repository URL</label>
                            <input 
                                type="text" 
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-violet-500 outline-none"
                                placeholder="https://github.com/username/repo"
                                value={devOpsConfig.github.repoUrl}
                                onChange={e => updateDevOpsConfig({...devOpsConfig, github: {...devOpsConfig.github, repoUrl: e.target.value}})}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 block">Branch</label>
                            <input 
                                type="text" 
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-violet-500 outline-none"
                                placeholder="main"
                                value={devOpsConfig.github.branch}
                                onChange={e => updateDevOpsConfig({...devOpsConfig, github: {...devOpsConfig.github, branch: e.target.value}})}
                            />
                        </div>
                    </div>
                </div>

                {/* Cloudflare Config */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                        <div className="p-2 bg-orange-500 rounded-lg text-white"><Cloud className="w-6 h-6" /></div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Cloudflare Pages</h3>
                            <p className="text-xs text-slate-500">Cấu hình Deploy Hook để kích hoạt build thật.</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 block">Deploy Hook URL</label>
                            <div className="flex gap-2">
                                <input 
                                    type="password" 
                                    className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-violet-500 outline-none"
                                    placeholder="https://api.cloudflare.com/client/v4/pages/webhooks/..."
                                    value={devOpsConfig.cloudflare.deployHookUrl}
                                    onChange={e => updateDevOpsConfig({...devOpsConfig, cloudflare: {...devOpsConfig.cloudflare, deployHookUrl: e.target.value}})}
                                />
                                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                                    <LinkIcon className="w-5 h-5 text-slate-400" />
                                </div>
                            </div>
                            <p className="text-xs text-slate-400 mt-1">Lấy URL này trong Cloudflare Dashboard &gt; Pages &gt; Settings &gt; Builds & deployments &gt; Deploy hooks</p>
                        </div>
                        <div>
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 block">Project Name</label>
                            <input 
                                type="text" 
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-violet-500 outline-none"
                                placeholder="my-portfolio"
                                value={devOpsConfig.cloudflare.projectName}
                                onChange={e => updateDevOpsConfig({...devOpsConfig, cloudflare: {...devOpsConfig.cloudflare, projectName: e.target.value}})}
                            />
                        </div>
                    </div>
                </div>

                {/* Supabase Config (UNLOCKED) */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                        <div className="p-2 bg-emerald-600 rounded-lg text-white"><Database className="w-6 h-6" /></div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Supabase Integration</h3>
                            <p className="text-xs text-slate-500">Kết nối Database & Storage thật.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 block">Project URL</label>
                            <input 
                                type="text" 
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                                placeholder="https://xyzcompany.supabase.co"
                                value={devOpsConfig.supabase.projectUrl}
                                onChange={e => updateDevOpsConfig({...devOpsConfig, supabase: {...devOpsConfig.supabase, projectUrl: e.target.value}})}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 block flex items-center gap-2"><Key className="w-3 h-3"/> Anon / Public Key</label>
                            <input 
                                type="password" 
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                                value={devOpsConfig.supabase.anonKey}
                                onChange={e => updateDevOpsConfig({...devOpsConfig, supabase: {...devOpsConfig.supabase, anonKey: e.target.value}})}
                            />
                        </div>
                    </div>
                    <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-xs text-slate-500 flex items-start gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <div>
                            Cần tạo Bucket tên <strong>'portfolio'</strong> (Public) trong Supabase Storage để chức năng upload hoạt động.
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                     <button 
                        onClick={saveConfig}
                        className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-violet-600/20 transition-all hover:scale-105"
                    >
                        <CheckCircle2 className="w-5 h-5" /> Lưu Cấu Hình
                    </button>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DevOpsCenter;
