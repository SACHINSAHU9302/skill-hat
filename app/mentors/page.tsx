"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Search,
  ChevronRight,
  Star,
  Users,
} from "lucide-react";

export default function Mentors() {
  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await fetch(
          "https://skillhat-backend.onrender.com/api/mentors/list/"
        );

        if (!res.ok) throw new Error("Failed to fetch mentors");

        const data = await res.json();
        setMentors(data);
      } catch (err) {
        console.error("FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  // ✅ SEARCH FILTER
  const filteredMentors = mentors.filter((mentor) =>
    mentor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.expertise?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.bio?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50/50">

      {/* HERO */}
      <section className="bg-white border-b border-gray-100 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 text-center">

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Learn from the <span className="text-blue-600">Best</span>
          </motion.h1>

          <p className="text-gray-500 mb-10 max-w-xl mx-auto">
            Connect with top mentors and grow faster 🚀
          </p>

          {/* SEARCH */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search mentors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border rounded-2xl pl-12 py-4 outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

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

            {filteredMentors.map((mentor, i) => (
              <motion.div
                key={mentor._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl transition group border"
              >

                {/* IMAGE */}
                <div className="relative h-48 overflow-hidden">

                  <img
                    src={mentor.imageUrl || "/placeholder.jpg"}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />

                  {/* STATUS */}
                  <div
                    className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-semibold ${
                      mentor.status === "Active"
                        ? "bg-green-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {mentor.status}
                  </div>

                </div>

                {/* CONTENT */}
                <div className="p-5 space-y-3">

                  {/* NAME */}
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600">
                    {mentor.name}
                  </h3>

                  {/* EMAIL */}
                  <p className="text-sm text-gray-500">
                    {mentor.email}
                  </p>

                  {/* BIO */}
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {mentor.bio}
                  </p>

                  {/* EXPERTISE */}
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise?.split(",").map((skill: string, index: number) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* STATS */}
                  <div className="flex justify-between items-center pt-2 text-sm">

                    {/* ⭐ Rating */}
                    <div className="flex items-center gap-1 text-yellow-500 font-semibold">
                      <Star size={16} />
                      {mentor.rating || 0}
                    </div>

                    {/* 👥 Students */}
                    <div className="flex items-center gap-1 text-gray-600">
                      <Users size={16} />
                      {mentor.totalStudents || 0}
                    </div>

                  </div>

                  {/* FOOTER */}
                  <div className="flex justify-between items-center pt-4 border-t">

                    <Link
                      href={`/mentor/${mentor._id}`}
                      className="text-sm font-semibold text-gray-900 hover:text-blue-600 flex items-center"
                    >
                      View Profile
                      <ChevronRight className="ml-1 text-blue-600" size={16} />
                    </Link>

                  </div>

                </div>
              </motion.div>
            ))}

          </div>
        )}

        {/* EMPTY */}
        {!loading && filteredMentors.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No mentors found
          </div>
        )}

      </section>
    </div>
  );
}