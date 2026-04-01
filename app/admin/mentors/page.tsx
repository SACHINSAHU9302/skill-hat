"use client";

import { useEffect, useState } from "react";
import { MdAdd, MdEdit, MdDelete, MdOutlineArrowForward, MdStar, MdEmail } from "react-icons/md";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/ui/alert-dialog";

const API = process.env.NEXT_PUBLIC_APP_URL

export default function Mentors() {
  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchMentors = async () => {
    try {
      const res = await fetch(`${API}/api/mentors/list/`, {
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

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await fetch(`${API}/api/delete_mentor/${deleteId}/`, {
        method: "DELETE",
      });
      setMentors((prev) => prev.filter((m) => m._id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center px-6 py-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            Mentors 
            <span className="text-xs text-gray-400 ml-3 font-normal uppercase tracking-[0.2em]">
              Admin Panel
            </span>
          </h1>
        </div>
        <Link href="/admin/mentors/add">
          <button className="group relative flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-[20px] font-black text-[11px] tracking-widest overflow-hidden transition-all hover:bg-indigo-700 active:scale-95 shadow-2xl shadow-indigo-100 uppercase">
            <MdAdd className="text-xl transition-transform duration-300 group-hover:rotate-90" />
            <span className="relative z-10">Add New Mentor</span>
            <MdOutlineArrowForward className="absolute right-1 opacity-0 group-hover:opacity-100 transition-all duration-300 text-lg translate-x-4 group-hover:translate-x-0" />
          </button>
        </Link>
      </div>

      <div className="p-4 md:p-6 max-w-[1700px] mx-auto">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-72 bg-gray-50 rounded-2xl animate-pulse border border-gray-100" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
            <AnimatePresence mode="popLayout">
              {mentors.map((mentor, index) => (
                <motion.div
                  key={mentor._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50/30 transition-all group h-full"
                >
                  {/* IMAGE SECTION - Increased to h-32 */}
                  <div className="relative h-32 w-full overflow-hidden bg-gray-50 border-b border-gray-50">
                    <img
                      src={mentor.imageUrl || "/placeholder.jpg"}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      alt={mentor.name}
                    />
                    <div className={`absolute top-2.5 right-2.5 text-[8px] px-2 py-0.5 rounded-full font-bold uppercase shadow-sm backdrop-blur-sm ${
                      mentor.status === "Active" ? "bg-green-500/90 text-white" : "bg-gray-500/90 text-white"
                    }`}>
                      {mentor.status}
                    </div>
                  </div>

                  {/* CONTENT AREA - Slightly more breathable */}
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <h2 className="text-[14px] font-bold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors capitalize leading-tight">
                        {mentor.name}
                      </h2>
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-400 mt-1 truncate font-medium">
                        <MdEmail className="text-indigo-500 shrink-0 text-[12px]" /> 
                        <span className="truncate">{mentor.email}</span>
                      </div>
                      
                      <p className="text-[11px] text-gray-500 line-clamp-2 mt-2 leading-snug italic opacity-80">
                        "{mentor.bio}"
                      </p>
                      
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {mentor.expertise?.split(",").slice(0, 2).map((skill: string, i: number) => (
                          <span key={i} className="text-[9px] px-2.5 py-0.5 bg-indigo-50 text-indigo-600 rounded-lg font-semibold border border-indigo-100/50">
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* FOOTER */}
                    <div className="mt-4 pt-2.5 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Link href={`/admin/mentors/edit/${mentor._id}`}>
                          <button className="p-1.5 rounded-lg bg-gray-50 text-gray-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all">
                            <MdEdit className="w-4 h-4" />
                          </button>
                        </Link>
                        <button
                          onClick={() => setDeleteId(mentor._id)}
                          className="p-1.5 rounded-lg bg-gray-50 text-gray-300 hover:text-red-600 hover:bg-red-50 transition-all"
                        >
                          <MdDelete className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="max-w-[300px] rounded-2xl p-6 border-none">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-bold text-center text-gray-800">Delete Mentor?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-5 flex flex-row gap-3">
            <AlertDialogCancel className="flex-1 mt-0 h-9 text-[11px] rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="flex-1 bg-red-600 hover:bg-red-700 h-9 text-[11px] rounded-xl font-bold"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}