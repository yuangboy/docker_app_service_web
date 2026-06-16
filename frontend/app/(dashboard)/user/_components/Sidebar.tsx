"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  BookOpen,
  Calendar,
  FileText,
  Briefcase,
  Layers,
  ClipboardList,
  PenTool,
  Settings,
  LogOut,
  Menu,
  X,
  GraduationCap,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [desktopOpen, setDesktopOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    {
      icon: <Home className="text-blue-500" />,
      label: "Accueil",
      path: "/user",
    },
    {
      icon: <BookOpen className="text-indigo-500" />,
      label: "Formations",
      path: "/user/formations",
    },
    {
      icon: <Calendar className="text-pink-500" />,
      label: "Événements",
      path: "/user/events",
    },
    {
      icon: <ClipboardList className="text-green-500" />,
      label: "Projets",
      path: "/user/projects",
    },
    {
      icon: <GraduationCap className="text-teal-500" />,
      label: "Apprentissage",
      path: "/user/my_learning",
    },
    {
      icon: <Settings className="text-yellow-500" />,
      label: "Paramètres",
      path: "/user/settings",
    },
    {
      icon: <Briefcase className="text-purple-500" />,
      label: "Carrière",
      path: "/user/careers",
    },
    {
      icon: <Layers className="text-cyan-500" />,
      label: "Services",
      path: "/user/services",
    },
    {
      icon: <PenTool className="text-rose-500" />,
      label: "Blog",
      path: "/user/blogs",
    },
    {
      icon: <FileText className="text-orange-500" />,
      label: "Devis",
      path: "/devis",
    },
  ];

  // ✅ Typage explicite
  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        className={`hidden md:flex flex-col transition-all duration-500
        ${desktopOpen ? "w-64" : "w-20"}
        bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl
        border-r border-white/20 shadow-xl p-4`}
      >
        <Button
          onClick={() => setDesktopOpen(!desktopOpen)}
          className="mb-6 bg-indigo-500 text-white hover:bg-indigo-600"
        >
          {desktopOpen ? "⬅ Réduire" : "➡ Ouvrir"}
        </Button>

        <nav className="space-y-2">
          {menuItems.map((item, i) => {
            const active = isActive(item.path);

            return (
              <button
                key={i}
                onClick={() => router.push(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all
                ${
                  active
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                    : "hover:bg-indigo-100 dark:hover:bg-gray-800 dark:text-gray-200"
                }`}
              >
                <span className="p-2 rounded-lg bg-white/40 dark:bg-gray-800/40 backdrop-blur">
                  {item.icon}
                </span>

                {desktopOpen && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {desktopOpen && (
          <Button variant="destructive" className="mt-6 w-full gap-2">
            <LogOut /> Déconnexion
          </Button>
        )}
      </aside>

      {/* ================= MOBILE BUTTON ================= */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          onClick={() => setMobileOpen(true)}
          className="p-2 bg-white/40 backdrop-blur-md shadow-md rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      {/* ================= MOBILE SIDEBAR ================= */}
      {mobileOpen && (
        <>
          <aside className="fixed top-0 left-0 h-full w-64 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl p-6 z-50 animate-in slide-in-from-left">
            {/* CLOSE */}
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-red-500"
            >
              <X />
            </button>

            <nav className="space-y-3 mt-10">
              {menuItems.map((item, i) => {
                const active = isActive(item.path);

                return (
                  <button
                    key={i}
                    onClick={() => {
                      router.push(item.path);
                      setMobileOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all
                    ${
                      active
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                        : "hover:bg-indigo-100 dark:hover:bg-gray-800 dark:text-gray-200"
                    }`}
                  >
                    <span className="p-2 rounded-lg bg-white/40 dark:bg-gray-800/40">
                      {item.icon}
                    </span>

                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <Button variant="destructive" className="mt-6 w-full gap-2">
              <LogOut /> Déconnexion
            </Button>
          </aside>

          {/* OVERLAY */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setMobileOpen(false)}
          />
        </>
      )}
    </>
  );
}
