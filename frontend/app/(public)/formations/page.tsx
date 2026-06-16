"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { motion, AnimatePresence } from "framer-motion";
import { useGetAllFormationsQuery } from "@/src/store/api";
import { RootState } from "@/src/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormations,
  setSelectedFormation,
} from "@/src/store/slice/formationSlice";
import { IFormation } from "@/src/store/interface";

export default function FormationsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const formationsPerPage = 2;

  const dispatch = useDispatch();

  const formationsStore = useSelector(
    (state: RootState) => state.formation.formations,
  );

  const { data: dataFormation } = useGetAllFormationsQuery();

  const [formations, setFormationss] = useState<IFormation[]>([]);

  /* ================= DATA SYNC ================= */

  useEffect(() => {
    if (dataFormation?.success) {
      dispatch(setFormations(dataFormation.data));
      dispatch(setSelectedFormation(null));
      setFormationss(dataFormation.data);
    }
  }, [dataFormation?.success, dataFormation?.data, dispatch]);

  /* ================= FILTER ================= */

  const filteredFormations = formations.filter((f) =>
    f.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  /* ================= PAGINATION ================= */

  const indexOfLast = currentPage * formationsPerPage;
  const indexOfFirst = indexOfLast - formationsPerPage;

  const currentFormations = filteredFormations.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredFormations.length / formationsPerPage);

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <AnimatedSection className="text-center mb-14">
          <p className="text-sm uppercase tracking-widest text-accent font-medium">
            Catalogue
          </p>

          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-accent to-purple-500 bg-clip-text text-transparent">
            Développez vos compétences
          </h1>

          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Découvrez nos formations professionnelles conçues par des experts
            pour accélérer votre carrière.
          </p>
        </AnimatedSection>

        {/* SEARCH */}
        <div className="flex justify-end mb-10">
          <div className="flex w-full max-w-md gap-2">
            <input
              type="text"
              placeholder="Rechercher une formation..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1 rounded-xl border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent dark:bg-gray-800"
            />

            <Button
              onClick={() => {
                setSearchTerm(searchInput);
                setCurrentPage(1);
              }}
              className="bg-gradient-to-r from-accent to-purple-600 text-white"
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
                Reset
              </Button>
            )}
          </div>
        </div>

        {/* CARDS */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
          >
            {currentFormations.map((f, i) => (
              <AnimatedSection key={f._id} delay={i * 0.08}>
                <div className="group flex flex-col overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-900/70 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.03]">
                  {/* IMAGE */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={f.imageUrl!}
                      fill
                      alt={f.title}
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition" />
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* TITLE */}
                    <h3 className="text-lg font-bold group-hover:text-accent transition">
                      {f.title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                      {f.description}
                    </p>

                    {/* INFOS */}
                    <div className="flex flex-wrap gap-2 mt-4 text-xs">
                      <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                        <Clock className="h-3.5 w-3.5 text-purple-500" />
                        {f.duration}
                      </span>

                      <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                        <Users className="h-3.5 w-3.5 text-blue-500" />
                        Hybrid {f.participantsByType.hybrid}
                      </span>

                      <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                        <Users className="h-3.5 w-3.5 text-green-500" />
                        Online {f.participantsByType.online}
                      </span>

                      <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                        <Users className="h-3.5 w-3.5 text-red-500" />
                        Presential {f.participantsByType.onsite}
                      </span>
                    </div>

                    {/* FOOTER */}
                    <div className="mt-auto flex items-center justify-between pt-5">
                      <span className="text-lg font-bold">
                        {f.totalPrice ? `${f.totalPrice} €` : "Prix non défini"}
                      </span>

                      <Link href={`/formations/${f._id}`}>
                        <Button className="bg-gradient-to-r from-accent to-purple-600 text-white hover:scale-105 transition">
                          Voir détails
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* PAGINATION */}
        <div className="mt-14 flex justify-center gap-2">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Précédent
          </Button>

          <span className="px-4 py-2 font-medium">
            {currentPage} / {totalPages}
          </span>

          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Suivant
          </Button>
        </div>
      </div>
    </section>
  );
}
