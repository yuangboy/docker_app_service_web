"use client";

import React, { useEffect, useState } from "react";
import AnimatedSection from "@/src/components/shared/AnimateSection";

export default function ViewUserPage() {
  const [user, setUser] = useState<any>(null);

  // 👉 Simulation fetch user
  useEffect(() => {
    const data = {
      name: "John Doe",
      email: "john@email.com",
      role: "admin",
      is_active: true,
      avatar_url: "https://via.placeholder.com/150",
      created_at: "2024-01-01",
    };

    setUser(data);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Chargement...
      </div>
    );
  }

  return (
    <section className="section-padding min-h-screen bg-gradient-to-br from-indigo-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      
      <div className="container-site">
        
        {/* HEADER */}
        <AnimatedSection className="mx-auto mb-12 max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">
            Détails de l'utilisateur
          </h1>
          <p className="mt-4 text-muted-foreground">
            Informations complètes de l'utilisateur.
          </p>
        </AnimatedSection>

        {/* CARD */}
        <div className="mx-auto max-w-2xl space-y-6 rounded-xl border border-gray-200 bg-white/80 dark:bg-gray-900/70 p-8 shadow-lg backdrop-blur-lg">
          
          {/* AVATAR */}
          <div className="flex justify-center">
            <img
              src={user.avatar_url}
              alt="Avatar"
              className="h-32 w-32 rounded-full object-cover border"
            />
          </div>

          {/* INFOS */}
          <div className="space-y-4">
            
            <div>
              <p className="text-sm text-gray-500">Nom</p>
              <p className="text-lg font-semibold">{user.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg font-semibold">{user.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Rôle</p>
              <span className="inline-block px-3 py-1 text-sm rounded-full bg-accent/10 text-accent">
                {user.role}
              </span>
            </div>

            <div>
              <p className="text-sm text-gray-500">Statut</p>
              <span
                className={`inline-block px-3 py-1 text-sm rounded-full ${
                  user.is_active
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {user.is_active ? "Actif" : "Inactif"}
              </span>
            </div>

            <div>
              <p className="text-sm text-gray-500">Date de création</p>
              <p className="text-lg font-semibold">{user.created_at}</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}