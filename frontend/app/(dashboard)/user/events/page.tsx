"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { IEvent } from "@/src/store/interface";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { useGetEventAllQuery } from "@/src/store/api";
import { setEvents, setSelectedEvent } from "@/src/store/slice/eventSlice.ts";
import Image from "next/image";



export default function EventsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 2;

   const router = useRouter();
  
    const [events, setEventss] = useState<IEvent[]>([]);
        const dispatch = useDispatch();
        const eventsStore = useSelector(
          (state: RootState) => state.event.events,
        );
      
        const { data: dataEvent } = useGetEventAllQuery();
        useEffect(() => {
          if (dataEvent?.success) {
            dispatch(setEvents(dataEvent.data));
            dispatch(setSelectedEvent(null));
            setEventss(dataEvent.data);
          }
        }, [dataEvent?.success, dataEvent?.data, dispatch]);
      
        // loguer dans un autre useEffect qui dépend de projects
      
        useEffect(() => {
         
          console.log("Données du events: ", events);
        }, [events]);
      
        console.log("Données du eventsStore: ", eventsStore);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const totalPages = Math.ceil(events.length / eventsPerPage);


  return (
    <section className="section-padding min-h-screen bg-gradient-to-br from-indigo-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <div className="container-site">
        <AnimatedSection className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-blue-600">
            Événements
          </p>
          <h1 className="mb-6 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            Nos prochains événements
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Rejoignez notre communauté lors de conférences, ateliers et meetups.
          </p>
        </AnimatedSection>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="grid gap-10 lg:grid-cols-2"
          >
            {currentEvents.map((e, i) => (
              <AnimatedSection
                key={e._id}
                delay={i * 0.1}
                className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform hover:scale-[1.02] bg-white/80 dark:bg-gray-900/70 backdrop-blur-lg border border-gray-200"
              >
                {/* Image */}
                <div className="relative h-56 w-full">
                  <Image
                    src={e.imageUrl!}
                    width={400}
                    height={320}
                    alt={e.title}
                    className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-4">
                    <h3 className="text-xl font-bold text-white">{e.title}</h3>
                    <p className="flex items-center gap-1 text-sm text-gray-200">
                      <Calendar className="h-4 w-4 text-white" /> {e.eventDate}
                    </p>
                    <p className="flex items-center gap-1 text-sm text-gray-200">
                      <MapPin className="h-4 w-4 text-white" /> {e.location}
                    </p>
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-6 flex flex-col">
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {e.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-blue-700">
                      {e.price}
                    </span>

                    <Button
                      onClick={() => router.push(`/user/events/${e._id}`)}
                      size="sm"
                      className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:from-pink-600 hover:to-blue-600 transition-all duration-500 shadow-md hover:shadow-lg hover:scale-105 cursor-pointer"
                    >
                      Lire plus
                    </Button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  currentPage === i + 1
                    ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white shadow-md"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
