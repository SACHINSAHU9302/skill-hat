"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  BookOpen,
  Star,
  Clock,
  ChevronRight,
  Users,
  Award,
} from "lucide-react";
import { Course } from "@/src/types";
import { MOCK_COURSES } from "@/src/mockData";
import CountUp from "@/src/components/CountUp";
import { useRouter } from "next/navigation";



const stats = [
  { label: "Active Courses", value: 150, suffix: "+", icon: BookOpen },
  { label: "Expert Mentors", value: 80, suffix: "+", icon: Users },
  { label: "Success Rate", value: 94, suffix: "%", icon: Star },
  { label: "Hours of Content", value: 5, suffix: "k+", icon: Clock },
];


const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const router = useRouter()

  return (
    <motion.div
      whileHover={{ y: -8 }}
      onClick={() => router.push(`/course/${course._id}`)}
      className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all group cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-blue-600">
          {course.category}
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Meta */}
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock size={16} />
          <span>{course.duration}</span>
          <span>•</span>
          <Star size={16} className="text-amber-400 fill-current" />
          <span className="font-medium text-gray-700">4.9</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>


          <div className="flex items-center space-x-3 pt-2">
            <img
              src={course.mentors[0].avatar}
              className="w-8 h-8 rounded-full border border-gray-100 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/mentor/${course.mentors[0]._id}`);
              }}
            />

            <div className="text-sm">
              <p
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/mentor/${course.mentors[0]._id}`);
                }}
                className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer"
              >
                {course.mentors[0].name}
              </p>
              <p className="text-gray-500 text-xs">{course.mentors[0].role}</p>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-gray-50">
            <div className="text-2xl font-bold text-gray-900">
              ${course.price}
            </div>
            <div className="text-blue-600 font-semibold flex items-center text-sm">
              Learn More <ChevronRight size={16} className="ml-1" />
            </div>
          </div>
        </div>

    </motion.div>
  );
};

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setCourses(MOCK_COURSES);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-8"
            >
              <Award size={18} />
              <span>Industry-Recognized Certifications</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 leading-[1.1] mb-8"
            >
              Accelerate Your <span className="text-blue-600">Career</span> with
              Expert Guidance
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-500 leading-relaxed mb-10 max-w-2xl"
            >
              Master in-demand skills through structured learning paths,
              real-world projects, and direct mentorship from industry leaders.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <Link
                href="/register"
                className="w-full sm:w-auto bg-[#2563EB] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center"
              >
                Explore Courses <ChevronRight className="ml-2" />
              </Link>
              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  <p className="font-bold text-gray-900">10k+ Students</p>
                  <p className="text-gray-500">Joined this month</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-white p-10 rounded-[4px] border border-gray-100 shadow-sm">
        {stats.map((stat, i) => (
          <div key={i} className="text-center space-y-2">
            {/* Icon */}
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-blue-600 mx-auto mb-4">
              <stat.icon size={27} />
            </div>

            {/* Counter */}
            <div className="text-3xl font-bold text-gray-900 flex justify-center items-center">
              <CountUp
                from={0}
                to={stat.value}
                separator=","
                direction="up"
                duration={3}
                className="count-up-text"
              />
              <span className="ml-1">{stat.suffix}</span>
            </div>

            {/* Label */}
            <div className="text-sm text-gray-500 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Featured Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Courses
            </h2>
            <p className="text-gray-500">
              Hand-picked programs to help you reach your goals.
            </p>
          </div>
          <Link
            href="/courses"
            className="hidden md:flex items-center text-blue-600 font-bold hover:translate-x-1 transition-transform"
          >
            View All <ChevronRight size={20} className="ml-1" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[400px] bg-gray-100 rounded-[32px] animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111827] rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full blur-[100px]" />
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500 rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Ready to transform your professional journey?
            </h2>
            <p className="text-gray-400 text-lg">
              Join thousands of professionals already learning on NexusAcademy.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/register"
                className="w-full sm:w-auto bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all"
              >
                Get Started for Free
              </Link>
              <Link
                href="/mentors"
                className="w-full sm:w-auto bg-white/10 text-white border border-white/20 px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all"
              >
                Meet Our Mentors
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
