"use client";
import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrashAlt, FaSpinner, FaVideo, FaPlay } from "react-icons/fa";

export const Videography = ({ title }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ title: "", videoFile: null });

  useEffect(() => { fetchVideos(); }, []);

  const fetchVideos = async () => {
    try {
      const res = await fetch("/api/videos");
      const result = await res.json();
      if (result.success) setItems(result.data);
    } finally { setIsLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.videoFile) return alert("Select a video!");
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("file", formData.videoFile);

      const res = await fetch("/api/videos", { method: "POST", body: data });
      const result = await res.json();
      
      if (result.success) {
        setItems([result.data, ...items]);
        setShowForm(false);
        setFormData({ title: "", videoFile: null });
      }
    } catch (error) {
      alert("Video upload failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteVideo = async (id) => {
    if (!confirm("Delete video?")) return;
    const res = await fetch(`/api/videos?id=${id}`, { method: "DELETE" });
    if (res.ok) setItems(items.filter(v => v._id !== id));
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-black text-slate-900">{title} Section</h2>
        <button onClick={() => setShowForm(!showForm)} className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
          <FaPlus /> {showForm ? "Cancel" : "Upload Video"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-indigo-50/50 p-6 rounded-2xl border-2 border-dashed border-indigo-200 flex flex-col md:flex-row gap-4">
          <input 
            type="text" required placeholder="Video Title" 
            className="flex-1 p-3 rounded-xl border border-slate-200 text-sm outline-none" 
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})} 
          />
          <div className="flex gap-2">
            <label className="flex-1 md:w-56 flex items-center justify-center gap-2 bg-white border border-slate-200 rounded-xl cursor-pointer text-xs font-bold text-slate-600 px-4">
              <FaVideo /> {formData.videoFile ? "Video Selected" : "Select Video File"}
              <input type="file" hidden accept="video/*" onChange={(e) => setFormData({...formData, videoFile: e.target.files[0]})} />
            </label>
            <button disabled={isSubmitting} type="submit" className="bg-indigo-600 text-white px-8 py-2 rounded-xl font-bold text-sm min-w-[120px]">
              {isSubmitting ? <FaSpinner className="animate-spin mx-auto" /> : "UPLOAD"}
            </button>
          </div>
        </form>
      )}

      {isLoading ? (
        <div className="text-center py-20"><FaSpinner className="animate-spin text-3xl mx-auto text-slate-200" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item._id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 group">
              <div className="relative aspect-video">
                <video src={item.videoUrl} className="w-full h-full object-cover" preload="metadata" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all">
                    <FaPlay className="text-white text-3xl opacity-80" />
                </div>
                <button onClick={() => deleteVideo(item._id)} className="absolute top-2 right-2 p-2 bg-white rounded-lg text-red-500 hover:bg-red-50">
                    <FaTrashAlt size={14} />
                </button>
              </div>
              <div className="p-4 font-bold text-slate-800 text-sm truncate uppercase">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};