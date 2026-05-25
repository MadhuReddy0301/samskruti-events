"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [events, setEvents] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    rollNo: "",
    branch: "",
    eventId: "",
  });

  useEffect(() => {
    fetch("/api/get-events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch(() => console.log("Error loading events"));
  }, []);

  const handleRegister = async () => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration Successful ✅");
      } else {
        alert("Registration Failed ❌");
        console.log(data);
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Samskruti Events</h1>

      {events.map((event) => (
        <div
          key={event.id}
          style={{
            border: "1px solid white",
            margin: "10px 0",
            padding: "10px",
          }}
        >
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>Branch: {event.branch}</p>
          <p>Price: ₹{event.price}</p>
          <p>Date: {new Date(event.date).toLocaleDateString()}</p>

          <button
            onClick={() =>
              setForm((prev) => ({
                ...prev,
                eventId: event.id, // ⭐ VERY IMPORTANT
              }))
            }
          >
            Select Event
          </button>
        </div>
      ))}

      <h2>Register</h2>

      <input
        placeholder="Name"
        onChange={(e) =>
          setForm((prev) => ({ ...prev, name: e.target.value }))
        }
      />
      <br />

      <input
        placeholder="Email"
        onChange={(e) =>
          setForm((prev) => ({ ...prev, email: e.target.value }))
        }
      />
      <br />

      <input
        placeholder="Phone"
        onChange={(e) =>
          setForm((prev) => ({ ...prev, phone: e.target.value }))
        }
      />
      <br />

      <input
        placeholder="Roll No"
        onChange={(e) =>
          setForm((prev) => ({ ...prev, rollNo: e.target.value }))
        }
      />
      <br />

      <input
        placeholder="Branch"
        onChange={(e) =>
          setForm((prev) => ({ ...prev, branch: e.target.value }))
        }
      />
      <br />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}