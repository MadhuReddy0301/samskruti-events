"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ParticipantPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // FETCH EVENTS
  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(Array.isArray(data)?data:[]));
  }, []);

  // REGISTER FUNCTION
  const handleRegister = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const body = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      rollNo: formData.get("rollNo"),
      branch: formData.get("branch"),
      eventId: selectedEvent.id,
    };

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    setLoading(false);

    if (res.ok) {
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        setSelectedEvent(null);
      }, 1500);
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0f172a] to-[#020617] text-white p-10">

      {/* HEADER */}
      <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
        Explore Events
      </h1>

      {/* EVENTS GRID */}
      <div className="grid md:grid-cols-2 gap-8">
        {events.map((event) => (
          <motion.div
            key={event.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-xl"
          >
            <img
              src={event.image || "https://images.unsplash.com/photo-1503428593586-e225b39bddfe"}
              className="h-48 w-full object-cover"
            />

            <div className="p-6">
              <h2 className="text-2xl font-bold">{event.title}</h2>
              <p className="text-gray-400">{event.description}</p>

              <div className="mt-2 text-gray-300">
                💰 ₹{event.price} | 🎓 {event.branch}
              </div>

              <button
                onClick={() => setSelectedEvent(event)}
                className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90"
              >
                View Event →
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* SLIDE PANEL */}
      <AnimatePresence>
        {selectedEvent && (
          <>
            {/* BACKDROP */}
            <motion.div
              className="fixed inset-0 bg-black/80 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
            />

            {/* MAIN CONTAINER */}
            <div className="fixed inset-0 z-50 flex">

              {/* LEFT - FORM PANEL */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.4 }}
                className="w-full md:w-[450px] bg-[#020617] p-6 flex flex-col justify-center border-r border-white/10"
              >
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-400 mb-6 hover:text-white"
                >
                  ✖ Close
                </button>

                <h2 className="text-2xl font-bold mb-2">
                  {selectedEvent.title}
                </h2>

                <p className="text-gray-400 mb-6">
                  {selectedEvent.description}
                </p>

                {/* SUCCESS */}
                <AnimatePresence>
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-green-500/20 text-green-400 p-3 rounded mb-4 text-center"
                    >
                      ✅ Registered Successfully!
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* FORM */}
                <form onSubmit={handleRegister} className="space-y-3">

                  {["name", "email", "phone", "rollNo", "branch"].map((field, i) => (
                    <motion.input
                      key={field}
                      name={field}
                      placeholder={field.toUpperCase()}
                      required
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/10 focus:border-purple-500 outline-none"
                    />
                  ))}

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg mt-3 bg-gradient-to-r from-purple-500 to-blue-500 flex justify-center items-center"
                  >
                    {loading ? (
                      <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
                    ) : (
                      "Register →"
                    )}
                  </button>

                </form>
              </motion.div>

              {/* RIGHT - POSTER */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hidden md:block flex-1 relative"
              >
                <img
                  src={selectedEvent.image || "https://images.unsplash.com/photo-1503428593586-e225b39bddfe"}
                  className="h-full w-full object-cover"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-black/40"></div>
              </motion.div>

            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}