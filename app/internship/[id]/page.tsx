"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";

const API = process.env.NEXT_PUBLIC_APP_URL;

export default function InternshipDetail() {
  const params = useParams();
  const internshipId = params?.id as string;

  const [internship, setInternship] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  function getYouTubeId(url?: string) {
    if (!url) return ""; // ✅ prevent crash

    const regExp = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/;

    const match = url.match(regExp);
    return match ? match[1] : "";
  }
  // ✅ FETCH DATA
  useEffect(() => {
    if (!internshipId) return;

    const fetchInternship = async () => {
      try {
        const res = await fetch(`${API}/upload/internship/${internshipId}/`);

        if (!res.ok) {
          throw new Error("Failed to fetch internship");
        }

        const data = await res.json();
        setInternship(data);
      } catch (err) {
        console.error("FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInternship();
  }, [internshipId]);

  // 🌀 LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );
  }

  // ❌ NOT FOUND
  if (!internship) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold">
        Internship not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 🔷 HERO SECTION */}
      <section className="bg-white border-b pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* Back */}
          <Link
            href="/internships"
            className="flex items-center text-sm text-gray-500 hover:text-indigo-600 mb-6"
          >
            ← Back to internships
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* LEFT CONTENT */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                {internship.title}
              </h1>

              <p className="text-gray-600 text-lg leading-relaxed">
                {internship.description}
              </p>

              {/* INFO BOX */}
              <div className="bg-gray-50 rounded-2xl p-5 space-y-2 border">
                <p>
                  <strong>Company:</strong> {internship.company}
                </p>
                <p>
                  <strong>Location:</strong> {internship.location}
                </p>
                <p>
                  <strong>Duration:</strong> {internship.duration}
                </p>

                <p className="text-indigo-600 font-bold text-lg">
                  {internship.stipend}
                </p>
              </div>

              {/* CTA */}
              <div className="flex gap-4 pt-2">
                <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition">
                  Enroll Now
                </button>
              </div>
            </div>

            {/* RIGHT MEDIA */}
            <div className="w-full">
              {(() => {
                const videoId = getYouTubeId(internship.youtube);

                return videoId ? (
                  <div className="aspect-video rounded-3xl overflow-hidden shadow-xl">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                    className="rounded-3xl cursor-pointer"
                  />
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* 🔷 DETAILS SECTION */}
      <section className="max-w-6xl mx-auto px-4 py-16 space-y-10">
        {/* REQUIREMENTS */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border">
          <h2 className="text-2xl font-bold mb-4">Requirements</h2>

          <p className="text-gray-600 whitespace-pre-line">
            {internship.requirements}
          </p>
        </div>

        {/* 🔥 MENTORS SECTION */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border">
          <h2 className="text-2xl font-bold mb-6">Mentors</h2>

          {internship.mentors && internship.mentors.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {internship.mentors.map((mentor: any, index: number) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="p-5 border rounded-2xl bg-gray-50 hover:bg-white transition shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-4 mb-3">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-lg">
                      {mentor.name?.charAt(0)}
                    </div>

                    <div>
                      <p className="font-semibold text-gray-800">
                        {mentor.name}
                      </p>
                      <p className="text-xs text-gray-400">Mentor</p>
                    </div>
                  </div>

                  {/* Expertise */}
                  <p className="text-sm text-gray-500">
                    {mentor.expertise || "Expert"}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No mentors assigned</p>
          )}
        </div>

        {/* 🔥 CTA SECTION */}
        <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-3">Why join this internship?</h2>

          <p className="text-white/90 text-sm">
            Gain real-world experience, work with expert mentors, and build
            projects that boost your career 🚀
          </p>
        </div>
      </section>
    </div>
  );
}
