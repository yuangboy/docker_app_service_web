"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TrendingUp,
  Users,
  Folder,
  FileText,
  Briefcase,
  CreditCard,
  Euro,
  ArrowLeft, // ✅ AJOUT
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import AnimatedSection from "@/src/components/shared/AnimateSection";

export default function AdminDashboard() {
  const router = useRouter(); // ✅ AJOUT

  const [data] = useState({
    users: ["John", "Marie", "Admin"],
    projects: ["Site web", "App mobile"],
    blogs: ["Article 1", "Article 2"],
    careers: [{}, {}],
    payments: [
      { type: "Formation", amount: 100 },
      { type: "Événement", amount: 50 },
    ],
  });

  const COLORS = ["#6366F1", "#F59E0B"];

  const totalRevenue = data.payments.reduce((acc, p) => acc + p.amount, 0);

  const paymentStats = [
    {
      name: "Formation",
      value: data.payments.filter((p) => p.type === "Formation").length,
    },
    {
      name: "Événement",
      value: data.payments.filter((p) => p.type === "Événement").length,
    },
  ];

  const paymentTrend = [
    { day: "Lun", Formation: 2, Événement: 1 },
    { day: "Mar", Formation: 1, Événement: 2 },
    { day: "Mer", Formation: 3, Événement: 1 },
    { day: "Jeu", Formation: 1, Événement: 2 },
    { day: "Ven", Formation: 2, Événement: 1 },
  ];

  return (
    <main className="space-y-10 p-4 md:p-8 bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-950 dark:to-gray-900 min-h-screen">
      {/* HEADER */}
      <AnimatedSection>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              Dashboard
              <span className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </span>
            </h1>

            <div className="text-sm text-gray-500">Bienvenue 👋</div>
          </div>

          {/* 🔙 BOUTON RETOUR */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 w-fit px-3 py-1.5 rounded-lg
            bg-white/40 dark:bg-gray-800/40 backdrop-blur-md
            hover:bg-white/60 dark:hover:bg-gray-700
            transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au site
          </button>
        </div>
      </AnimatedSection>

      {/* STATS */}
      <AnimatedSection>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              label: "Utilisateurs",
              value: data.users.length,
              icon: Users,
              color: "from-blue-500 to-indigo-500",
            },
            {
              label: "Projets",
              value: data.projects.length,
              icon: Folder,
              color: "from-green-500 to-emerald-500",
            },
            {
              label: "Blogs",
              value: data.blogs.length,
              icon: FileText,
              color: "from-pink-500 to-rose-500",
            },
            {
              label: "Candidats",
              value: data.careers.length,
              icon: Briefcase,
              color: "from-orange-500 to-amber-500",
            },
            {
              label: "Paiements",
              value: data.payments.length,
              icon: CreditCard,
              color: "from-purple-500 to-violet-500",
            },
            {
              label: "Revenu",
              value: `${totalRevenue}€`,
              icon: Euro,
              color: "from-cyan-500 to-blue-500",
              span: "col-span-2",
            },
          ].map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className={`
                  relative overflow-hidden p-5 rounded-2xl text-white
                  bg-gradient-to-br ${item.color}
                  shadow-lg hover:shadow-2xl
                  transition duration-300 hover:-translate-y-2 hover:scale-[1.02]
                  ${item.span || ""}
                `}
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-20 transition duration-300 rounded-2xl"></div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-80">{item.label}</p>
                    <p className="text-3xl font-bold mt-2">{item.value}</p>
                  </div>

                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-md shadow-inner">
                    <Icon className="w-6 h-6 opacity-90" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </AnimatedSection>

      {/* GRAPHIQUES */}
      <AnimatedSection className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-lg border border-white/20 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">
            Répartition des paiements
          </h3>

          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={paymentStats}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                {paymentStats.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="p-6 rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-lg border border-white/20 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Tendance des paiements</h3>

          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={paymentTrend}>
              <XAxis dataKey="day" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="Formation"
                stroke="#6366F1"
                strokeWidth={3}
                dot={{ r: 4 }}
              />

              <Line
                type="monotone"
                dataKey="Événement"
                stroke="#F59E0B"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </AnimatedSection>
    </main>
  );
}
