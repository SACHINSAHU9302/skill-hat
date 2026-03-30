// app/admin/layout.tsx

import { Sidebar } from "./dashboard/sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Sidebar />

  
      <div className="ml-64 min-h-screen">
        {children}
      </div>
    </div>
  );
}