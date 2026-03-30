"use client";
import { useData } from "@/src/context/DataContext";
import {
  MdWork,
  MdSchool,
  MdPerson,
  MdTrendingUp,
  MdPeople,
  MdAttachMoney,
} from "react-icons/md";
import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { enrollments, getTotalRevenue } = useData();
  const [internships, setInternships] = useState<any[]>([]);
  const [mentors, setMentors] = useState<any[]>([]);

  const activeMentors = mentors.filter((m) => m.status === "Active").length;
  const totalEnrollments = enrollments.filter(
    (e) => e.status === "Active",
  ).length;
  const totalRevenue = getTotalRevenue();

  const fetchInternships = async () => {
    try {
      const res = await fetch(
        "https://skillhat-backend.onrender.com/upload/internships/list/",
      );

      if (!res.ok) {
        throw new Error("Failed to fetch internships");
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Fetch internships error:", error);
      return [];
    }
  };

  useEffect(() => {
    const load = async () => {
      const data = await fetchInternships();
      setInternships(data);
    };

    load();
  }, []);

  const fetchMentors = async () => {
    try {
      const res = await fetch(
        "https://skillhat-backend.onrender.com/api/mentors/list/",
      );

      if (!res.ok) {
        throw new Error("Failed to fetch mentors");
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Fetch mentors error:", error);
      return [];
    }
  };

  useEffect(() => {
    const load = async () => {
      const data = await fetchMentors();
      setMentors(data);
    };

    load();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here's what's happening today.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Popular Interships
            </h2>
            <Link
              href="/admin/internships"
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              View all →
            </Link>
          </div>
          <div className="space-y-4">
            {internships.slice(0, 3).map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                whileHover={{ x: 5 }}
                className="border-l-4 border-green-500 pl-4 py-3 bg-gradient-to-r from-green-50 to-transparent rounded-r-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      By {item.company}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <MdPeople className="w-4 h-4" />
                        {item.enrollmentCount} students
                      </span>
                      <span className="text-xs font-medium text-green-600">
                        {item.price}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.level === "Beginner"
                        ? "bg-green-100 text-green-800"
                        : item.level === "Intermediate"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.level}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Top Mentors</h2>
            <Link
              href="/admin/mentors"
              className="text-purple-600 hover:underline text-sm font-medium"
            >
              View all →
            </Link>
          </div>
          <div className="space-y-4">
            {mentors.slice(0, 3).map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                whileHover={{ x: -5 }}
                className="flex items-center gap-4 p-3 bg-gradient-to-r from-purple-50 to-transparent rounded-lg"
              >
                {/* AVATAR */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg">
                  {item.name?.charAt(0) || "M"}
                </div>

                {/* CONTENT */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>

                  <p className="text-xs text-gray-600">
                    {item.expertise?.split(",")[0] || "Expert"}
                  </p>

                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <MdPeople className="w-3 h-3" />
                      {item.totalStudents || 0} students
                    </span>

                    <span className="text-xs text-yellow-600 flex items-center gap-1">
                    Rating  ★ {item.rating || 0}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-6 bg-white rounded-2xl border border-gray-200 p-6 shadow-lg"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Recent Enrollments
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Student
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Course
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {enrollments.slice(0, 5).map((enrollment, index) => {
                return (
                  <motion.tr
                    key={enrollment.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {enrollment.studentName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {enrollment.studentEmail}
                        </p>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Date(enrollment.enrolledDate).toLocaleDateString(
                        "en-GB",
                      )}{" "}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-2 py-1 text-xs rounded-full font-medium ${
                          enrollment.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : enrollment.status === "Completed"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {enrollment.status}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
