"use client";
import React, { useState, useEffect } from 'react';
import { 
  FaPlus, FaTrashAlt, FaSpinner, FaCloudUploadAlt, 
  FaEdit, FaImage, FaExpandAlt, FaTimes 
} from "react-icons/fa";

export const Photography = ({ title }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", imageFile: null });

  useEffect(() => { fetchPhotos(); }, []);

  const fetchPhotos = async () => {
    try {
      const res = await fetch("/api/photography");
      const result = await res.json();
      if (result.success) setItems(result.data);
    } catch (err) { console.error("Fetch error:", err); } 
    finally { setIsLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.imageFile && !editingId) return alert("Please select an image!");
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      if (formData.imageFile) data.append("file", formData.imageFile);
      if (editingId) data.append("id", editingId);

      const res = await fetch("/api/photography", {
        method: editingId ? "PUT" : "POST",
        body: data,
      });

      const result = await res.json();
      if (result.success) {
        if (editingId) {
          setItems(items.map(item => item._id === editingId ? result.data : item));
        } else {
          setItems([result.data, ...items]);
        }
        resetForm();
      }
    } catch (error) {
      alert("Capture failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: "", imageFile: null });
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({ name: item.name, imageFile: null });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deletePhoto = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/photography?id=${id}`, { method: "DELETE" });
      const result = await res.json();
      if (result.success) setItems(items.filter(p => p._id !== id));
    } catch (err) { alert("Delete failed"); }
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-10 pb-20 px-6">
      {/* 1. LUXE HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-slate-100 pb-10 pt-6">
        <div className="flex items-center gap-5">
           <div className="w-16 h-16 bg-[#0f172a] rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/20">
              <FaImage className="text-white text-2xl" />
           </div>
           <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">Curation Portal</span>
              </div>
              <h2 className="text-4xl font-light text-[#0f172a] tracking-tight">
                {title} <span className="font-black text-indigo-600">Photography</span>
              </h2>
           </div>
        </div>
        
        <button 
          onClick={() => { if(showForm) resetForm(); else setShowForm(true); }} 
          className={`group flex items-center gap-3 px-10 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-500 shadow-xl ${
            showForm 
            ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' 
            : 'bg-indigo-500 text-white border border-slate-200 hover:bg-indigo-700 hover:text-white'
          }`}
        >
          {showForm ? <><FaTimes className="text-lg" /> Close Portal</> : <><FaPlus className="text-lg group-hover:rotate-90 transition-transform" /> Add Masterpiece</>}
        </button>
      </div>

      {/* 2. MIDNIGHT EDITOR FORM */}
      {showForm && (
        <div className="animate-in fade-in slide-in-from-top-10 duration-700">
          <form onSubmit={handleSubmit} className="bg-[#0f172a] p-12 rounded-[3rem] border border-white/10 shadow-[0_40px_80px_-15px_rgba(15,23,42,0.4)] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/20 blur-[100px] rounded-full" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-5 space-y-4">
                <label className="text-[10px] font-black text-indigo-300 uppercase tracking-widest ml-1">Work Description</label>
                <input 
                  type="text" required placeholder="Ex: The Ethereal Landscape - Iceland 2024" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-7 text-white text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 transition-all placeholder:text-slate-500" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                />
              </div>

              <div className="lg:col-span-4">
                <label className="group flex items-center justify-between gap-4 bg-white/5 border border-dashed border-white/20 p-2 rounded-2xl cursor-pointer hover:border-indigo-400 hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-4 pl-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                        <FaCloudUploadAlt size={22} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-black text-white uppercase tracking-tight">
                          {formData.imageFile ? "Image Loaded" : "Select Source"}
                      </span>
                      <span className="text-[9px] text-slate-400 uppercase font-bold tracking-tighter">High Res JPG/PNG</span>
                    </div>
                  </div>
                  <input type="file" hidden accept="image/*" onChange={(e) => setFormData({...formData, imageFile: e.target.files[0]})} />
                </label>
              </div>

              <div className="lg:col-span-3">
                <button 
                  disabled={isSubmitting} 
                  type="submit" 
                  className="w-full bg-[#6366f1] text-white py-6 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-[#4f46e5] hover:scale-[1.02] active:scale-95 disabled:opacity-50 shadow-[0_20px_40px_-10px_rgba(99,102,241,0.5)] transition-all flex items-center justify-center gap-3"
                >
                  {isSubmitting ? <FaSpinner className="animate-spin text-lg" /> : <>Upload</>}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* 3. MASONRY GRID (4:5 Aspect) */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-48 space-y-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-slate-100 rounded-md" />
            <div className="absolute top-0 w-20 h-20 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin" />
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Syncing Archive</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {items.map((item) => (
            <div key={item._id} className="group relative">
              <div className="aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-slate-100 border border-slate-200 shadow-sm transition-all duration-700 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] group-hover:-translate-y-4">
                <img 
                    src={item.imageUrl} 
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:opacity-80" 
                    alt={item.name} 
                />
                
                {/* Visual Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10">
                   <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 space-y-6">
                      <div className="space-y-1">
                        <p className="text-white text-sm font-black uppercase tracking-widest line-clamp-1">{item.name}</p>
                        <p className="text-indigo-300 text-[10px] font-black uppercase tracking-widest opacity-80 italic">Curated Portfolio Piece</p>
                      </div>
                      
                      <div className="flex gap-4 pt-2">
                        <button onClick={() => handleEdit(item)} className="h-14 w-14 bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white hover:text-[#0f172a] text-white rounded-2xl flex items-center justify-center transition-all shadow-xl">
                          <FaEdit size={18} />
                        </button>
                        <button onClick={() => deletePhoto(item._id)} className="h-14 w-14 bg-rose-500/20 backdrop-blur-xl border border-rose-500/30 hover:bg-rose-500 text-white rounded-2xl flex items-center justify-center transition-all shadow-xl">
                          <FaTrashAlt size={18} />
                        </button>
                        <div className="ml-auto h-14 w-14 bg-indigo-500/20 backdrop-blur-xl border border-indigo-500/30 text-indigo-300 rounded-2xl flex items-center justify-center opacity-50">
                          <FaExpandAlt size={18} />
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. EMPTY STATE */}
      {!isLoading && items.length === 0 && (
        <div className="flex flex-col items-center justify-center py-40 rounded-[4rem] bg-slate-50 border-2 border-dashed border-slate-200">
          <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-inner mb-8">
            <FaImage className="text-slate-200 text-4xl" />
          </div>
          <h3 className="text-xl font-black text-[#0f172a] uppercase tracking-tighter">Archive Unpopulated</h3>
          <p className="text-sm text-slate-400 max-w-[300px] text-center mt-3 font-medium leading-relaxed">
            Your photography gallery is currently empty. Initialize a new upload to begin curating your visual legacy.
          </p>
        </div>
      )}
    </div>
  );
};