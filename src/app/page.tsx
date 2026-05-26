"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    rollNo: "",
    branch: "",
  });

  useEffect(() => {
    fetch("/api/get-events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  const handleRegister = async () => {
    if (!selectedEvent) {
      alert("Please select an event");
      return;
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        eventId: selectedEvent,
      }),
    });

    if (res.ok) {
      alert("Registration successful");

      // ✅ Clear form after success
      setForm({
        name: "",
        email: "",
        phone: "",
        rollNo: "",
        branch: "",
      });

      setSelectedEvent("");
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black text-white p-6">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6">🎉 Samskruti Events</h1>

      {/* EVENTS */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => setSelectedEvent(event.id)}
            className={`p-4 rounded-xl shadow-lg cursor-pointer transition ${
              selectedEvent === event.id
                ? "bg-blue-600 ring-2 ring-blue-300"
                : "bg-slate-800 hover:bg-slate-700"
            }`}
          >
            <h2 className="text-lg font-bold">{event.title}</h2>
            <p>{event.description}</p>
            <p className="text-sm text-gray-300">
              Branch: {event.branch}
            </p>
            <p className="text-sm text-gray-300">
              Price: ₹{event.price}
            </p>
          </div>
        ))}
      </div>

      {/* SELECTED EVENT TEXT */}
      {selectedEvent && (
        <p className="mb-4 text-green-400 font-semibold">
          ✅ Selected Event: {selectedEvent}
        </p>
      )}

      {/* FORM */}
      <div className="flex justify-center">
        <div className="bg-slate-800 p-6 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Register</h2>

          <input
            value={form.name}
            placeholder="Name"
            className="w-full mb-3 p-2 rounded bg-slate-700"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            value={form.email}
            placeholder="Email"
            className="w-full mb-3 p-2 rounded bg-slate-700"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            value={form.phone}
            placeholder="Phone"
            className="w-full mb-3 p-2 rounded bg-slate-700"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            value={form.rollNo}
            placeholder="Roll No"
            className="w-full mb-3 p-2 rounded bg-slate-700"
            onChange={(e) => setForm({ ...form, rollNo: e.target.value })}
          />

          <input
            value={form.branch}
            placeholder="Branch"
            className="w-full mb-3 p-2 rounded bg-slate-700"
            onChange={(e) => setForm({ ...form, branch: e.target.value })}
          />

          <button
            onClick={handleRegister}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded w-full mt-2"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}