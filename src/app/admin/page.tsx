"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [data, setData] = useState<any[]>([]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6">
      
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6">🚀 Admin Dashboard</h1>

      {/* STATS CARD */}
      <div className="bg-slate-700 p-4 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-semibold">
          Total Registrations: {data.length}
        </h2>
      </div>

      {/* LIST */}
      <div className="grid md:grid-cols-2 gap-4">
        {data.map((item) => (
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

      {data.length === 0 && (
        <p className="text-gray-400 mt-4">No registrations yet</p>
      )}
    </div>
  );
}