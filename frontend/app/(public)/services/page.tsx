"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { useTheme } from "@/context/ThemeContext";
import { IService } from "@/src/store/interface";
import { RootState } from "@/src/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useGetServicesQuery } from "@/src/store/api";
import {
  setServices,
  setSelectedService,
} from "@/src/store/slice/serviceSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ServicesPage() {
  const { darkMode } = useTheme();
  const [services, setServicess] = useState<IService[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(services.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentServices = services.slice(startIndex, startIndex + itemsPerPage);

  const dispatch = useDispatch();
  const servicesStore = useSelector(
    (state: RootState) => state.service.services,
  );

  const router = useRouter();

  const { data: dataService } = useGetServicesQuery();

  useEffect(() => {
    if (dataService?.success) {
      dispatch(setServices(dataService.data));
      dispatch(setSelectedService(null));
      setServicess(dataService.data);
    }
  }, [dataService?.success, dataService?.data, dispatch]);

  // loguer dans un autre useEffect qui dépend de services

  useEffect(() => {
    services;
    console.log("Données du services: ");
  }, [services]);

  console.log("Données du servicesStore: ", servicesStore);

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
        <AnimatedSection className="mx-auto mb-20 max-w-3xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
            Nos Services
          </p>
          <h1 className="mb-6 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">
            Des solutions futuristes pour chaque besoin
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Nous couvrons l'ensemble du spectre IT pour vous offrir un
            accompagnement de bout en bout, avec des technologies modernes et
            innovantes.
          </p>
        </AnimatedSection>

        {/* Grid Services */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {currentServices.map((s, i) => (
            <AnimatedSection key={s._id} delay={i * 0.08}>
              <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-lg shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-accent">
                <div className="relative">
                  <Image
                    src={s.imageUrl!}
                    alt={s.title}
                    width={400}
                    height={224}
                    className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="p-6">
                  <h3 className="mb-3 text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {s.description}
                  </p>

                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-accent to-purple-600 text-white hover:from-purple-600 hover:to-accent transition-all duration-500 shadow-md cursor-pointer"
                    onClick={() => router.push(`/services/${s._id}`)}
                  >
                    Voir plus
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-10 space-x-4">
          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Précédent
          </Button>

          <span className="text-sm text-muted-foreground">
            Page {currentPage} sur {totalPages}
          </span>

          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            Suivant
          </Button>
        </div>

        {/* CTA */}
        {/* <AnimatedSection className="mt-20 text-center">
          <Link href="/login">
            <Button
              size="lg"
              className="bg-gradient-to-r from-accent to-purple-600 text-white hover:from-purple-600 hover:to-accent transition-all duration-500 shadow-lg"
            >
              Demander un devis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </AnimatedSection> */}
      </div>
    </section>
  );
}
