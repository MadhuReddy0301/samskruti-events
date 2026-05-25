"use client";

import { useState } from "react";

export default function CreateEvent() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);

    const file = formData.get("file") as File;

    // 🔥 upload image
    const uploadForm = new FormData();
    uploadForm.append("file", file);

    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      body: uploadForm,
    });

    const uploadData = await uploadRes.json();
    const posterUrl = uploadData.secure_url;

    // 🔥 send event data
    await fetch("/api/create-event", {
      method: "POST",
      body: JSON.stringify({
        title: formData.get("title"),
        description: formData.get("description"),
        branch: formData.get("branch"),
        price: Number(formData.get("price")),
        date: formData.get("date"),
        maxParticipants: Number(formData.get("maxParticipants")),
        posterUrl,
      }),
    });

    alert("Event created!");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">

      <form
        action={handleSubmit}
        className="bg-white/5 p-6 rounded-2xl space-y-4 w-[400px]"
      >
        <h1 className="text-2xl font-bold">Create Event</h1>

        <input name="title" placeholder="Title" className="input" required />
        <input name="description" placeholder="Description" className="input" required />
        <input name="branch" placeholder="Branch (CSE/ECE)" className="input" required />
        <input name="price" type="number" placeholder="Price" className="input" required />
        <input name="date" type="date" className="input" required />
        <input name="maxParticipants" type="number" placeholder="Max Participants" className="input" required />

        {/* 🔥 IMAGE UPLOAD */}
        <input name="videoUrl" placeholder="Enter Video URL (YouTube/Drive)" className="input" />
        <input type="file" name="file" className="input" required />

        <button
          disabled={loading}
          className="w-full bg-purple-600 p-2 rounded"
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}