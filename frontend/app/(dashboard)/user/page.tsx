"use client";

import { useState, useEffect, useRef } from "react";
import {useRouter } from "next/navigation";
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
  Bell,
  Sun,
  Moon,
  Globe,
  Clock,
  ArrowLeft,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";

export default function UserDashboard() {
  // const pathname = usePathname();
  const router = useRouter();
const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("FR");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [user, setUser] = useState(null);

  // const [payments, setPayments] = useState([]);
  // const [paymentsLoading, setPaymentsLoading] = useState(true);

  // const role = "admin";

  // useEffect(() => {
  //   fetch("/api/user")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setUser(data);
  //       setLoading(false);
  //     });
  // }, []);

  // useEffect(() => {
  //   fetch("/api/payments")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setPayments(data);
  //       setPaymentsLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

useEffect(() => {
  const handleClick = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      e.target instanceof Node &&
      !dropdownRef.current.contains(e.target)
    ) {
      setNotificationsOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClick);
  return () => document.removeEventListener("mousedown", handleClick);
}, []);


  // const allMenu = [
  //   {
  //     icon: <Home />,
  //     label: "Accueil",
  //     path: "/dashboard",
  //     roles: ["user", "admin"],
  //   },
  //   {
  //     icon: <BookOpen />,
  //     label: "Formations",
  //     path: "/Dashboad/formationsUser",
  //     roles: ["user", "admin"],
  //   },
  //   {
  //     icon: <Calendar />,
  //     label: "Événements",
  //     path: "/Dashboad/eventsUser",
  //     roles: ["user", "admin"],
  //   },
  //   {
  //     icon: <ClipboardList />,
  //     label: "Projets",
  //     path: "/Dashboad/projectsUser",
  //     roles: ["user", "admin"],
  //   },
  //   {
  //     icon: <Settings />,
  //     label: "Paramètres",
  //     path: "/settings",
  //     roles: ["user", "admin"],
  //   },
  //   {
  //     icon: <Briefcase />,
  //     label: "Carrière",
  //     path: "/Dashboad/careersUser",
  //     roles: ["admin"],
  //   },
  //   {
  //     icon: <Layers />,
  //     label: "Services",
  //     path: "/Dashboad/servicesUser",
  //     roles: ["admin"],
  //   },
  //   {
  //     icon: <PenTool />,
  //     label: "Blog",
  //     path: "/Dashboad/blogsUser",
  //     roles: ["admin"],
  //   },
  //   { icon: <FileText />, label: "Devis", path: "/devis", roles: ["admin"] },
  // ];

  // const menuItems = allMenu.filter((item) => item.roles.includes(role));

  const activities = [
    "Connexion réussie",
    "Inscription React",
    "Participation Tech Summit",
    "Mise à jour du profil",
  ];

  const chartData = [
    { name: "Lun", value: 4 },
    { name: "Mar", value: 7 },
    { name: "Mer", value: 3 },
    { name: "Jeu", value: 9 },
    { name: "Ven", value: 6 },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-black">
      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}

        {/* 🔙 BOUTON RETOUR */}

        <header
          className="flex justify-between items-center px-6 py-4 
                           bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700"
        >
          <div className="">
            <button
              onClick={() => router.push("/")}
              className=" flex items-center gap-2 w-fit px-3 py-1.5 rounded-lg
            bg-base-200 dark:bg-gray-800/40 backdrop-blur-md
            hover:bg-white/60 dark:hover:bg-gray-700
            transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au site
            </button>
          </div>

          <div className="flex gap-3 items-center">
            <Button
              variant="ghost"
              onClick={() => setDarkMode(!darkMode)}
              className="hover:scale-110 transition"
            >
              {darkMode ? (
                <Sun className="text-yellow-400" />
              ) : (
                <Moon className="text-indigo-500" />
              )}
            </Button>

            <Button
              variant="ghost"
              onClick={() => setLanguage(language === "FR" ? "EN" : "FR")}
              className="hover:scale-110 transition"
            >
              <Globe className="text-blue-500" /> {language}
            </Button>

            <div className="relative" ref={dropdownRef}>
              <Button
                variant="ghost"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="hover:scale-110 transition"
              >
                <Bell className="text-pink-500" />
              </Button>
            </div>

            {/* {loading ? (
              <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse" />
            ) : (
                  <>
              <img
                src={user?.avatar}
                className="w-8 h-8 rounded-full ring-2 ring-indigo-500"
              />
              djdjdjjdjdd
                  </>
            )} */}
          </div>
        </header>

        {/* CONTENT */}
        <main className="p-6 md:p-10 space-y-10">
          {/* STATS */}
          <AnimatedSection className="grid md:grid-cols-3 gap-6">
            {["Formations", "Projets", "Événements"].map((item, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 
                                      dark:from-indigo-900/30 dark:to-purple-900/30 
                                      shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <h3 className="text-sm text-gray-600 dark:text-gray-400">
                  {item}
                </h3>
                <p className="text-3xl font-extrabold mt-2 text-indigo-700 dark:text-indigo-300">
                  {loading ? "..." : Math.floor(Math.random() * 10) + 1}
                </p>
                <span className="text-xs text-green-600 dark:text-green-400">
                  ↑ +12% cette semaine
                </span>
              </div>
            ))}
          </AnimatedSection>

          {/* CHART */}
          <AnimatedSection>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#6366f1" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </AnimatedSection>

          {/* PAYMENTS */}
          {/* <AnimatedSection>
            <h2 className="font-semibold text-lg mb-4">
              Historique des paiements
            </h2>
            <div className="overflow-x-auto rounded-xl bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl shadow-lg">
              <table className="w-full text-sm">
                <thead className="bg-indigo-100 dark:bg-indigo-900/40">
                  <tr>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Montant</th>
                    <th className="p-3 text-left">Méthode</th>
                    <th className="p-3 text-left">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentsLoading ? (
                    <tr>
                      <td className="p-4" colSpan={4}>
                        Chargement...
                      </td>
                    </tr>
                  ) : payments.length === 0 ? (
                    <tr>
                      <td className="p-4" colSpan={4}>
                        Aucun paiement
                      </td>
                    </tr>
                  ) : (
                    payments.map((p, i) => (
                      <tr
                        key={i}
                        className="border-t border-gray-200 dark:border-gray-700"
                      >
                        <td className="p-3">
                          {new Date(p.date).toLocaleDateString()}
                        </td>
                        <td className="p-3 font-bold text-indigo-600 dark:text-indigo-300">
                          {p.amount} €
                        </td>
                        <td className="p-3">{p.method}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              p.status === "success"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {p.status === "success" ? "Succès" : "Échec"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </AnimatedSection> */}

          {/* ACTIVITIES */}
          <AnimatedSection>
            <h2 className="flex items-center gap-2 font-semibold text-lg mb-4">
              <Clock className="text-indigo-500" /> Activités récentes
            </h2>
            <div className="relative border-l-2 border-indigo-300 dark:border-indigo-600 pl-6 space-y-4">
              {activities.map((a, i) => (
                <div key={i} className="relative">
                  <span className="absolute -left-3 top-2 w-3 h-3 rounded-full bg-indigo-500 dark:bg-indigo-400"></span>
                  <div className="p-4 rounded-xl bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl shadow-md hover:shadow-lg transition">
                    {a}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </main>
      </div>
    </div>
  );
}
