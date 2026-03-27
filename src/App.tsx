/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Store, 
  Plus, 
  FileText, 
  User, 
  TrendingUp, 
  Leaf, 
  Bell, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  Download, 
  ArrowLeft, 
  Info, 
  Zap, 
  Tractor, 
  Droplets, 
  Map as MapIcon,
  BarChart3,
  Settings,
  ShieldCheck,
  Sprout,
  Activity
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// --- Types ---

type Screen = 'dashboard' | 'market' | 'compliance' | 'account' | 'calculator' | 'analytics';

// --- Mock Data ---

const MARKET_DATA = [
  { day: '1', price: 15 },
  { day: '5', price: 16.5 },
  { day: '10', price: 18 },
  { day: '15', price: 17.2 },
  { day: '20', price: 19.5 },
  { day: '25', price: 20.15 },
  { day: '30', price: 19.8 },
];

const CROP_EMISSIONS = [
  { name: 'Corn', value: 10.2, color: '#10b981' },
  { name: 'Soy', value: 3.1, color: '#34d399' },
  { name: 'Wheat', value: 5.6, color: '#6ee7b7' },
  { name: 'Oats', value: 7.2, color: '#a7f3d0' },
];

// --- Components ---

const BottomNav = ({ activeScreen, setScreen }: { activeScreen: Screen, setScreen: (s: Screen) => void }) => {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'calculator', label: 'Add', icon: Plus, isFab: true },
    { id: 'compliance', label: 'Certs', icon: FileText },
    { id: 'account', label: 'Account', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-slate-100 px-6 py-3 flex justify-between items-center z-50 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        if (item.isFab) {
          return (
            <div key={item.id} className="relative -top-8">
              <button 
                onClick={() => setScreen(item.id as Screen)}
                className="w-14 h-14 bg-[#10b981] rounded-full shadow-lg shadow-emerald-200 flex items-center justify-center text-white active:scale-90 transition-transform"
              >
                <item.icon size={32} strokeWidth={2.5} />
              </button>
            </div>
          );
        }
        return (
          <button
            key={item.id}
            onClick={() => setScreen(item.id as Screen)}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              activeScreen === item.id ? "text-[#10b981]" : "text-slate-400"
            )}
          >
            <item.icon size={24} strokeWidth={activeScreen === item.id ? 2.5 : 2} />
            <span className="text-[10px] font-bold uppercase tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

const Header = ({ title, subtitle, showBack, onBack }: { title: string, subtitle?: string, showBack?: boolean, onBack?: () => void }) => (
  <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-4 flex items-center justify-between">
    <div className="flex items-center gap-3">
      {showBack ? (
        <button onClick={onBack} className="p-2 rounded-lg bg-slate-100 text-slate-600">
          <ArrowLeft size={20} />
        </button>
      ) : (
        <div className="bg-[#10b981]/10 p-2 rounded-lg">
          <Sprout className="text-[#10b981]" size={20} />
        </div>
      )}
      <div>
        <h1 className="text-lg font-bold leading-none text-slate-900">{title}</h1>
        {subtitle && <p className="text-[10px] text-[#10b981] font-medium uppercase tracking-wider mt-1">{subtitle}</p>}
      </div>
    </div>
    <div className="flex items-center gap-2">
      <button className="p-2 text-slate-400">
        <Bell size={20} />
      </button>
      <div className="w-8 h-8 rounded-full bg-[#10b981] flex items-center justify-center text-white font-bold text-xs">
        JD
      </div>
    </div>
  </header>
);

// --- Screens ---

