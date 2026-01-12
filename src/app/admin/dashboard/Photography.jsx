"use client";
import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrashAlt, FaSpinner, FaCloudUploadAlt, FaEdit, FaImage } from "react-icons/fa";

export const Photography = ({ title }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for Create/Update
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
    // If not editing, we MUST have a file.
    if (!formData.imageFile && !editingId) return alert("Please select an image!");
    setIsSubmitting(true);

    try {
      // PROPER WAY: Send everything to YOUR API as FormData
      const data = new FormData();
      data.append("name", formData.name);
      if (formData.imageFile) data.append("file", formData.imageFile);
      if (editingId) data.append("id", editingId);

      const res = await fetch("/api/photography", {
        method: editingId ? "PUT" : "POST",
        body: data, // No headers needed for FormData, browser sets them automatically
      });

      const result = await res.json();
      if (result.success) {
        if (editingId) {
          setItems(items.map(item => item._id === editingId ? result.data : item));
        } else {
          setItems([result.data, ...items]);
        }
        resetForm();
      } else {
        alert(result.error || "Something went wrong");
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
  };

  const deletePhoto = async (id) => {
    if (!confirm("Are you sure you want to delete this?")) return;
    try {
      const res = await fetch(`/api/photography?id=${id}`, { method: "DELETE" });
      const result = await res.json();
      if (result.success) {
        setItems(items.filter(p => p._id !== id));
      }
    } catch (err) { alert("Delete failed"); }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900">{title} Gallery</h2>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Manage Portfolio Images</p>
        </div>
        <button 
          onClick={() => { if(showForm) resetForm(); else setShowForm(true); }} 
          className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-black transition-all"
        >
          <FaPlus /> {showForm ? "Cancel" : "Add New Image"}
        </button>
      </div>

      {/* FORM SECTION */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col md:flex-row gap-4 shadow-sm">
          <input 
            type="text" required placeholder="Project or Client Name" 
            className="flex-1 p-3 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-slate-900" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
          />
          <div className="flex gap-2">
            <label className="flex-1 md:w-56 flex items-center justify-center gap-2 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer text-xs font-bold text-slate-600 px-4 hover:bg-slate-100">
              <FaCloudUploadAlt className="text-lg" /> 
              {formData.imageFile ? "Ready" : editingId ? "Change Image?" : "Upload Photo"}
              <input type="file" hidden accept="image/*" onChange={(e) => setFormData({...formData, imageFile: e.target.files[0]})} />
            </label>
            <button 
              disabled={isSubmitting} 
              type="submit" 
              className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold text-sm min-w-[130px] hover:bg-emerald-700 disabled:opacity-50"
            >
              {isSubmitting ? <FaSpinner className="animate-spin mx-auto" /> : editingId ? "UPDATE" : "SAVE PHOTO"}
            </button>
          </div>
        </form>
      )}

      {/* GALLERY GRID */}
      {isLoading ? (
        <div className="flex justify-center py-20 text-slate-300"><FaSpinner className="animate-spin text-3xl" /></div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((item) => (
            <div key={item._id} className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 group border border-slate-200 shadow-sm">
              <img src={item.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.name} />
              
              {/* HOVER ACTIONS */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-3">
                <p className="text-white text-[10px] font-bold uppercase text-center mb-3 line-clamp-2">{item.name}</p>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(item)} className="p-2 bg-white/20 hover:bg-white/40 text-white rounded-lg transition-colors">
                    <FaEdit size={14} />
                  </button>
                  <button onClick={() => deletePhoto(item._id)} className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-colors">
                    <FaTrashAlt size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {!isLoading && items.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed border-slate-100 rounded-3xl">
          <FaImage className="text-slate-200 text-5xl mx-auto mb-4" />
          <p className="text-slate-400 font-medium">Your gallery is empty.</p>
        </div>
      )}
    </div>
  );
};