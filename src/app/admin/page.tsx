"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Registration = {
  id: string;
  name: string;
  rollNo: string;
  teamName?: string;
  paymentUrl: string;
  status: string;
};

export default function AdminPage() {
  const router = useRouter();
  const [data, setData] = useState<Registration[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // 🔐 LOGIN CHECK
  useEffect(() => {
    const isAdmin = localStorage.getItem("admin");
    if (!isAdmin) router.push("/login");
  }, []);

  // 📦 FETCH DATA
  useEffect(() => {
    fetch("/api/get-registrations")
      .then((res) => res.json())
      .then((res) => setData(res.data));
  }, []);

  // 🔍 FILTER LOGIC
  const filtered = data.filter((r) => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || r.status === filter;
    return matchSearch && matchFilter;
  });

  const total = data.length;
  const approved = data.filter((r) => r.status === "approved").length;
  const pending = data.filter((r) => r.status === "pending").length;

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* 🔥 STATS */}
      <div className="flex gap-6 mb-6 flex-wrap">
        <div className="bg-gray-800 p-4 rounded-lg">👥 Total: {total}</div>
        <div className="bg-green-700 p-4 rounded-lg">✅ Approved: {approved}</div>
        <div className="bg-yellow-600 p-4 rounded-lg">⏳ Pending: {pending}</div>
      </div>

      {/* 🔍 SEARCH + FILTER */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <input
          placeholder="Search by name..."
          className="input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="input"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* 📋 TABLE */}
      <table className="w-full border border-gray-700">
        <thead>
          <tr className="bg-gray-800 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Roll</th>
            <th className="p-3">Team</th>
            <th className="p-3">Payment</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((reg) => (
            <tr key={reg.id} className="border-t border-gray-700">
              <td className="p-3">{reg.name}</td>
              <td className="p-3">{reg.rollNo}</td>
              <td className="p-3">{reg.teamName || "-"}</td>

              <td className="p-3">
                <a
                  href={reg.paymentUrl}
                  target="_blank"
                  className="text-blue-400 underline"
                >
                  View
                </a>
              </td>

              <td className="p-3">
                {reg.status === "pending" && (
                  <span className="text-yellow-400">Pending</span>
                )}
                {reg.status === "approved" && (
                  <span className="text-green-400">Approved</span>
                )}
                {reg.status === "rejected" && (
                  <span className="text-red-400">Rejected</span>
                )}
              </td>

              {/* 🔥 FIXED BUTTONS */}
              <td className="p-3">
                <div className="flex gap-3">

                  <form action="/api/update-status" method="POST">
                    <input type="hidden" name="id" value={reg.id} />
                    <input type="hidden" name="status" value="approved" />
                    <button className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded-lg transition-all hover:scale-105 shadow">
                      ✔ Approve
                    </button>
                  </form>

                  <form action="/api/update-status" method="POST">
                    <input type="hidden" name="id" value={reg.id} />
                    <input type="hidden" name="status" value="rejected" />
                    <button className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-lg transition-all hover:scale-105 shadow">
                      ✖ Reject
                    </button>
                  </form>

                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}