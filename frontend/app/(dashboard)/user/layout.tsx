"use client";

import { useState, useEffect, ReactNode } from "react";
import Sidebar from "./_components/Sidebar";
import ProtectedRoute from "../ProtectedRoute";

interface User {
  avatar?: string;
  name?: string;
  role?: "user" | "admin";
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <ProtectedRoute allowedRole="user">
      <div className="flex min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <Sidebar />

        {/* MAIN FIX ICI */}
        <main className="flex-1 min-w-0 overflow-x-hidden p-6 md:p-10">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
