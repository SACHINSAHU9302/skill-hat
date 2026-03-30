"use client";

import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useState } from "react";
import { Sidebar } from "./dashboard/sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true); // 👈 desktop default open

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Main */}
      <div className={`flex-1 w-full transition-all duration-300 ${open ? "md:ml-64" : "md:ml-0"}`}>

        {/* 🔥 TOGGLE BUTTON */}
       <button
  onClick={() => setOpen(!open)}
  className="fixed top-4 left-4 z-50 p-2 bg-white rounded-xl shadow-md hover:bg-gray-100 transition"
>
  {open ? (
    <HiOutlineX className="w-6 h-6 text-gray-800" />
  ) : (
    <HiOutlineMenu className="w-6 h-6 text-gray-800" />
  )}
</button>

        {/* CONTENT */}
        <main className="p-4">
          {children}
        </main>

      </div>
    </div>
  );
}