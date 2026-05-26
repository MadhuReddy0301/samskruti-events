"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ParticipantPage() {
  const router = useRouter();

  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/get-events")
      .then((res) => res.json())
      .then((data) => {
        console.log("EVENTS:", data);
        setEvents(data);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] text-white p-10">
      
      {/* HEADER */}
      <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        Explore Events
      </h1>

      <p className="text-gray-400 mb-10">
        Find exciting events happening in your campus. Learn, compete and grow!
      </p>

      {/* EVENTS GRID */}
      <div className="grid md:grid-cols-2 gap-8">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-slate-900/60 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:scale-105 transition duration-300"
          >
            {/* IMAGE */}
            <img
              src="https://images.unsplash.com/photo-1503428593586-e225b39bddfe"
              className="w-full h-56 object-cover"
            />

            {/* CONTENT */}
            <div className="p-6">
              <h2 className="text-2xl font-semibold">{event.title || event.name}</h2>
              <p className="text-gray-400 mb-4">
                {event.description || "Exciting event"}
              </p>

              <p>💰 ₹{event.price || 100}</p>
              <p>📅 {event.date || "Coming Soon"}</p>
              <p>👥 Max Participants: {event.maxParticipants || 3}</p>

              {/* BUTTON */}
              <button
                onClick={() => router.push(`/events/${event.id}`)}
                className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 transition"
              >
                View Event →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* NO EVENTS */}
      {events.length === 0 && (
        <p className="text-center text-gray-400 mt-20">
          No events found...
        </p>
      )}
    </div>
  );
}