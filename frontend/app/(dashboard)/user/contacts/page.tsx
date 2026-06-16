"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    alert("Message envoyé ! Nous vous répondrons dans les plus brefs délais.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        {/* Titre */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
            Contact
          </p>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Entrons en contact
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Remplissez le formulaire ou contactez-nous directement.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* Infos */}
          <div className="space-y-6 lg:col-span-2">
            {[
              {
                icon: <Mail className="h-7 w-7" />,
                title: "Email",
                value: "contact@novatech.com",
              },
              {
                icon: <Phone className="h-7 w-7" />,
                title: "Téléphone",
                value: "+33 1 23 45 67 89",
              },
              {
                icon: <MapPin className="h-7 w-7" />,
                title: "Adresse",
                value: "42 Avenue de l'Innovation\n75008 Paris, France",
              },
            ].map((info, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg">
                  {info.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {info.title}
                  </h3>
                  <p className="text-sm whitespace-pre-line text-gray-600 dark:text-gray-300">
                    {info.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Formulaire */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col">
                  <label className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                    Nom *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="h-12 w-full rounded-xl bg-gray-100 dark:bg-gray-700 px-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Votre nom"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="h-12 w-full rounded-xl bg-gray-100 dark:bg-gray-700 px-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                  Sujet
                </label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                  className="h-12 w-full rounded-xl bg-gray-100 dark:bg-gray-700 px-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Sujet de votre message"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                  Message *
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  rows={6}
                  className="w-full rounded-xl bg-gray-100 dark:bg-gray-700 px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Décrivez votre projet ou posez votre question..."
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white"
              >
                Envoyer <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>

        {/* Carte Google Maps */}
        <div className="mt-16 w-full h-[600px] rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d13781.06414867077!2d15.253129233926591!3d-4.24095058136632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNMKwMTQnMjcuNSJTIDE1wrAxNicxNy43IkU!5e1!3m2!1sfr!2scg!4v1774003544336!5m2!1sfr!2scg"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
