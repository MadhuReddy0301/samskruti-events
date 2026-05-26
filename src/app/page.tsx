"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-slate-800 text-white flex flex-col items-center justify-center p-6">

      {/* TITLE */}
      <h1 className="text-4xl font-bold mb-10">🎉 Samskruti Events</h1>

      <p className="mb-10 text-gray-400">
        Select your role to continue
      </p>

      {/* CARDS */}
      <div className="grid md:grid-cols-3 gap-6 w-full max-w-4xl">

        {/* PARTICIPANT */}
        <div
          onClick={() => router.push("/participant")}
          className="bg-slate-800 p-6 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition text-center"
        >
          <h2 className="text-xl font-semibold mb-2">👤 Participant</h2>
          <p className="text-gray-400 text-sm">
            Browse events & register
          </p>
        </div>

        {/* ORGANIZER */}
        <div
          onClick={() => alert("Coming soon")}
          className="bg-slate-800 p-6 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition text-center"
        >
          <h2 className="text-xl font-semibold mb-2">🛠 Organizer</h2>
          <p className="text-gray-400 text-sm">
            Create and manage events
          </p>
        </div>

        {/* ADMIN */}
        <div
          onClick={() => router.push("/admin")}
          className="bg-slate-800 p-6 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition text-center"
        >
          <h2 className="text-xl font-semibold mb-2">🔐 Admin</h2>
          <p className="text-gray-400 text-sm">
            View registrations
          </p>
        </div>

      </div>
    </div>
  );
}