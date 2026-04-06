"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Loader2, 
  MapPin, 
  Clock, 
  IndianRupee, 
  Users, 
  Award, 
  Target, 
  Calendar,
  Briefcase 
} from "lucide-react";

const API = process.env.NEXT_PUBLIC_APP_URL;

export default function InternshipDetail() {
  const params = useParams();
  const internshipId = params?.id as string;

  const [internship, setInternship] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fallback banner agar imageUrl na ho
  const FALLBACK_BANNER = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1920";

  function getYouTubeId(url?: string) {
    if (!url) return "";
    const regExp = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/;
    const match = url.match(regExp);
    return match ? match[1] : "";
  }

  useEffect(() => {
    if (!internshipId) {
      setLoading(false);
      return;
    }

    const fetchInternship = async () => {
      try {
        const res = await fetch(`${API}/upload/internship/${internshipId}/`);
        if (!res.ok) throw new Error("Failed to fetch");
        
        const data = await res.json();
        setInternship(data);
      } catch (err) {
        console.error("API Error:", err);
        // Optional: You can set demo data here if needed
      } finally {
        setLoading(false);
      }
    };

    fetchInternship();
  }, [internshipId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-indigo-600" size={48} />
      </div>
    );
  }

  if (!internship) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold text-gray-500">
        Internship not found
      </div>
    );
  }

  const videoId = getYouTubeId(internship.youtube);
  
  // Use imageUrl from API, fallback to unsplash if not available
  const bannerImage = internship.imageUrl || FALLBACK_BANNER;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section - Using API imageUrl as Cover */}
      <section className="relative min-h-[600px] flex items-center text-white pt-24 pb-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <Image
            src={bannerImage}
            alt={`${internship.title} Banner`}
            fill
            priority
            className="object-cover object-center"
            quality={90}
          />
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/85 to-transparent" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
          <Link
            href="/internships"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-10 transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Internships</span>
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-indigo-600/40 border border-indigo-400/30 text-white text-sm px-4 py-1.5 rounded-full mb-6 backdrop-blur-md">
                <Briefcase size={18} />
                <span className="font-medium">Hiring Now</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tighter">
                {internship.title}
              </h1>
              <p className="text-2xl text-indigo-100 font-medium">{internship.company}</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: <MapPin size={24} />, label: "LOCATION", value: internship.location },
                  { icon: <Clock size={24} />, label: "DURATION", value: internship.duration },
                  { icon: <IndianRupee size={24} />, label: "STIPEND", value: `₹${internship.stipend}` },
                ].map((item, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                    <div className="text-indigo-300 mb-3">{item.icon}</div>
                    <p className="text-white/60 text-xs font-bold uppercase tracking-widest">{item.label}</p>
                    <p className="font-semibold text-xl mt-1 text-white">{item.value}</p>
                  </div>
                ))}
              </div>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-lg rounded-2xl shadow-lg flex items-center gap-3 transition-all"
              >
                <Target size={22} />
                Apply Now
              </motion.button>
            </div>

            {/* Video Section */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20"
            >
              {videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                  className="w-full aspect-video"
                  allowFullScreen
                />
              ) : (
                <div className="aspect-video bg-slate-800 flex items-center justify-center">
                  <p className="text-white/60">Video preview coming soon</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Left Side */}
          <div className="lg:col-span-7 space-y-8">
            {/* About the Internship */}
            <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-indigo-100 rounded-2xl">
                  <Award className="text-indigo-600" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">About the Internship</h2>
              </div>
              <div className="text-gray-600 text-[17px] leading-relaxed whitespace-pre-line">
                {internship.description || "5-month Full Stack Developer Internship program."}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-indigo-100 rounded-2xl">
                  <Target className="text-indigo-600" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Requirements</h2>
              </div>
              <div className="text-gray-600 text-[17px] leading-relaxed whitespace-pre-line">
                {internship.requirements || 
                  `• HTML, CSS & JavaScript (ES6+)\n• Basic knowledge of React.js\n• Understanding of Git & GitHub\n• Problem-solving skills\n• Team work & communication\n• Minimum 15 hours/week commitment\n• Laptop with stable internet`}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-5 space-y-8">
            {/* Mentors */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <Users className="text-indigo-600" size={32} />
                <h2 className="text-3xl font-bold text-gray-900">Mentors</h2>
              </div>
              <div className="space-y-6">
                {internship.mentors && internship.mentors.length > 0 ? (
                  internship.mentors.map((mentor: any, index: number) => (
                    <div
                      key={index}
                      className="flex gap-4 p-5 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-2xl shadow-inner">
                        {mentor.name?.[0] || "S"}
                      </div>
                      <div>
                        <p className="font-semibold text-xl text-gray-900">{mentor.name}</p>
                        <p className="text-indigo-600 font-medium">{mentor.expertise}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No mentors listed yet.</p>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white rounded-3xl p-10 shadow-2xl">
              <Calendar size={48} className="mb-6 opacity-90" />
              <h3 className="text-3xl font-bold mb-4">Launch Your Career</h3>
              <p className="text-white/80 mb-8 leading-relaxed">
                Apply today and get a chance to work with industry leaders.
              </p>
              <button className="w-full py-4 bg-white text-indigo-700 font-bold text-lg rounded-2xl hover:bg-indigo-50 transition-all">
                Join Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      
    </div>
  );
}