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
  MdPersonOutline
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
  const [deleteId, setDeleteId] = useState<string | null>(null);

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
        setMentors((prev) => prev.filter((m) => m._id !== deleteId));
        setDeleteId(null);
        toast.success("Mentor removed");
      }
    } catch (err) {
      console.error(err);
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

        {/* Add New Button (Icon Only, Right Aligned) */}
        <Link href="/admin/mentors/add">
          <button 
  title="Add Intern"
  className="flex items-center justify-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-2xl shadow-md transition-colors hover:bg-indigo-700 active:scale-95 font-bold text-[10px] uppercase tracking-widest"
>
  <MdAdd className="text-lg" />
  <span>Add Mentor</span>
</button>
        </Link>
      </div>

      {/* AUTO-GRID - 6 Columns layout */}
      <div className="px-6 pb-10 max-w-[1800px] mx-auto">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-72 bg-gray-100/50 rounded-2xl animate-pulse shadow-sm" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
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
                  {/* IMAGE - Height set to h-48 */}
                  <div className="relative h-48 w-full overflow-hidden bg-gray-50 shrink-0">
                    <img
                      src={mentor.imageUrl || "/placeholder.jpg"}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      alt={mentor.name}
                    />
                    <div className={`absolute top-2 right-2 text-[7px] px-1.5 py-0.5 rounded-full font-black uppercase shadow-sm ${
                      mentor.status === "Active" ? "bg-green-500 text-white" : "bg-gray-500 text-white"
                    }`}>
                      {mentor.status || "Active"}
                    </div>
                  </div>

                  {/* BOTTOM CONTENT - Highly Compact */}
                  <div className="p-2.5 flex flex-col flex-1 justify-between">
                    <div>
                      <h2 className="text-[11px] font-black text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors uppercase tracking-tight mb-1">
                        {mentor.name}
                      </h2>
                      
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-[9px] text-gray-500 font-bold">
                          <MdEmail className="text-indigo-500 text-[11px] shrink-0" />
                          <span className="truncate">{mentor.email}</span>
                        </div>

                        {/* BIO */}
                        <div className="pt-1 border-t border-gray-50 space-y-0.5 mt-1">
                          <p className="line-clamp-2 text-[8px] text-gray-400 font-medium leading-tight">
                            {mentor.bio || "No bio provided."}
                          </p>
                        </div>

                        {/* SKILLS / EXPERTISE */}
                        <div className="flex flex-wrap gap-1 pt-1">
                          {mentor.expertise?.split(",").slice(0, 2).map((skill: string, i: number) => (
                            <span key={i} className="text-[7px] px-1.5 py-0.5 bg-indigo-50 text-indigo-600 rounded-md font-bold uppercase tracking-wider">
                              {skill.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* FOOTER */}
                    <div className="mt-4 pt-2.5 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                      </div>

                      <div className="flex flex-col gap-1">
                        <Link href={`/admin/mentors/edit/${mentor._id}`}>
                          <button className="w-full py-1 rounded-md bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-1 font-bold text-[7px] uppercase tracking-wider">
                            <MdEdit className="text-[9px]" /> edit profile
                          </button>
                        </Link>
                        <button
                          onClick={() => setDeleteId(mentor._id)}
                          className="w-full py-1 rounded-md bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-1 font-bold text-[7px] uppercase tracking-wider"
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

      {/* ACCESSIBLE DELETE DIALOG */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="rounded-[40px] p-8 max-w-sm border-none bg-white shadow-2xl">
          <AlertDialogHeader>
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-4 mx-auto">
              <MdWarning className="text-red-500 text-3xl" />
            </div>
            <AlertDialogTitle className="text-xl font-black text-center text-gray-900 tracking-tight">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500 text-center text-sm font-medium leading-relaxed">
              Do you want to delete <span className="text-red-600 font-bold">"{selectedForDelete?.name}"</span>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6 flex flex-row gap-2">
            <AlertDialogCancel className="flex-1 mt-0 h-10 rounded-xl font-bold uppercase text-[9px] border-gray-100">No</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="flex-1 bg-red-600 hover:bg-red-700 h-10 rounded-xl font-black uppercase text-[9px] border-none shadow-lg shadow-red-100"
            >
              Yes, Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}