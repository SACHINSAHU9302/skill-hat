"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Star,
  Users,
  Award,
  Mail,
  Calendar,
  ArrowLeft,
  Loader2,
} from "lucide-react";

export default function MentorProfile() {
  const params = useParams();
  const router = useRouter();

  const mentorId = params?.id as string;

  const [mentor, setMentor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
    if (!mentorId) return;

    const fetchMentor = async () => {
      try {
        const res = await fetch(
          `https://skillhat-backend.onrender.com/api/get_mentor/${mentorId}/`
        );

        if (!res.ok) throw new Error("Failed to fetch mentor");

        const data = await res.json();
        setMentor(data);
      } catch (err) {
        console.error("FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMentor();
  }, [mentorId]);

  // 🌀 LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  // ❌ NOT FOUND
  if (!mentor) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold">
        Mentor not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">

      {/* HEADER */}
      <section className="bg-white border-b pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">

          <Link
            href="/mentors"
            className="flex items-center text-sm text-gray-500 hover:text-blue-600 mb-10"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Mentors
          </Link>

          <div className="grid md:grid-cols-2 gap-10 items-center">

            {/* LEFT */}
            <div className="space-y-6">

              <h1 className="text-4xl font-bold text-gray-900">
                {mentor.name}
              </h1>

              <p className="text-blue-600 font-semibold">
                {mentor.expertise}
              </p>

              <p className="text-gray-600">
                {mentor.bio || "No bio available"}
              </p>

              {/* STATS */}
              <div className="flex gap-6 text-sm">

                <div className="flex items-center gap-1">
                  <Star className="text-yellow-500" />
                  {mentor.rating || 0}
                </div>

                <div className="flex items-center gap-1">
                  <Users className="text-blue-600" />
                  {mentor.totalStudents || 0} Students
                </div>

              </div>

            </div>

            {/* RIGHT IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl overflow-hidden shadow-lg"
            >
              <img
                src={mentor.imageUrl || "/placeholder.jpg"}
                className="w-full h-full object-cover"
              />
            </motion.div>

          </div>

        </div>
      </section>

      {/* DETAILS */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-10">

        {/* LEFT */}
        <div className="md:col-span-2 space-y-8">

          {/* ABOUT */}
          <div className="bg-white rounded-3xl p-8 border shadow-sm">
            <h2 className="text-xl font-bold mb-4">
              About Mentor
            </h2>

            <p className="text-gray-600 whitespace-pre-line">
              {mentor.bio}
            </p>
          </div>

          {/* EXPERTISE */}
          <div className="bg-white rounded-3xl p-8 border shadow-sm">
            <h2 className="text-xl font-bold mb-4">
              Expertise
            </h2>

            <div className="flex flex-wrap gap-2">
              {mentor.expertise?.split(",").map((skill: string, i: number) => (
                <span
                  key={i}
                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">

          {/* CONTACT */}
          <div className="bg-gray-900 text-white p-6 rounded-3xl space-y-4">

            <h3 className="font-bold text-lg">Contact</h3>

            <div className="flex items-center gap-3">
              <Mail size={18} />
              <span>{mentor.email}</span>
            </div>

            <div className="flex items-center gap-3">
              <Calendar size={18} />
              <span>Available Mon-Fri</span>
            </div>

            <button className="w-full bg-white text-black py-3 rounded-xl font-semibold">
              Message Mentor
            </button>

          </div>

          {/* STATS */}
          <div className="bg-white p-6 rounded-3xl border space-y-3">
            <h3 className="font-bold text-lg">Stats</h3>

            <div className="flex justify-between">
              <span className="text-gray-500">Rating</span>
              <span className="font-bold">{mentor.rating || 0}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Students</span>
              <span className="font-bold">
                {mentor.totalStudents || 0}
              </span>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}