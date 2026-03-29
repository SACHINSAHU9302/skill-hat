"use client";

import { useEffect, useState } from "react";
import { MdAdd, MdEdit, MdDelete, MdStar } from "react-icons/md";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { motion } from "motion/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/ui/alert-dialog";

export default function Mentors() {
  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // ✅ FETCH FROM BACKEND
  const fetchMentors = async () => {
    try {
      const res = await fetch("https://skillhat-backend.onrender.com/api/mentors/list/", {
        method: "GET",
      });
      const data = await res.json();
      setMentors(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  // ✅ DELETE FROM BACKEND
  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await fetch(`https://skillhat-backend.onrender.com/api/delete_mentor/${deleteId}/`, {
        method: "DELETE",
      });

      // 🔥 update UI instantly
      setMentors((prev) => prev.filter((m) => m._id !== deleteId));

      setDeleteId(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mentors</h1>
          <p className="text-gray-600 mt-2">Manage all mentor profiles</p>
        </div>

        <Link href="/admin/mentors/add">
          <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <MdAdd className="w-5 h-5" />
            Add Mentor
          </Button>
        </Link>
      </motion.div>

      {/* LOADING */}
      {loading ? (
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-60 bg-gray-100 animate-pulse rounded-xl"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor, index) => (
            <motion.div
              key={mentor._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl transition group border"
            >
              {/* IMAGE (LIKE INTERNSHIP CARD) */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={mentor.imageUrl || "/placeholder.jpg"}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                {/* STATUS BADGE */}
                <div
                  className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-semibold shadow ${
                    mentor.status === "Active"
                      ? "bg-green-500 text-white"
                      : "bg-gray-500 text-white"
                  }`}
                >
                  {mentor.status}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5 space-y-3">
                {/* NAME */}
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600">
                  {mentor.name}
                </h2>

                {/* EMAIL */}
                <p className="text-sm text-gray-500">{mentor.email}</p>

                {/* BIO */}
                <p className="text-sm text-gray-600 line-clamp-2">
                  {mentor.bio}
                </p>

                {/* EXPERTISE */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {mentor.expertise
                    ?.split(",")
                    .map((skill: string, i: number) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                </div>

                {/* STATS */}
                <div className="flex justify-between items-center pt-2 text-sm">
                  {/* ⭐ Rating */}
                  <div className="flex items-center gap-1 text-yellow-500 font-semibold">
                    <MdStar />
                    {mentor.rating || 0}
                  </div>

                  {/* 👥 Students */}
                  <div className="text-gray-600">
                    {mentor.totalStudents || 0} students
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="pt-4 border-t flex flex-col gap-2">
                  {/* EDIT */}
                  <Link href={`/admin/mentors/edit/${mentor._id}`}>
                    <Button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                      <MdEdit />
                      Edit Mentor
                    </Button>
                  </Link>

                  {/* DELETE */}
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:bg-red-50 border-none"
                      onClick={() => setDeleteId(mentor._id)}
                    >
                      <MdDelete />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* DELETE DIALOG */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Mentor?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
