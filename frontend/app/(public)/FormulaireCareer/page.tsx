"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";

export default function ApplyFormPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    motivation: "",
    cvLink: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulaire soumis :", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="section-padding bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container-site max-w-4xl mx-auto">
        <AnimatedSection className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white drop-shadow-lg mb-4">
            Formulaire de Candidature
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-300">
            Remplissez ce formulaire pour postuler à un poste chez NovaTech.
          </p>
        </AnimatedSection>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-gradient-to-tr from-gray-50 via-white to-gray-100 
                     dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 
                     p-8 rounded-2xl shadow-2xl relative flex flex-col items-center 
                     w-3/5 mx-auto transition-transform duration-300 
                     hover:scale-[1.02] hover:shadow-blue-300"
        >
          {/* Nom complet */}
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Nom complet *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 
                         px-3 py-2 text-sm shadow-md focus:ring-2 focus:ring-blue-300 
                         focus:border-blue-400 transition-all hover:border-blue-400 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Email */}
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 
                         px-3 py-2 text-sm shadow-md focus:ring-2 focus:ring-blue-300 
                         focus:border-blue-400 transition-all hover:border-blue-400 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Numéro de téléphone */}
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Numéro de téléphone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 
                         px-3 py-2 text-sm shadow-md focus:ring-2 focus:ring-blue-300 
                         focus:border-blue-400 transition-all hover:border-blue-400 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Poste souhaité */}
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Poste souhaité
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 
                         px-3 py-2 text-sm shadow-md focus:ring-2 focus:ring-blue-300 
                         focus:border-blue-400 transition-all hover:border-blue-400 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Années d’expérience */}
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Années d’expérience
            </label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 
                         px-3 py-2 text-sm shadow-md focus:ring-2 focus:ring-blue-300 
                         focus:border-blue-400 transition-all hover:border-blue-400 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Lettre de motivation */}
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Lettre de motivation
            </label>
            <textarea
              name="motivation"
              value={formData.motivation}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 
                         px-3 py-2 text-sm shadow-md focus:ring-2 focus:ring-blue-300 
                         focus:border-blue-400 transition-all hover:border-blue-400 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            ></textarea>
          </div>

          {/* Lien du CV */}
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Lien du CV
            </label>
            <input
              type="url"
              name="cvLink"
              value={formData.cvLink}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 
                         px-3 py-2 text-sm shadow-md focus:ring-2 focus:ring-blue-300 
                         focus:border-blue-400 transition-all hover:border-blue-400 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Bouton de soumission */}
          <div className="w-full">
            <Button
              type="submit"
              size="sm"
              className="relative w-full bg-gradient-to-r from-blue-400 to-blue-500 
                         text-white font-bold shadow-md hover:shadow-lg hover:scale-105 
                         transition-all duration-300 rounded-md px-4 py-2 text-sm"
            >
              Envoyer la candidature
            </Button>
          </div>
        </form>

        {/* Confirmation visuelle animée */}
        {submitted && (
          <div className="mt-4 text-center animate-bounce">
            <p className="inline-block px-4 py-2 rounded-md bg-green-500 text-white font-bold shadow-md text-sm">
              ✅ Candidature envoyée avec succès !
            </p>
          </div>
        )}
      </div>
    </section>
  );
}