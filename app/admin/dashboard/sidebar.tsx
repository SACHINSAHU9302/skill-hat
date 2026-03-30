"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDashboard, MdWork, MdSchool, MdPerson } from "react-icons/md";

export function Sidebar({ open, setOpen }: any) {
  const pathname = usePathname() || "";

  const navItems = [
    { path: "/admin", label: "Dashboard", icon: MdDashboard },
    { path: "/admin/internships", label: "Internships", icon: MdWork },
    { path: "/admin/courses", label: "Courses", icon: MdSchool },
    { path: "/admin/mentors", label: "Mentors", icon: MdPerson },
  ];

  const isActive = (path: string) => {
    if (!path) return false;
    if (path === "/admin") return pathname === "/admin";
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Overlay (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
fixed top-0 left-0 h-screen w-64 bg-white border-r z-[60]
flex flex-col   /* 🔥 MOST IMPORTANT FIX */
transform transition-transform duration-300
${open ? "translate-x-0" : "-translate-x-full"}

`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600">
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-sm text-blue-100 mt-1">
            Internships & Courses
          </p>
        </div>

        {/* Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                        isActive(item.path)
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* User (ALWAYS BOTTOM) */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold shadow-md">
              A
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                Admin User
              </p>
              <p className="text-xs text-gray-500">
                admin@example.com
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}