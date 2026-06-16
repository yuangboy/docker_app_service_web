"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  PlayCircle,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { useTheme } from "@/context/ThemeContext";

import { useGetModulesByIdFormationQuery } from "@/src/store/api";
import {
  setLoading,
  setError,
  setModulesByFormation,
} from "@/src/store/slice/moduleSlice";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";

export default function DetailFormationPage() {
  const { darkMode } = useTheme();

  const router=useRouter();
  const params = useParams();
  const dispatch = useDispatch();

  const formationId = params?.formationId as string;

  const { data, isLoading, error } = useGetModulesByIdFormationQuery({
    formationId,
  });

  const modules = useSelector((state: RootState) => state.module.modules);

  /* ================= FORMATION DATA ================= */

  const formationTitle = modules[0]?.formationId?.title || "Formation";

  const formationDescription =
    modules[0]?.formationId?.description ||
    "Aucune description disponible pour cette formation.";

  const formationImage =
    modules[0]?.formationId?.imageUrl || "/images/default.jpg";

  /* ================= PAGINATION ================= */

  const [currentPage, setCurrentPage] = useState(1);
  const modulesPerPage = 6;

  const indexOfLast = currentPage * modulesPerPage;
  const indexOfFirst = indexOfLast - modulesPerPage;
  const currentModules = modules.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(modules.length / modulesPerPage);

  /* ================= EFFECT ================= */

    const userStore = useSelector(
      (state: RootState) => state.user.user,
    );

  useEffect(() => {
    dispatch(setLoading(isLoading));

    if (data?.data) {
      dispatch(setModulesByFormation(data.data));
      dispatch(setError(null));
    }

    if (error) {
      dispatch(setError("Erreur lors du chargement"));
    }
  }, [data, isLoading, error, dispatch]);

  /* ================= LOADING ================= */

  if (isLoading) {
    return (
      <div className="text-center py-20 animate-pulse text-xl font-semibold">
        Chargement des modules...
      </div>
    );
  }

  /* ================= EMPTY STATE ================= */

  if (!modules || modules.length === 0) {
    return (
      <div className="container-site py-20 text-center">
        <h1 className="text-3xl font-bold">
          Aucun module trouvé pour cette formation
        </h1>

        <Link href="/formations">
          <Button className="mt-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <section
      className={`min-h-screen py-16 px-4 transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
          : "bg-gradient-to-br from-indigo-50 via-white to-gray-100 text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <AnimatedSection className="text-center mb-14">
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
            {formationTitle}
          </h1>

          <p className="text-base mt-4 max-w-2xl mx-auto leading-relaxed opacity-80">
            {formationDescription}
          </p>
        </AnimatedSection>

        {/* IMAGE FORMATION */}
        <AnimatedSection className="mb-14">
          <div className="relative w-full h-80 rounded-3xl overflow-hidden shadow-2xl group">
            <Image
              src={formationImage}
              alt="formation"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition" />
          </div>
        </AnimatedSection>

        {/* MODULES TITLE */}
        <AnimatedSection className="text-center mb-10">
          <h2 className="text-2xl font-bold">📚 Modules disponibles</h2>
        </AnimatedSection>

        {/* MODULES GRID */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
            {currentModules.map((module) => (
              <AnimatedSection key={module._id}>
                <div className="w-[320px] rounded-3xl p-[1px] bg-gradient-to-br from-purple-500 to-indigo-500 hover:scale-105 transition-all duration-500">
                  <div className="h-full rounded-3xl bg-white dark:bg-gray-900 p-6 shadow-xl">
                    {/* TITLE */}
                    <h2 className="text-xl font-bold mb-3 leading-snug hover:text-purple-500 transition">
                      {module.title}
                    </h2>

                    {/* INFOS */}
                    <div className="flex flex-wrap gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30">
                        <DollarSign size={16} />
                        {module.price}
                      </div>

                      {/* <div className="flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30">
                        <Layers size={16} />
                        {module.nbreTranche} tranches
                      </div> */}
                    </div>

                    {/* VIDEOS */}
                    <div>
                      <h3 className="text-sm font-semibold mb-3 opacity-80">
                        Contenu du module
                      </h3>

                      <ul className="space-y-2">
                        {module.videos.map((video, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-3 text-sm p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                          >
                            <div className="p-1 rounded-full bg-purple-100 dark:bg-purple-900/30">
                              <PlayCircle
                                size={16}
                                className="text-purple-600"
                              />
                            </div>
                            <span className="truncate">{video.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700"></div>
                    {/* {userStore?.role ? () : ()} */}
                    <Button
                      onClick={() => {

                        if(userStore?.role==="user"){
                          router.push(
                            `/user/formations/${module.formationId._id}/inscription?moduleId=${module._id}`,
                          );
                        }else{
                      localStorage.setItem(
                        "redirectAfterLoginForInscriptionModule",
                        `/user/formations/${module.formationId._id}/inscription?moduleId=${module._id}`,
                      );
                      router.push(`/login`);
                        }
                        
                      }}
                      className="w-full relative overflow-hidden bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-2 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 group cursor-pointer"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2 ">
                        🚀 S’inscrire
                      </span>

                      {/* glow effect */}
                      <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition"></span>
                    </Button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center items-center gap-6 mt-14">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="flex items-center gap-2"
          >
            <ChevronLeft size={18} /> Précédent
          </Button>

          <span className="text-base font-semibold">
            {currentPage} / {totalPages}
          </span>

          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="flex items-center gap-2"
          >
            Suivant <ChevronRight size={18} />
          </Button>
        </div>

        {/* BACK BUTTON */}
        <div className="text-center mt-16">
          <Link href="/formations">
            <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:scale-110 transition-all duration-300 shadow-xl px-6 py-3 text-base font-semibold">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Retour aux formations
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
