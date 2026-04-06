"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { 
  FiBriefcase, 
  FiUsers, 
  FiUser, 
  FiSettings, 
  FiLogOut, 
  FiMenu, 
  FiX, 
  FiSearch,
  FiLogIn 
} from "react-icons/fi";
import { useAuth } from "@/src/context/AuthContext";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const pathname = usePathname();
  const router = useRouter();

  const hideNavbarRouters = ["/mentors", "/login", "/register", "/admin", "/auth/forgot-password", "/auth/reset-password", "/internships", "/internships/id"];

  const shouldHide =
    hideNavbarRouters.includes(pathname) ||
    pathname.startsWith("/course/") ||
    pathname.startsWith("/mentors/") ||
    pathname.startsWith("/admin/");

  if (shouldHide) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/search?query=${encodeURIComponent(search)}`);
    setIsOpen(false);
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* LOGO */}
          <Link href="/" className="flex items-center shrink-0">
            <div className="w-20 sm:w-24 h-10 bg-white rounded-xl flex items-center justify-center shadow-md">
              <Image
                src="/logo.png"
                alt="logo"
                height={100}
                width={100}
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* SEARCH BAR */}
          <form
            onSubmit={handleSearch}
            className="flex-1 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-4 relative"
          >
            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search internships & mentors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-5 py-3.5 rounded-3xl bg-white border border-gray-200 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </form>

          {/* HAMBURGER BUTTON */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="shrink-0 text-gray-700 hover:text-gray-900 transition"
          >
            {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* MENU DROPDOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white border-b shadow-lg md:shadow-xl md:absolute md:top-16 md:right-40 md:left-auto md:w-72 md:rounded-3xl md:overflow-hidden z-50"
          >
            <div className="px-6 py-6 md:py-4 space-y-1">
              
              {/* Internship */}
              <Link 
                href="/internships" 
                className="flex items-center gap-3 px-4 py-3.5 text-gray-700 hover:bg-gray-200 hover:scale-[1.02] rounded-2xl font-medium transition-all duration-200"
                onClick={closeMenu}
              >
                <FiBriefcase size={20} className="text-gray-500" />
                Internship
              </Link>
              
              {/* Mentors */}
              <Link 
                href="/mentors" 
                className="flex items-center gap-3 px-4 py-3.5 text-gray-700 hover:bg-gray-200 hover:scale-[1.02] rounded-2xl font-medium transition-all duration-200"
                onClick={closeMenu}
              >
                <FiUsers size={20} className="text-gray-500" />
                Mentors
              </Link>

              {user ? (
                <>
                  {/* Profile */}
                  <Link 
                    href="/profile" 
                    className="flex items-center gap-3 px-4 py-3.5 text-gray-700 hover:bg-gray-200 hover:scale-[1.02] rounded-2xl font-medium transition-all duration-200"
                    onClick={closeMenu}
                  >
                    <FiUser size={20} className="text-gray-500" />
                    Profile
                  </Link>

                  {/* Settings */}
                  <Link 
                    href="/settings" 
                    className="flex items-center gap-3 px-4 py-3.5 text-gray-700 hover:bg-gray-200 hover:scale-[1.02] rounded-2xl font-medium transition-all duration-200"
                    onClick={closeMenu}
                  >
                    <FiSettings size={20} className="text-gray-500" />
                    Settings
                  </Link>

                  {/* Logout */}
                  <button 
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="flex items-center gap-3 w-full text-left px-4 py-3.5 text-red-500 hover:bg-red-50 hover:scale-[1.02] rounded-2xl font-medium transition-all duration-200"
                  >
                    <FiLogOut size={20} className="text-red-500" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  {/* Login */}
                  <Link 
                    href="/login" 
                    className="flex items-center gap-3 px-4 py-3.5 text-gray-700 hover:bg-gray-200 hover:scale-[1.02] rounded-2xl font-medium transition-all duration-200"
                    onClick={closeMenu}
                  >
                    <FiLogIn size={20} className="text-gray-500" />
                    Login
                  </Link>
                  <Link 
                    href="/register"
                    onClick={closeMenu}
                    className="block mt-4 bg-blue-600 text-white px-6 py-3.5 rounded-3xl text-center font-semibold hover:bg-blue-700 transition"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}