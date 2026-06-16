"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";

export default function PaiementPage() {
  const searchParams = useSearchParams();
  const refInscription = searchParams.get("ref") || "";
  const montantInitial = searchParams.get("montant") || "";

  const [formData, setFormData] = useState({
    typeInscription: "",
    reference: refInscription, // pré-rempli
    methodePaiement: "",
    montant: montantInitial,   // pré-rempli
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Paiement soumis :", formData);
  };

  return (
    <section className="section-padding min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container-site max-w-3xl mx-auto">
        <AnimatedSection className="text-center mb-10">
          <h1 className="text-3xl font-bold">Formulaire de Paiement</h1>
        </AnimatedSection>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-[70%] mx-auto"
        >
          <div>
            <label className="block text-sm font-semibold mb-1">Type d’inscription *</label>
            <select
              name="typeInscription"
              value={formData.typeInscription}
              onChange={handleChange}
              required
              className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700"
            >
              <option value="">-- Sélectionnez --</option>
              <option value="formation">Formation</option>
              <option value="evenement">Événement</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Référence *</label>
            <input
              type="text"
              name="reference"
              value={formData.reference}
              onChange={handleChange}
              required
              className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Méthode de paiement *</label>
            <select
              name="methodePaiement"
              value={formData.methodePaiement}
              onChange={handleChange}
              required
              className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700"
            >
              <option value="">-- Sélectionnez --</option>
              <option value="momo">Mobile Money (MoMo)</option>
              <option value="visa">Visa</option>
              <option value="paypal">paypal</option>
              <option value="stripe">stripe</option>
              <option value="cash">Espèces</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Montant *</label>
            <input
              type="number"
              name="montant"
              value={formData.montant}
              onChange={handleChange}
              required
              className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700"
            />
          </div>

          <Button type="submit" className="w-full bg-purple-600 text-white font-bold py-2 rounded-md">
            💳 Confirmer le paiement
          </Button>
        </form>
      </div>
    </section>
  );
}