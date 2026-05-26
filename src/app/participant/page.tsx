"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const events = [
  {
    id: "1",
    title: "Coding Hub",
    desc: "DSA Competition",
    price: "₹100",
    branch: "CSE",
    image:
      "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2",
  },
  {
    id: "2",
    title: "Treasure Hunt",
    desc: "Find Treasure",
    price: "₹150",
    branch: "ECE",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
  },
];

export default function ParticipantPage() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-black text-white p-10 relative overflow-hidden">

      {/* TITLE */}
      <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        Explore Events
      </h1>

      {/* EVENTS */}
      <div className="grid md:grid-cols-2 gap-8">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-[#111827] rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition"
          >
            <img src={event.image} className="h-48 w-full object-cover" />

            <div className="p-6">
              <h2 className="text-2xl font-bold">{event.title}</h2>
              <p className="text-gray-400">{event.desc}</p>

              <div className="text-gray-300 mt-2">
                💰 {event.price} | 🎓 {event.branch}
              </div>

              {/* ✅ FIXED BUTTON */}
              <button
                onClick={() => setSelectedEvent(event)}
                className="mt-4 w-full bg-gradient-to-r from-purple-500 to-blue-500 py-2 rounded-lg"
              >
                View Event →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 SLIDE PANEL */}
      <AnimatePresence>
        {selectedEvent && (
          <>
            {/* BACKDROP */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
            />

            {/* PANEL */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4 }}
              className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#020617] border-l border-gray-700 shadow-2xl z-50 p-6"
            >
              {/* CLOSE */}
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-white mb-4"
              >
                ✖ Close
              </button>

              {/* IMAGE */}
              <img
                src={selectedEvent.image}
                className="rounded-xl mb-4 h-48 w-full object-cover"
              />

              <h2 className="text-2xl font-bold">
                {selectedEvent.title}
              </h2>
              <p className="text-gray-400 mb-4">
                {selectedEvent.desc}
              </p>

              {/* FORM */}
              <form className="space-y-3">
                <input className="w-full p-3 rounded bg-gray-800 focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Name" />
                <input className="w-full p-3 rounded bg-gray-800 focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Email" />
                <input className="w-full p-3 rounded bg-gray-800 focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Phone" />
                <input className="w-full p-3 rounded bg-gray-800 focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Roll No" />
                <input className="w-full p-3 rounded bg-gray-800 focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Branch" />

                <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 py-3 rounded-lg mt-3 hover:opacity-90 transition">
                  Register →
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}