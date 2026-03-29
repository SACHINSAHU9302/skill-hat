"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  MdAccessTime,
  MdAdd,
  MdCurrencyRupee,
  MdDelete,
  MdEdit,
  MdLocalOffer,
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
import { Button } from "@/src/components/ui/button";

export default function InternshipsPage() {
  const [internships, setInternships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // ✅ FETCH DATA
  const fetchInternships = async () => {
    try {
      const res = await fetch("https://skillhat-backend.onrender.com/upload/internships/list/");
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

  // ✅ DELETE INTERNSHIP
  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await fetch(
        `https://skillhat-backend.onrender.com/upload/delete_internship/${deleteId}/`,
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
    <div className="min-h-screen bg-gray-50/50">
      {/* HEADER */}
      <div className="flex justify-between items-center p-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Internships</h1>
          <p className="text-gray-500 mt-2">
            Manage all internship opportunities
          </p>
        </div>

        <Link href="/admin/internships/add">
          <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow hover:scale-105 transition">
            <MdAdd /> Add Internship
          </button>
        </Link>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-80 bg-white rounded-3xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {internships.map((item, i) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-[28px] overflow-hidden shadow-sm hover:shadow-xl transition group border"
              >
                <div className="relative h-48 overflow-hidden">
                  {/* IMAGE */}
                  <img
                    src={item.imageUrl || "/placeholder.jpg"}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />

                  {/* STATUS BADGE (TOP RIGHT) */}
                  <div
                    className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-semibold shadow-md backdrop-blur-md ${
                      item.status === "Active"
                        ? "bg-green-500/90 text-white"
                        : "bg-gray-400/90 text-white"
                    }`}
                  >
                    {item.status}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-5 space-y-3">
                  <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600">
                    {item.title}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {item.company} • {item.location}
                  </p>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.description}
                  </p>

                  {/* STATS */}
                  <div className="flex items-center justify-between pt-3">
                    {/* ⏳ Duration */}
                    <div className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                      <MdAccessTime className="text-gray-500" />
                      {item.duration}
                    </div>

                    {/* 💰 Stipend */}
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold">
                      <MdCurrencyRupee className="text-base" />
                      {Number(item.stipend).toLocaleString("en-IN")}
                    </div>

                    {/* 🏷️ Offer Badge */}
                    {item.offer && (
                      <div className="flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-md">
                        <MdLocalOffer />
                        {item.offer}
                      </div>
                    )}
                  </div>

                  {/* FOOTER */}
                  <div className="flex items-center gap-2">
                    <div className="pt-4 border-t flex flex-col gap-2 col-2">
                      {/* EDIT (Full Width) */}
                      <Link href={`/admin/internships/edit/${item._id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full flex items-center justify-center gap-2"
                        >
                          <MdEdit className="w-4 h-4" />
                          Edit Internship
                        </Button>
                      </Link>

                      {/* DELETE (Bottom Right) */}
                      <div className="flex justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-300 hover:bg-red-50 flex items-center gap-1 px-3"
                          onClick={() => setDeleteId(item._id)}
                        >
                          <MdDelete className="w-4 h-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!loading && internships.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No internships found
          </div>
        )}
      </div>

      {/* DELETE DIALOG */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Internship?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              internship.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
