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
  videoUrl: string;
};

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/get-events");
        const data = await res.json();

        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error(error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // 🔥 REGISTER FUNCTION
  const handleRegister = async () => {
    const name = prompt("Enter your name");
    const email = prompt("Enter your email");

    if (!name || !email) return;

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          rollNo: "123",
          phone: "9999999999",
          teamName: "Team A",
          teamInfo: "Info",
          paymentUrl: "test",
        }),
      });

      const data = await res.json();
      console.log(data);

      alert("Registered successfully!");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <main style={{ padding: "20px", color: "white" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>
        Samskruti Events
      </h1>

      {loading && <p>Loading events...</p>}

      {!loading && events.length === 0 && (
        <p>No events available</p>
      )}

      <div style={{ marginTop: "20px" }}>
        {(events || []).map((event) => (
          <div
            key={event.id}
            style={{
              border: "1px solid #444",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          >
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p><b>Branch:</b> {event.branch}</p>
            <p><b>Price:</b> ₹{event.price}</p>
            <p><b>Date:</b> {new Date(event.date).toLocaleDateString()}</p>

            {/* 🔥 REGISTER BUTTON */}
            <button
              onClick={handleRegister}
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                backgroundColor: "purple",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Register
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}