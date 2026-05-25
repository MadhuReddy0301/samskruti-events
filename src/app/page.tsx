"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");

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
    if (!selectedEventId) {
      alert("Please select an event first");
      return;
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        eventId: selectedEventId,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registration successful");
    } else {
      alert("Registration failed");
      console.log(data);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Samskruti Events</h1>

      {events.map((event: any) => (
        <div key={event.id} style={{ border: "1px solid white", margin: "10px", padding: "10px" }}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>Branch: {event.branch}</p>
          <p>Price: ₹{event.price}</p>
          <p>Date: {new Date(event.date).toLocaleDateString()}</p>

          <button
            onClick={() => {
              setSelectedEventId(event.id);
              alert("Event selected: " + event.title);
            }}
          >
            Select Event
          </button>
        </div>
      ))}

      <h2>Register</h2>

      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} /><br />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} /><br />
      <input placeholder="Phone" onChange={(e) => setForm({ ...form, phone: e.target.value })} /><br />
      <input placeholder="Roll No" onChange={(e) => setForm({ ...form, rollNo: e.target.value })} /><br />
      <input placeholder="Branch" onChange={(e) => setForm({ ...form, branch: e.target.value })} /><br />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}