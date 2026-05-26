"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/admin");
      const result = await res.json();
      setData(result);
    };

    fetchData();
  }, []);

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
        </div>
      ))}
    </div>
  );
}