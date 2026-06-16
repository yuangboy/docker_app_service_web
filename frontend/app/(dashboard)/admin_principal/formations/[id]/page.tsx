"use client";
import React, { useState, useEffect } from "react";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { Button } from "@/components/ui/button";

export default function VueFormationPage() {
  // Exemple de données (à remplacer par un fetch vers ton backend)
  const [formation, setFormation] = useState({
    title: "Formation React",
    description: "Apprenez les bases de React et Next.js.",
    image_url: "/images/react-course.png",
    price: "200",
    currency: "EUR",
    duration: "40h",
    start_date: "2026-04-01",
    end_date: "2026-04-30",
    max_participants: "20",
    max_participants_online: "10",
    max_participants_hybride: "5",
    formateur: "John Doe",
    is_active: true,
  });

  useEffect(() => {
    // Ici tu peux récupérer les données de la formation depuis ton backend
    // Exemple : fetch(`/api/formations/${id}`).then(...).then(data => setFormation(data))
  }, []);

  return (
    <section className="section-padding min-h-screen bg-gradient-to-br from-indigo-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <div className="container-site">
        <AnimatedSection className="mx-auto mb-12 max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">
            Détails de la Formation
          </h1>
          <p className="mt-4 text-muted-foreground">
            Consultez les informations de la formation ci-dessous.
          </p>
        </AnimatedSection>

        <div className="mx-auto max-w-2xl space-y-6 rounded-xl border border-gray-200 bg-white/80 dark:bg-gray-900/70 p-8 shadow-lg backdrop-blur-lg">
          {/* Image */}
          {formation.image_url && (
            <img
              src={formation.image_url}
              alt={formation.title}
              className="w-full h-60 object-cover rounded-lg border mb-6"
            />
          )}

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {formation.title}
          </h2>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300">{formation.description}</p>

          {/* Formateur */}
          <div className="mt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Formateur</p>
            <p className="font-medium">{formation.formateur}</p>
          </div>

          {/* Infos */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Prix</p>
              <p className="font-medium">
                {formation.price} {formation.currency}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Durée</p>
              <p className="font-medium">{formation.duration}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Date début</p>
              <p className="font-medium">{formation.start_date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Date fin</p>
              <p className="font-medium">{formation.end_date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Participants max</p>
              <p className="font-medium">{formation.max_participants}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Participants online</p>
              <p className="font-medium">{formation.max_participants_online}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Participants hybride</p>
              <p className="font-medium">{formation.max_participants_hybride}</p>
            </div>
          </div>

          {/* Statut */}
          <div className="mt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">Statut</p>
            <p
              className={`font-medium ${
                formation.is_active ? "text-green-600" : "text-red-600"
              }`}
            >
              {formation.is_active ? "Active" : "Inactive"}
            </p>
          </div>

          {/* Boutons d’action */}
          <div className="mt-8 flex gap-4">
            <Button className="flex-1 bg-gradient-to-r from-accent to-purple-600 text-white hover:from-purple-600 hover:to-accent transition-all duration-500 shadow-md">
              Modifier
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-accent text-accent hover:bg-accent hover:text-white transition-all duration-500"
            >
              Supprimer
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}