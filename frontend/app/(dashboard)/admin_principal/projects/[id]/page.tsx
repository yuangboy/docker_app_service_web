"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { setSelectedProject } from "@/src/store/slice/projectSlice";
import { useGetProjectByIdQuery } from "@/src/store/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";

export default function ViewProjectPage() {
  const router = useRouter();
  const { id } = useParams();
  const dispatch = useDispatch();

  const projectStore = useSelector(
    (state: RootState) => state.project.projects,
  );

  const { data, isLoading } = useGetProjectByIdQuery({ id: id as string });
  const project = data?.data;

  useEffect(() => {
    if (project) {
      dispatch(setSelectedProject(project));
    }
  }, [project]);

  if (isLoading) {
    return (
      <div className="container-site py-20 text-center animate-pulse">
        <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
          Chargement du projet...
        </p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container-site py-20 text-center">
        <h1 className="text-3xl font-extrabold text-red-600 dark:text-red-400">
          Projet introuvable
        </h1>
        <Link href="/projects">
          <Button className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:scale-105 transition-transform duration-300 shadow-xl rounded-full px-6 py-3">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Retour aux projets
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <section className="section-padding min-h-screen bg-gradient-to-br from-indigo-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <div className="container-site">
        {/* HEADER */}
        <AnimatedSection className="mx-auto mb-12 max-w-2xl text-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 drop-shadow-lg">
            ✨ Détails du Projet
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Découvrez les informations du projet ci-dessous.
          </p>
        </AnimatedSection>

        {/* CONTENT */}
        <div className="mx-auto max-w-3xl space-y-6 rounded-2xl border border-gray-200 bg-white/70 dark:bg-gray-900/70 p-10 shadow-2xl backdrop-blur-lg transition-all duration-500 hover:shadow-indigo-300/40">
          {/* Image */}
          {project.imageUrl && (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-72 object-cover rounded-xl border shadow-md hover:scale-[1.02] transition-transform duration-300"
            />
          )}

          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            {project.title}
          </h2>

          {/* Description */}
          {project.description && (
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              {project.description}
            </p>
          )}

          {/* Infos */}
          <div className="grid grid-cols-2 gap-6 mt-8">
            {project.category && (
              <div className="p-4 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Catégorie
                </p>
                <p className="font-semibold text-indigo-600 dark:text-indigo-400">
                  {project.category}
                </p>
              </div>
            )}
            {project.clientName && (
              <div className="p-4 rounded-lg bg-gradient-to-r from-pink-50 to-red-50 dark:from-gray-800 dark:to-gray-700 shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Client
                </p>
                <p className="font-semibold text-pink-600 dark:text-pink-400">
                  {project.clientName}
                </p>
              </div>
            )}
            {project.completionDate && (
              <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                <p className="font-semibold text-green-600 dark:text-green-400">
                  {new Date(project.completionDate).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>

          {/* Statut */}
          <div className="mt-8 p-4 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 shadow-sm">
            <p className="text-sm text-gray-500 dark:text-gray-400">Statut</p>
            <p
              className={`font-bold text-lg ${
                project.isActive
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {project.isActive ? "✅ Actif" : "❌ Inactif"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
