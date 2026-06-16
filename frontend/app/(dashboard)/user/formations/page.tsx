"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { motion, AnimatePresence } from "framer-motion";
import { IFormation } from "@/src/store/interface";
import { useGetAllFormationsQuery } from "@/src/store/api";
import { setFormations, setSelectedFormation } from "@/src/store/slice/formationSlice";
import { RootState } from "@/src/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";


export default function FormationsPage() {

  const router = useRouter();
  
     const [formations, setFormationss] = useState<IFormation[]>([]);
      ;
  
    const dispatch = useDispatch();
      const formationsStore = useSelector(
        (state: RootState) => state.formation.formations,
      );
    
      const { data: dataFormation } = useGetAllFormationsQuery();
    
      useEffect(() => {
        if (dataFormation?.success) {
          dispatch(setFormations(dataFormation.data));
          dispatch(setSelectedFormation(null));
          setFormationss(dataFormation.data);
        }
      }, [dataFormation?.success, dataFormation?.data, dispatch]);
    
      useEffect(() => {
        console.log("Données du projects: ", formations);
      }, [formations]);
    
      console.log("Données du projetsStore: ", formationsStore);
  

  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const formationsPerPage = 2; // tu peux ajuster le nombre par page

  // Filtrage des formations
  const filteredFormations = formations.filter(
    (f) =>
      f.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      f.totalPrice.toLowerCase().includes(searchInput.toLowerCase()),
  );

  // Pagination
  const indexOfLastFormation = currentPage * formationsPerPage;
  const indexOfFirstFormation = indexOfLastFormation - formationsPerPage;
  const currentFormations = filteredFormations.slice(
    indexOfFirstFormation,
    indexOfLastFormation
  );

  const totalPages = Math.ceil(filteredFormations.length / formationsPerPage);

  return (
    <section className="section-padding min-h-screen bg-gradient-to-br from-indigo-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <div className="container-site">
        <AnimatedSection className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
            Formations
          </p>
          <h1 className="mb-6 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">
            Développez vos compétences
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Des formations professionnelles dispensées par nos experts pour
            booster votre carrière.
          </p>
        </AnimatedSection>

        {/* Barre de recherche alignée à droite avec bouton Effacer */}
        <div className="mb-8 flex justify-end">
          <div className="flex gap-2 w-full max-w-md">
            <input
              type="text"
              placeholder="Rechercher une formation..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSearchTerm(searchInput);
                  setCurrentPage(1); // reset pagination
                }
              }}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-accent focus:ring-accent"
            />
            <Button
              onClick={() => {
                setSearchTerm(searchInput);
                setCurrentPage(1);
              }}
              className="bg-gradient-to-r from-accent to-purple-600 text-white hover:from-purple-600 hover:to-accent transition-all duration-500 shadow-md"
            >
              Rechercher
            </Button>
            {searchTerm && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchInput("");
                  setSearchTerm("");
                  setCurrentPage(1);
                }}
              >
                Effacer
              </Button>
            )}
          </div>
        </div>

        {/* Liste des formations */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
          >
            {currentFormations.map((f, i) => (
              <AnimatedSection key={f._id} delay={i * 0.08}>
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white/80 dark:bg-gray-900/70 backdrop-blur-lg shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-accent">
                  <div className="relative">
                    <Image
                      src={f.imageUrl!}
                      width={400}
                      height={320}
                      alt={f.title}
                      className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="mb-2 text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                      {f.title}
                    </h3>
                    <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {f.description}
                    </p>
                    <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {f.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" /> {f.participantsCount}{" "}
                        places
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold tabular-nums text-foreground">
                        {f.totalPrice}
                      </span>
                     
                        <Button
                          onClick={() =>
                            router.push(`/user/formations/${f._id}`)
                          }
                          size="sm"
                          className="bg-gradient-to-r from-accent to-purple-600 text-white hover:from-purple-600 hover:to-accent transition-all duration-500 shadow-md cursor-pointer"
                        >
                          Voir plus
                        </Button>
                    
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center space-x-2">
            {/* Bouton Précédent */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md border transition-all duration-300 ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gradient-to-r hover:from-accent hover:to-purple-600 hover:text-white shadow-md"
              }`}
            >
              Précédent
            </button>

            {/* Numéros de page */}
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-md border transition-all duration-300 ${
                  currentPage === i + 1
                    ? "bg-gradient-to-r from-accent to-purple-600 text-white shadow-md"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gradient-to-r hover:from-accent hover:to-purple-600 hover:text-white shadow-md"
                }`}
              >
                {i + 1}
              </button>
            ))}

            {/* Bouton Suivant */}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md border transition-all duration-300 ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gradient-to-r hover:from-accent hover:to-purple-600 hover:text-white shadow-md"
              }`}
            >
              Suivant
            </button>
          </div>
        )}
      </div>
    </section>
  );
}