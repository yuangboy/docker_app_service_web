"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ✅ SCHÉMA ZOD
const careerSchema = z.object({
  title: z.string().min(3, "Le titre est requis"),
  description: z.string().min(10, "Description trop courte"),
  location: z.string().min(2, "Localisation requise"),
  contractType: z.string().min(2, "Type de contrat requis"),
  department: z.string().optional(),
  technologies: z.string().optional(),
  experience: z.string().optional(),
  responsibilities: z.string().optional(),
  benefits: z.string().optional(),
});

type CareerFormData = z.infer<typeof careerSchema>;

export default function AddCareersPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CareerFormData>({
    resolver: zodResolver(careerSchema),
  });

  const onSubmit = (data: CareerFormData) => {
    console.log("Offre validée :", data);
  };

  return (
    <section className="section-padding min-h-screen bg-gradient-to-br from-indigo-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <div className="container-site">

        <AnimatedSection className="mx-auto mb-12 max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">
            Ajouter une Offre de Carrière
          </h1>
        </AnimatedSection>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto max-w-2xl space-y-6 rounded-xl border bg-white/80 dark:bg-gray-900/70 p-8 shadow-lg backdrop-blur-lg"
        >

          {/* TITLE */}
          <div>
            <label>Titre du poste</label>
            <input {...register("title")} className="mt-1 w-full rounded-lg border px-4 py-2" />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          {/* DESCRIPTION */}
          <div>
            <label>Description</label>
            <textarea {...register("description")} rows={4} className="mt-1 w-full rounded-lg border px-4 py-2" />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          {/* LOCATION + CONTRACT */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Localisation</label>
              <input {...register("location")} className="mt-1 w-full rounded-lg border px-4 py-2" />
              {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
            </div>

            <div>
              <label>Type de contrat</label>
              <input {...register("contractType")} className="mt-1 w-full rounded-lg border px-4 py-2" />
              {errors.contractType && <p className="text-red-500 text-sm">{errors.contractType.message}</p>}
            </div>
          </div>

          {/* DEPARTMENT + TECH */}
          <div className="grid grid-cols-2 gap-4">
            <input {...register("department")} placeholder="Département" className="rounded-lg border px-4 py-2" />
            <input {...register("technologies")} placeholder="Technologies" className="rounded-lg border px-4 py-2" />
          </div>

          {/* EXPERIENCE */}
          <input {...register("experience")} placeholder="Expérience" className="w-full rounded-lg border px-4 py-2" />

          {/* RESPONSIBILITIES */}
          <textarea {...register("responsibilities")} placeholder="Responsabilités" className="w-full rounded-lg border px-4 py-2" />

          {/* BENEFITS */}
          <textarea {...register("benefits")} placeholder="Avantages" className="w-full rounded-lg border px-4 py-2" />

          {/* SUBMIT */}
          <Button 
            type="submit"
          className="w-full bg-gradient-to-r from-accent to-purple-600 text-white cursor-pointer">
            Publier
          </Button>

        </form>
      </div>
    </section>
  );
}