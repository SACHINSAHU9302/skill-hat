"use client";
import { useData } from "@/src/context/DataContext";
import { MdWork, MdSchool, MdPerson, MdPeople, MdAttachMoney, MdTrendingUp, } from "react-icons/md";
import { FaUsers, FaRupeeSign } from "react-icons/fa";
import { TrendingUp } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export default function Dashboard() {
  const { internships, courses, mentors, enrollments, getTotalRevenue } = useData();

  const activeInternships = internships.filter((i) => i.status === "Active").length;
  const activeCourses = courses.filter((c) => c.status === "Active").length;
  const activeMentors = mentors.filter((m) => m.status === "Active").length;
  const totalEnrollments = enrollments.filter((e) => e.status === "Active").length;
  const totalRevenue = getTotalRevenue();

  const stats = [
    {
      title: "Total Internships",
      value: internships.length,
      active: `${activeInternships} active`,
      icon: MdWork,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
      link: "/internships",
    },
    {
      title: "Total Courses",
      value: courses.length,
      active: `${activeCourses} active`,
      icon: MdSchool,
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-green-100",
      link: "/courses",
    },
    {
      title: "Total Mentors",
      value: mentors.length,
      active: `${activeMentors} active`,
      icon: MdPerson,
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100",
      link: "/mentors",
    },
    {
      title: "Active Enrollments",
      value: totalEnrollments,
      active: `${enrollments.length} total`,
      icon: MdPeople,
      gradient: "from-orange-500 to-orange-600",
      bgGradient: "from-orange-50 to-orange-100",
      link: "/courses",
    },
    {
      title: "Total Revenue",
      value: `₹${(totalRevenue / 1000).toFixed(1)}K`,
      active: "+12% this month",
      icon: MdAttachMoney,
      gradient: "from-pink-500 to-pink-600",
      bgGradient: "from-pink-50 to-pink-100",
      link: "#",
    },
    {
      title: "Growth Rate",
      value: "+24%",
      active: "vs last month",
      icon: MdTrendingUp,
      gradient: "from-teal-500 to-teal-600",
      bgGradient: "from-teal-50 to-teal-100",
      link: "#",
    },
  ];

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
    <div className="px-4 pt-4 pb-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">

      <motion.div

        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening today.</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 mb-8"
      >        {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div key={index} variants={itemVariants} whileHover={{ scale: 1.05, y: -5 }}>
            <Link
              href={stat.link}
              className="block bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 hover:shadow-xl hover:scale-[1.02] transition-all duration-300" >               <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} shadow-md`}
                >
                  <Icon className="text-white w-6 h-6" />
                </div>

              </div>
              <h3 className="text-gray-500 text-sm mb-2">{stat.title}</h3>
              <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">                  {stat.value}
              </p>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${stat.gradient}`}></div>
                <p className="text-sm text-gray-600">{stat.active}</p>
              </div>
            </Link>
          </motion.div>
        );
      })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Popular Courses</h2>
            <Link href="/courses" className="text-blue-600 hover:underline text-sm font-medium">
              View all →
            </Link>
          </div>
          <div className="space-y-4">
            {courses.slice(0, 3).map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                whileHover={{ x: 5 }}
                className="border-l-4 border-green-500 pl-4 py-3 bg-gradient-to-r from-green-50 to-transparent rounded-r-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{course.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">By {course.instructor}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <MdPeople className="w-4 h-4" />
                        {course.enrollmentCount} students
                      </span>
                      <span className="text-xs font-medium text-green-600">{course.price}</span>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${course.level === "Beginner"
                    ? "bg-green-100 text-green-800"
                    : course.level === "Intermediate"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                    }`}>
                    {course.level}
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
            <Link href="/mentors" className="text-purple-600 hover:underline text-sm font-medium">
              View all →
            </Link>
          </div>
          <div className="space-y-4">
            {mentors.slice(0, 3).map((mentor, index) => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                whileHover={{ x: -5 }}
                className="flex items-center gap-4 p-3 bg-gradient-to-r from-purple-50 to-transparent rounded-lg"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg">
                  {mentor.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
                  <p className="text-xs text-gray-600">{mentor.expertise.split(",")[0]}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <MdPeople className="w-3 h-3" />
                      {mentor.totalStudents} students
                    </span>
                    <span className="text-xs text-yellow-600 flex items-center gap-1">
                      ★ {mentor.rating}
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
          <h2 className="text-2xl font-bold text-gray-900">Recent Enrollments</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {enrollments.slice(0, 5).map((enrollment, index) => {
                const course = courses.find((c) => c.id === enrollment.courseId);
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
                        <p className="text-sm font-medium text-gray-900">{enrollment.studentName}</p>
                        <p className="text-xs text-gray-500">{enrollment.studentEmail}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{course?.title}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Date(enrollment.enrolledDate).toLocaleDateString("en-GB")}                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-2 py-1 text-xs rounded-full font-medium ${enrollment.status === "Active"
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
