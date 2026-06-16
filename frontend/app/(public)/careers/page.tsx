"use client";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { useRouter } from "next/navigation"
import { useState } from "react";

const jobs = [
  { title: "Développeur Full-Stack Senior", location: "Paris", type: "CDI", department: "Engineering", description: "Rejoignez notre équipe pour concevoir des applications web scalables avec React et Node.js." },
  { title: "Ingénieur DevOps", location: "Lyon / Remote", type: "CDI", department: "Infrastructure", description: "Automatisez et optimisez nos pipelines de déploiement et notre infrastructure cloud." },
  { title: "Consultant Cybersécurité", location: "Paris", type: "CDI", department: "Sécurité", description: "Réalisez des audits de sécurité et accompagnez nos clients dans leur mise en conformité." },
  { title: "Data Scientist", location: "Remote", type: "CDI", department: "Data", description: "Développez des modèles ML et des pipelines de données pour nos clients." },
  { title: "Chef de Projet IT", location: "Paris", type: "CDI", department: "Management", description: "Coordonnez les projets IT et assurez la livraison dans les délais et budgets." },
  { title: "Stagiaire Développement Web", location: "Paris", type: "Stage", department: "Engineering", description: "Stage de 6 mois pour découvrir le développement web professionnel." },
  // Tu peux ajouter plus d'offres ici
];

export default function CareersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 3;

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const router=useRouter();

  return (
    <>
      <section className="section-padding bg-white text-gray-900">
        <div className="container-site">
          <AnimatedSection className="mx-auto mb-16 max-w-3xl text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent drop-shadow-md">
              Carrière
            </p>
            <h1 className="mb-6 text-4xl font-extrabold text-gray-900 sm:text-5xl drop-shadow-lg">
              Rejoignez Notre équipe Tech
            </h1>
            <p className="text-lg leading-relaxed text-gray-600">
              Nous recherchons des talents passionnés pour construire l'avenir de la technologie.
            </p>
          </AnimatedSection>

          <div className="space-y-6">
            {currentJobs.map((job, i) => (
              <AnimatedSection key={job.title} delay={i * 0.08}>
                <div className="group relative flex flex-col gap-6 rounded-2xl bg-gradient-to-tr from-gray-50 via-white to-gray-100 p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] sm:flex-row sm:items-center sm:justify-between">
                  {/* Halo lumineux animé */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-gradient-to-r from-accent/30 via-purple-400/20 to-accent/30 animate-pulse -z-10"></div>

                  <div>
                    <h3 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-accent transition-colors duration-300">
                      {job.title}
                    </h3>
                    <p className="mb-3 text-sm text-gray-600">{job.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700">
                      <span className="flex items-center gap-2">
                        <MapPin className="h-6 w-6 text-red-500 drop-shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:animate-pulse" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-2">
                        <Briefcase className="h-6 w-6 text-green-500 drop-shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:animate-pulse" />
                        {job.type}
                      </span>
                      <span className="rounded-md bg-accent/20 px-3 py-1 font-medium text-accent shadow-md">
                        {job.department}
                      </span>
                    </div>
                  </div>

                  {/* Bouton Postuler très visible */}
                  <Button
                    size="lg"
                    className="relative shrink-0 bg-gradient-to-r from-accent to-purple-500 text-white font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-lg px-6 py-3 cursor-pointer"
                 onClick={()=>router.push("/FormulaireCareer")}
                 >
                    <span className="relative z-10 flex items-center">
                      Postuler <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                    <div className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-500 blur-md bg-gradient-to-r from-accent/40 via-purple-400/30 to-accent/40 animate-pulse"></div>
                  </Button>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="font-semibold shadow-md hover:shadow-lg transition-all"
            >
              Précédent
            </Button>
            <span className="text-gray-700 font-medium">
              Page {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="font-semibold shadow-md hover:shadow-lg transition-all"
            >
              Suivant
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}