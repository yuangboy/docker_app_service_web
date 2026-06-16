"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { useToast } from "@/src/hooks/use-toast";

export default function ResetPasswordPage() {
  const { toast } = useToast();
  const [form, setForm] = useState({ password: "", confirm: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.password.trim() || !form.confirm.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs.",
      });
      return;
    }
    if (form.password !== form.confirm) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
      });
      return;
    }
    // Ici tu connectes ton backend (API de réinitialisation)
    toast({
      title: "Mot de passe réinitialisé",
      description: "Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.",
    });
    setForm({ password: "", confirm: "" });
  };

  return (
    <section className="flex items-center justify-center min-h-screen 
                        bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl 
                      bg-white/80 dark:bg-gray-900/70 backdrop-blur-lg 
                      border border-gray-200 dark:border-gray-700">
        <AnimatedSection className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text 
                         bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            Réinitialiser le mot de passe
          </h1>
          <p className="mt-2 text-muted-foreground">
            Entrez votre nouveau mot de passe pour accéder à votre compte.
          </p>
        </AnimatedSection>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nouveau mot de passe */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-foreground">Nouveau mot de passe</label>
            <div className="flex items-center gap-2 rounded-xl bg-gray-50 dark:bg-gray-800 px-4 shadow-inner">
              <Lock className="h-5 w-5 text-muted-foreground" />
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="h-12 w-full bg-transparent text-sm text-foreground focus:outline-none"
                placeholder="Votre nouveau mot de passe"
              />
            </div>
          </div>

          {/* Confirmation */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-foreground">Confirmer le mot de passe</label>
            <div className="flex items-center gap-2 rounded-xl bg-gray-50 dark:bg-gray-800 px-4 shadow-inner">
              <Lock className="h-5 w-5 text-muted-foreground" />
              <input
                type="password"
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                className="h-12 w-full bg-transparent text-sm text-foreground focus:outline-none"
                placeholder="Confirmez votre mot de passe"
              />
            </div>
          </div>

          {/* Bouton réinitialiser */}
          <Button
            type="submit"
            size="lg"
            className="w-full px-6 py-3 text-white font-semibold rounded-xl 
                       bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                       shadow-lg hover:shadow-2xl transition-transform duration-300 
                       hover:scale-105 hover:-translate-y-1 flex items-center justify-center"
          >
            Réinitialiser
          </Button>
        </form>

        {/* Lien retour connexion */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Retour à{" "}
          <a href="/login" className="font-semibold text-blue-600 hover:underline">
            la connexion
          </a>
        </p>
      </div>
    </section>
  );
}