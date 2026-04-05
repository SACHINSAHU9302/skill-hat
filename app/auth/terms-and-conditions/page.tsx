"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";
import { ArrowLeft} from "lucide-react";

export default function TermsAndConditions() {
  const lastUpdated = "5 April 2026";

  const sections = [
    { id: "acceptance", title: "1. Acceptance of Terms" },
    { id: "eligibility", title: "2. User Eligibility" },
    { id: "account", title: "3. Account Registration" },
    { id: "intellectual", title: "4. Intellectual Property" },
    { id: "user-content", title: "5. User Conduct & Prohibited Activities" },
    { id: "payments", title: "6. Payments, Subscriptions & Refunds" },
    { id: "privacy", title: "7. Privacy and Data Protection" },
    { id: "termination", title: "8. Termination" },
    { id: "liability", title: "9. Limitation of Liability" },
    { id: "governing", title: "10. Governing Law" },
    { id: "changes", title: "11. Changes to These Terms" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 transition-colors">
      {/* Top Navigation */}
      <div className="bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            href="/register"
            className="flex items-center gap-3 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="hidden sm:inline">Back to Register</span>
          </Link>

<div className="flex items-center gap-3">
          
            <Image
              src="/skillhat__2_-removebg-preview.png"        
              alt="NexusAcademy Logo"
              width={120}
              height={120}
              className="drop-shadow-sm"
              priority
            />
        
          </div>

          <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Legal • Terms of Service
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 py-10">
        <div className="flex gap-12">
          {/* Table of Contents - Professional Sidebar */}
          <div className="hidden xl:block w-72 flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-28 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-3xl p-8 shadow-sm"
            >
              <h3 className="uppercase text-xs font-semibold tracking-widest text-slate-500 dark:text-slate-400 mb-6">
                TABLE OF CONTENTS
              </h3>
              <div className="space-y-4 text-sm">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {section.title}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 max-w-3xl bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-slate-100 dark:border-zinc-700 p-10 md:p-16"
          >
            <div className="max-w-prose mx-auto">
              {/* Header */}
              <div className="mb-12 border-b border-slate-100 dark:border-zinc-700 pb-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-400 text-sm font-medium rounded-2xl mb-4">
                  TERMS OF SERVICE
                </div>
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white">
                  Terms and Conditions
                </h1>
                <p className="mt-3 text-slate-500 dark:text-slate-400">
                  Last updated: <span className="font-medium">{lastUpdated}</span>
                </p>
                <p className="mt-8 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  Welcome to NexusAcademy. By accessing or using our platform, you agree to comply with and be bound by these Terms and Conditions.
                </p>
              </div>

              {/* Section 1 */}
              <div id="acceptance" className="mb-16">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">1. Acceptance of Terms</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  These Terms and Conditions constitute a legally binding agreement between you and NexusAcademy. 
                  Your use of the platform signifies your acceptance of these terms in their entirety. If you do not agree, you must not use the service.
                </p>
              </div>

              {/* Section 2 */}
              <div id="eligibility" className="mb-16">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">2. User Eligibility</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  You must be at least 13 years of age to use NexusAcademy. By using the platform, you represent and warrant that you meet this age requirement and have the legal capacity to enter into this agreement.
                </p>
              </div>

              {/* Section 3 */}
              <div id="account" className="mb-16">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">3. Account Registration</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  You are responsible for maintaining the confidentiality of your login credentials. You agree to provide accurate, current, and complete information during registration and to update it as necessary.
                </p>
              </div>

              {/* Section 4 */}
              <div id="intellectual" className="mb-16">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">4. Intellectual Property</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  All content, courses, materials, logos, and trademarks on NexusAcademy are the exclusive property of NexusAcademy or its licensors. You are granted a limited, non-exclusive, non-transferable license to access the content for personal educational use only.
                </p>
              </div>

              {/* Section 5 */}
              <div id="user-content" className="mb-16">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">5. User Conduct &amp; Prohibited Activities</h2>
                <ul className="list-disc pl-6 space-y-3 text-slate-600 dark:text-slate-300">
                  <li>Sharing account credentials with others</li>
                  <li>Copying, distributing, or publicly displaying course content without authorization</li>
                  <li>Uploading harmful code, viruses, or malicious content</li>
                  <li>Harassing, threatening, or abusing other users or instructors</li>
                  <li>Using the platform for any unlawful purpose</li>
                </ul>
              </div>

              {/* Section 6 */}
              <div id="payments" className="mb-16">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">6. Payments, Subscriptions &amp; Refunds</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  All payments are processed securely. Subscription plans are billed as per the chosen cycle. Refunds are available within 14 days of purchase if you have not completed more than 20% of the course. No refunds after that period.
                </p>
              </div>

              {/* Section 7 */}
              <div id="privacy" className="mb-16">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">7. Privacy and Data Protection</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Your privacy is governed by our{" "}
                  <Link href="/privacy-policy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>
                  , which forms an integral part of these Terms.
                </p>
              </div>

              {/* Section 8 */}
              <div id="termination" className="mb-16">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">8. Termination</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  We reserve the right to suspend or terminate your account immediately, without prior notice, for any violation of these Terms.
                </p>
              </div>

              {/* Section 9 */}
              <div id="liability" className="mb-16">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">9. Limitation of Liability</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  NexusAcademy shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the platform.
                </p>
              </div>

              {/* Section 10 */}
              <div id="governing" className="mb-16">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">10. Governing Law</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts located in Indore, Madhya Pradesh.
                </p>
              </div>

              {/* Section 11 */}
              <div id="changes" className="mb-16">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">11. Changes to These Terms</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  We may update these Terms from time to time. Continued use of the platform after such changes constitutes your acceptance of the revised Terms.
                </p>
              </div>

              {/* Acceptance Footer Box */}
              <div className="bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-2xl p-8 mt-20">
                <p className="text-center text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  By creating an account or using NexusAcademy, you confirm that you have read, understood, and agree to be legally bound by these Terms and Conditions.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-16">
                <Link
                  href="/register"
                  className="flex-1 text-center py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition-all shadow-sm"
                >
                  Back to Registration
                </Link>
                <Link
                  href="/"
                  className="flex-1 text-center py-4 border border-slate-300 dark:border-zinc-600 hover:bg-slate-100 dark:hover:bg-zinc-800 font-semibold rounded-2xl transition-all"
                >
                  Return to Homepage
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="text-center text-xs text-slate-400 dark:text-slate-500 py-10 border-t border-slate-100 dark:border-zinc-800">
        Questions? Contact legal@nexusacademy.in
      </div>
    </div>
  );
}