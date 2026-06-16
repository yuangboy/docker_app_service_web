"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Globe, Bell } from "lucide-react";

interface User {
  avatar?: string;
}

interface NavbarProps {
  user?: User;
  loading: boolean;
}

export default function Navbar({ user, loading }: NavbarProps) {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [language, setLanguage] = useState<"FR" | "EN">("FR");
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // ⚡ Init theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // ⚡ Close notifications when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="flex justify-end items-center px-6 py-4 bg-white/70 dark:bg-gray-900/70 backdrop-blur border-b">
      <div className="flex gap-3 items-center">
        {/* 🌙 Dark Mode Toggle */}
        <Button variant="ghost" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun /> : <Moon />}
        </Button>

        {/* 🌐 Language Toggle */}
        <Button
          variant="ghost"
          onClick={() => setLanguage(language === "FR" ? "EN" : "FR")}
        >
          <Globe /> {language}
        </Button>

        {/* 🔔 Notifications */}
        <div className="relative" ref={dropdownRef}>
          <Button
            variant="ghost"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
          >
            <Bell />
          </Button>
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 z-50">
              <p className="text-sm dark:text-gray-200">Aucune notification</p>
            </div>
          )}
        </div>

        {/* 👤 User Avatar */}
        {loading ? (
          <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
        ) : (
          <img
            src={user?.avatar}
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
        )}
      </div>
    </header>
  );
}
