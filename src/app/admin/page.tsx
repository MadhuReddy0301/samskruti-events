"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    const res = await fetch("/api/admin");
    const result = await res.json();
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    await fetch("/api/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    fetchData();
  };

  // 🔍 FILTER
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black text-white">

      {/* 🔥 NAVBAR */}
      <div className="bg-slate-800 px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">🚀 Admin Dashboard</h1>
        <input
          type="text"
          placeholder="Search name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-1 rounded bg-slate-700 text-white outline-none"
        />
      </div>

      <div className="p-6">

        {/* 📊 STATS */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-800 p-4 rounded-xl shadow">
            <h2 className="text-gray-400">Total Registrations</h2>
            <p className="text-2xl font-bold">{data.length}</p>
          </div>

          <div className="bg-slate-800 p-4 rounded-xl shadow">
            <h2 className="text-gray-400">CSE</h2>
            <p className="text-2xl font-bold">
              {data.filter((d) => d.branch === "cse").length}
            </p>
          </div>

          <div className="bg-slate-800 p-4 rounded-xl shadow">
            <h2 className="text-gray-400">ECE</h2>
            <p className="text-2xl font-bold">
              {data.filter((d) => d.branch === "ece").length}
            </p>
          </div>
        </div>

        {/* 📋 LIST */}
        <div className="grid md:grid-cols-2 gap-5">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800 p-5 rounded-xl shadow-lg hover:scale-[1.02] transition"
            >
              <h3 className="text-lg font-bold mb-2">{item.name}</h3>

              <p className="text-sm text-gray-300">📧 {item.email}</p>
              <p className="text-sm text-gray-300">📱 {item.phone}</p>
              <p className="text-sm text-gray-300">🎓 {item.rollNo}</p>
              <p className="text-sm text-gray-300">🏫 {item.branch}</p>
              <p className="text-sm text-gray-300 mb-3">🎯 {item.eventId}</p>

              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <p className="text-gray-400 mt-6">No results found</p>
        )}
      </div>
    </div>
  );
}