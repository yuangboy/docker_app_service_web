"use client";
import React from "react";
import { Target, Eye, Award, Users } from "lucide-react";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";

const values = [
  {
    icon: <Target className="h-7 w-7" />,
    title: "Excellence",
    description:
      "Nous visons l'excellence dans chaque projet, chaque ligne de code, chaque interaction.",
    image: "/images/Cloud et infrastructure.png",
  },
  {
    icon: <Eye className="h-7 w-7" />,
    title: "Transparence",
    description:
      "Communication claire et honnête à chaque étape de la collaboration.",
    image: "/images/Cloud et infrastructure.png",
  },
  {
    icon: <Award className="h-7 w-7" />,
    title: "Innovation",
    description:
      "Nous explorons et adoptons les technologies les plus adaptées à vos défis.",
    image: "/images/Cloud et infrastructure.png",
  },
  {
    icon: <Users className="h-7 w-7" />,
    title: "Partenariat",
    description:
      "Votre succès est notre succès. Nous construisons des relations durables.",
    image: "/images/Cloud et infrastructure.png",
  },
];

const testimonials = [
  {
    name: "Jean Dupont",
    role: "CEO, StartUpX",
    feedback:
      "Colabing-group nous a accompagnés dans la refonte de notre infrastructure IT. Leur expertise et leur disponibilité ont été déterminantes pour notre croissance.",
    image: "/images/Cloud et infrastructure.png",
    rating: 5,
  },
  {
    name: "Sophie Martin",
    role: "Directrice Marketing, InnovAgency",
    feedback:
      "Une équipe à l’écoute, des solutions innovantes et un suivi impeccable. Nous avons trouvé en Colabin-group un véritable partenaire de confiance.",
    image: "/images/Cloud et infrastructure.png",
    rating: 5,
  },
  {
    name: "Aliou Kaba",
    role: "CTO, GlobalTech",
    feedback:
      "Grâce à Colabing-group, nous avons pu migrer vers le cloud en toute sérénité. Leur approche est pragmatique et orientée résultats.",
    image: "/images/Cloud et infrastructure.png",
    rating: 4,
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Section Intro */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="container-site">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-blue-600">
              À propos
            </p>
            <h1 className="mb-6 text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 drop-shadow-lg tracking-tight leading-tight">
              Nous construisons l'avenir numérique
            </h1>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Fondée en 2015, Colabing-group est une entreprise spécialisée dans
              les services IT. Notre équipe de plus de 20 experts accompagne les
              entreprises dans leur transformation numérique avec des solutions
              fiables, sécurisées et performantes.
            </p>
            <Link href="/services">
              <Button
                size="lg"
                className="mt-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500"
              >
                Découvrir nos services
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="section-padding bg-secondary/50">
        <div className="container-site">
          <AnimatedSection className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-foreground drop-shadow-md">
              Nos valeurs
            </h2>
          </AnimatedSection>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <AnimatedSection
                key={v.title}
                delay={i * 0.1}
                className="group text-center bg-white/80 dark:bg-gray-900/70 backdrop-blur-lg rounded-xl shadow-lg p-6 hover:shadow-2xl transition-transform hover:scale-105 border border-gray-200"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-md group-hover:rotate-6 transition-transform duration-500">
                  {v.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground group-hover:text-blue-600 transition-colors">
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                  {v.description}
                </p>
                <img
                  src={v.image}
                  alt={v.title}
                  className="w-full h-32 object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform duration-500"
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container-site">
          <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
            <AnimatedSection className="bg-white/80 dark:bg-gray-900/70 backdrop-blur-lg rounded-xl shadow-lg p-8 hover:shadow-2xl transition-transform hover:scale-105">
              <img
                src="/images/Cloud et infrastructure.png"
                alt="Notre mission"
                className="w-full h-48 object-cover rounded-lg mb-6 shadow-md hover:scale-105 transition-transform duration-500"
              />
              <h2 className="mb-4 text-2xl font-bold text-blue-700">
                Notre mission
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                Fournir des solutions technologiques sur mesure qui permettent
                aux entreprises de se concentrer sur leur cœur de métier tout en
                bénéficiant d'une infrastructure IT robuste et évolutive.
              </p>
            </AnimatedSection>

            <AnimatedSection
              delay={0.1}
              className="bg-white/80 dark:bg-gray-900/70 backdrop-blur-lg rounded-xl shadow-lg p-8 hover:shadow-2xl transition-transform hover:scale-105"
            >
              <img
                src="/images/Cloud et infrastructure.png"
                alt="Notre vision"
                className="w-full h-48 object-cover rounded-lg mb-6 shadow-md hover:scale-105 transition-transform duration-500"
              />
              <h2 className="mb-4 text-2xl font-bold text-blue-700">
                Notre vision
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                Devenir le partenaire IT de référence en accompagnant les
                entreprises dans leur croissance grâce à des solutions
                innovantes, fiables et accessibles.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
        <div className="container-site">
          {/* Header */}
          <AnimatedSection className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-foreground drop-shadow-md">
              Témoignages
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez ce que nos clients disent de nous et pourquoi ils nous
              font confiance pour leurs projets numériques.
            </p>
          </AnimatedSection>

          {/* Grid */}
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <AnimatedSection
                key={t.name}
                delay={i * 0.1}
                className="group bg-white/80 dark:bg-gray-900/70 backdrop-blur-lg rounded-xl shadow-lg p-6 hover:shadow-2xl transition-transform hover:scale-105 border border-gray-200"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="h-14 w-14 rounded-full object-cover shadow-md group-hover:scale-105 transition-transform duration-500"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-blue-600 transition-colors">
                      {t.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                  "{t.feedback}"
                </p>
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="h-5 w-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
