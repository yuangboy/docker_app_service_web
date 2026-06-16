"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface Career {
  title: string;
  description: string;
  location: string;
  contractType: string;
  department: string;
  technologies: string;
  experience: string;
  responsibilities: string;
  benefits: string;
}

// ✅ SCHÉMA ZOD
const careerSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().optional(),
  location: z.string().optional(),
  contractType: z.string().optional(),
  department: z.string().optional(),
  technologies: z.string().optional(),
  experience: z.string().optional(),
  responsibilities: z.string().optional(),
  benefits: z.string().optional(),
});

type CareerFormData = z.infer<typeof careerSchema>;

export default function EditCareersPage({ careerId }: { careerId: string }) {

  // ✅ RHF
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CareerFormData>({
    resolver: zodResolver(careerSchema),
  });

  // ✅ Charger les données existantes
  useEffect(() => {
    const existingCareer: Career = {
      title: "Développeur React",
      description: "Développement d'applications web en React et Next.js",
      location: "Paris",
      contractType: "CDI",
      department: "Engineering",
      technologies: "React, Node.js, Docker",
      experience: "3 ans minimum",
      responsibilities: "Développer, maintenir et améliorer les applications",
      benefits: "Tickets resto, télétravail, primes",
    };

    // IMPORTANT 👉 injecter les données dans RHF
    reset(existingCareer);
  }, [careerId, reset]);

  // ✅ SUBMIT
  const onSubmit = (data: CareerFormData) => {
    console.log("Offre modifiée :", data);
  };

  return (
    <section className="section-padding min-h-screen bg-gradient-to-br from-indigo-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <div className="container-site">

        <AnimatedSection className="mx-auto mb-12 max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">
            Modifier une Offre de Carrière
          </h1>
        </AnimatedSection>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto max-w-2xl space-y-6 rounded-xl border bg-white/80 dark:bg-gray-900/70 p-8 shadow-lg"
        >

          {/* TITLE */}
          <div>
            <label>Titre *</label>
            <input {...register("title")} className="input" />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          </div>

          {/* DESCRIPTION */}
          <div>
            <label>Description</label>
            <textarea {...register("description")} className="input" />
          </div>

          {/* LOCATION + CONTRACT */}
          <div className="grid grid-cols-2 gap-4">
            <input {...register("location")} placeholder="Localisation" className="input" />
            <input {...register("contractType")} placeholder="Contrat" className="input" />
          </div>

          {/* DEPARTMENT + TECH */}
          <div className="grid grid-cols-2 gap-4">
            <input {...register("department")} placeholder="Département" className="input" />
            <input {...register("technologies")} placeholder="Technologies" className="input" />
          </div>

          {/* EXPERIENCE */}
          <input {...register("experience")} placeholder="Expérience" className="input" />

          {/* RESPONSIBILITIES */}
          <textarea {...register("responsibilities")} placeholder="Responsabilités" className="input" />

          {/* BENEFITS */}
          <textarea {...register("benefits")} placeholder="Avantages" className="input" />

          <Button 
          type="submit"
          className="w-full bg-gradient-to-r from-accent to-purple-600 text-white cursor-pointer" >
            Enregistrer les modifications
          </Button>

        </form>
      </div>
    </section>
  );
}