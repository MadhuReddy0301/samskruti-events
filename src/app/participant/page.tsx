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
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-slate-800 text-white p-6">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-2">Explore Events</h1>
      <p className="text-gray-400 mb-6">
        Discover and register for exciting events
      </p>

      {/* EVENTS GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition"
          >
            {/* IMAGE (dummy) */}
            <div className="h-40 bg-gradient-to-r from-purple-600 to-blue-500"></div>

            {/* CONTENT */}
            <div className="p-4">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-gray-400">{event.description}</p>

              <div className="mt-3 text-sm text-gray-300">
                <p>💰 ₹{event.price}</p>
                <p>🏫 {event.branch}</p>
              </div>

              <button
                onClick={() => router.push(`/events/${event.id}`)}
                className="mt-4 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded w-full"
              >
                View Event →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}