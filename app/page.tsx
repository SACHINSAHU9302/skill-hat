"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion"; 
import {
  BookOpen,
  Star,
  Clock,
  Users,
  ArrowRight,
  Search,
  Zap,
  Briefcase,
  CheckCircle2,
  Trophy,
  MapPin,
  Target,
  IndianRupee,

} from "lucide-react";
import { FaStar, FaUserGraduate,} from "react-icons/fa";
import CountUp from "@/src/components/CountUp";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_APP_URL

// Background Images Array for Hero Section
const heroImages = [
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2000",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2000",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2000"
];

const stats = [
  { label: "Active internship", value: 150, suffix: "+", icon: BookOpen },
  { label: "Expert Mentors", value: 80, suffix: "+", icon: Users },
  { label: "Success Rate", value: 94, suffix: "%", icon: Star },
  { label: "Hours of Content", value: 5, suffix: "k+", icon: Clock },
];

// ================= INTERNSHIP CARD =================

const InternshipCard = ({ item }: any) => {
  const router = useRouter();

  return (
    <motion.div
      whileHover={{ y: -8 }}
      onClick={() => router.push(`/internship/${item._id}`)}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 group cursor-pointer w-full max-w-[300px] sm:max-w-[340px] mx-auto"
    >
      {/* IMAGE */}
      <div className="relative h-40 sm:h-44 overflow-hidden rounded-t-2xl">
        <img
          src={item.imageUrl || "/placeholder.jpg"}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
          alt={item.title}
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* STATUS */}
        <div className="absolute top-3 right-3 text-xs px-3 py-1 rounded-full bg-blue-600/90 text-white font-semibold backdrop-blur-md">
          {item.status}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 sm:p-5 space-y-3">

        {/* TITLE */}
        <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-blue-600 transition line-clamp-1">
          {item.title}
        </h3>

        {/* COMPANY */}
        <p className="text-xs sm:text-sm text-gray-500">
          {item.company} • {item.location}
        </p>

        {/* STATS WITH ICONS */}
        <div className="flex justify-between text-xs sm:text-sm text-gray-600 pt-2">

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
        <div className="flex justify-between items-center pt-3 border-t">

          <span className="text-base sm:text-lg font-bold text-blue-600">
           <IndianRupee size={16} /> {item.stipend}
          </span>

          <div className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-blue-600">
            <FaUserGraduate  size={14} />
            Enroll
          </div>

        </div>
      </div>
    </motion.div>
  );
};

import {  GraduationCap, FileText } from "lucide-react";

