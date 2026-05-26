"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    fetch("/api/get-events")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((e: any) => e.id === id);
        setEvent(found);
      });
  }, [id]);

  if (!event) return <p className="text-white p-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0f172a] to-[#020617] text-white p-6 flex justify-center">

      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10">

        {/* LEFT SIDE IMAGE */}
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <div className="h-[350px] bg-[url('https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee')] bg-cover bg-center"></div>
        </div>

        {/* RIGHT SIDE DETAILS */}
        <div className="flex flex-col justify-center">

          <span className="text-purple-400 mb-2">{event.branch}</span>

          <h1 className="text-4xl font-bold mb-3">
            {event.title}
          </h1>

          <p className="text-gray-400 mb-6">
            {event.description}
          </p>

          {/* DETAILS */}
          <div className="space-y-3 text-gray-300">
            <p>💰 ₹{event.price}</p>
            <p>📅 Sep 09 2026</p>
            <p>👥 Max 3 Participants</p>
          </div>

        </div>

      </div>

      {/* REGISTER FORM */}
      <div className="absolute bottom-10 w-full flex justify-center">

        <div className="bg-slate-800/80 backdrop-blur-lg p-6 rounded-xl shadow-xl w-[350px]">

          <h2 className="text-xl font-semibold mb-4">Register</h2>

          <form className="space-y-3">

            <input placeholder="Name" className="w-full p-2 rounded bg-slate-700 outline-none" />
            <input placeholder="Email" className="w-full p-2 rounded bg-slate-700 outline-none" />
            <input placeholder="Phone" className="w-full p-2 rounded bg-slate-700 outline-none" />
            <input placeholder="Roll No" className="w-full p-2 rounded bg-slate-700 outline-none" />
            <input placeholder="Branch" className="w-full p-2 rounded bg-slate-700 outline-none" />

            <button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 py-2 rounded mt-2">
              Register
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}