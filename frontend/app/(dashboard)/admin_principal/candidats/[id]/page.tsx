"use client";

import React, { useEffect } from "react";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useGetCareerByIdQuery } from "@/src/store/api";
import { setSelectedCareer } from "@/src/store/slice/careerSlice";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Briefcase,
  FileText,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";

export default function VueCareersPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();

  const { data, isLoading } = useGetCareerByIdQuery({ id: id as string });
  const career = data?.data;

  useEffect(() => {
    if (career) {
      dispatch(setSelectedCareer(career));
    }
  }, [career]);

  if (isLoading) {
    return (
      <div className="container-site py-20 text-center animate-pulse">
        <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
          Chargement du profil candidat...
        </p>
      </div>
    );
  }

  if (!career) {
    return (
      <div className="container-site py-20 text-center">
        <h1 className="text-3xl font-extrabold text-red-600 dark:text-red-400">
          Candidat introuvable
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
            👤 Profil du candidat
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Consultez les informations détaillées du candidat
          </p>
        </AnimatedSection>

        {/* CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl space-y-6 rounded-2xl border border-gray-200 bg-white/70 dark:bg-gray-900/70 p-10 shadow-2xl backdrop-blur-lg transition-all duration-500 hover:shadow-indigo-300/40"
        >
          {/* Nom */}
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
            <User className="text-indigo-500" /> {career.fullName}
          </h2>

          {/* Email */}
          <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mt-2">
            <Mail className="text-purple-500" /> {career.email}
          </p>

          {/* Téléphone */}
          {career.phone && (
            <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Phone className="text-green-500" /> {career.phone}
            </p>
          )}

          {/* Poste */}
          {career.position && (
            <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mt-2">
              <Briefcase className="text-pink-500" /> Poste : {career.position}
            </p>
          )}

          {/* Expérience */}
          {career.experience && (
            <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mt-2">
              <FileText className="text-indigo-500" /> Expérience :{" "}
              {career.experience}
            </p>
          )}

          {/* Lettre de motivation */}
          {career.coverLetter && (
            <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 shadow-sm">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">
                Lettre de motivation :
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {career.coverLetter}
              </p>
            </div>
          )}

          {/* CV */}
          {career.cvUrl && (
            <div className="mt-6">
              <a
                href={career.cvUrl}
                target="_blank"
                className="inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-md hover:scale-105 transition-transform"
              >
                📄 Voir le CV
              </a>
            </div>
          )}

          {/* Statut + dates */}
          <div className="grid grid-cols-2 gap-6 mt-8">
            {career.status && (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 shadow-sm">
                <FileText className="text-green-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Statut
                  </p>
                  <p className="font-semibold text-green-600 dark:text-green-400">
                    {career.status}
                  </p>
                </div>
              </div>
            )}
            {career.createdAt && (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 shadow-sm">
                <Calendar className="text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Date de candidature
                  </p>
                  <p className="font-semibold text-yellow-600 dark:text-yellow-400">
                    {new Date(career.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
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
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 w-full md:w-auto">
              ✅ Valider la candidature
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
