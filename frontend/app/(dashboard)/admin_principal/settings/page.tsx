"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";

type Theme = "light" | "dark";

export default function SettingsPage() {
  // =========================
  // 👤 COMPTE (backend)
  // =========================
  const [account, setAccount] = useState({
    name: "Admin",
    email: "admin@example.com",
    password: "",
  });

  // =========================
  // 🎨 THEME GLOBAL (PRO)
  // =========================
  const [theme, setTheme] = useState<Theme>("light");

  // Charger thème sauvegardé
  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as Theme) || "light";
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  // Fonction centrale (IMPORTANT)
  const applyTheme = (value: Theme) => {
    if (value === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", value);
  };

  // Changement de thème
  const handleThemeChange = (value: Theme) => {
    setTheme(value);
    applyTheme(value);
  };

  // =========================
  // HANDLERS COMPTE
  // =========================
  const handleAccountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Account saved:", account);
    alert("Paramètres enregistrés !");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* =========================
          👤 COMPTE
      ========================= */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          ⚙️ Paramètres du compte
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            value={account.name}
            onChange={handleAccountChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            placeholder="Nom"
          />

          <input
            type="email"
            name="email"
            value={account.email}
            onChange={handleAccountChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            placeholder="Email"
          />

          <input
            type="password"
            name="password"
            value={account.password}
            onChange={handleAccountChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            placeholder="Mot de passe"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Sauvegarder le compte
          </button>
        </form>
      </div>

      {/* =========================
          🎨 THEME GLOBAL
      ========================= */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          🎨 Thème global
        </h2>

        <select
          value={theme}
          onChange={(e) => handleThemeChange(e.target.value as Theme)}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        >
          <option value="light">☀️ Clair</option>
          <option value="dark">🌙 Sombre</option>
        </select>

        <p className="text-sm mt-3 text-gray-500 dark:text-gray-400">
          Le thème est appliqué sur toute l'application
        </p>
      </div>
    </div>
  );
}
