"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { FiSearch, FiCheckCircle, FiXCircle, FiShield, FiAward, FiUsers } from "react-icons/fi";

export default function CertificateVerificationPage() {
  const [certificateId, setCertificateId] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<"success" | "error" | null>(null);
  const [certificateData, setCertificateData] = useState<any>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certificateId.trim()) return;

    setLoading(true);
    setResult(null);

    // 🔥 Simulate API call (real backend ke saath yahan fetch laga dena)
    await new Promise((resolve) => setTimeout(resolve, 1600));

    // Demo data (real mein backend se aayega)
    if (certificateId.toUpperCase() === "SKH-2025-87421") {
      setResult("success");
      setCertificateData({
        name: "Adarsh Sharma",
        course: "Full Stack Web Development",
        issueDate: "15 March 2025",
        mentor: "Rahul Verma",
        grade: "A+",
      });
    } else {
      setResult("error");
    }

    setLoading(false);
  };

  return (
    <>
      {/* HERO */}
      <section className="pt-28 pb-20 bg-gradient-to-br from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-3xl shadow text-blue-700 text-sm font-medium">
              <FiShield size={20} />
              OFFICIAL VERIFICATION
            </span>
            <h1 className="text-6xl md:text-7xl font-semibold text-gray-900 mt-8 leading-none tracking-tighter">
              Verify Your <span className="text-blue-600">Skillhat Certificate</span>
            </h1>
            <p className="mt-8 text-2xl text-gray-600 max-w-2xl mx-auto">
              Instantly check the authenticity of any Skillhat certificate issued to you or your candidates.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
        {/* VERIFICATION FORM */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white border border-gray-100 rounded-3xl shadow-2xl p-10 md:p-14"
        >
          <form onSubmit={handleVerify} className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Certificate ID
              </label>
              <div className="relative">
                <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
                <input
                  type="text"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  placeholder="Enter Certificate ID (e.g. SKH-2025-87421)"
                  className="w-full pl-16 pr-6 py-5 text-lg border border-gray-200 rounded-3xl focus:border-blue-500 focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-6 rounded-3xl font-semibold text-xl flex items-center justify-center gap-3 transition-all"
            >
              {loading ? (
                "Verifying Certificate..."
              ) : (
                <>
                  <FiShield size={26} />
                  Verify Certificate
                </>
              )}
            </button>
          </form>

          {/* RESULT SECTION */}
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-12"
            >
              {result === "success" ? (
                <div className="bg-green-50 border border-green-200 rounded-3xl p-8">
                  <div className="flex items-center gap-4 text-green-600 mb-6">
                    <FiCheckCircle size={48} />
                    <h3 className="text-3xl font-semibold">Certificate Verified</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                    <div>
                      <p className="text-sm text-gray-500">Student Name</p>
                      <p className="text-xl font-medium">{certificateData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Course</p>
                      <p className="text-xl font-medium">{certificateData.course}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Issue Date</p>
                      <p className="text-xl font-medium">{certificateData.issueDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Mentor</p>
                      <p className="text-xl font-medium">{certificateData.mentor}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Grade</p>
                      <p className="text-2xl font-bold text-green-600">{certificateData.grade}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-red-50 border border-red-200 rounded-3xl p-10 text-center">
                  <FiXCircle size={60} className="mx-auto text-red-500 mb-6" />
                  <h3 className="text-3xl font-semibold text-red-700">Certificate Not Found</h3>
                  <p className="text-gray-600 mt-4">The Certificate ID you entered is invalid or does not exist.</p>
                  <button
                    onClick={() => {
                      setResult(null);
                      setCertificateId("");
                    }}
                    className="mt-8 text-blue-600 hover:underline"
                  >
                    Try Another ID
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* HOW IT WORKS */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-semibold mb-12">How Certificate Verification Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <FiSearch size={32} className="text-blue-600" />
              </div>
              <h4 className="font-semibold text-xl mb-3">Enter ID</h4>
              <p className="text-gray-600">Input the unique Certificate ID printed on your certificate.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <FiShield size={32} className="text-blue-600" />
              </div>
              <h4 className="font-semibold text-xl mb-3">Instant Verification</h4>
              <p className="text-gray-600">Our system instantly checks against the official blockchain-secured database.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <FiAward size={32} className="text-blue-600" />
              </div>
              <h4 className="font-semibold text-xl mb-3">Get Details</h4>
              <p className="text-gray-600">View full certificate details, student name, course, and mentor.</p>
            </motion.div>
          </div>
        </div>

        {/* TRUST BAR */}
        <div className="mt-24 text-center text-gray-500 flex flex-wrap justify-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <FiShield /> Blockchain Secured
          </div>
          <div className="flex items-center gap-2">
            <FiUsers /> 5000+ Certificates Verified
          </div>
          <div className="flex items-center gap-2">
            <FiAward /> Tamper-Proof
          </div>
        </div>
      </div>
    </>
  );
}