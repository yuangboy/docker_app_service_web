"use client";
import React, { useEffect, useState } from "react";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import Link from "next/link";
import { useGetByIdEventQuery } from "@/src/store/api";
import { setSelectedEvent } from "@/src/store/slice/eventSlice.ts";
import { useDispatch } from "react-redux";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function ViewEventPage() {
  

    const {id}=useParams();
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
    <section className="section-padding min-h-screen bg-gradient-to-br from-indigo-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <div className="container-site">
        {/* HEADER */}
        <AnimatedSection className="mx-auto mb-12 max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">
            {event.title}
          </h1>
          <p className="mt-4 text-muted-foreground">Détails de l'événement</p>
        </AnimatedSection>

        {/* EVENT DETAILS */}
        <div className="mx-auto max-w-2xl space-y-6 rounded-xl border border-gray-200 bg-white/80 dark:bg-gray-900/70 p-8 shadow-lg backdrop-blur-lg">
          {/* IMAGE */}
          {event.imageUrl && (
            <Image
              src={event.imageUrl!}
              width={400}
              height={320}
              alt={event.title}
              className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          )}

          {/* DESCRIPTION */}
          <div>
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              {event.description || "Pas de description fournie."}
            </p>
          </div>

          {/* DATE & LOCATION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Date
              </h3>
              <p>{new Date(event.eventDate ?? "").toLocaleDateString()}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Lieu
              </h3>
              <p>{event.location || "À définir"}</p>
            </div>
          </div>

          {/* PARTICIPANTS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Nombre de Participant
              </h3>
              <p>{event.maxParticipants || "0"}</p>
            </div>
          </div>

          {/* PRICE */}
          <div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Prix
            </h3>
            <p>
              {event.price} {event.currency}
            </p>
          </div>

          {/* STATUS */}
          <div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Statut
            </h3>
            <p>{event.isActive ? "Actif" : "Inactif"}</p>
          </div>
        </div>
      </div>
    </section>
  );
}