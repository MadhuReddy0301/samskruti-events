"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [data, setData] = useState<any[]>([]);

  // Fetch registrations
  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin");
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete registration
  const handleDelete = async (id: string) => {
    try {
      await fetch("/api/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      alert("Deleted successfully");
      fetchData();
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        Admin Dashboard
      </h1>

      {/* 🔥 DASHBOARD STATS */}
      <div
        style={{
          background: "#1e293b",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h2>Total Registrations: {data.length}</h2>
      </div>

      {/* 🔥 REGISTRATION LIST */}
      {data.length === 0 && <p>No registrations yet</p>}

      {data.map((item) => (
        <div
          key={item.id}
          style={{
            background: "#1e1e2f",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "15px",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
          }}
        >
          <h3>{item.name}</h3>
          <p>Email: {item.email}</p>
          <p>Phone: {item.phone}</p>
          <p>Roll No: {item.rollNo}</p>
          <p>Branch: {item.branch}</p>
          <p>Event ID: {item.eventId}</p>

          <button
            onClick={() => handleDelete(item.id)}
            style={{
              marginTop: "10px",
              padding: "8px 12px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}