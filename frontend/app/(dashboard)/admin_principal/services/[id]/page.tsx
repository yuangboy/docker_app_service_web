"use client";

import React, { useEffect } from "react";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useGetServiceByIdQuery } from "@/src/store/api";
import { setSelectedService } from "@/src/store/slice/serviceSlice";
import { motion } from "framer-motion";
import { DollarSign, Info, CheckCircle, XCircle } from "lucide-react";

export default function ViewService() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();

  const { data, isLoading } = useGetServiceByIdQuery({ id: id as string });
  const service = data?.data;

  useEffect(() => {
    if (service) {
      dispatch(setSelectedService(service));
    }
  }, [service]);

  if (isLoading) {
    return (
      <div className="container-site py-20 text-center animate-pulse">
        <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
          Chargement du service...
        </p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container-site py-20 text-center">
        <h1 className="text-3xl font-extrabold text-red-600 dark:text-red-400">
          Service introuvable
        </h1>
        <Button
          onClick={() => router.push("/services")}
          className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:scale-105 transition-transform duration-300 shadow-xl rounded-full px-6 py-3"
        >
          ← Retour aux services
        </Button>
      </div>
    );
  }

  return (
    <section className="section-padding min-h-screen bg-gradient-to-br from-indigo-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <div className="container-site">
        {/* HEADER */}
        <AnimatedSection className="mx-auto mb-12 max-w-2xl text-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 drop-shadow-lg">
            ✨ Détails du Service
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Découvrez toutes les informations sur ce service.
          </p>
        </AnimatedSection>

        {/* CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl space-y-6 rounded-2xl border border-gray-200 bg-white/70 dark:bg-gray-900/70 p-10 shadow-2xl backdrop-blur-lg transition-all duration-500 hover:shadow-indigo-300/40"
        >
          {/* Image */}
          {service?.imageUrl && (
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              src={
                typeof service.imageUrl === "string"
                  ? service.imageUrl
                  : URL.createObjectURL(service.imageUrl)
              }
              alt={service.title}
              className="w-full h-72 object-cover rounded-xl border shadow-md hover:scale-[1.02] transition-transform duration-300"
            />
          )}

          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            {service?.title}
          </h2>

          {/* Description */}
          {service?.description && (
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              {service.description}
            </p>
          )}

          {/* Infos */}
          <div className="grid grid-cols-2 gap-6 mt-8">
            {service?.priceRange && (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 shadow-sm">
                <DollarSign className="text-indigo-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Fourchette de prix
                  </p>
                  <p className="font-semibold text-indigo-600 dark:text-indigo-400">
                    {service?.priceRange} FCFA
                  </p>
                </div>
              </div>
            )}
            {service?.icon && (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-red-50 dark:from-gray-800 dark:to-gray-700 shadow-sm">
                <Info className="text-pink-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Icône
                  </p>
                  <p className="font-semibold text-pink-600 dark:text-pink-400">
                    Disponible
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Statut */}
          <div className="mt-8 flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 shadow-sm">
            {service?.isActive ? (
              <>
                <CheckCircle className="text-green-500" />
                <p className="font-bold text-lg text-green-600 dark:text-green-400">
                  Actif
                </p>
              </>
            ) : (
              <>
                <XCircle className="text-red-500" />
                <p className="font-bold text-lg text-red-600 dark:text-red-400">
                  Inactif
                </p>
              </>
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
