"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { useTheme } from "@/context/ThemeContext";

const eventPrices: Record<string, string> = {
  "novatech-summit-2026": "150",
  "workshop-react-avance": "0",
  "hackathon-ia-sante": "50",
  "meetup-devops": "0",
};

export default function InscriptionEventPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { darkMode } = useTheme();
  const eventId = searchParams.get("ref") || "";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const montant = eventPrices[eventId] || "";
    router.push(`/paiement?ref=${eventId}&montant=${montant}`);
  };

  return (
    <section
      className={`section-padding min-h-screen bg-gradient-to-br ${
        darkMode
          ? "from-gray-900 via-gray-800 to-black"
          : "from-indigo-50 via-white to-gray-100"
      }`}
    >
      <div className="container-site">
        {/* HEADER */}
        <AnimatedSection className="mx-auto mb-12 max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">
            Inscription à l’événement
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Remplissez vos informations pour valider votre inscription.
          </p>
        </AnimatedSection>

        {/* FORM */}
        <AnimatedSection delay={0.1} className="mx-auto max-w-3xl">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl bg-white/80 dark:bg-gray-900/70 backdrop-blur-lg p-8 shadow-lg border border-gray-200"
          >
            {/* NOM */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Nom complet *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent dark:bg-gray-700"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent dark:bg-gray-700"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Téléphone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-2 w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent dark:bg-gray-700"
              />
            </div>

            {/* ADDRESS */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Adresse
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-2 w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent dark:bg-gray-700"
              />
            </div>

            {/* PRIX */}
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg text-center font-semibold shadow-md">
              🎟️ Prix de participation :
              <span className="ml-2 text-pink-600">
                {eventPrices[eventId] === "0"
                  ? "Gratuit"
                  : `${eventPrices[eventId] || "0"} FCFA`}
              </span>
            </div>

            {/* SUBMIT */}
            <div className="text-center">
              <Button
                type="submit"
                size="lg"
                className="bg-gradient-to-r from-accent to-purple-600 text-white hover:from-purple-600 hover:to-accent transition-all duration-500 shadow-lg cursor-pointer"
              >
                ✅ Valider l’inscription
              </Button>
            </div>
          </form>
        </AnimatedSection>
      </div>
    </section>
  );
}
