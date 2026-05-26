"use client";

import { useEffect, useState } from "react";

export default function OrganizerPage() {
  const [events, setEvents] = useState<any[]>([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    branch: "",
    price: "",
    date: "",
    maxParticipants: "",
    posterUrl: "",
    videoUrl: "",
  });

  // FETCH EVENTS
  const loadEvents = async () => {
    const res = await fetch("/api/events");
    const data = await res.json();
    setEvents(data);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // HANDLE INPUT
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SUBMIT
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/create-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      alert("Event Created ✅");
      setForm({
        title: "",
        description: "",
        branch: "",
        price: "",
        date: "",
        maxParticipants: "",
        posterUrl: "",
        videoUrl: "",
      });
      loadEvents();
    } else {
      alert("Error ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white p-10">

      <h1 className="text-4xl font-bold mb-10">Organizer Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-10">

        {/* LEFT FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 space-y-4"
        >
          <h2 className="text-xl font-semibold">Create Event</h2>

          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="input" />
          <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="input" />
          <input name="branch" value={form.branch} onChange={handleChange} placeholder="Branch" className="input" />
          <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="input" />
          <input type="date" name="date" value={form.date} onChange={handleChange} className="input" />
          <input name="maxParticipants" value={form.maxParticipants} onChange={handleChange} placeholder="Max Participants" className="input" />

          {/* SIMPLE URL FOR NOW */}
          <input name="posterUrl" value={form.posterUrl} onChange={handleChange} placeholder="Poster Image URL" className="input" />

          <input name="videoUrl" value={form.videoUrl} onChange={handleChange} placeholder="Video URL" className="input" />

          <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
            Create Event
          </button>
        </form>

        {/* RIGHT EVENTS */}
        <div className="flex flex-col gap-5 max-h-[500px] overflow-y-auto">

          {events.length === 0 && (
            <p className="text-gray-400">No events yet</p>
          )}

          {events.map((event) => (
            <div key={event.id} className="bg-white/10 rounded-xl overflow-hidden">

              <div className="h-32">
                <img
                  src={event.posterUrl || "https://picsum.photos/500"}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-sm text-gray-400">{event.description}</p>

                <div className="flex justify-between text-sm mt-2">
                  <span>₹ {event.price}</span>
                  <span>{event.branch}</span>
                </div>
              </div>

            </div>
          ))}

        </div>

      </div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 10px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>

    </div>
  );
}