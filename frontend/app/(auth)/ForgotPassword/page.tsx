"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { useToast } from "@/src/hooks/use-toast";

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer votre adresse email.",
      });
      return;
    }
    // Ici tu connectes ton backend (API de réinitialisation)
    toast({
      title: "Lien envoyé",
      description: "Vérifiez votre boîte mail pour réinitialiser votre mot de passe.",
    });
    setEmail("");
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
            Mot de passe oublié
          </h1>
          <p className="mt-2 text-muted-foreground">
            Entrez votre email pour recevoir un lien de réinitialisation.
          </p>
        </AnimatedSection>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-foreground">Email</label>
            <div className="flex items-center gap-2 rounded-xl bg-gray-50 dark:bg-gray-800 px-4 shadow-inner">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 w-full bg-transparent text-sm text-foreground focus:outline-none"
                placeholder="votre@email.com"
              />
            </div>
          </div>

          {/* Bouton envoyer */}
          <Button
            type="submit"
            size="lg"
            className="w-full px-6 py-3 text-white font-semibold rounded-xl 
                       bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                       shadow-lg hover:shadow-2xl transition-transform duration-300 
                       hover:scale-105 hover:-translate-y-1 flex items-center justify-center"
          >
            Envoyer le lien
          </Button>
        </form>

        {/* Lien retour connexion */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Vous vous souvenez de votre mot de passe ?{" "}
          <a href="/login" className="font-semibold text-blue-600 hover:underline">
            Connectez-vous
          </a>
        </p>
      </div>
    </section>
  );
}