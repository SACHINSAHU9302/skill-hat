"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  BookOpen,
  Star,
  Clock,
  Users,
  Award,
  ChevronRight,
} from "lucide-react";
import CountUp from "@/src/components/CountUp";
import { useRouter } from "next/navigation";

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
      className="bg-white rounded-3xl border overflow-hidden shadow-sm hover:shadow-xl transition group cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.imageUrl || "/placeholder.jpg"}
          className="w-full h-full object-cover group-hover:scale-110 transition"
        />

        <div className="absolute top-3 right-3 text-xs px-3 py-1 rounded-full bg-blue-600 text-white">
          {item.status}
        </div>
      </div>

      <div className="p-5 space-y-3">
        <h3 className="font-bold text-gray-900 group-hover:text-blue-600">
          {item.title}
        </h3>

        <p className="text-sm text-gray-500">
          {item.company} • {item.location}
        </p>

        <div className="flex justify-between text-sm text-gray-600">
          <span>{item.duration}</span>
          <span className="text-blue-600 font-semibold">
            {item.stipend}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// ================= MENTOR CARD =================
const MentorCard = ({ mentor }: any) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl p-4 border shadow-sm hover:shadow-lg transition"
    >
      <img
        src={mentor.imageUrl || "/placeholder.jpg"}
        className="w-full h-40 object-cover rounded-xl mb-3"
      />

      <h3 className="font-bold">{mentor.name}</h3>
      <p className="text-sm text-blue-600">{mentor.expertise}</p>

      <div className="flex justify-between text-sm mt-2">
        <span className="text-yellow-500">
          ⭐ {mentor.rating || 0}
        </span>

        <span className="text-gray-500">
          {mentor.totalStudents || 0}
        </span>
      </div>

      <Link
        href={`/mentor/${mentor._id}`}
        className="text-blue-600 text-sm font-semibold mt-2 inline-block"
      >
        View →
      </Link>
    </motion.div>
  );
};

// ================= MAIN =================
export default function Home() {
  const [internships, setInternships] = useState<any[]>([]);
  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH BOTH
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [iRes, mRes] = await Promise.all([
          fetch("https://skillhat-backend.onrender.com/upload/internships/list/"),
          fetch("https://skillhat-backend.onrender.com/api/mentors/list/"),
        ]);

        const internshipsData = await iRes.json();
        const mentorsData = await mRes.json();

        setInternships(internshipsData.slice(0, 3));
        setMentors(mentorsData.slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-20 pb-20">

      {/* HERO */}
      <section className="bg-white pt-20 pb-32 text-center">
        <h1 className="text-5xl font-bold">
          Accelerate Your Career
        </h1>

        <Link
          href="/internships"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl mt-6 inline-block"
        >
          Explore Internship
        </Link>
      </section>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-white p-10 border">
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <stat.icon className="mx-auto text-blue-600 mb-2" />
            <div className="text-2xl font-bold">
              <CountUp from={0} to={stat.value} duration={2} />
              {stat.suffix}
            </div>
            <p className="text-gray-500 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* INTERNSHIPS */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between mb-8">
          <h2 className="text-2xl font-bold">Featured Internships</h2>
          <Link href="/internships">View All →</Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {loading
            ? [1,2,3].map(i => (
                <div key={i} className="h-60 bg-gray-100 animate-pulse rounded-xl" />
              ))
            : internships.map(i => (
                <InternshipCard key={i._id} item={i} />
              ))}
        </div>
      </section>

      {/* MENTORS */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between mb-8">
          <h2 className="text-2xl font-bold">Top Mentors</h2>
          <Link href="/mentors">View All →</Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {loading
            ? [1,2,3].map(i => (
                <div key={i} className="h-60 bg-gray-100 animate-pulse rounded-xl" />
              ))
            : mentors.map(m => (
                <MentorCard key={m._id} mentor={m} />
              ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-black text-white p-12 rounded-3xl text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to start?
          </h2>

          <Link
            href="/register"
            className="bg-white text-black px-6 py-3 rounded-xl"
          >
            Get Started
          </Link>
        </div>
      </section>

    </div>
  );
}