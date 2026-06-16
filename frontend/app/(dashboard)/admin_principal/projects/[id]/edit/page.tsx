"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";

export default function ViewProjectPage() {
  const router = useRouter();
  const { id } = useParams();

  const [project, setProject] = useState({
image_url:"",
title:"",
description:"",
category:"",
client_name:"",
completion_date:"",
is_active:""
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setProject(data);
      } catch {
        setMessage(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Chargement...</p>;
  }

  if (!project) {
    return <p className="text-center mt-10">{message || "Projet introuvable."}</p>;
  }

  return (
    <section className="section-padding min-h-screen bg-gradient-to-br from-indigo-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      
      <div className="container-site">
        {/* HEADER */}
        <AnimatedSection className="mx-auto mb-12 max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">
            Détails du Projet
          </h1>
          <p className="mt-4 text-muted-foreground">
            Consultez les informations du projet ci-dessous.
          </p>
        </AnimatedSection>

        {/* CONTENT */}
        <div className="mx-auto max-w-2xl space-y-6 rounded-xl border border-gray-200 bg-white/80 dark:bg-gray-900/70 p-8 shadow-lg backdrop-blur-lg">
          {/* Image */}
          {project.image_url && (
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-60 object-cover rounded-lg border mb-6"
            />
          )}

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {project.title}
          </h2>

          {/* Description */}
          {project.description && (
            <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
          )}

          {/* Infos */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            {project.category && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Catégorie</p>
                <p className="font-medium">{project.category}</p>
              </div>
            )}
            {project.client_name && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Client</p>
                <p className="font-medium">{project.client_name}</p>
              </div>
            )}
            {project.completion_date && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                <p className="font-medium">{project.completion_date}</p>
              </div>
            )}
          </div>

          {/* Statut */}
          <div className="mt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">Statut</p>
            <p
              className={`font-medium ${
                project.is_active ? "text-green-600" : "text-red-600"
              }`}
            >
              {project.is_active ? "Actif" : "Inactif"}
            </p>
          </div>

   
        </div>
      </div>
    </section>
  );
}