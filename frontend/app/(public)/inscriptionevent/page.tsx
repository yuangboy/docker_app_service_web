"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";

// Exemple de prix des événements
const eventPrices: Record<string, string> = {
  "novatech-summit-2026": "150",
  "workshop-react-avance": "0",
  "hackathon-ia-sante": "50",
  "meetup-devops": "0",
};

export default function InscriptionEventPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
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
    console.log("Inscription à l’événement :", formData);

    // Récupérer le montant automatiquement
    const montant = eventPrices[eventId] || "";

    // Redirection vers la page paiement avec la référence et le montant
    router.push(`/paiement?ref=${eventId}&montant=${montant}`);
  };

  return (
    <section className="section-padding min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-site max-w-3xl mx-auto">
        <AnimatedSection className="text-center mb-10">
          <h1 className="text-3xl font-bold">Inscription à l’événement</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Remplissez vos informations pour valider votre inscription.
          </p>
        </AnimatedSection>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-[70%] mx-auto"
        >
          <div>
            <label className="block text-sm font-semibold mb-1">Nom complet *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Téléphone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Adresse</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700"
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-md">
            ✅ Valider l’inscription
          </Button>
        </form>
      </div>
    </section>
  );
}