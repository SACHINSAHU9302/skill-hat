"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Search, Clock, MapPin } from "lucide-react";

export default function InternshipPage() {
  const [internships, setInternships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await fetch(
          "https://skillhat-backend.onrender.com/upload/internships/list/"
        );

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

  // ✅ FILTER
  const filtered = internships.filter((item) =>
    item.title?.toLowerCase().includes(search.toLowerCase()) ||
    item.company?.toLowerCase().includes(search.toLowerCase()) ||
    item.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50/50">

      {/* HERO */}
      <section className="bg-white border-b pt-24 pb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Explore <span className="text-blue-600">Internships</span>
        </h1>

        <p className="text-gray-500 max-w-xl mx-auto mb-10">
          Discover real-world opportunities and kickstart your career 🚀
        </p>

        {/* SEARCH */}
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search internships..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-gray-50 focus:ring-2 focus:ring-blue-500/20 outline-none"
          />
        </div>
      </section>

      {/* GRID */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="h-80 bg-white rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

            {filtered.map((item, i) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition group"
              >

                {/* IMAGE */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={item.imageUrl || "/placeholder.jpg"}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />

                  {/* STATUS */}
                  <div
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === "Active"
                        ? "bg-green-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {item.status}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6 space-y-4">

                  {/* TITLE */}
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600">
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
                  <div className="flex justify-between text-sm text-gray-600 pt-3">

                    <span className="flex items-center">
                      <Clock size={14} className="mr-1 text-blue-600" />
                      {item.duration}
                    </span>

                    <span className="flex items-center">
                      <MapPin size={14} className="mr-1 text-purple-600" />
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
                      className="text-sm font-bold text-gray-900 hover:text-blue-600"
                    >
                      View →
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