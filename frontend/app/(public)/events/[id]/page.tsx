"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { useTheme } from "@/context/ThemeContext";
import { useGetByIdEventQuery } from "@/src/store/api";
import { useDispatch } from "react-redux";
import { setSelectedEvent } from "@/src/store/slice/eventSlice.ts";
import Image from "next/image";


export default function DetailEventPage() {
  const { darkMode } = useTheme();
  const params = useParams();
   const { id } = params;
  
    // const blog = blogs.find((b) => b.id === id);
  
    const dispatch = useDispatch();
  
    //  const projectStore=useSelector((state:RootState)=>state.project.projects);
  
    const { data, isLoading, error } = useGetByIdEventQuery({
      id: id as string,
    });
  
    const event = data?.data;
  
    useEffect(() => {
      if (event) {
        dispatch(setSelectedEvent(event));
      }
    }, [event]);

     if (isLoading) {
       return (
         <div className="container-site py-20 text-center">
           Chargement service...
         </div>
       );
     }


  if (!event) {
    return (
      <div className="container-site py-20 text-center">
        <h1 className="text-2xl font-bold">Événement introuvable</h1>
        <Link href="/events">
          <Button className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-purple-600 hover:to-blue-600 transition-all duration-500 shadow-lg">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux événements
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
          <h1 className="mb-6 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            {event.title}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {event.description}
          </p>
        </AnimatedSection>

        {/* Image */}
        <AnimatedSection className="mt-12">
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src={event.imageUrl!}
              width={400}
              height={320}
              alt={event.title}
              className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </AnimatedSection>

        {/* Infos rapides */}
        <AnimatedSection className="mt-8 flex justify-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4" /> {event.eventDate}
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4" /> {event.location}
          </span>
          <span className="flex items-center gap-2 font-semibold text-blue-600">
            <Ticket className="h-4 w-4" /> {event.price}
          </span>
        </AnimatedSection>

        {/* Détails */}
        {event.description && (
          <AnimatedSection className="mt-12 max-w-3xl mx-auto text-left bg-white/80 dark:bg-gray-900/70 backdrop-blur-lg rounded-xl p-8 shadow-lg">
            <p className="text-base leading-relaxed text-muted-foreground">
              {event.description}
            </p>
          </AnimatedSection>
        )}

        {/* CTA */}
        <AnimatedSection className="mt-16 text-center">
          <Link href={`/inscriptionevent?ref=${event._id}`}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white 
                      hover:from-pink-600 hover:to-blue-600 transition-all duration-500 shadow-lg"
            >
              S'inscrire
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}