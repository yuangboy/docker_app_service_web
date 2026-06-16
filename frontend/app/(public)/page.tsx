"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";

const stats = [
  { value: "45+", label: "Experts IT" },
  { value: "12+", label: "Années d'expérience" },
  { value: "200+", label: "Projets réalisés" },
  { value: "100%", label: "Clients satisfaits" },
];

const services = [
  {
    title: "Développement Web",
    description: "Sites modernes, performants et sécurisés.",
    image: "/images/Developpement logiciel.png",
    icon: <ArrowRight className="h-5 w-5" />,
  },
  {
    title: "Cloud & DevOps",
    description: "Automatisation et déploiement continu.",
    image: "/images/Cloud et infrastructure.png",
    icon: <ArrowRight className="h-5 w-5" />,
  },
  {
    title: "Cybersécurité",
    description: "Protégez vos données et vos systèmes.",
    image: "../../images/Cybersécurité.png",
    icon: <ArrowRight className="h-5 w-5" />,
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative section-padding 
                          bg-gradient-to-b from-gray-50 via-white to-gray-100 
                          dark:from-gray-900 dark:via-gray-800 dark:to-black"
      >
        {/* Motif animé en arrière-plan */}
        <div
          className="absolute inset-0 bg-[url('/images/pattern-tech.svg')] bg-cover bg-center 
                        opacity-10 pointer-events-none animate-pulse dark:opacity-20"
        />

        <div className="container-site relative z-10">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-wide text-accent">
              Solutions IT Professionnelles
            </p>

            <h1 className="mb-6 text-4xl font-bold leading-[1.1] text-foreground sm:text-5xl lg:text-6xl">
              Expertise en ingénierie.{" "}
              <span
                className="text-transparent bg-clip-text 
                              bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
              >
                Partenariat
              </span>{" "}
              en pratique.
            </h1>

            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              Colabing-group conçoit des solutions technologiques fiables qui
              accélèrent la croissance de votre entreprise. Du développement au
              déploiement, nous sommes votre partenaire IT.
            </p>

            {/* Boutons futuristes */}
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/login">
                <Button
                  size="lg"
                  className="relative px-6 py-3 text-white font-semibold rounded-lg
                            bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600
                            shadow-[0_4px_14px_rgba(0,0,0,0.25)]
                            hover:shadow-[0_8px_20px_rgba(0,0,0,0.35)]
                            hover:scale-105 hover:-translate-y-1
                            transition-all duration-300 ease-out
                            active:translate-y-[2px] active:shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
                >
                  Demander un devis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link href="/services">
                <Button
                  variant="secondary"
                  size="lg"
                  className="relative px-6 py-3 font-semibold rounded-lg
                            bg-white/20 backdrop-blur-md border border-white/30
                            hover:scale-105 hover:-translate-y-1 transition-all duration-300
                            text-foreground dark:bg-gray-800/40 dark:border-gray-700 dark:text-white"
                >
                  Découvrir nos services
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
      {/* À propos de nous */}
      <section className="section-padding bg-gradient-to-b from-gray-100 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-black relative">
        <div className="absolute inset-0 bg-[url('/images/pattern-tech.svg')] bg-cover opacity-5 pointer-events-none" />
        <div className="container-site relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Colonne gauche : images futuristes */}
          <div className="grid grid-rows-2 gap-6">
            <div className="relative group overflow-hidden rounded-xl shadow-xl bg-white/10 dark:bg-gray-800/40 backdrop-blur-lg">
              <img
                src="/images/notre mission.jpg"
                alt="Notre mission"
                className="clip-triangle h-72 w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-[2deg]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 text-white drop-shadow-lg">
                <h3 className="text-lg font-semibold">Notre mission</h3>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="relative group overflow-hidden rounded-xl shadow-xl bg-white/10 dark:bg-gray-800/40 backdrop-blur-lg">
                <img
                  src="/images/equipe.png"
                  alt="Notre équipe"
                  className="clip-triangle h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-[2deg]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 text-white drop-shadow-lg">
                  <h3 className="text-lg font-semibold">Notre équipe</h3>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-xl shadow-xl bg-white/10 dark:bg-gray-800/40 backdrop-blur-lg">
                <img
                  src="/images/innovation1.png"
                  alt="Innovation"
                  className="clip-triangle h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-[2deg]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 text-white drop-shadow-lg">
                  <h3 className="text-lg font-semibold">Innovation</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne droite : texte et bouton premium */}
          <AnimatedSection className="lg:mt-2 text-center lg:text-left">
            <p className="mb-2 text-sm font-medium uppercase tracking-wide text-accent">
              À propos de nous
            </p>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Qui sommes-nous ?
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              NovaTech est une équipe passionnée d’experts IT qui conçoit des
              solutions innovantes et sécurisées pour accompagner la
              transformation digitale des entreprises.
            </p>

            {/* Bloc EXPERIENCE + VALEURS */}
            <div className="mt-8 flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-6">
              {/* Expérience */}
              <div className="text-center md:text-left">
                <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 drop-shadow-lg">
                  5+
                </div>
                <p className="mt-1 text-sm text-muted-foreground uppercase tracking-wide">
                  Ans d'expérience
                </p>
              </div>

              {/* Ligne verticale */}
              <div className="hidden md:block h-20 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

              {/* Valeurs */}
              <div className="grid grid-cols-1 gap-2 text-sm text-muted-foreground">
                {[
                  "Innovation",
                  "Fiabilité",
                  "Engagement client",
                  "Professionnalisme",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 group hover:text-foreground transition"
                  >
                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 group-hover:scale-125 transition"></span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Bouton premium futuriste */}
            <div className="mt-8">
              <Link href="/about">
                <Button
                  className="relative px-6 py-3 text-white font-semibold rounded-lg 
                            bg-gradient-to-r from-pink-500 via-blue-500 to-purple-600 
                            shadow-[0_4px_14px_rgba(0,0,0,0.25)] 
                            hover:shadow-[0_8px_20px_rgba(0,0,0,0.35)] 
                            hover:scale-105 hover:-translate-y-1 
                            transition-all duration-300 ease-out
                            active:translate-y-[2px] active:shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
                >
                  En savoir plus
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
      {/* Stats */}
      <section className="border-y border-border bg-gradient-to-r from-secondary/40 to-secondary/20 relative">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-cover opacity-5 pointer-events-none" />
        <div className="container-site py-12 relative z-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <AnimatedSection
                key={stat.label}
                delay={i * 0.1}
                className="text-center"
              >
                <div className="text-4xl font-extrabold tabular-nums text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transition hover:scale-110 hover:drop-shadow-lg">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding">
        <div className="container-site">
          <AnimatedSection className="mb-16 text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-wide text-accent">
              Ce que nous faisons
            </p>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Nos services
            </h2>
          </AnimatedSection>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 perspective-[1000px]">
            {services.map((service, i) => (
              <AnimatedSection key={service.title} delay={i * 0.08}>
                <div
                  className="group relative overflow-hidden rounded-xl shadow-xl 
                                bg-white/80 dark:bg-gray-900/70 backdrop-blur-lg 
                                border border-gray-200 transform transition duration-500 
                                hover:scale-[1.05] hover:rotate-[1deg] hover:shadow-2xl"
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-56 w-full object-cover group-hover:scale-110 group-hover:rotate-[2deg] transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                  <div
                    className="absolute top-4 left-4 flex items-center justify-center w-12 h-12 
                                  rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                                  text-white shadow-lg group-hover:translate-y-[-4px] transition"
                  >
                    {service.icon}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-lg font-semibold drop-shadow-md">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm opacity-80">
                      {service.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-12 text-center">
            <Link href="/services">
              <Button
                variant="secondary"
                className="relative px-6 py-3 font-semibold rounded-lg
                           border border-accent bg-gradient-to-r from-accent/20 to-transparent
                           hover:scale-105 hover:-translate-y-1 transition-all duration-300
                           hover:shadow-xl hover:shadow-accent/40"
              >
                Voir tous les services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