const MentorCard = ({ mentor }: any) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-xl transition flex flex-col h-full w-full max-w-[260px] sm:max-w-[300px] mx-auto"
    >

      {/* IMAGE */}
      <img
        src={mentor.imageUrl || "/placeholder.jpg"}
        className="w-full h-32 sm:h-36 object-cover rounded-xl mb-3"
        alt={mentor.name}
      />

      {/* NAME */}
      <h3 className="font-bold text-gray-900 text-sm sm:text-base">
        {mentor.name}
      </h3>

      {/* EXPERTISE */}
      <p className="text-xs sm:text-sm text-blue-600 font-medium mb-2">
        {mentor.expertise}
      </p>

      {/* 🎓 QUALIFICATION */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 mb-2">
        <GraduationCap size={14} className="text-blue-500" />
        <span className="line-clamp-1">
          {mentor.qualification || "No qualification"}
        </span>
      </div>

      {/* 📝 BIO */}
      <div className="flex items-start gap-2 text-xs sm:text-sm text-gray-500 mb-3">
        <FileText size={14} className="text-gray-400 mt-[2px]" />
        <p className="line-clamp-2">
          {mentor.bio || "No bio available"}
        </p>
      </div>

      {/* 👥 STUDENTS */}
      <div className="flex justify-end items-center text-xs sm:text-sm mt-auto pt-3 border-t">
        <span className="flex items-center gap-1 text-gray-500">
          <Users size={14} />
          {mentor.totalStudents || 0} Students
        </span>
      </div>

    </motion.div>
  );
};
// ================= MAIN =================
export default function Home() {
  const [internships, setInternships] = useState<any[]>([]);
  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [imgIndex, setImgIndex] = useState(0);

  // Auto-change Background Image Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [iRes, mRes] = await Promise.all([
          fetch(`${API}/upload/internships/list/`),
          fetch(`${API}/api/mentors/list/`),
        ]);
        const internshipsData = await iRes.json();
        const mentorsData = await mRes.json();
        setInternships(internshipsData.slice(0, 3));
        setMentors(mentorsData.slice(0, 3));
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-20 pb-20 bg-[#fcfcfc]">

      {/* HERO SECTION WITH AUTO-SLIDER */}
      <section className="relative min-h-[85vh] flex items-center justify-center text-center px-4 overflow-hidden">
        
        {/* Background Slider */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={imgIndex}
              src={heroImages[imgIndex]}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
              alt="Background Slide"
            />
          </AnimatePresence>
          {/* Constant dark gradient overlay for text clarity */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#fcfcfc]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-blue-600/20 backdrop-blur-md border border-blue-400/30 rounded-full text-blue-100 text-sm font-semibold mb-4"
          >
            Launch Your Future Career
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-white leading-tight"
          >
            Accelerate Your <br />
            <span className="text-blue-400">Career Growth</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed"
          >
            Connect with top companies through our curated internships and learn from industry experts to build your professional profile.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-6"
          >
            <Link
              href="/internships"
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold text-lg inline-flex items-center gap-2 transition-all shadow-xl shadow-blue-600/30 group"
            >
              Explore Internships <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <div className="max-w-7xl mx-auto px-4 -mt-32 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 bg-white p-8 md:p-10 rounded-[2rem] border shadow-xl">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <stat.icon className="text-blue-600" size={24} />
              </div>
              <div className="text-3xl font-black text-gray-900">
                <CountUp from={0} to={stat.value} duration={2} />
                {stat.suffix}
              </div>
              <p className="text-gray-500 font-medium text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* INTERNSHIPS SECTION */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-gray-900">Featured Internships</h2>
            <p className="text-gray-500">The most recent opportunities from top-tier companies.</p>
          </div>
          <Link 
            href="/internships" 
            className="text-blue-600 font-bold hover:underline flex items-center gap-1"
          >
            View All Opportunities <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {loading
            ? [1,2,3].map(i => (
                <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-3xl" />
              ))
            : internships.map(i => (
                <InternshipCard key={i._id} item={i} />
              ))}
        </div>
      </section>

     

      {/* ================= NEW ATTRACTIVE SECTIONS START HERE ================= */}

      {/* SUCCESS PATHWAY SECTION */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-black text-gray-900">How It Works</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg font-medium">Your simple 3-step journey to a successful career in tech.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Step 1 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 text-center relative group"
            >
              <div className="w-20 h-20 bg-blue-600 text-white rounded-3xl flex items-center justify-center mx-auto mb-6 transform -rotate-6 group-hover:rotate-0 transition-transform shadow-lg shadow-blue-200">
                <Search size={36} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">1. Discover</h3>
              <p className="text-gray-500 leading-relaxed font-medium">Browse through verified internships and specialized courses that fit your goals.</p>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 text-center relative group"
            >
              <div className="w-20 h-20 bg-purple-600 text-white rounded-3xl flex items-center justify-center mx-auto mb-6 transform rotate-6 group-hover:rotate-0 transition-transform shadow-lg shadow-purple-200">
                <Zap size={36} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">2. Upskill</h3>
              <p className="text-gray-500 leading-relaxed font-medium">Learn from the best mentors and work on real-world projects to build your portfolio.</p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 text-center relative group"
            >
              <div className="w-20 h-20 bg-green-600 text-white rounded-3xl flex items-center justify-center mx-auto mb-6 transform -rotate-3 group-hover:rotate-0 transition-transform shadow-lg shadow-green-200">
                <Briefcase size={36} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">3. Get Hired</h3>
              <p className="text-gray-500 leading-relaxed font-medium">Apply with confidence and secure your position at your dream company.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              Why Students <br/> <span className="text-blue-600">Trust Our Platform</span>
            </h2>
            <div className="space-y-6">
              {[
                { title: "Verified Internships", desc: "Every opportunity is manually checked for quality and authenticity.", icon: CheckCircle2, color: "text-green-500" },
                { title: "Global Certificates", desc: "Earn certificates that are recognized by top tech companies globally.", icon: Trophy, color: "text-yellow-500" },
                { title: "1-on-1 Guidance", desc: "Connect directly with mentors who are currently working in top firms.", icon: Target, color: "text-blue-500" }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start p-4 rounded-2xl hover:bg-white hover:shadow-md transition-all">
                  <item.icon className={`${item.color} shrink-0`} size={28} />
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{item.title}</h4>
                    <p className="text-gray-500 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative group">
  <div className="rounded-[3rem] overflow-hidden shadow-2xl relative">
    
    {/* Image */}
    <img
      src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200"
      alt="Students learning"
      className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
    />

    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

    {/* Content */}
    <div className="absolute bottom-0 p-8 text-white space-y-3">
      <h3 className="text-4xl font-black">94%</h3>
      <p className="text-lg font-semibold text-blue-400">
        Student Success Rate
      </p>
      <p className="text-sm text-gray-200 max-w-xs">
        Join 10,000+ learners building real-world skills and landing top internships.
      </p>
    </div>

  </div>

          </div>
        </div>
      </section>

      {/* TRUSTED PARTNERS (LOGO STRIP) */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <p className="text-center text-gray-400 font-bold uppercase tracking-[0.2em] text-sm mb-12">Trusted by students from</p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
           <h3 className="text-3xl font-black italic">GOOGLE</h3>
           <h3 className="text-3xl font-black italic">MICROSOFT</h3>
           <h3 className="text-3xl font-black italic">AMAZON</h3>
           <h3 className="text-3xl font-black italic">NETFLIX</h3>
           <h3 className="text-3xl font-black italic">ADOBE</h3>
        </div>
      </section>

      {/* ================= NEW ATTRACTIVE SECTIONS END HERE ================= */}

      {/* CALL TO ACTION */}
     <section className="max-w-5xl mx-auto px-4 pb-10">
  <div className="bg-gray-900 text-white py-10 px-6 md:px-10 rounded-2xl text-center relative overflow-hidden">
    
    {/* subtle glow */}
    <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/20 blur-[80px]" />

    <div className="relative z-10 space-y-4">
      
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
        Ready to jumpstart your career?
      </h2>

      <p className="text-gray-400 max-w-md mx-auto text-sm md:text-base font-medium">
        Join our community and get access to exclusive content.
      </p>

      <div className="pt-2">
        <Link
          href="/register"
          className="bg-white text-black hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold text-sm md:text-base transition-transform inline-block hover:scale-105"
        >
          Get Started
        </Link>
      </div>

    </div>
  </div>
</section>
 {/* MENTORS SECTION */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-gray-900">Top Mentors</h2>
            <p className="text-gray-500">Learn directly from experts with real industry experience.</p>
          </div>
          <Link 
            href="/mentors" 
            className="text-blue-600 font-bold hover:underline flex items-center gap-1"
          >
            View All Mentors <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {loading
            ? [1,2,3].map(i => (
                <div key={i} className="h-60 bg-gray-100 animate-pulse rounded-2xl" />
              ))
            : mentors.map(m => (
                <MentorCard key={m._id} mentor={m} />
              ))}
        </div>
      </section>

    </div>
  );
}