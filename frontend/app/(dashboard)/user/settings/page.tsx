"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Globe, User, Lock, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";

export default function UserSettings() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("FR");

  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch user
  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      });
  }, []);

  // Theme init
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setDarkMode(true);
  }, []);

  // Apply theme
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleSave = async () => {
    setSaving(true);

    await fetch("/api/settings", {
      method: "POST",
      body: JSON.stringify({
        user,
        passwords,
        preferences: { darkMode, language },
      }),
    });

    setSaving(false);
    alert("Paramètres enregistrés ✅");
  };

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black space-y-10">
      {/* TITLE */}
      <h1 className="text-2xl font-bold">Paramètres</h1>

      {/* PROFILE */}
      <AnimatedSection className="p-6 rounded-2xl bg-white/70 dark:bg-gray-900/70 shadow space-y-4">
        <h2 className="flex items-center gap-2 font-semibold">
          <User /> Profil
        </h2>

        {loading ? (
          <p>Chargement...</p>
        ) : (
          <>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              placeholder="Nom"
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800"
            />

            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800"
            />

            <input
              type="text"
              value={user.avatar}
              onChange={(e) => setUser({ ...user, avatar: e.target.value })}
              placeholder="URL Avatar"
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800"
            />
          </>
        )}
      </AnimatedSection>

      {/* PASSWORD */}
      <AnimatedSection className="p-6 rounded-2xl bg-white/70 dark:bg-gray-900/70 shadow space-y-4">
        <h2 className="flex items-center gap-2 font-semibold">
          <Lock /> Mot de passe
        </h2>

        <input
          type="password"
          placeholder="Mot de passe actuel"
          value={passwords.current}
          onChange={(e) =>
            setPasswords({ ...passwords, current: e.target.value })
          }
          className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800"
        />

        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={passwords.new}
          onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
          className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800"
        />
      </AnimatedSection>

      {/* PREFERENCES */}
      <AnimatedSection className="p-6 rounded-2xl bg-white/70 dark:bg-gray-900/70 shadow space-y-4">
        <h2 className="font-semibold">Préférences</h2>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            {darkMode ? <Sun /> : <Moon />} Thème
          </span>
          <Button onClick={() => setDarkMode(!darkMode)} variant="outline">
            {darkMode ? "Clair" : "Sombre"}
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Globe /> Langue
          </span>
          <Button
            onClick={() => setLanguage(language === "FR" ? "EN" : "FR")}
            variant="outline"
          >
            {language}
          </Button>
        </div>
      </AnimatedSection>

      {/* SAVE */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          <Save className="mr-2" />
          {saving ? "Enregistrement..." : "Sauvegarder"}
        </Button>
      </div>
    </div>
  );
}
