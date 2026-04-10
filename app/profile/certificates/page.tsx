"use client";

import { motion } from "motion/react";
import { FaAward, FaDownload, FaEye, FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "@/src/context/AuthContext";
import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_APP_URL;

interface Certificate {
  id: string;
  title: string;
  course: string;
  issuedDate: string;
  certificateId: string;
}

export default function CertificatesPage() {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API}/api/users/my-certificates/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch certificates");
        }

        setCertificates(data.certificates || []);
      } catch (err) {
        console.error("CERT ERROR:", err);
      }
    };

    if (user) {
      fetchCertificates();
    }
  }, [user]);

  // Demo certificates (you can later replace with real data from backend)

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">
            Please login to view your certificates
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all"
            >
              {/* Certificate Preview */}
              <div className="h-52 bg-gradient-to-br from-blue-600 to-indigo-600 p-6 flex flex-col justify-between text-white relative">
                <div className="absolute top-6 right-6">
                  <FaAward size={48} className="opacity-30" />
                </div>
                <div>
                  <span className="px-4 py-1 bg-white/20 text-xs font-semibold rounded-3xl">
                    VERIFIED
                  </span>
                </div>
                <h3 className="text-2xl font-semibold leading-tight">
                  {cert.title}
                </h3>
              </div>

              <div className="p-6">
                <p className="font-medium text-gray-800">{cert.course}</p>

                <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
                  <FaCalendarAlt />
                  <span>Issued: {cert.issuedDate}</span>
                </div>

                <div className="text-xs font-mono text-gray-400 mt-1">
                  ID: {cert.certificateId}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-8">
                  <Link
                    href={`/profile/certicate/${cert.id}`}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-3xl font-semibold hover:bg-blue-700 transition-all"
                  >
                    <FaEye /> View Certificate
                  </Link>

                  <button
                    onClick={() =>
                      window.open(`/profile/certicate/${cert.id}`, "_blank")
                    }
                    className="flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 px-6 rounded-3xl transition-all"
                  >
                    <FaDownload />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {certificates.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <FaAward size={80} className="mx-auto opacity-30 mb-4" />
            <p className="text-xl">No certificates yet</p>
            <p className="text-sm mt-2">
              Complete a course to earn your first certificate
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
