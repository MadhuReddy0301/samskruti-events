"use client";

import { useEffect, useState } from "react";

export default function EventPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    rollNo: "",
    branch: "",
  });

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch("/api/get-events");
      const data = await res.json();
      setEvents(data);
    };

    fetchEvents();
  }, []);

  // Handle input change
  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle register
  const handleRegister = async () => {
    if (!selectedEventId) {
      alert("Please select an event");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          rollNo: form.rollNo,
          branch: form.branch,
          eventId: selectedEventId,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Registration successful");

        // Clear form
        setForm({
          name: "",
          email: "",
          phone: "",
          rollNo: "",
          branch: "",
        });

        setSelectedEventId("");
      } else {
        alert(result.error || "Registration failed");
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h1>Samskruti Events</h1>

      {/* Events List */}
      {events.map((event) => (
        <div key={event.id} style={{ border: "1px solid white", margin: "10px", padding: "10px" }}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>Branch: {event.branch}</p>
          <p>Price: ₹{event.price}</p>
          <p>Date: {new Date(event.date).toLocaleDateString()}</p>

          <button
            onClick={() => {
              setSelectedEventId(event.id);
              alert(`Event selected: ${event.title}`);
            }}
          >
            Select Event
          </button>
        </div>
      ))}

      {/* Registration Form */}
      <h2>Register</h2>

      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} /><br />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} /><br />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} /><br />
      <input name="rollNo" placeholder="Roll No" value={form.rollNo} onChange={handleChange} /><br />
      <input name="branch" placeholder="Branch" value={form.branch} onChange={handleChange} /><br />

      <br />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}