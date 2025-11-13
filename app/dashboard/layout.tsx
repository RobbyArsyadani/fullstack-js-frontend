"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "w-64" : "w-30"
        } bg-white shadow-md p-4 transition-all duration-300`}
      >
        <h2 className="text-xl font-bold mb-6 text-indigo-600 text-center">
          <Link href={"/dashboard"}>Admin</Link>
        </h2>
        <nav className={`space-y-3 ${!isOpen && "hidden"}`}>
          <Link
            href="/dashboard/user"
            className={`block px-4 py-2 rounded-md transition ${
              pathname.includes("user")
                ? "bg-indigo-600 text-white"
                : "hover:bg-indigo-100 text-gray-700"
            }`}
          >
            👤 Users
          </Link>
          <Link
            href="/dashboard/product"
            className={`block px-4 py-2 rounded-md transition ${
              pathname.includes("product")
                ? "bg-indigo-600 text-white"
                : "hover:bg-indigo-100 text-gray-700"
            }`}
          >
            📦 Products
          </Link>
        </nav>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mt-6 w-full text-sm text-gray-500 hover:text-indigo-600"
        >
          {isOpen ? "◀ Sembunyikan" : "▶ Tampilkan"}
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Logout
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">{children}</div>
      </main>
    </div>
  );
}

