"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdStar,
  MdEmail,
  MdWarning,
  MdPersonOutline,
  MdCheckCircle // Success popup ke liye
} from "react-icons/md";
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
import { toast } from "sonner";

const API = process.env.NEXT_PUBLIC_APP_URL || "https://skillhat-backend.onrender.com";

export default function Mentors() {
  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals ke states
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const fetchMentors = async () => {
    try {
      setLoading(true);
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
      const res = await fetch(`${API}/api/delete_mentor/${deleteId}/`, {
        method: "DELETE",
      });
      if (res.ok) {
        // 1. UI se data hatao
        setMentors((prev) => prev.filter((m) => m._id !== deleteId));

        // 2. Pehla delete popup band karo
        setDeleteId(null);

        // 3. Thoda ruk kar success popup chalu karo
        setTimeout(() => {
          setShowSuccess(true);
        }, 300);

        // 4. Success popup ko auto-close karo
        setTimeout(() => {
          setShowSuccess(false);
        }, 2800);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting mentor");
    }
  };

  const selectedForDelete = mentors.find((m) => m._id === deleteId);

  return (
    <div className="min-h-screen bg-gray-50/10 pb-10">

      {/* HEADER SECTION - Left Aligned Title & Right Aligned Button */}
      <div className="flex justify-between items-center px-6 py-10 max-w-[1800px] mx-auto">

        {/* Left Title Area */}
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-100 rounded-2xl">
            <MdPersonOutline className="text-indigo-600 text-3xl" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              Mentors
            </h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em] mt-1">
              Admin Panel Control
            </p>
          </div>
        </div>

        {/* Add Mentor Button (Right Aligned) */}
        <Link href="/admin/mentors/add">
          <button
            title="Add Mentor"
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-2xl shadow-md transition-colors hover:bg-indigo-700 active:scale-95 font-bold text-[10px] uppercase tracking-widest"
          >
            <MdAdd className="text-md" />
            <span>Add Mentor</span>
          </button>
        </Link>
      </div>

      {/* AUTO-GRID - 6 Columns layout */}
      <div className="px-6 pb-10 max-w-[1800px] mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-72 bg-gray-100/50 rounded-2xl animate-pulse shadow-sm" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {mentors.map((mentor) => (
                <motion.div
                  key={mentor._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white border border-gray-100 rounded-[20px] overflow-hidden flex flex-col hover:border-indigo-200 hover:shadow-xl transition-all duration-300 group h-full shadow-sm"
                >
                  {/* IMAGE */}
                  <div className="relative h-48 w-full overflow-hidden bg-gray-50 shrink-0">
                    <img
                      src={mentor.imageUrl || "/placeholder.jpg"}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      alt={mentor.name}
                    />
                    <div className={`absolute top-2 right-2 text-[7px] px-1.5 py-0.5 rounded-full font-black uppercase shadow-sm ${mentor.status === "Active" ? "bg-green-500 text-white" : "bg-gray-500 text-white"
                      }`}>
                      {mentor.status || "Active"}
                    </div>
                  </div>

                  {/* BOTTOM CONTENT */}
                  <div className="p-2.5 flex flex-col flex-1 justify-between">
                    <div>
                      <h2 className="text-[11px] font-black text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors uppercase tracking-tight mb-1">
                        {mentor.name}
                      </h2>

                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-600 font-bold">
                          <MdEmail className="text-indigo-600 text-[11px] shrink-0" />
                          <span className="truncate">{mentor.email}</span>
                        </div>

                        {/* BIO */}
                        <div className="pt-1 border-t border-gray-50 space-y-0.5 mt-1">
                          <p className="line-clamp-2 text-[10px] text-gray-600 font-medium leading-tight">
                            {mentor.bio || "No bio provided."}
                          </p>
                        </div>

                        {/* SKILLS */}
                        <div className="flex flex-wrap gap-1 pt-1">
                          {mentor.expertise?.split(",").slice(0, 2).map((skill: string, i: number) => (
                            <span key={i} className="text-[10px] px-1.5 py-0.5 bg-indigo-50 text-indigo-600 rounded-md font-bold uppercase tracking-wider">
                              {skill.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* RATING & BUTTONS */}
                    <div >
                      <div className="flex flex-col gap-1 w-full mt-1">
                        <Link href={`/admin/mentors/edit/${mentor._id}`}>
                          <button className="w-full py-1.5 rounded-md bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-1 font-bold text-[7px] uppercase tracking-wider">
                            <MdEdit className="text-[9px]" /> edit profile
                          </button>
                        </Link>
                        <button
                          onClick={() => setDeleteId(mentor._id)}
                          className="w-full py-1.5 rounded-md bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-1 font-bold text-[7px] uppercase tracking-wider"
                        >
                          <MdDelete className="text-[9px]" /> delete your profile
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

      {/* 1. PROFESSIONAL DELETE CONFIRMATION DIALOG */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="rounded-[24px] p-6 sm:p-8 max-w-[380px] border border-gray-100 bg-white shadow-2xl shadow-gray-200/50 outline-none">
          <AlertDialogHeader className="flex flex-col items-center space-y-3">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-2 ring-8 ring-red-50/50"
            >
              <MdWarning className="text-red-500 text-3xl" />
            </motion.div>

            <AlertDialogTitle className="text-xl font-bold text-center text-gray-900 tracking-tight">
              Delete Record?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500 text-center text-sm font-medium leading-relaxed">
              You are about to delete <span className="text-gray-900 font-bold bg-gray-50 px-1.5 py-0.5 rounded-md border border-gray-200">"{selectedForDelete?.name}"</span>. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-8 flex flex-row gap-3 w-full">
            <AlertDialogCancel className="flex-1 mt-0 h-11 rounded-xl font-bold uppercase text-[10px] tracking-wider bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 transition-all">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="flex-1 bg-red-500 hover:bg-red-600 h-11 rounded-xl font-bold uppercase text-[10px] tracking-wider text-white border-none shadow-md shadow-red-200 transition-all"
            >
              Confirm Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 2. PROFESSIONAL SUCCESS DIALOG */}
      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent className="rounded-[24px] p-6 sm:p-8 max-w-[380px] border border-gray-100 bg-white shadow-2xl shadow-gray-200/50 flex flex-col items-center justify-center text-center outline-none">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
            className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4 ring-8 ring-emerald-50/50"
          >
            <MdCheckCircle className="text-emerald-500 text-3xl" />
          </motion.div>

          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-center text-gray-900 tracking-tight">
              Successfully Deleted
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500 text-center text-sm font-medium mt-2 leading-relaxed">
              The mentor has been permanently removed from your database.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-8 w-full sm:justify-center">
            <AlertDialogAction
              onClick={() => setShowSuccess(false)}
              className="w-full bg-gray-900 hover:bg-gray-800 h-11 rounded-xl font-bold uppercase text-[10px] tracking-widest border-none shadow-md shadow-gray-300 text-white transition-all"
            >
              Okay
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}