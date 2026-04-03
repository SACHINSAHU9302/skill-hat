"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Clock, MapPin } from "lucide-react";

const API = process.env.NEXT_PUBLIC_APP_URL;

export default function InternshipPage() {
  const [internships, setInternships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // FETCH
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await fetch(`${API}/upload/internships/list/`);
        const data = await res.json();
        setInternships(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  // FILTER
  const filtered = internships.filter((item) =>
    item.title?.toLowerCase().includes(search.toLowerCase()) ||
    item.company?.toLowerCase().includes(search.toLowerCase()) ||
    item.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50/50">

      {/* HEADER */}
      <section className="bg-white border-b pt-24 pb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Explore <span className="text-blue-600">Internships</span>
        </h1>

        <p className="text-gray-500 max-w-xl mx-auto mb-10">
          Discover real-world opportunities and kickstart your career
        </p>

        {/* GRID */}
        {loading ? (
          <div className="grid md:grid-cols-3 gap-8 px-4">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="h-80 bg-white rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 px-4 sm:px-6">
            {filtered.map((item, i) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -8 }}
className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 group w-full max-w-[360px] mx-auto"              >

                {/* IMAGE */}
                <div className="relative h-52 overflow-hidden"> 
                  <img
                    src={item.imageUrl || "/placeholder.jpg"}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* STATUS */}
                  <div
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${
                      item.status === "Active"
                        ? "bg-green-500/90 text-white"
                        : "bg-gray-500/90 text-white"
                    }`}
                  >
                    {item.status}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6 space-y-4">

                  {/* TITLE */}
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">
                    {item.title}
                  </h3>

                  {/* COMPANY */}
                  <p className="text-sm text-gray-500">
                    {item.company} • {item.location}
                  </p>

                  {/* DESCRIPTION */}
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {item.description}
                  </p>

                  {/* STATS */}
                  <div className="flex justify-between text-sm text-gray-600 pt-2">

                    <span className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-lg">
                      <Clock size={14} className="text-blue-600" />
                      {item.duration}
                    </span>

                    <span className="flex items-center gap-1 bg-purple-50 px-2 py-1 rounded-lg">
                      <MapPin size={14} className="text-purple-600" />
                      {item.location}
                    </span>

                  </div>

                  {/* FOOTER */}
                  <div className="flex justify-between items-center pt-4 border-t">

                    <span className="text-xl font-bold text-blue-600">
                      {item.stipend}
                    </span>

                    <Link
                      href={`/internship/${item._id}`}
                      className="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-blue-600 transition"
                    >
                      View Details
                    </Link>

                  </div>

                </div>
              </motion.div>
            ))}

          </div>
        )}

        {/* EMPTY */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No internships found
          </div>
        )}

      </section>
    </div>
  );
}