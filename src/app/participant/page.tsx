"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ParticipantPage() {
  const [events, setEvents] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/get-events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0f172a] to-[#020617] text-white p-6">

      {/* HEADER */}
      <div className="mb-10">
        <p className="text-purple-400 text-sm mb-2">
          DISCOVER & JOIN
        </p>

        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          Explore Events
        </h1>

        <p className="text-gray-400 mt-3">
          Find exciting events happening in your campus. Learn, compete and grow!
        </p>
      </div>

      {/* EVENTS */}
      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">

        {events.map((event) => (
          <div
            key={event.id}
            className="relative bg-gradient-to-br from-[#0f172a] to-[#020617] rounded-2xl overflow-hidden border border-slate-700 shadow-xl hover:shadow-purple-500/20 transition duration-300"
          >

            {/* IMAGE */}
            <div className="h-44 bg-[url('https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee')] bg-cover bg-center"></div>

            {/* CONTENT */}
            <div className="p-6">

              {/* BADGES */}
              <div className="flex justify-between mb-3">
                <span className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-xs">
                  {event.branch}
                </span>

                <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs">
                  Competition
                </span>
              </div>

              {/* TITLE */}
              <h2 className="text-xl font-semibold mb-1">
                {event.title}
              </h2>

              <p className="text-gray-400 mb-4">
                {event.description}
              </p>

              {/* DETAILS */}
              <div className="space-y-2 text-sm text-gray-300">
                <p>💰 ₹{event.price} Entry Fee</p>
                <p>📅 Sep 09 2026</p>
                <p>👥 Max: 3 Participants</p>
              </div>

              {/* BUTTON */}
              <button
                onClick={() => router.push(`/events/${event.id}`)}
                className="mt-4 w-full bg-gradient-to-r from-purple-600 to-blue-500 py-3 rounded-lg hover:scale-[1.02] transition"
              >
                View Event →
              </button>

            </div>
          </div>
        ))}

      </div>

      {/* FEATURES */}
      <div className="mt-16 grid md:grid-cols-4 gap-6">

        <div className="bg-slate-800/50 p-5 rounded-xl text-center">
          <p className="text-purple-400 mb-2">🏆</p>
          <h3 className="font-semibold">Exciting Competitions</h3>
          <p className="text-sm text-gray-400">
            Participate in technical and non-technical events
          </p>
        </div>

        <div className="bg-slate-800/50 p-5 rounded-xl text-center">
          <p className="text-blue-400 mb-2">👥</p>
          <h3 className="font-semibold">Learn & Network</h3>
          <p className="text-sm text-gray-400">
            Connect with peers and experts
          </p>
        </div>

        <div className="bg-slate-800/50 p-5 rounded-xl text-center">
          <p className="text-green-400 mb-2">🏅</p>
          <h3 className="font-semibold">Win Rewards</h3>
          <p className="text-sm text-gray-400">
            Show skills and earn prizes
          </p>
        </div>

        <div className="bg-slate-800/50 p-5 rounded-xl text-center">
          <p className="text-orange-400 mb-2">🚀</p>
          <h3 className="font-semibold">Build Future</h3>
          <p className="text-sm text-gray-400">
            Improve resume & opportunities
          </p>
        </div>

      </div>

    </div>
  );
}