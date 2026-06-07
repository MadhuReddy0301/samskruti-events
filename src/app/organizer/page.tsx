"use client"

import { useEffect, useState } from "react"

export default function OrganizerPage() {
  const [events, setEvents] = useState<any[]>([])

  const [form, setForm] = useState<any>({
    title: "",
    description: "",
    branch: "",
    price: "",
    date: "",
    maxParticipants: "",
    videoUrl: "",
    poster: null,
  })

  // FETCH EVENTS
  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(Array.isArray(data) ? data : [])
      })
  }, [])

  // HANDLE INPUT
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // HANDLE FILE
  const handleFile = (e: any) => {
    setForm({ ...form, poster: e.target.files[0] })
  }

  // SUBMIT
  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const formData = new FormData()

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key])
    })

    const res = await fetch("/api/events", {
      method: "POST",
      body: formData,
    })

    const newEvent = await res.json()

    setEvents((prev) => [newEvent, ...prev])
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-3xl font-bold mb-6">Organizer Dashboard</h1>

      <div className="flex gap-10">

        {/* FORM */}
        <form onSubmit={handleSubmit} className="w-1/3 space-y-3">

          <input name="title" placeholder="Title" onChange={handleChange} className="input" />
          <input name="description" placeholder="Description" onChange={handleChange} className="input" />
          <input name="branch" placeholder="Branch" onChange={handleChange} className="input" />
          <input name="price" placeholder="Price" onChange={handleChange} className="input" />
          <input type="date" name="date" onChange={handleChange} className="input" />
          <input name="maxParticipants" placeholder="Max Participants" onChange={handleChange} className="input" />
          <input name="videoUrl" placeholder="Video URL" onChange={handleChange} className="input" />

          {/* FILE INPUT */}
          <input type="file" accept="image/*" onChange={handleFile} className="input" />

          <button className="bg-purple-600 px-4 py-2 rounded w-full">
            Create Event
          </button>

        </form>

        {/* EVENTS */}
        <div className="grid grid-cols-2 gap-6 w-2/3">

          {events.map((event) => (
            <div key={event.id} className="bg-white/10 rounded-lg overflow-hidden">

              <img
                src={event.posterUrl || "https://picsum.photos/300"}
                className="h-32 w-full object-cover"
              />

              <div className="p-3">
                <h2>{event.title}</h2>
                <p className="text-sm text-gray-400">{event.description}</p>
              </div>

            </div>
          ))}

        </div>

      </div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 8px;
          border-radius: 8px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
        }
      `}</style>

    </div>
  )
}