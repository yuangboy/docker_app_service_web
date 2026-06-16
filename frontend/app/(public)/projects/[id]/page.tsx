"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { useTheme } from "@/context/ThemeContext";
import { useGetProjectByIdQuery } from "@/src/store/api";
import { setSelectedProject } from "@/src/store/slice/projectSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/src/store/store";
import Image from "next/image";

// const projects = [
//   {
//     id: "plateforme-ecommerce",
//     title: "Plateforme E-commerce",
//     client: "RetailCorp",
//     category: "Web",
//     description:
//       "Refonte complète d'une plateforme e-commerce avec plus de 50 000 produits et intégration de paiement.",
//     image: "/images/Developpement logiciel.png",
//     details:
//       "Nous avons conçu une plateforme e-commerce moderne, scalable et sécurisée. Intégration de paiements multiples, gestion avancée des stocks et optimisation SEO pour améliorer la visibilité et les ventes.",
//   },
//   {
//     id: "application-mobile-sante",
//     title: "Application Mobile Santé",
//     client: "MedConnect",
//     category: "Mobile",
//     description:
//       "Application de suivi médical avec téléconsultation et gestion des rendez-vous.",
//     image: "/images/Developpement logiciel.png",
//     details:
//       "Développement d'une application mobile intuitive pour le suivi médical. Fonctionnalités de téléconsultation, gestion des rendez-vous et notifications en temps réel pour améliorer l'expérience patient.",
//   },
//   {
//     id: "infrastructure-cloud",
//     title: "Infrastructure Cloud",
//     client: "FinTech Solutions",
//     category: "Cloud",
//     description:
//       "Migration d'une infrastructure on-premise vers AWS avec haute disponibilité.",
//     image: "/images/Developpement logiciel.png",
//     details:
//       "Migration complète vers AWS avec mise en place d'une architecture haute disponibilité, monitoring avancé et optimisation des coûts. Résultat : une infrastructure flexible et résiliente.",
//   },
//   // Ajoute les autres projets...
// ];

export default function DetailProjectPage() {
  const { darkMode } = useTheme();
  const params = useParams();
  const { id } = params;

  // const project = projects.find((p) => p.id === id);

  const dispatch = useDispatch();

  const projectStore = useSelector(
    (state: RootState) => state.project.projects,
  );

  const { data, isLoading, error } = useGetProjectByIdQuery({
    id: id as string,
  });

  const project = data?.data;

  useEffect(() => {
    if (project) {
      dispatch(setSelectedProject(project));
    }
  }, [project]);

  if (isLoading) {
    return (
      <div className="container-site py-20 text-center">
        Chargement service...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container-site py-20 text-center">
        <h1 className="text-2xl font-bold">Projet introuvable</h1>
        <Link href="/projects">
          <Button className="mt-6 bg-gradient-to-r from-accent to-purple-600 text-white hover:from-purple-600 hover:to-accent transition-all duration-500 shadow-lg">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux projets
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <section
      className={`section-padding min-h-screen bg-gradient-to-br ${
        darkMode
          ? "from-gray-900 via-gray-800 to-black"
          : "from-indigo-50 via-white to-gray-100"
      }`}
    >
      <div className="container-site">
        {/* Header */}
        <AnimatedSection className="mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-md bg-accent/10 px-3 py-1 text-xs font-medium text-accent mb-4">
            {project.category}
          </span>
          <h1 className="mb-6 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">
            {project.title}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Client : {project.clientName}
          </p>
        </AnimatedSection>

        {/* Image */}
        <AnimatedSection className="mt-12">
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src={project.imageUrl!}
              width={400}
              height={320}
              alt={project.title}
              className="w-full h-80 object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </AnimatedSection>

        {/* Détails */}
        <AnimatedSection className="mt-12 max-w-3xl mx-auto text-left bg-white/80 dark:bg-gray-900/70 backdrop-blur-lg rounded-xl p-8 shadow-lg">
          <p className="text-base leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection className="mt-16 text-center">
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-gradient-to-r from-accent to-purple-600 text-white hover:from-purple-600 hover:to-accent transition-all duration-500 shadow-lg"
            >
              Discuter de votre projet
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
