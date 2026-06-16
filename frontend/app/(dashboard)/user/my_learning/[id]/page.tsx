"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LearnPage() {
  const { id } = useParams();

  const courses = [
    {
      title: "React pour débutant",
      videos: [
        {
          title: "Introduction à React",
          url: "https://www.youtube.com/embed/hhe6Xb4Em5U",
        },
        {
          title: "JSX expliqué",
          url: "https://www.youtube.com/embed/w7ejDZ8SWv8",
        },
        {
          title: "Les composants",
          url: "https://www.youtube.com/embed/Ke90Tje7VS0",
        },
      ],
    },
    {
      title: "Next.js Masterclass",
      videos: [
        {
          title: "Intro Next.js",
          url: "https://www.youtube.com/embed/Sklc_fQBmcs",
        },
      ],
    },
    {
      title: "UI/UX Design",
      videos: [
        {
          title: "Créer des interfaces modernes et intuitives",
          url: "https://www.youtube.com/embed/Sklc_fQBmcs",
        },
      ],
    },
    {
      title: "Intelligence Artificielle",
      videos: [
        {
          title: "Exploitez la puissance de l’IA pour vos projets.",
          url: "https://www.youtube.com/embed/BujvpzOpk-I",
        },
      ],
    },
  ];

  const course = courses[parseInt(id as string)] || courses[0];

  const [currentVideo, setCurrentVideo] = useState(0);

  if (!course) {
    return <div className="text-white p-10">Cours introuvable</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      {/* VIDEO */}
      <div className="flex-1 p-4">
        <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg">
          <iframe
            src={course.videos[currentVideo].url}
            title="video"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>

        <h2 className="mt-4 text-xl font-semibold">
          {course.videos[currentVideo].title}
        </h2>

        <div className="mt-4">
          {currentVideo < course.videos.length - 1 && (
            <Button onClick={() => setCurrentVideo(currentVideo + 1)}>
              Vidéo suivante
            </Button>
          )}
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="w-full md:w-80 bg-gray-900 border-l border-gray-700 p-4 overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">{course.title}</h3>

        <div className="space-y-2">
          {course.videos.map((video, index) => (
            <div
              key={index}
              onClick={() => setCurrentVideo(index)}
              className={`p-3 rounded-lg cursor-pointer flex items-center gap-2 transition ${
                currentVideo === index
                  ? "bg-indigo-600"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              <PlayCircle size={16} />
              <span className="text-sm">{video.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
