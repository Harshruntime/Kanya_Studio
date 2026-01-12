'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { 
  FaUsers, FaChartBar, FaUserCircle, FaSignOutAlt, 
  FaCamera, FaVideo, FaCompass, FaChevronRight 
} from 'react-icons/fa';
import { OverviewPage } from './OverviewPage';
import { Photography } from './Photography';
import { Videography } from './Videography';
import CustomersDetailsPage from './CustomersDetailsPage';

const Dashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated');
    if (!isAuth) {
      router.replace('/admin');
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#FDFCFB]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin"></div>
        <p className="text-[10px] uppercase tracking-[0.4em] font-semibold text-slate-400">Authenticating</p>
      </div>
    </div>
  );

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    router.replace('/admin');
  };

  const navItems = [
    { id: 'Overview', icon: <FaChartBar />, label: 'Insights' },
    { id: 'Customers Details', icon: <FaUsers />, label: 'Client Directory' },
    { id: 'PhotoGraphy', icon: <FaCamera />, label: 'Photography' },
    { id: 'VideoGraphy', icon: <FaVideo />, label: 'Cinema' },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] text-slate-900 font-sans selection:bg-slate-900 selection:text-white">

      {/* --- MODERN FLOATING SIDEBAR --- */}
      <aside className="w-72 fixed h-screen z-30">
        <div className="h-full bg-white rounded-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col overflow-hidden transition-all duration-500 hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)]">
          
          {/* Brand Identity */}
          <div className="px-8 pt-10 pb-8 flex flex-col items-center">
            <div className="w-full h-16 relative mb-4">
               <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div className="h-[2px] w-8 bg-slate-900 rounded-full opacity-10"></div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-2 mt-4">
            <p className="px-4 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-4">Studio Menu</p>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full group flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                  activeTab === item.id
                  ? 'bg-slate-900 text-white shadow-xl shadow-slate-200'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <span className={`text-lg transition-transform duration-300 group-hover:scale-110 ${activeTab === item.id ? 'text-white' : 'text-slate-400'}`}>
                    {item.icon}
                  </span>
                  <span className="text-sm font-semibold tracking-tight">{item.label}</span>
                </div>
                {activeTab === item.id && <FaChevronRight size={10} className="animate-pulse" />}
              </button>
            ))}
          </nav>

          {/* User Profile / Logout */}
          <div className="p-4 bg-slate-50/80 m-4 rounded-[1.5rem] border border-slate-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-widest text-red-500 hover:bg-white rounded-xl transition-all duration-300 group"
            >
              <span>Sign Out</span>
              <FaSignOutAlt className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </aside>

      {/* --- MAIN WORKSPACE --- */}
      <main className="flex-1 ml-72 p-6 lg:p-10 flex flex-col">
        
        {/* Superior Header */}
        <header className="mb-8 flex items-center justify-between px-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">
              <FaCompass size={12} className="text-slate-900" />
              <span>Kanya Admin</span>
              <span className="text-slate-200">/</span>
              <span className="text-slate-900">{activeTab}</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">
                {activeTab === 'Overview' ? 'Welcome, Divesh' : activeTab}
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group flex items-center gap-4 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm cursor-pointer hover:shadow-md transition-all">
                <div className="text-right">
                  <p className="text-[11px] font-bold leading-none">Divesh Paswan</p>
                  <p className="text-[9px] text-green-500 font-medium uppercase tracking-tighter mt-1">Status: Active</p>
                </div>
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 border border-slate-200">
                   <FaUserCircle size={24} />
                </div>
            </div>
          </div>
        </header>

        {/* Dynamic Canvas Area */}
        <div className="flex-1 bg-white rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-slate-50 p-4 md:p-10 transition-all">
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-700 h-full">
            {activeTab === 'Overview' && <OverviewPage />}
            {activeTab === 'Customers Details' && <CustomersDetailsPage />}
            {activeTab === 'PhotoGraphy' && <Photography title="Photography Showcase" />}
            {activeTab === 'VideoGraphy' && <Videography title="Cinema Portfolio" />}
          </div>
        </div>

        {/* System Footer */}
        <footer className="mt-8 px-4 flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.4em] text-slate-300">
           <p>© 2026 Kanya Studios</p>
           <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              Internal Systems Encrypted
           </p>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;