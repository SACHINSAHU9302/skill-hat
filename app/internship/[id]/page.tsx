"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { Clock, MapPin, ArrowLeft, Loader2 } from "lucide-react";

export default function InternshipDetail() {


  const params = useParams();
  const internshipId = params?.id as string;

  const [internship, setInternship] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
    if (!internshipId) return;

    const fetchInternship = async () => {
      try {
        console.log("Fetching ID:", internshipId);

        const res = await fetch(
          `https://skillhat-backend.onrender.com/upload/internship/${internshipId}/`,
        );

        const text = await res.text(); // 👈 debug raw response
        console.log("Response:", text);

        if (!res.ok) {
          throw new Error(`Status ${res.status}: ${text}`);
        }

        const data = JSON.parse(text);
        setInternship(data);
      } catch (err) {
        console.error("FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInternship();
  }, [internshipId]);

  // 🌀 Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  // ❌ Not found
  if (!internship) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold">
        Internship not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* HERO */}
      <section className="bg-white border-b pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <Link
            href="/internships"
            className="flex items-center text-sm text-gray-500 hover:text-blue-600 mb-6"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to internships
          </Link>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* LEFT */}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-gray-900">
                {internship.title}
              </h1>

              <p className="text-gray-600 text-lg">{internship.description}</p>

              <div className="space-y-2 text-gray-600">
                <p>
                  <strong>Company:</strong> {internship.company}
                </p>

                <p>
                  <strong>Location:</strong> {internship.location}
                </p>

                <p>
                  <strong>Duration:</strong> {internship.duration}
                </p>

                <p className="text-blue-600 font-semibold text-lg">
                  {internship.stipend}
                </p>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl overflow-hidden shadow-lg"
            >
              <img
                src={internship.imageUrl || "/placeholder.jpg"}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* DETAILS */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        {/* REQUIREMENTS */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border">
          <h2 className="text-2xl font-bold mb-4">Requirements</h2>

          <p className="text-gray-600 whitespace-pre-line">
            {internship.requirements}
          </p>
        </div>
      </section>
    </div>
  );
}
