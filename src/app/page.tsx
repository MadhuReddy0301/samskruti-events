"use client"

import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] text-white px-4">

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center flex items-center gap-2">
        🎉 Samskruti Events
      </h1>

      <p className="text-gray-400 mb-10 text-center">
        Select your role to continue
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">

        {/* Participant */}
        <div
          onClick={() => router.push("/participant")}
          className="cursor-pointer p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-purple-500 hover:scale-105 transition-all duration-300 text-center shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-2">👤 Participant</h2>
          <p className="text-gray-400 text-sm">
            Browse events & register
          </p>
        </div>

        {/* Organizer */}
        <div
          onClick={() => router.push("/organizer")}
          className="cursor-pointer p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-500 hover:scale-105 transition-all duration-300 text-center shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-2">🛠 Organizer</h2>
          <p className="text-gray-400 text-sm">
            Create and manage events
          </p>
        </div>

        {/* Admin */}
        <div
          onClick={() => router.push("/admin")}
          className="cursor-pointer p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-yellow-500 hover:scale-105 transition-all duration-300 text-center shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-2">🔐 Admin</h2>
          <p className="text-gray-400 text-sm">
            View registrations
          </p>
        </div>

      </div>

    </main>
  )
}