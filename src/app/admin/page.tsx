"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [data, setData] = useState<any[]>([]);

  // Fetch registrations
  const fetchData = async () => {
    const res = await fetch("/api/admin");
    const result = await res.json();
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete function
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

      // Refresh list
      fetchData();
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h1>Admin Panel</h1>

      {data.length === 0 && <p>No registrations yet</p>}

      {data.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid white",
            margin: "10px 0",
            padding: "10px",
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
              padding: "5px 10px",
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