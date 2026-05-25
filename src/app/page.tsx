"use client";

import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    rollNo: "",
    teamName: "",
    teamInfo: "",
    paymentUrl: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,

          // 🔥 IMPORTANT: add eventId
          eventId: "417e7867-bb86-4387-9dde-3c411042d36c",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registration successful ✅");
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      alert("Something went wrong ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Register</h1>

      <input name="name" placeholder="Name" onChange={handleChange} /><br />
      <input name="email" placeholder="Email" onChange={handleChange} /><br />
      <input name="phone" placeholder="Phone" onChange={handleChange} /><br />
      <input name="rollNo" placeholder="Roll No" onChange={handleChange} /><br />
      <input name="teamName" placeholder="Team Name" onChange={handleChange} /><br />
      <input name="teamInfo" placeholder="Team Info" onChange={handleChange} /><br />
      <input name="paymentUrl" placeholder="Payment URL" onChange={handleChange} /><br />

      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}