"use client";
import React, { useState, useEffect } from 'react';
import { 
  FaPlus, FaTrashAlt, FaSpinner, FaVideo, 
  FaPlay, FaFilm, FaTimes, FaExternalLinkAlt 
} from "react-icons/fa";

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
    if (!formData.videoFile) return alert("Select a cinematic sequence!");
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
      alert("Transmission failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteVideo = async (id) => {
    if (!confirm("Remove this film from the collection?")) return;
    const res = await fetch(`/api/videos?id=${id}`, { method: "DELETE" });
    if (res.ok) setItems(items.filter(v => v._id !== id));
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-10 pb-20 px-4">
      
      {/* 1. CINEMATIC HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 py-10 border-b border-slate-100">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-indigo-200">
             <FaFilm size={28} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{title} <span className="text-[#c26e00]">Films</span></h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">Cinematic Production Management</p>
          </div>
        </div>

        <button 
          onClick={() => setShowForm(!showForm)} 
          className={`group flex items-center gap-3 px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
            showForm ? 'bg-rose-50 text-rose-600' : 'bg-slate-900 text-white hover:bg-black hover:shadow-2xl'
          }`}
        >
          {showForm ? <><FaTimes /> Close Portal</> : <><FaPlus className="group-hover:rotate-90 transition-transform" /> New Upload</>}
        </button>
      </div>

      {/* 2. THE STUDIO UPLOAD DECK */}
      {showForm && (
        <div className="animate-in slide-in-from-top-4 duration-500">
          <form onSubmit={handleSubmit} className="bg-slate-900 p-10 rounded-[2.5rem] shadow-3xl flex flex-col lg:flex-row gap-6 items-center">
            <div className="w-full lg:flex-1 space-y-2">
                <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest ml-1">Film Title</p>
                <input 
                    type="text" required placeholder="Ex: The Royal Wedding of Aaditya & Meera" 
                    className="w-full bg-white/10 border border-white/10 rounded-2xl py-5 px-6 text-white text-sm outline-none focus:border-indigo-500 transition-all placeholder:text-slate-500" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})} 
                />
            </div>
            
            <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4">
                <label className="flex-1 lg:w-72 flex items-center justify-center gap-3 bg-white/5 border border-white/10 rounded-2xl cursor-pointer text-[11px] font-black text-indigo-100 uppercase py-5 hover:bg-white/10 transition-all">
                    <FaVideo className="text-indigo-400" /> 
                    {formData.videoFile ? "Footage Ready" : "Select Source File"}
                    <input type="file" hidden accept="video/*" onChange={(e) => setFormData({...formData, videoFile: e.target.files[0]})} />
                </label>
                
                <button 
                    disabled={isSubmitting} 
                    type="submit" 
                    className="bg-indigo-500 text-white px-12 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-indigo-400 disabled:opacity-50 transition-all shadow-xl shadow-indigo-500/20"
                >
                    {isSubmitting ? <FaSpinner className="animate-spin mx-auto" size={18} /> : "Upload"}
                </button>
            </div>
          </form>
        </div>
      )}

      {/* 3. THE PREMIERE GRID */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-40">
          <div className="w-20 h-20 border-4 border-slate-100 border-t-indigo-500 rounded-full animate-spin mb-4" />
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rendering Gallery</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {items.map((item) => (
            <div key={item._id} className="group relative bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2">
              
              {/* Video Preview Container */}
              <div className="relative aspect-video overflow-hidden">
                <video 
                    src={item.videoUrl} 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                    preload="metadata" 
                />
                
                {/* Visual Polish Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                
                {/* Play Button Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white scale-90 group-hover:scale-110 group-hover:bg-[#c26e00] transition-all duration-500">
                        <FaPlay className="ml-1" />
                    </div>
                </div>

                {/* Management Tags */}
                <div className="absolute top-6 right-6 flex gap-2">
                    <button 
                        onClick={() => deleteVideo(item._id)} 
                        className="p-3 bg-white/10 backdrop-blur-lg rounded-xl text-white hover:bg-rose-500 transition-all"
                    >
                        <FaTrashAlt size={14} />
                    </button>
                </div>
              </div>

              {/* Title Card */}
              <div className="p-8 flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-[#c26e00] text-[9px] font-black uppercase tracking-[0.2em]">Kanya Studio Productions</p>
                  <h3 className="text-white font-bold text-lg tracking-tight group-hover:text-indigo-400 transition-colors">
                    {item.title}
                  </h3>
                </div>
                <div className="text-white/20 group-hover:text-white transition-colors">
                    <FaExternalLinkAlt size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. EMPTY REEL STATE */}
      {!isLoading && items.length === 0 && (
        <div className="text-center py-32 border-2 border-dashed border-slate-100 rounded-[3rem] space-y-4">
          <FaVideo className="text-slate-200 text-6xl mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-900">No films in the archive</h3>
          <p className="text-slate-400 text-sm max-w-[300px] mx-auto">Upload your cinematic masterpieces to showcase them in the production gallery.</p>
        </div>
      )}
    </div>
  );
};