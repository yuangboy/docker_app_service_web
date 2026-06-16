"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Calendar, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";

// Types pour les données
type Formation = {
  id: number;
  title: string;
  description: string;
  image: string;
  progress: number;
};

type Event = {
  id: number;
  title: string;
  date: string; // format ISO string
  type: "online" | "offline";
  image: string;
};

export default function MyLearningUser() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"formations" | "events">(
    "formations",
  );

  const [formations, setFormations] = useState<Formation[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  const [loadingFormations, setLoadingFormations] = useState<boolean>(true);
  const [loadingEvents, setLoadingEvents] = useState<boolean>(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;

  // ✅ DONNÉES PAR DÉFAUT
  const defaultFormations: Formation[] = [
    {
      id: 0,
      title: "React pour débutant",
      description: "Apprendre les bases de React étape par étape",
      image: "/images/Developpement logiciel.png",
      progress: 45,
    },
    {
      id: 1,
      title: "Next.js Masterclass",
      description: "Créer des applications modernes avec Next.js",
      image: "/images/Devops et automatisation.png",
      progress: 70,
    },
    {
      id: 2,
      title: "UI/UX Design",
      description: "Créer des interfaces modernes et intuitives",
      image: "/images/Data et analytics.png",
      progress: 20,
    },
    {
      id: 3,
      title: "Intelligence artificielle",
      description: "Exploitez la puissance de l’IA pour vos projets.",
      image: "/images/innovation1.png",
      progress: 20,
    },
  ];

  const defaultEvents: Event[] = [
    {
      id: 0,
      title: "Tech Summit 2025",
      date: "2025-10-10",
      type: "online",
      image: "https://source.unsplash.com/400x300/?conference",
    },
    {
      id: 1,
      title: "Workshop JavaScript",
      date: "2025-08-15",
      type: "online",
      image: "https://source.unsplash.com/400x300/?javascript",
    },
    {
      id: 2,
      title: "Meetup Développeurs",
      date: "2025-07-01",
      type: "offline",
      image: "https://source.unsplash.com/400x300/?meeting",
    },
  ];

  // FETCH FORMATIONS
  useEffect(() => {
    fetch("/api/my-formations")
      .then((res) => res.json())
      .then((data: Formation[]) => {
        setFormations(data && data.length > 0 ? data : defaultFormations);
        setLoadingFormations(false);
      })
      .catch(() => {
        setFormations(defaultFormations);
        setLoadingFormations(false);
      });
  }, []);

  // FETCH EVENTS
  useEffect(() => {
    fetch("/api/my-events")
      .then((res) => res.json())
      .then((data: Event[]) => {
        setEvents(data && data.length > 0 ? data : defaultEvents);
        setLoadingEvents(false);
      })
      .catch(() => {
        setEvents(defaultEvents);
        setLoadingEvents(false);
      });
  }, []);

  // Pagination logic
  const paginatedData =
    activeTab === "formations"
      ? formations.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage,
        )
      : events.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage,
        );

  const totalPages =
    activeTab === "formations"
      ? Math.ceil(formations.length / itemsPerPage)
      : Math.ceil(events.length / itemsPerPage);

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-black space-y-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Mes apprentissages
      </h1>

      {/* TABS */}
      <div className="flex gap-3">
        <Button
          variant={activeTab === "formations" ? "default" : "ghost"}
          onClick={() => {
            setActiveTab("formations");
            setCurrentPage(1);
          }}
        >
          <BookOpen className="mr-2" size={18} /> Formations
        </Button>
        <Button
          variant={activeTab === "events" ? "default" : "ghost"}
          onClick={() => {
            setActiveTab("events");
            setCurrentPage(1);
          }}
        >
          <Calendar className="mr-2" size={18} /> Événements
        </Button>
      </div>

      {/* CONTENT */}
      <AnimatedSection className="grid md:grid-cols-3 gap-6">
        {activeTab === "formations" &&
          (loadingFormations ? (
            <p>Chargement des formations...</p>
          ) : (
            (paginatedData as Formation[]).map((f) => (
              <div
                key={f.id}
                className="p-5 rounded-2xl bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl shadow-lg hover:shadow-xl transition"
              >
                <img
                  src={f.image}
                  alt={f.title}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
                <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{f.description}</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div
                    className="bg-indigo-500 h-2 rounded-full"
                    style={{ width: `${f.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-indigo-500">
                    {f.progress}% complété
                  </span>
                  <Button
                    size="sm"
                    onClick={() => router.push(`/user/my_learning/${f.id}`)}
                  >
                    <PlayCircle className="mr-1" size={16} /> Continuer
                  </Button>
                </div>
              </div>
            ))
          ))}

        {activeTab === "events" &&
          (loadingEvents ? (
            <p>Chargement des événements...</p>
          ) : (
            (paginatedData as Event[]).map((e) => (
              <div
                key={e.id}
                className="p-5 rounded-2xl bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl shadow-lg hover:shadow-xl transition"
              >
                <img
                  src={e.image}
                  alt={e.title}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
                <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                  {e.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(e.date).toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-400 mb-3">
                  {e.type === "online" ? "En ligne" : "Présentiel"}
                </p>
                <Button
                  size="sm"
                  onClick={() => router.push(`/user/my_learning/${e.id}`)}
                >
                  Rejoindre
                </Button>
              </div>
            ))
          ))}
      </AnimatedSection>

      {/* PAGINATION */}
      <div className="flex justify-center gap-2 mt-6">
        <Button
          variant="ghost"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Précédent
        </Button>
        <span className="px-3 py-1 text-sm text-gray-700 dark:text-gray-300">
          Page {currentPage} / {totalPages}
        </span>
        <Button
          variant="ghost"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Suivant
        </Button>
      </div>
    </div>
  );
}
