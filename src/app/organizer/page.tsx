"use client"

import { useEffect, useState } from "react"

export default function OrganizerPage() {
  const [events, setEvents] = useState<any[]>([])

  const [form, setForm] = useState({
    title: "",
    description: "",
    branch: "",
    price: "",
    date: "",
    maxParticipants: "",
    posterUrl: "",
    videoUrl: "",
  })

  // ✅ FETCH EVENTS
  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(Array.isArray(data) ? data : [])
      })
  }, [])

  // ✅ HANDLE INPUT
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // ✅ CREATE EVENT
  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    const newEvent = await res.json()

    // update UI instantly
    setEvents((prev) => [newEvent, ...prev])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0f172a] to-black text-white p-10">

      <h1 className="text-3xl font-bold mb-8">Organizer Dashboard</h1>

      <div className="flex gap-10 items-start">

        {/* ================= FORM ================= */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10 shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4">Create Event</h2>

          {[
            { name: "title", placeholder: "Title" },
            { name: "description", placeholder: "Description" },
            { name: "branch", placeholder: "Branch (CSE/ECE)" },
            { name: "price", placeholder: "Price" },
            { name: "date", placeholder: "Date (yyyy-mm-dd)" },
            { name: "maxParticipants", placeholder: "Max Participants" },
            { name: "posterUrl", placeholder: "Poster Image URL" },
            { name: "videoUrl", placeholder: "Video URL" },
          ].map((field) => (
            <input
              key={field.name}
              name={field.name}
              placeholder={field.placeholder}
              value={(form as any)[field.name]}
              onChange={handleChange}
              className="w-full mb-3 p-2 rounded bg-white/10 border border-white/10 outline-none focus:ring-2 focus:ring-purple-500"
            />
          ))}

          <button
            type="submit"
            className="w-full mt-3 bg-gradient-to-r from-purple-500 to-blue-500 py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Create Event
          </button>
        </form>

        {/* ================= EVENTS GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">

          {events.length === 0 && (
            <p className="text-gray-400">No events yet...</p>
          )}

          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg hover:shadow-purple-500/30 transition-all duration-300 border border-white/10"
            >
              {/* IMAGE */}
              <div className="h-32 w-full overflow-hidden">
                <img
                  src={event.posterUrl || "https://picsum.photos/400/200"}
                  alt="event"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-white">
                  {event.title}
                </h2>

                <p className="text-sm text-gray-400 mt-1">
                  {event.description}
                </p>

                <div className="flex justify-between mt-3 text-sm text-gray-300">
                  <span>₹ {event.price}</span>
                  <span>{event.branch}</span>
                </div>
              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  )
}