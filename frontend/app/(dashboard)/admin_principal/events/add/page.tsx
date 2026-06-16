"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ✅ SCHEMA ZOD
const eventSchema = z.object({
  title: z.string().min(3, "Titre requis"),
  description: z.string().min(5, "Description trop courte"),
  price: z.string().optional(),
  currency: z.string(),
  event_date: z.string().min(1, "Date requise"),
  location: z.string().min(2, "Lieu requis"),
  max_participants: z.string().optional(),
  max_participants_online: z.string().optional(),
  max_participants_hybrid: z.string().optional(),
  is_active: z.boolean(),
  image: z.any().optional(),
});

type EventFormData = z.infer<typeof eventSchema>;

export default function AddEventPage() {
  const [preview, setPreview] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      currency: "€",
      is_active: true,
    },
  });

  // ✅ IMAGE HANDLER (IMPORTANT RHF)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // 🔥 IMPORTANT POUR RHF
      setValue("image", file, { shouldValidate: true });
    }
  };

  const onSubmit = (data: EventFormData) => {
    console.log("Event validé :", data);
  };

  return (
    <section className="section-padding min-h-screen bg-gradient-to-br from-indigo-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <div className="container-site">

        <AnimatedSection className="mx-auto mb-12 max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">
            Ajouter un Événement
          </h1>
        </AnimatedSection>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto max-w-2xl space-y-6 rounded-xl border bg-white/80 dark:bg-gray-900/70 p-8 shadow-lg backdrop-blur-lg"
        >

          {/* TITLE */}
          <div>
            <label>Titre</label>
            <input {...register("title")} className="mt-1 w-full rounded-lg border px-4 py-2" />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          {/* DESCRIPTION */}
          <div>
            <label>Description</label>
            <textarea {...register("description")} rows={4} className="mt-1 w-full rounded-lg border px-4 py-2" />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          {/* IMAGE */}
          <div>
            <label>Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {preview && (
              <img src={preview} className="mt-4 h-40 w-full object-cover rounded-lg" />
            )}
          </div>

          {/* PRICE + CURRENCY */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Prix</label>
              <input {...register("price")} className="mt-1 w-full rounded-lg border px-4 py-2" />
            </div>

            <div>
              <label>Devise</label>
              <input {...register("currency")} className="mt-1 w-full rounded-lg border px-4 py-2" />
            </div>
          </div>

          {/* DATE */}
          <div>
            <label>Date</label>
            <input type="date" {...register("event_date")} className="mt-1 w-full rounded-lg border px-4 py-2" />
            {errors.event_date && <p className="text-red-500 text-sm">{errors.event_date.message}</p>}
          </div>

          {/* LOCATION */}
          <div>
            <label>Lieu</label>
            <input {...register("location")} className="mt-1 w-full rounded-lg border px-4 py-2" />
            {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
          </div>

          {/* PARTICIPANTS */}
          <div className="grid grid-cols-3 gap-4">
            <input {...register("max_participants")} placeholder="Présentiel" className="rounded-lg border px-4 py-2" />
            <input {...register("max_participants_online")} placeholder="Online" className="rounded-lg border px-4 py-2" />
            <input {...register("max_participants_hybrid")} placeholder="Hybride" className="rounded-lg border px-4 py-2" />
          </div>

          {/* ACTIVE */}
          <div className="flex items-center gap-2">
            <input type="checkbox" {...register("is_active")} />
            <span>Événement actif</span>
          </div>

          {/* SUBMIT */}
          <Button 
          type="submit"
          className="w-full bg-gradient-to-r from-accent to-purple-600 text-white flex items-center justify-center gap-2">
            <Upload className="w-4 h-4" />
            Créer l'événement
          </Button>

        </form>
      </div>
    </section>
  );
}