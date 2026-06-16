"use client";
import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { useTheme } from "@/context/ThemeContext";
import { useDispatch } from "react-redux";
import { useGetServiceByIdQuery } from "@/src/store/api";
import { setSelectedService } from "@/src/store/slice/serviceSlice";
import Image from "next/image";






export default function DetailServicePage() {
  const { darkMode } = useTheme();

  const params = useParams();
  const { id } = params;

 // const blog = blogs.find((b) => b.id === id);

 const router=useRouter();
 const dispatch = useDispatch();
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
         <Link href="/projects">
           <Button className="mt-6 bg-gradient-to-r from-accent to-purple-600 text-white hover:from-purple-600 hover:to-accent transition-all duration-500 shadow-lg">
             <ArrowLeft className="mr-2 h-4 w-4" />
             Retour aux services
           </Button>
         </Link>
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
            {service?.title}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {service?.description}
          </p>
        </AnimatedSection>

        {/* Image avec effet futuriste */}
        <AnimatedSection className="mt-12">
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src={service.imageUrl!}
              width={400}
              height={320}
              alt={service.title}
              className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </AnimatedSection>

        {/* Détails */}
        <AnimatedSection className="mt-12 max-w-3xl mx-auto text-left bg-white/80 dark:bg-gray-900/70 backdrop-blur-lg rounded-xl p-8 shadow-lg">
          <p className="text-base leading-relaxed text-muted-foreground">
            {service.description}
          </p>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection className="mt-16 text-center">
      
            <Button
              onClick={() =>
                router.push(`/user/devis?serviceId=${service._id}`)
              }
              size="lg"
              className="bg-gradient-to-r from-accent to-purple-600 text-white hover:from-purple-600 hover:to-accent transition-all duration-500 shadow-lg"
            >
              Demander un devis
            </Button>
    
        </AnimatedSection>
      </div>
    </section>
  );
}