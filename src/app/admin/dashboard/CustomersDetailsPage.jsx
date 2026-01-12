"use client";

import React, { useEffect, useState, useMemo } from "react";
import * as XLSX from "xlsx";
import { 
  FaSearch, FaCalendarAlt, FaDownload, FaFilter, 
  FaUserFriends, FaMapMarkerAlt, FaUsers, FaTimes, 
  FaPhoneAlt, FaEnvelope, FaTag, FaChevronRight 
} from "react-icons/fa";

const CustomersDetailsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortRecent, setSortRecent] = useState(true);

  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/contactform");
      const result = await res.json();
      if (result.success) setContacts(result.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchContacts(); }, []);

  const filteredContacts = useMemo(() => {
    let result = [...contacts];
    if (searchTerm) {
      result = result.filter(c => 
        c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (startDate || endDate) {
      result = result.filter((contact) => {
        const contactDate = new Date(contact.createdAt).getTime();
        const start = startDate ? new Date(startDate).setHours(0,0,0,0) : 0;
        const end = endDate ? new Date(endDate).setHours(23,59,59,999) : Infinity;
        return contactDate >= start && contactDate <= end;
      });
    }
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortRecent ? dateB - dateA : dateA - dateB;
    });
    return result;
  }, [contacts, searchTerm, startDate, endDate, sortRecent]);

  const downloadExcel = () => {
    const excelData = filteredContacts.map((contact) => ({
      "Name": contact.name,
      "Email": contact.email,
      "Phone": contact.phone,
      "Event Date": contact.eventDate ? new Date(contact.eventDate).toLocaleDateString() : "N/A",
      "Location": contact.location || "N/A",
      "Guests": contact.guestCount || 0,
      "Services": Array.isArray(contact.services) ? contact.services.join(", ") : contact.services || "N/A",
    }));
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customer Data");
    XLSX.writeFile(workbook, `Kanya_Studio_Report.xlsx`);
  };

  return (
    <div className="relative min-h-[80vh] space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total Leads</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">{contacts.length}</h3>
          </div>
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900"><FaUsers size={20} /></div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Active Search</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">{filteredContacts.length}</h3>
          </div>
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900"><FaFilter size={18} /></div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group cursor-pointer" onClick={downloadExcel}>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#c26e00]">Export Center</p>
            <h3 className="text-xl font-black text-slate-900 mt-1">Download XLSX</h3>
          </div>
          <div className="w-12 h-12 bg-[#c26e00] rounded-2xl flex items-center justify-center text-white transition-transform group-hover:scale-110"><FaDownload size={18} /></div>
        </div>
      </div>

      {/* FILTER BAR (Matches your Screenshot) */}
      <div className="bg-white p-4 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
          <input 
            type="text" 
            placeholder="Search leads by name or email..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-6 text-sm focus:ring-2 focus:ring-slate-900 transition-all"
          />
        </div>
        <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto">
          <div className="flex items-center bg-slate-50 rounded-2xl px-4 py-2 border border-slate-100">
            <FaCalendarAlt className="text-slate-300 mr-3" size={12} />
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="bg-transparent text-[11px] font-bold uppercase outline-none"/>
            <span className="mx-2 text-slate-300">—</span>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="bg-transparent text-[11px] font-bold uppercase outline-none"/>
          </div>
          <select 
            value={sortRecent ? "newest" : "oldest"} 
            onChange={(e) => setSortRecent(e.target.value === "newest")} 
            className="bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-[11px] font-bold uppercase outline-none"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* BOUTIQUE TABLE (Restored Location & Guests) */}
      <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client Profile</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Event Intel</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Guests</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Services</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredContacts.map((contact) => (
                <tr 
                  key={contact._id} 
                  onClick={() => setSelectedClient(contact)}
                  className="group hover:bg-slate-50/80 transition-all cursor-pointer"
                >
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-slate-900 group-hover:text-[#c26e00] transition-colors">{contact.name}</span>
                      <span className="text-[11px] text-slate-400">{contact.email}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-bold text-slate-600 bg-slate-100/50 px-3 py-1.5 rounded-lg border border-slate-100">
                        {contact.phone}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center text-xs font-bold text-slate-700">
                        <FaCalendarAlt className="mr-2 text-[#c26e00] opacity-50" size={10} />
                        {contact.eventDate ? new Date(contact.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "TBD"}
                      </div>
                      <div className="flex items-center text-[10px] text-slate-400">
                        <FaMapMarkerAlt className="mr-2" size={10} />
                        {contact.location || "Location N/A"}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                       <FaUserFriends className="text-slate-300" size={14} />
                       <span className="text-sm font-black text-slate-900">{contact.guestCount || 0}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-wrap gap-1.5">
                      {(Array.isArray(contact.services) ? contact.services : [contact.services]).map((service, i) => (
                        <span key={i} className="text-[9px] font-black uppercase tracking-widest bg-slate-900 text-white px-3 py-1 rounded-full shadow-sm">
                          {service}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- THE CLIENT DETAIL SLIDER (DRAWER) --- */}
      {selectedClient && (
        <>
          <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[60]" onClick={() => setSelectedClient(null)}></div>
          <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] animate-in slide-in-from-right duration-500 flex flex-col">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xl font-black tracking-tight text-slate-900 uppercase">Lead Details</h3>
              <button onClick={() => setSelectedClient(null)} className="p-3 hover:bg-slate-100 rounded-full transition-colors"><FaTimes className="text-slate-400" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-10">
              <div className="space-y-4">
                <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center text-white text-3xl font-black">{selectedClient.name.charAt(0)}</div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">{selectedClient.name}</h2>
                  <p className="text-sm text-[#c26e00] font-bold uppercase tracking-widest mt-1">Inquiry Details</p>
                </div>
              </div>
              <div className="grid gap-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all"><FaEnvelope size={14} /></div>
                  <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Email</p><p className="text-sm font-bold text-slate-900">{selectedClient.email}</p></div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all"><FaPhoneAlt size={14} /></div>
                  <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Phone</p><p className="text-sm font-bold text-slate-900">{selectedClient.phone}</p></div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all"><FaMapMarkerAlt size={14} /></div>
                  <div><p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Event Location</p><p className="text-sm font-bold text-slate-900">{selectedClient.location || "N/A"}</p></div>
                </div>
              </div>
            </div>
            <div className="p-8 bg-slate-50 flex gap-4">
              <a href={`mailto:${selectedClient.email}`} className="flex-1 bg-white border border-slate-200 text-slate-900 text-center py-4 rounded-2xl text-[10px] font-black uppercase hover:bg-slate-100">Email</a>
              <a href={`tel:${selectedClient.phone}`} className="flex-1 bg-slate-900 text-white text-center py-4 rounded-2xl text-[10px] font-black uppercase">Call Now</a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomersDetailsPage;