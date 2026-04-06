"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { User, LogOut, Menu, X, Search } from "lucide-react";
import { useAuth } from "@/src/context/AuthContext";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Fuse from "fuse.js";

type RouteItem = {
  path: string;
  keywords: string[];
};

const routes: RouteItem[] = [
  {
    path: "/profile",
    keywords: ["profile", "account", "my profile", "user"],
  },
  {
    path: "/settings",
    keywords: ["settings", "preferences", "config"],
  },
  {
    path: "/mentors",
    keywords: ["mentor", "mentors", "guide"],
  },
  {
    path: "/contact",
    keywords: ["contact", "contact us", "support", "help"],
  },
  {
    path: "/internships",
    keywords: ["internship", "internships", "jobs"],
  },
  {
    path: "/",
    keywords: ["dashboard", "home"],
  },
];

const fuse = new Fuse(routes, {
  keys: ["keywords"],
  threshold: 0.3, // stricter = better accuracy
  includeScore: true,
});

const normalize = (str: string) =>
  str.toLowerCase().trim();

const findRoute = (query: string): string | null => {
  const q = normalize(query);

  if (!q) return null;

  const result = fuse.search(q);

  if (result.length > 0 && result[0].score! < 0.4) {
    return result[0].item.path;
  }

  return null;
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const pathname = usePathname();
  const router = useRouter();

  const hideNavbarRouters = [
    "/mentors",
    "/login",
    "/register",
    "/admin",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/internships",
    "/internships/id",
  ];

  const shouldHide =
    hideNavbarRouters.includes(pathname) ||
    pathname.startsWith("/course/") ||
    pathname.startsWith("/mentors/") ||
    pathname.startsWith("/admin/");

  if (shouldHide) return null;

const handleSearch = (e: React.FormEvent) => {
  e.preventDefault();

  const query = search.trim();
  if (!query) return;

  const matchedRoute = findRoute(query);

  if (matchedRoute) {
    router.push(matchedRoute);
  } else {
    router.push(`/internships?search=${encodeURIComponent(query)}`);
  }

  setIsOpen(false);
};

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* 🔥 MAIN NAV */}
        <div className="flex items-center justify-between h-16 gap-2">
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

          {/* 🔍 SEARCH (NOW ALWAYS VISIBLE) */}
          <form
            onSubmit={handleSearch}
            className="flex-1 max-w-[280px] sm:max-w-sm md:max-w-md mx-2 relative"
          >
            <Search
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-2 py-1.5 sm:py-2 rounded-lg bg-white border border-gray-300 text-xs sm:text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </form>

          {/* DESKTOP RIGHT */}
          <div className="hidden md:flex items-center gap-6 shrink-0">
          

            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border"
                >
                  <User size={14} />
                  <span className="text-sm">{user.name}</span>
                </Link>

                <button onClick={logout}>
                  <LogOut
                    size={20}
                    className="text-gray-400 hover:text-red-500"
                  />
                </button>
              </div>
            ) : (
              <Link
                href="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700"
              >
                Get Started
              </Link>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden shrink-0">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white border-b px-4 py-4 space-y-4"
          >
            <Link
              href="/internships"
              className="block text-gray-600 font-medium"
            >
              Internship
            </Link>

            <Link href="/mentors" className="block text-gray-600 font-medium">
              Mentors
            </Link>

            {user ? (
              <>
                <Link
                  href="/profile"
                  className="block text-gray-600 font-medium"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="block text-red-500 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block text-gray-600 font-medium">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block bg-blue-600 text-white px-4 py-2 rounded-lg text-center"
                >
                  Register
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
