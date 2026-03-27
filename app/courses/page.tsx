"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Search, Clock, Users, Tag } from "lucide-react";
import { Course } from "@/src/types";
import { MOCK_COURSES } from "@/src/mockData";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const timer = setTimeout(() => {
      setCourses(MOCK_COURSES);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const categories = ["All", ...new Set(courses.map(c => c.category))];

  const filtered = courses.filter(course =>
    (category === "All" || course.category === category) &&
    (course.title.toLowerCase().includes(search.toLowerCase()) ||
     course.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50/50">

      {/* HERO */}
      <section className="bg-white border-b pt-24 pb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Explore <span className="text-blue-600">Courses</span>
        </h1>

        <p className="text-gray-500 max-w-xl mx-auto mb-10">
          Learn industry-level skills with curated professional courses
        </p>

        {/* SEARCH */}
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-gray-50 focus:ring-2 focus:ring-blue-500/20 outline-none"
          />
        </div>

        {/* CATEGORY FILTER */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                category === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* COURSES GRID */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="h-80 bg-white rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filtered.map((course, i) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition group"
              >

                {/* Thumbnail */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold">
                    {course.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">

                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">
                    {course.title}
                  </h3>

                  <p className="text-sm text-gray-500 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Mentors Preview */}
                  <div className="flex items-center space-x-2">
                    {course.mentors.slice(0, 3).map((m, i) => (
                      <img
                        key={i}
                        src={m.avatar}
                        className="w-8 h-8 rounded-full border-2 border-white"
                      />
                    ))}
                    <span className="text-xs text-gray-500">
                      +{course.mentors.length} mentors
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between text-sm text-gray-600 pt-3">
                    <span className="flex items-center">
                      <Clock size={14} className="mr-1 text-blue-600" />
                      {course.duration}
                    </span>

                    <span className="flex items-center">
                      <Users size={14} className="mr-1 text-purple-600" />
                      {course.mentors.length} Experts
                    </span>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-xl font-bold text-blue-600">
                      ₹{course.price}
                    </span>

                    <Link
                      href={`/course/${course._id}`}
                      className="text-sm font-bold text-gray-900 hover:text-blue-600 transition"
                    >
                      View →
                    </Link>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No courses found
          </div>
        )}
      </section>
    </div>
  );
}