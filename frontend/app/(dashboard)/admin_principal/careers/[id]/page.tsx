"use client";

import React, { useEffect } from "react";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useGetCareerInfoByIdQuery } from "@/src/store/api";
import { setSelectedCareerInfo } from "@/src/store/slice/careerInfoSlice";
import Link from "next/link";
import { ArrowLeft, Briefcase, Calendar, FileText, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function VueCareersPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();

  const { data, isLoading } = useGetCareerInfoByIdQuery({ id: id as string });
  const career = data?.data;

  useEffect(() => {
    if (career) {
      dispatch(setSelectedCareerInfo(career));
    }
  }, [career]);

  if (isLoading) {
    return (
      <div className="container-site py-20 text-center animate-pulse">
        <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
          Chargement de l'offre d'emploi...
        </p>
      </div>
    );
  }

  if (!career) {
    return (
      <div className="container-site py-20 text-center">
        <h1 className="text-3xl font-extrabold text-red-600 dark:text-red-400">
          Offre introuvable
        </h1>
        <Link href="/careers">
          <Button className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:scale-105 transition-transform duration-300 shadow-xl rounded-full px-6 py-3">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Retour aux offres
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
            🚀 Voir l'offre
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Consultez cette opportunité de carrière en détail
          </p>
        </AnimatedSection>

        {/* CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl space-y-6 rounded-2xl border border-gray-200 bg-white/70 dark:bg-gray-900/70 p-10 shadow-2xl backdrop-blur-lg transition-all duration-500 hover:shadow-indigo-300/40"
        >
          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            <Briefcase className="text-indigo-500" /> {career.title}
          </h2>

          {/* Content */}
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mt-4">
            {career.content}
          </p>

          {/* Infos */}
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 shadow-sm">
              <Calendar className="text-indigo-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Année
                </p>
                <p className="font-semibold text-indigo-600 dark:text-indigo-400">
                  {career.year}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-red-50 dark:from-gray-800 dark:to-gray-700 shadow-sm">
              <FileText className="text-pink-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Type de contrat
                </p>
                <p className="font-semibold text-pink-600 dark:text-pink-400">
                  {career.contractType}
                </p>
              </div>
            </div>
            <div className="col-span-2 flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 shadow-sm">
              <Award className="text-green-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Compétences
                </p>
                <p className="font-semibold text-green-600 dark:text-green-400">
                  {career.competence?.join(", ")}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-10 p-4 rounded-xl bg-white/60 dark:bg-gray-900/50 backdrop-blur-md">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="w-full md:w-auto hover:scale-105 transition-transform"
            >
              ← Retour
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
