"use client";

import { useEffect, useState } from "react";

type Event = {
  id: string;
  title: string;
  description: string;
  branch: string;
  price: number;
  date: string;
  maxParticipants: number;
  posterUrl: string;
};

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [branch, setBranch] = useState("all");

  useEffect(() => {
    fetch("/api/get-events")
      .then((res) => res.json())
      .then((data) => setEvents(data.events));
  }, []);

  const filteredEvents = events.filter(
    (e) => branch === "all" || e.branch === branch
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-black to-[#020617] text-white px-16 py-10">

      {/* 🔥 HERO SECTION */}
      <div className="flex justify-between items-center mb-20">

        {/* LEFT */}
        <div>
          <p className="text-purple-400 mb-2 text-sm">
            ● DISCOVER & JOIN
          </p>

          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
            Samskruti Events
          </h1>

          <p className="text-gray-400 mt-3 max-w-xl">
            Find exciting events happening in your campus. Learn, compete and grow!
          </p>

          {/* FILTER */}
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="mt-6 px-4 py-2 bg-[#0f172a] border border-gray-700 rounded-xl"
          >
            <option value="all">All Branches</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
          </select>
        </div>

        {/* RIGHT PREMIUM GLOW */}
        <div className="relative">
          <div className="w-[220px] h-[220px] bg-purple-500/20 blur-3xl rounded-full animate-pulse"></div>
          <div className="absolute top-10 left-10 w-[120px] h-[120px] bg-blue-500/20 blur-2xl rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* 🔥 EVENT CARDS */}
      <div className="grid md:grid-cols-2 gap-12">

        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="flex bg-gradient-to-br from-[#0f172a] to-[#020617]
            border border-purple-500/20 rounded-3xl overflow-hidden
            shadow-[0_0_50px_rgba(168,85,247,0.25)]
            hover:scale-[1.03] transition-all duration-500"
          >

            {/* IMAGE */}
            <div className="w-[45%]">
              <img
                src={event.posterUrl}
                alt="poster"
                className="w-full h-full object-cover"
              />
            </div>

            {/* CONTENT */}
            <div className="w-[55%] p-6 flex flex-col justify-between">

              <div>
                <div className="flex gap-2 mb-2">
                  <span className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded-full">
                    {event.branch}
                  </span>
                </div>

                <h2 className="text-2xl font-bold">
                  {event.title}
                </h2>

                <p className="text-gray-400 text-sm mt-1">
                  {event.description}
                </p>

                <div className="mt-5 space-y-2 text-sm text-gray-300">
                  <p>💰 ₹{event.price}</p>
                  <p>📅 {new Date(event.date).toDateString()}</p>
                  <p>👥 Max: {event.maxParticipants}</p>
                </div>
              </div>

              <a
                href={`/events/${event.id}`}
                className="mt-6 bg-gradient-to-r from-purple-600 to-indigo-600
                text-center py-2 rounded-xl font-semibold
                hover:opacity-90 transition-all"
              >
                View Event →
              </a>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}