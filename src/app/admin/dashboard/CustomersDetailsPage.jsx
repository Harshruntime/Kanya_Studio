"use client";

import React, { useEffect, useState, useMemo } from "react";
import * as XLSX from "xlsx";

const CustomersDetailsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter & Search States
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortRecent, setSortRecent] = useState(true);

  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/contactform");
      if (!res.ok) throw new Error("Could not connect to the database.");
      const result = await res.json();
      if (result.success) setContacts(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchContacts(); }, []);

  // Filter, Search, and Sort Logic
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

  // Excel Export with your specific headers
  const downloadExcel = () => {
    const excelData = filteredContacts.map((contact) => ({
      "Name": contact.name,
      "Email Info": contact.email,
      "Contact Info": contact.phone,
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
    <div className="p-4 md:p-8 animate-in fade-in duration-700">
      
      {/* HEADER & DOWNLOAD */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-black text-slate-900">Customer Details</h2>
        <button
          onClick={downloadExcel}
          disabled={filteredContacts.length === 0}
          className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold transition-all disabled:opacity-30"
        >
          Download Excel ({filteredContacts.length})
        </button>
      </div>

      {/* FILTER CONTROLS */}
      <div className="bg-white p-6 border border-slate-200 rounded-3xl mb-8 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4">
        <input type="text" placeholder="Search Name/Email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-slate-50 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-slate-900"/>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="bg-slate-50 rounded-xl p-3 text-sm outline-none"/>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="bg-slate-50 rounded-xl p-3 text-sm outline-none"/>
        <select value={sortRecent ? "newest" : "oldest"} onChange={(e) => setSortRecent(e.target.value === "newest")} className="bg-slate-50 rounded-xl p-3 text-sm outline-none">
          <option value="newest">Recently Added</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* THE TABLE WITH ALL YOUR REQUESTED HEADERS */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Name</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Email Info</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Contact Info</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Event Date</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Location</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">Guests</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Services</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredContacts.map((contact) => (
              <tr key={contact._id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900">{contact.name}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{contact.email}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{contact.phone}</td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {contact.eventDate ? new Date(contact.eventDate).toLocaleDateString() : "N/A"}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{contact.location}</td>
                <td className="px-6 py-4 text-center">
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                    {contact.guestCount || 0}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-slate-500 italic">
                  {Array.isArray(contact.services) ? contact.services.join(", ") : contact.services}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {isLoading && <div className="p-10 text-center text-slate-400">Loading Database...</div>}
        {!isLoading && filteredContacts.length === 0 && <div className="p-10 text-center text-slate-400 italic">No records found.</div>}
      </div>
    </div>
  );
};

export default CustomersDetailsPage;