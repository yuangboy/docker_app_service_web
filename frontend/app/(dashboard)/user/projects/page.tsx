"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { setProjects, setSelectedProject } from "@/src/store/slice/projectSlice";
import { useGetProjectsQuery } from "@/src/store/api";
import { RootState } from "@/src/store/store";
import { useDispatch, useSelector } from "react-redux";
import { IProject } from "@/src/store/interface";
import { useRouter } from "next/navigation";
import Image from "next/image";


export default function ProjectsPage() {

  const router = useRouter();
  const [projects, setProjectss] = useState<IProject[]>([]);
  const dispatch = useDispatch();
  const projetsStore = useSelector(
    (state: RootState) => state.project.projects,
  );
  const { data: dataProject } = useGetProjectsQuery();

  useEffect(() => {
    if (dataProject?.success) {
      dispatch(setProjects(dataProject.data));
      dispatch(setSelectedProject(null));
      setProjectss(dataProject.data);
    }
  }, [dataProject?.success, dataProject?.data, dispatch]);

  useEffect(() => {
    console.log("Données du projects: ", projects);
  }, [projects]);

  console.log("Données du projetsStore: ", projetsStore);

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;

  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section className="section-padding min-h-screen bg-gradient-to-br from-indigo-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <div className="container-site">
        {/* Header */}
        <AnimatedSection className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
            Réalisations
          </p>
          <h1 className="mb-6 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">
            Nos projets
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Découvrez comment nous avons aidé nos clients à atteindre leurs
            objectifs technologiques.
          </p>
        </AnimatedSection>

        {/* Grid Projects */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {currentProjects.map((p, i) => (
            <AnimatedSection key={p._id} delay={i * 0.08}>
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white/80 dark:bg-gray-900/70 backdrop-blur-lg shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-accent">
                <div className="relative">
                  <Image
                    src={p.imageUrl!}
                    width={400}
                    height={320}
                    alt={p.title}
                    className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-md bg-accent/10 px-2 py-1 text-xs font-medium text-accent">
                      {p.category}
                    </span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <h3 className="mb-1 text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                    {p.title}
                  </h3>
                  <p className="mb-3 text-xs font-medium text-muted-foreground">
                    {p.clientName}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground flex-1">
                    {p.description}
                  </p>

                  {/* Bouton Voir plus */}
                  <Link href={`/projects/${p._id}`}>
                    <Button
                      size="sm"
                      className="mt-4 bg-gradient-to-r from-accent to-purple-600 text-white hover:from-purple-600 hover:to-accent transition-all duration-500 shadow-md"
                    >
                      Voir plus
                    </Button>
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center items-center space-x-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md border transition-all duration-300 ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-600 hover:bg-gradient-to-r hover:from-accent hover:to-purple-600 hover:text-white shadow-md"
            }`}
          >
            Précédent
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-4 py-2 rounded-md border transition-all duration-300 ${
                currentPage === i + 1
                  ? "bg-gradient-to-r from-accent to-purple-600 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gradient-to-r hover:from-accent hover:to-purple-600 hover:text-white shadow-md"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md border transition-all duration-300 ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-600 hover:bg-gradient-to-r hover:from-accent hover:to-purple-600 hover:text-white shadow-md"
            }`}
          >
            Suivant
          </button>
        </div>
      </div>
    </section>
  );
}