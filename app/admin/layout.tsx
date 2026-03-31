"use client";

import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useState } from "react";
import { Sidebar } from "./dashboard/sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Sidebar ko default open rakha hai
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* 🔥 OVERLAY (mobile only) - z-index sidebar se thoda kam */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-50 lg:hidden transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar - iski width w-72 hai */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Main Content Area */}
      <div
        className={`
          flex-1 w-full transition-all duration-300 ease-in-out
          ${open ? "lg:ml-72" : "lg:ml-0"}
        `}
      >
        {/* 🔥 TOGGLE BUTTON - Dashboard ke upar na chade isliye padding check karein */}
        <button
          onClick={() => setOpen(!open)}
          className="
            fixed top-4 left-4 z-[100]
            p-2 bg-white rounded-xl shadow-lg border border-gray-100
            hover:bg-gray-50 transition active:scale-95
          "
        >
          {open ? (
            <HiOutlineX className="w-5 h-5 text-gray-800" />
          ) : (
            <HiOutlineMenu className="w-5 h-5 text-gray-800" />
          )}
        </button>

        {/* CONTENT - Top padding thodi badhayi hai toggle button ke liye */}
        <main className="p-4 md:p-8 pt-20 md:pt-10 min-h-screen overflow-y-auto">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}