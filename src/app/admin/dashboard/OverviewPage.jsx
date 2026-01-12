"use client";

import React, { useEffect, useState, useMemo } from "react";
import { FaAddressBook, FaCalendarAlt, FaPhotoVideo, FaUsers, FaVideo } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";

export const OverviewPage = () => {
  const [contacts, setContacts] = useState([]);
  const [photoItems, setPhotoItems] = useState([]); // State for Photography
  const [videoItems, setVideoItems] = useState([]); // State for Videography
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    try {
      // Fetch all three endpoints simultaneously
      const [contactRes, photoRes, videoRes] = await Promise.all([
        fetch("/api/contactform"),
        fetch("/api/photography"),
        fetch("/api/videos")
      ]);

      const contactData = await contactRes.json();
      const photoData = await photoRes.json();
      const videoData = await videoRes.json();

      if (contactData.success) setContacts(contactData.data);
      if (photoData.success) setPhotoItems(photoData.data);
      if (videoData.success) setVideoItems(videoData.data);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // CALCULATIONS
  const stats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const newToday = contacts.filter(c => {
      const contactDate = new Date(c.createdAt);
      return contactDate >= today;
    }).length;

    return {
      total: contacts.length,
      today: newToday,
      photos: photoItems.length, // Dynamic count from state
      videos: videoItems.length  // Dynamic count from state
    };
  }, [contacts, photoItems, videoItems]);

  const recentActivity = contacts?.slice(0, 10) || [];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* TOP HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-5xl font-black tracking-tighter text-slate-900">
            System <span className="text-slate-400">Overview</span>
          </h2>
          <p className="text-slate-500 font-medium mt-2">
            Real-time analytics for Kanya Studio operations.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white border border-slate-200 p-2 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-700 bg-slate-50 rounded-xl">
            <FaCalendarAlt className="text-slate-400" />
            <span>{new Date().toDateString()}</span>
          </div>
        </div>
      </div>

      {/* STATS GRID - Reflecting Dynamic Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Contacts',
            val: stats.total,
            textColor: 'text-blue-600',
            bgColor: 'bg-blue-50',
            icon: <FaUsers />
          },
          {
            title: 'New Today',
            val: stats.today,
            textColor: 'text-emerald-600',
            bgColor: 'bg-emerald-50',
            icon: <FaAddressBook />
          },
          {
            title: 'Photography',
            val: stats.photos,
            textColor: 'text-indigo-600',
            bgColor: 'bg-indigo-50',
            icon: <FaPhotoVideo />
          },
          {
            title: 'Videography',
            val: stats.videos,
            textColor: 'text-orange-600',
            bgColor: 'bg-orange-50',
            icon: <FaVideo />
          },
        ].map((stat, i) => (
          <div key={i} className="group relative bg-white border border-slate-200 rounded-[2rem] p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">

            {/* 1. Large Faded Background Icon */}
            <div className={`absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity text-6xl ${stat.textColor}`}>
              {stat.icon}
            </div>

            {/* 2. Small Icon Box with Specific Colors */}
            <div className={`w-12 h-12 rounded-2xl ${stat.bgColor} flex items-center justify-center ${stat.textColor} mb-6 transition-transform group-hover:rotate-12`}>
              {stat.icon}
            </div>

            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.title}</p>

            <div className="flex items-baseline gap-2 mt-2">
              <h3 className="text-4xl font-black text-slate-900">
                {isLoading ? "..." : stat.val}
              </h3>
              {stat.title === 'New Today' && stats.today > 0 && (
                <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                  <FaArrowTrendUp /> Live
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* RECENT ACTIVITY SECTION */}
      <div className="bg-white border border-slate-200 rounded-[2.5rem] px-8 py-8 shadow-sm">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Recent Activity</h3>
            <p className="text-slate-400 text-sm font-medium">Latest customer interactions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {recentActivity.length > 0 ? (
            recentActivity.map((contact, index) => (
              <div
                key={contact._id || index}
                className="flex items-center justify-between p-3 rounded-3xl hover:bg-slate-50 transition-all group cursor-pointer border border-transparent hover:border-slate-100"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-600 font-black group-hover:from-slate-800 group-hover:to-slate-900 group-hover:text-white transition-all duration-500 shadow-inner">
                    {contact.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <p className="text-base font-bold text-slate-900">{contact.name}</p>
                    <p className="text-sm text-slate-400 font-medium">
                      Inquired from <span className="text-slate-600">{contact.location || 'Website'}</span>
                    </p>
                  </div>
                </div>
                <div className="hidden md:block text-right">
                  <p className="text-sm font-black text-slate-900">{contact.guestCount || 0} Guests</p>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
                    {contact.createdAt ? new Date(contact.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Pending'}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-bold">No activity detected today.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};