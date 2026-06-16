"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { useTheme } from "@/context/ThemeContext";
import { setSelectedService } from "@/src/store/slice/serviceSlice";
import { useGetServiceByIdQuery } from "@/src/store/api";
import { RootState } from "@/src/store/store";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DetailServicePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { darkMode } = useTheme();
  const { id } = useParams();

  const servicesStore = useSelector(
    (state: RootState) => state.service.services,
  );
  const userStore = useSelector(
    (state: RootState) => state.user.user,
  );

  const { data, isLoading, error } = useGetServiceByIdQuery({
    id: id as string,
  });

  const service = data?.data;

  useEffect(() => {
    if (service) {
      dispatch(setSelectedService(service));
    }
  }, [service]);

  if (isLoading) {
    return (
      <div className="container-site py-20 text-center">
        Chargement service...
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container-site py-20 text-center">
        <h1 className="text-2xl font-bold">Service introuvable</h1>
        <Button
          onClick={() => router.push("/services")}
          className="mt-6 bg-gradient-to-r from-accent to-purple-600 text-white hover:from-purple-600 hover:to-accent transition-all duration-500 shadow-lg"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux services
        </Button>
      </div>
    );
  }

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
        <AnimatedSection className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">
            {service.title}
          </h1>
        </AnimatedSection>

        {/* Image avec effet futuriste */}
        <AnimatedSection className="mt-12">
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl shadow-2xl">
            <Image
              alt={service.title}
              src={service.imageUrl!}
              width={400} // largeur réelle
              height={320} // hauteur réelle
              // quality={90}
              className="w-full h-80 object-cover transition-transform duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </AnimatedSection>

        {/* Détails */}

        {service.description && (
          <AnimatedSection className="mt-12 max-w-3xl mx-auto text-left bg-white/80 dark:bg-gray-900/70 backdrop-blur-lg rounded-xl p-8 shadow-lg">
            <p className="text-base leading-relaxed text-muted-foreground">
              {service.description}
            </p>
          </AnimatedSection>
        )}

        {/* CTA */}

        {userStore?.role === "user" ? (
          <AnimatedSection className="mt-16 text-center">
            <Button
              onClick={() =>
                router.push(`/user/devis?serviceId=${service._id}`)
              }
              size="lg"
              className="bg-gradient-to-r from-accent to-purple-600 text-white hover:from-purple-600 hover:to-accent transition-all duration-500 shadow-lg cursor-pointer"
            >
              Demander un devis
            </Button>
          </AnimatedSection>
        ) : (
          <AnimatedSection className="mt-16 text-center">
            <Button
              onClick={() => {
                // 🔥 Stocker l'intention
                localStorage.setItem(
                  "redirectAfterLogin",
                  `/user/devis?serviceId=${service._id}`,
                );

                // 🔥 Redirection vers login
                router.push("/login");
              }}
              size="lg"
              variant="outline"
              className="relative px-6 py-3 text-white font-semibold rounded-lg
                            bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600
                            shadow-[0_4px_14px_rgba(0,0,0,0.25)]
                            hover:shadow-[0_8px_20px_rgba(0,0,0,0.35)]
                            hover:scale-105 hover:-translate-y-1
                            transition-all duration-300 ease-out
                            active:translate-y-[2px] active:shadow-[0_2px_8px_rgba(0,0,0,0.25)] cursor-pointer"
            >
              Demander un devis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