const DashboardScreen = () => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="pb-24"
  >
    <Header title="AgroCarbon" subtitle="Sustainable Yields" />
    
    <section className="p-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
          <p className="text-xs font-medium text-slate-500 mb-1">Generated Credits</p>
          <p className="text-2xl font-bold text-slate-900">14,280 <span className="text-sm font-normal text-slate-400">tCO2e</span></p>
          <div className="mt-2 flex items-center gap-1 text-[#10b981] text-xs font-semibold">
            <TrendingUp size={14} />
            <span>+8.2%</span>
          </div>
        </div>
        <div className="bg-[#10b981] p-4 rounded-xl text-white shadow-lg shadow-emerald-100">
          <p className="text-xs font-semibold opacity-90 mb-1">Portfolio Value</p>
          <p className="text-2xl font-bold">$285,600</p>
          <div className="mt-2 flex items-center gap-1 text-xs font-bold bg-white/20 rounded-full px-2 py-0.5 w-fit">
            <span>Market Live</span>
          </div>
        </div>
      </div>
    </section>

    <section className="px-4 py-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-900">Market Price</h2>
        <div className="flex items-center gap-1 text-[#10b981] text-xs font-bold cursor-pointer">
          <span>Last 30 Days</span>
          <ChevronRight size={14} className="rotate-90" />
        </div>
      </div>
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
        <div className="flex justify-between items-end mb-4">
          <div>
            <p className="text-3xl font-bold tracking-tight text-slate-900">$20.15</p>
            <p className="text-xs text-[#10b981] font-medium">+2.31% since yesterday</p>
          </div>
          <div className="flex gap-1 h-8 items-end">
            {[0.4, 0.6, 0.5, 1, 0.8].map((h, i) => (
              <div key={i} className="w-1.5 bg-[#10b981] rounded-full" style={{ height: `${h * 100}%`, opacity: h }} />
            ))}
          </div>
        </div>
        <div className="h-32 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MARKET_DATA}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="price" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>

    <section className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-900">Active Projects</h2>
        <button className="text-[#10b981] text-sm font-semibold">View All</button>
      </div>
      <div className="space-y-4">
        {[
          { title: 'Regenerative Soy Farm', loc: 'Mato Grosso, BR', val: '4,500 tCO2e', status: 'VERIFIED', img: 'https://picsum.photos/seed/farm1/200/200' },
          { title: 'Agroforestry Carbon Sink', loc: 'Sacramento Valley, US', val: '2,120 tCO2e', status: 'PENDING', img: 'https://picsum.photos/seed/farm2/200/200' }
        ].map((p, i) => (
          <div key={i} className="flex gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
              <img src={p.img} alt={p.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="font-bold text-sm text-slate-900">{p.title}</h3>
              <p className="text-xs text-slate-500 mb-2">{p.loc}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">{p.val}</span>
                <span className={cn(
                  "text-[10px] px-2 py-0.5 rounded-full font-bold",
                  p.status === 'VERIFIED' ? "bg-emerald-100 text-emerald-600" : "bg-slate-200 text-slate-500"
                )}>{p.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="px-4 py-4">
      <h2 className="text-lg font-bold mb-4 text-slate-900">Recent Certificates</h2>
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        {[
          { id: '884-29', title: 'Q3 Yield Harvest', date: 'Aug 2024' },
          { id: '772-12', title: 'Biochar Project', date: 'July 2024' }
        ].map((c, i) => (
          <div key={i} className="min-w-[140px] aspect-[3/4] bg-slate-50 rounded-xl border border-slate-100 p-3 flex flex-col justify-between shadow-sm">
            <div className="w-8 h-8 rounded bg-emerald-100 flex items-center justify-center">
              <ShieldCheck className="text-[#10b981]" size={16} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">ID: {c.id}</p>
              <p className="text-xs font-bold mt-1 text-slate-900">{c.title}</p>
              <p className="text-[10px] text-slate-500">{c.date}</p>
            </div>
          </div>
        ))}
        <div className="min-w-[140px] aspect-[3/4] bg-white rounded-xl border border-dashed border-slate-200 p-3 flex flex-col items-center justify-center gap-2">
          <Plus className="text-slate-300" size={24} />
          <p className="text-[10px] font-bold text-slate-400 text-center">Generate New Certificate</p>
        </div>
      </div>
    </section>
  </motion.div>
);

const ComplianceScreen = () => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    className="pb-24"
  >
    <Header title="Environmental Compliance" subtitle="Farm ID: #AG-8829" />
    
    <main className="p-4 space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Sustainability</span>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold">88/100</span>
            <span className="text-emerald-600 text-xs font-bold mb-1 flex items-center">
              <TrendingUp size={12} className="mr-1" /> 4%
            </span>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-[#10b981] h-full w-[88%] rounded-full"></div>
          </div>
        </div>
        <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Carbon Offset</span>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold">12.4t</span>
            <span className="text-emerald-600 text-xs font-bold mb-1 flex items-center">
              <TrendingUp size={12} className="mr-1" /> 1.2%
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 italic">Net zero target: 2026</p>
        </div>
      </div>

      <div className="relative overflow-hidden p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#10b981] flex items-center justify-center text-white">
          <CheckCircle2 size={28} />
        </div>
        <div>
          <h3 className="font-bold text-emerald-900">Fully Compliant</h3>
          <p className="text-sm text-emerald-800/80">Your farm meets all current EPA and GlobalGAP standards for the 2024 season.</p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-800">Audit Reports</h2>
          <button className="text-[#10b981] text-sm font-semibold flex items-center gap-1">
            View History <Clock size={14} />
          </button>
        </div>
        <div className="space-y-3">
          {[
            { title: 'Annual Audit 2024', desc: 'Comprehensive environmental impact', icon: FileText, action: 'Generate' },
            { title: 'Water Usage Efficiency', desc: 'Resource management certification', icon: Droplets, action: 'Download' },
            { title: 'Soil Health Certificate', desc: 'Nitrogen and pH levels analysis', icon: Leaf, action: 'Generate' }
          ].map((r, i) => (
            <div key={i} className="flex items-center p-4 bg-slate-50 border border-slate-100 rounded-xl">
              <div className="w-12 h-12 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 mr-4">
                <r.icon size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900">{r.title}</h4>
                <p className="text-xs text-slate-500">{r.desc}</p>
              </div>
              {r.action === 'Generate' ? (
                <button className="bg-[#10b981] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm active:scale-95 transition-transform">
                  Generate
                </button>
              ) : (
                <button className="bg-white text-slate-600 px-4 py-2 rounded-lg text-sm font-bold border border-slate-200 shadow-sm">
                  <Download size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Upcoming Milestones</h2>
        <div className="space-y-3">
          {[
            { date: '14', month: 'Sep', title: 'Soil Regeneration Inspection', desc: 'Field #04 - Morning Session' },
            { date: '02', month: 'Oct', title: 'Organic Re-certification', desc: 'Annual site visit by USDA agent' }
          ].map((m, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex flex-col items-center justify-center px-3 border-r border-slate-200">
                <span className="text-xs font-bold uppercase text-slate-400">{m.month}</span>
                <span className="text-xl font-bold text-[#10b981]">{m.date}</span>
              </div>
              <div>
                <h4 className="font-bold text-slate-800">{m.title}</h4>
                <p className="text-sm text-slate-500 italic">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  </motion.div>
);

const AnalyticsScreen = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="pb-24"
  >
    <Header title="EcoFarm" subtitle="Environmental Impact" />
    
    <main className="p-4 space-y-6">
      <section className="bg-[#065f46] text-white rounded-xl p-5 relative overflow-hidden shadow-lg">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        <div className="relative z-0">
          <p className="text-sm font-medium text-white/80 mb-1">Total Carbon Footprint</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-bold">24.5</h2>
            <span className="text-sm font-semibold text-white/70">tonnes CO2e</span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="flex items-center text-xs font-bold px-2 py-1 rounded-full bg-white/20 text-white">
              <TrendingUp size={12} className="mr-1" /> 12% vs last year
            </span>
            <span className="text-xs text-white/70">Target: &lt; 22.0t</span>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900">Sustainability Progress</h3>
          <button className="text-xs font-semibold text-[#10b981]">Details</button>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl space-y-4 border border-slate-100 shadow-sm">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 font-medium">Regenerative Practice Adoption</span>
              <span className="font-bold text-slate-900">78%</span>
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#10b981] w-[78%]"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 font-medium">Water Efficiency Score</span>
              <span className="font-bold text-slate-900">64/100</span>
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#10b981] w-[64%]"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900">Emissions by Crop Type</h3>
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 shadow-sm">
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CROP_EMISSIONS} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={60} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                  {CROP_EMISSIONS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center text-center gap-2">
          <Activity className="text-[#10b981]" size={32} />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Soil Health</span>
          <span className="text-lg font-bold text-slate-900">Optimal</span>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center text-center gap-2">
          <Zap className="text-[#10b981]" size={32} />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Energy Mix</span>
          <span className="text-lg font-bold text-slate-900">82% Renew</span>
        </div>
      </div>

      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900">Environmental Hotspots</h3>
        <div className="aspect-video w-full rounded-xl bg-slate-100 overflow-hidden relative border border-slate-100 shadow-sm">
          <img 
            src="https://picsum.photos/seed/map/800/450" 
            alt="Aerial view of farmland" 
            className="w-full h-full object-cover opacity-80" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/10 backdrop-blur-[1px]">
            <div className="bg-white px-4 py-2 rounded-full border border-emerald-100 flex items-center gap-2 shadow-lg">
              <MapIcon className="text-[#10b981]" size={16} />
              <span className="text-xs font-bold text-slate-900">View Interactive Field Map</span>
            </div>
          </div>
          <div className="absolute bottom-3 left-3 flex gap-1">
            <div className="w-3 h-3 rounded-full bg-[#10b981] border border-white"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 border border-white"></div>
            <div className="w-3 h-3 rounded-full bg-red-500 border border-white"></div>
          </div>
        </div>
      </section>
    </main>
  </motion.div>
);

const CalculatorScreen = ({ onBack }: { onBack: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 100 }}
    animate={{ opacity: 1, y: 0 }}
    className="pb-24 bg-white min-h-screen"
  >
    <div className="flex items-center bg-white p-4 pb-2 justify-between sticky top-0 z-10 border-b border-slate-100">
      <button onClick={onBack} className="text-slate-600 flex w-10 h-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-50 transition-colors">
        <ArrowLeft size={20} />
      </button>
      <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight flex-1 text-center">Carbon Calculator</h2>
      <div className="w-10 flex items-center justify-center">
        <Info className="text-[#10b981]" size={20} />
      </div>
    </div>

    <div className="flex flex-col gap-3 p-4 bg-slate-50/50">
      <div className="flex gap-6 justify-between items-end">
        <div>
          <p className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Current Step</p>
          <p className="text-slate-900 text-base font-bold leading-normal">Agricultural Inputs</p>
        </div>
        <p className="text-[#10b981] text-sm font-bold leading-normal">1 of 3</p>
      </div>
      <div className="rounded-full bg-slate-200 h-2 overflow-hidden">
        <div className="h-full rounded-full bg-[#10b981]" style={{ width: '33.33%' }}></div>
      </div>
    </div>

    <div className="p-4 space-y-8">
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Activity className="text-[#10b981]" size={20} />
          <h3 className="text-slate-900 text-lg font-bold leading-tight">Fertilizer Usage</h3>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-600">Nitrogen-based Fertilizer (kg)</label>
            <input className="w-full rounded-lg border-slate-200 bg-white p-3 focus:ring-[#10b981] focus:border-[#10b981] text-slate-900 placeholder:text-slate-400" placeholder="0.00" type="number" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-600">Phosphorus Fertilizer (kg)</label>
            <input className="w-full rounded-lg border-slate-200 bg-white p-3 focus:ring-[#10b981] focus:border-[#10b981] text-slate-900 placeholder:text-slate-400" placeholder="0.00" type="number" />
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <Tractor className="text-[#10b981]" size={20} />
          <h3 className="text-slate-900 text-lg font-bold leading-tight">Machinery Hours</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-600">Tractor Ops (hrs)</label>
            <input className="w-full rounded-lg border-slate-200 bg-white p-3 focus:ring-[#10b981] focus:border-[#10b981] text-slate-900 placeholder:text-slate-400" placeholder="0" type="number" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-600">Harvester (hrs)</label>
            <input className="w-full rounded-lg border-slate-200 bg-white p-3 focus:ring-[#10b981] focus:border-[#10b981] text-slate-900 placeholder:text-slate-400" placeholder="0" type="number" />
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <Zap className="text-[#10b981]" size={20} />
          <h3 className="text-slate-900 text-lg font-bold leading-tight">Energy Consumption</h3>
        </div>
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-[#10b981]">
                <Activity size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Diesel Consumption</p>
                <p className="text-xs text-slate-500">Liters used this month</p>
              </div>
            </div>
            <span className="font-bold text-[#10b981]">450</span>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-[#10b981]">
                <Zap size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Grid Electricity</p>
                <p className="text-xs text-slate-500">kWh consumption</p>
              </div>
            </div>
            <span className="font-bold text-[#10b981]">1200</span>
          </div>
        </div>
      </section>

      <button className="w-full bg-[#10b981] hover:bg-emerald-600 py-4 rounded-xl text-white font-bold text-lg shadow-lg shadow-emerald-200 active:scale-[0.98] transition-all">
        Continue to Land Use
      </button>
    </div>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [screen, setScreen] = useState<Screen>('dashboard');
  const [prevScreen, setPrevScreen] = useState<Screen>('dashboard');

  const handleSetScreen = (s: Screen) => {
    setPrevScreen(screen);
    setScreen(s);
  };

  const renderScreen = () => {
    switch (screen) {
      case 'dashboard': return <DashboardScreen />;
      case 'compliance': return <ComplianceScreen />;
      case 'analytics': return <AnalyticsScreen />;
      case 'calculator': return <CalculatorScreen onBack={() => handleSetScreen(prevScreen)} />;
      case 'account': 
        return (
          <div className="p-4 text-center py-20">
            <User size={64} className="mx-auto text-slate-300 mb-4" />
            <h2 className="text-xl font-bold">Profile Screen</h2>
            <p className="text-slate-500">User settings and account details would go here.</p>
          </div>
        );
      case 'market':
        return (
          <div className="p-4 text-center py-20">
            <Store size={64} className="mx-auto text-slate-300 mb-4" />
            <h2 className="text-xl font-bold">Marketplace</h2>
            <p className="text-slate-500">Browse and trade carbon credits.</p>
          </div>
        );
      default: return <DashboardScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <AnimatePresence mode="wait">
        <div key={screen}>
          {renderScreen()}
        </div>
      </AnimatePresence>
      
      {screen !== 'calculator' && (
        <BottomNav activeScreen={screen} setScreen={handleSetScreen} />
      )}
    </div>
  );
}
