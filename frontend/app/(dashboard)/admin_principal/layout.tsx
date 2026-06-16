"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Folder,
  FileText,
  BookOpen,
  Calendar,
  Briefcase,
  Layers,
  Mail,
  CreditCard,
  MessageSquare,
  UserCheck,
  LogOut,
  Home,
  Settings,
  Menu,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../ProtectedRoute";

type SidebarContentProps = {
  tabs: { key: string; label: string; icon: React.ReactNode }[];
  activeTab: string;
  setActiveTab: (key: string) => void;
  sidebarOpen: boolean;
};



export default function AdminLayout({ children}:{children:React.ReactNode}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const tabs = [
    { key: "", label: "Accueil", icon: <Home className="text-blue-500" /> },
    {
      key: "users",
      label: "Utilisateurs",
      icon: <Users className="text-indigo-500" />,
    },
    {
      key: "projects",
      label: "Projets",
      icon: <Folder className="text-green-500" />,
    },
    {
      key: "blogs",
      label: "Blogs",
      icon: <FileText className="text-pink-500" />,
    },
    {
      key: "formations",
      label: "Formations",
      icon: <BookOpen className="text-purple-500" />,
    },
    {
      key: "devis",
      label: "Devis",
      icon: <Briefcase className="text-orange-500" />,
    },
    {
      key: "events",
      label: "Événements",
      icon: <Calendar className="text-rose-500" />,
    },
    {
      key: "services",
      label: "Services",
      icon: <Layers className="text-cyan-500" />,
    },
    {
      key: "careers",
      label: "Carrière",
      icon: <Mail className="text-yellow-500" />,
    },
    {
      key: "payments",
      label: "Paiements",
      icon: <CreditCard className="text-emerald-500" />,
    },
    {
      key: "messages",
      label: "Messages",
      icon: <MessageSquare className="text-sky-500" />,
    },
    {
      key: "candidats",
      label: "Candidats",
      icon: <UserCheck className="text-lime-500" />,
    },
    {
      key: "settings",
      label: "Paramètres",
      icon: <Settings className="text-gray-500" />,
    },
  ];

  return (
    <ProtectedRoute allowedRole="admin_principal">
      <div className="flex min-h-screen relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-black">
        {/* 🌈 BACKGROUND */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_60%)]"></div>

        {/* 📱 BOUTON MOBILE */}
        <div className="md:hidden fixed top-4 left-4 z-50">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setMobileOpen(true)}
            className="bg-white/40 backdrop-blur-md shadow-md"
          >
            <Menu />
          </Button>
        </div>

        {/* 🖥️ SIDEBAR DESKTOP */}
        <aside
          className={`hidden md:flex flex-col transition-all duration-500
          ${sidebarOpen ? "w-64" : "w-20"}
          bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl
          border-r border-white/20 shadow-xl p-4`}
        >
          <Button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mb-6 bg-indigo-500 text-white hover:bg-indigo-600"
          >
            {sidebarOpen ? "⬅️ Réduire" : "➡️ Ouvrir"}
          </Button>

          <SidebarContent
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            sidebarOpen={sidebarOpen}
          />

          {sidebarOpen && (
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="mt-6 w-full gap-2"
            >
              <LogOut /> Déconnexion
            </Button>
          )}
        </aside>

        {/* 📱 SIDEBAR MOBILE */}
        {mobileOpen && (
          <>
            <aside className="fixed top-0 left-0 h-full w-64 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl p-6 z-50 animate-slideIn md:hidden">
              {/* fermer */}
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4"
              >
                <X />
              </button>

              <SidebarContent
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={(key:string) => {
                  setActiveTab(key);
                  setMobileOpen(false);
                }}
                sidebarOpen={true}
              />

              <Button
                onClick={handleLogout}
                variant="destructive"
                className="mt-6 w-full gap-2"
              >
                <LogOut /> Déconnexion
              </Button>
            </aside>

            {/* overlay */}
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setMobileOpen(false)}
            />
          </>
        )}

        {/* CONTENU */}
        <main className="flex-1 p-4 md:p-6 transition-all duration-500">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}

/* 🔁 COMPONENT NAV */
function SidebarContent({
  tabs,
  activeTab,
  setActiveTab,
  sidebarOpen,
}: SidebarContentProps) {
  return (
    <nav className="space-y-2 mt-6">
      {tabs.map((tab, i) => {
        const active = activeTab === tab.key;

        return (
          <Link key={i} href={`/admin_principal/${tab.key}`}>
            <button
              onClick={() => setActiveTab(tab.key)}
              className={`group w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all
              ${
                active
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105 [&_svg]:text-white"
                  : "hover:bg-indigo-100 dark:hover:bg-gray-800 dark:text-gray-200"
              }`}
            >
              <span className="p-2 rounded-lg bg-white/40 dark:bg-gray-800/40 backdrop-blur-md shadow-inner transition-transform duration-300 group-hover:scale-110">
                {tab.icon}
              </span>

              {sidebarOpen && <span className="font-medium">{tab.label}</span>}
            </button>
          </Link>
        );
      })}
    </nav>
  );
}
