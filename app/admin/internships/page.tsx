"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion"; 
import {
  MdAdd,
  MdCurrencyRupee,
  MdDelete,
  MdEdit,
  MdBusiness,
  MdLocationOn,
} from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/ui/alert-dialog";


const API = process.env.NEXT_PUBLIC_APP_URL;

export default function InternshipsPage() {
  const [internships, setInternships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchInternships = async () => {
    try {
      const res = await fetch(`${API}/upload/internships/list/`);
      const data = await res.json();
      setInternships(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await fetch(
        `${API}/upload/delete_internship/${deleteId}/`,
        {
          method: "DELETE",
        },
      );

      // 🔥 remove from UI instantly
      setInternships((prev) => prev.filter((item) => item._id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    /* Removed bg-white from main container */
    <div className="min-h-screen">
      
      {/* CLEAN HEADER - Background and Border removed */}
      <div className="flex justify-between items-center px-6 py-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            Internships
            <span className="text-xs text-gray-400 ml-3 font-normal uppercase tracking-[0.2em]">
              Admin Panel
            </span>
          </h1>
        </div>

        <Link href="/admin/internships/add">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-[10px] tracking-widest transition-all hover:bg-indigo-700 active:scale-95 shadow-lg shadow-indigo-100 uppercase">
            <MdAdd className="text-lg" />
            <span>Add New</span>
          </button>
        </Link>
      </div>

      {/* COMPACT AUTO-GRID */}
      <div className="p-4 md:p-6 max-w-[1700px] mx-auto">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-48 bg-gray-100/50 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
            <AnimatePresence mode="popLayout">
              {internships.map((item, index) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.02 }}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col hover:border-indigo-200 hover:shadow-md transition-all group h-full"
                >
                  {/* COMPACT IMAGE SECTION */}
                  <div className="relative h-36 w-full overflow-hidden bg-gray-50">
                    <img
                      src={item.imageUrl || "/placeholder.jpg"}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt={item.title}
                    />
                    <div className={`absolute top-2 right-2 text-[8px] px-1.5 py-0.5 rounded font-black uppercase shadow-sm ${
                      item.status === "Active" ? "bg-green-500 text-white" : "bg-gray-400 text-white"
                    }`}>
                      {item.status}
                    </div>
                  </div>

                  {/* CONTENT SECTION */}
                  <div className="p-3 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <h2 className="text-[12px] font-bold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors capitalize leading-tight">
                        {item.title}
                      </h2>
                      
                      <div className="flex items-center gap-1 text-[9px] text-gray-400 mt-1 truncate font-medium">
                        <MdBusiness className="text-indigo-400 shrink-0" />
                        <span className="truncate">{item.company}</span>
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[9px] text-gray-500 font-bold bg-gray-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                           <MdLocationOn className="text-[10px]" /> {item.location}
                        </span>
                      </div>
                      
                      <p className="text-[10px] text-gray-500 line-clamp-2 leading-tight h-7 mt-2 italic opacity-70">
                        {item.description}
                      </p>
                    </div>

                    {/* FOOTER ACTIONS */}
                    <div className="mt-3 pt-2 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex items-center text-emerald-600 font-black text-xs">
                        <MdCurrencyRupee className="text-[10px]" />
                        {isNaN(Number(item.stipend)) ? "0" : Number(item.stipend).toLocaleString("en-IN")}
                      </div>

                      <div className="flex items-center gap-1">
                        <Link href={`/admin/internships/edit/${item._id}`}>
                          <button className="p-1.5 rounded-lg bg-gray-50 text-gray-300 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                            <MdEdit className="w-3.5 h-3.5" />
                          </button>
                        </Link>
                        <button
                          onClick={() => setDeleteId(item._id)}
                          className="p-1.5 rounded-lg bg-gray-50 text-gray-300 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <MdDelete className="w-3.5 h-3.5" />
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
        <AlertDialogContent className="max-w-[280px] rounded-2xl p-5 border-none">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-sm font-bold text-center text-gray-800">Delete Listing?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4 flex flex-row gap-2">
            <AlertDialogCancel className="flex-1 mt-0 h-8 text-[11px] rounded-lg border-gray-100">No</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="flex-1 bg-red-600 hover:bg-red-700 h-8 text-[11px] rounded-lg"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}