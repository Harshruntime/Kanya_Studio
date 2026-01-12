'use client'
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
  FaUsers, FaAddressBook, FaEnvelope, FaFileAlt, FaSearch,
  FaCalendarAlt, FaChartBar, FaBox, FaCog, FaArrowUp, FaEllipsisH,
  FaUserCircle, FaSignOutAlt, FaSun, FaMoon,
  FaRegMoon,
  FaCamera,
  FaVideo
} from 'react-icons/fa';
import { OverviewPage } from './OverviewPage';
import { Photography } from './Photography';
import { Videography } from './Videography';
import CustomersDetailsPage from './CustomersDetailsPage';

// Inside your Dashboard component:
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
    <div className="flex items-center justify-center min-h-screen bg-white ">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 "></div>
    </div>
  );

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    router.replace('/admin');
  };

  return (
    <div className="flex min-h-screen bg-[#fafafa]  text-slate-950 font-sans transition-colors duration-300">

      {/* --- SIDEBAR --- */}
      <aside className="w-64 border-r border-slate-200   flex flex-col fixed h-full bg-white   z-20 transition-colors">
        <div className="p-6">
          <div className="flex items-center justify-center p-2 rounded-xl ">
            <img src="/logo.png" alt="Logo" className="h-full w-auto object-contain " />
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {[
            { id: 'Overview', icon: <FaChartBar />, label: 'Overview' },
            { id: 'Customers Details', icon: <FaUsers />, label: 'Customers Details' },
            { id: 'PhotoGraphy', icon: <FaCamera />, label: 'PhotoGraphy' },
            { id: 'VideoGraphy', icon: <FaVideo />, label: 'VideoGraphy' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === item.id
                ? 'bg-slate-900  text-white  shadow-lg'
                : 'text-black  hover:bg-slate-50  hover:text-slate-950 '
                }`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between space-x-2 px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50  rounded-lg transition-colors">
            <span>Sign out</span>
            <FaSignOutAlt />
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-slate-200  bg-white/50  backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center justify-center p-2">
            <p className='font-bold text-xl  '>Kanya Studios</p>
          </div>

          <div className="flex items-center space-x-6">
            {/* --- PROFILE HOVER SECTION --- */}
            <div className="relative group py-2">
              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-900  ">Kanya Studio</p>
                  <p className="text-[10px] text-gray-500  ">Admin Account</p>
                </div>
                <FaUserCircle size={30} className="text-slate-400  " />
              </div>

              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white   border border-slate-200  rounded-xl shadow-xl overflow-hidden">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                  >
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic View */}
        <div className="p-8 max-w-7xl mx-auto w-full">
          {activeTab === 'Overview' && <OverviewPage />}
          {activeTab === 'Customers Details' && <CustomersDetailsPage />}
          {activeTab === 'PhotoGraphy' && <Photography title="PhotoGraphy" />}
          {activeTab === 'VideoGraphy' && <Videography title="VideoGraphy" />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;