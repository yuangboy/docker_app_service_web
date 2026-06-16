"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ✅ SCHEMA ZOD
const eventSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().optional(),
  price: z.union([z.string(), z.number()]).optional(),
  currency: z.string().optional(),
  event_date: z.string().optional(),
  location: z.string().optional(),
  max_participants: z.string().optional(),
  max_participants_online: z.string().optional(),
  max_participants_hybrid: z.string().optional(),
  is_active: z.boolean().optional(),
  image: z.any().optional(),
});

type EventFormData = z.infer<typeof eventSchema>;

interface EditEventPageProps {
  eventId: number;
}

export default function EditEventPage({ eventId }: EditEventPageProps) {

  const [preview, setPreview] = useState<string>("");

  // ✅ RHF
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      is_active: true,
      currency: "€",
    },
  });

  // ✅ WATCH image
  const imageFile = watch("image");

  // ✅ LOAD DATA
  useEffect(() => {
    async function fetchEvent() {
      const res = await fetch(`/api/events/${eventId}`);
      const data = await res.json();

      reset({
        title: data.title,
        description: data.description,
        price: data.price,
        currency: data.currency,
        event_date: data.event_date,
        location: data.location,
        max_participants: data.max_participants,
        max_participants_online: data.max_participants_online,
        max_participants_hybrid: data.max_participants_hybrid,
        is_active: data.is_active,
      });

      if (data.image_url) {
        setPreview(data.image_url);
      }
    }

    fetchEvent();
  }, [eventId, reset]);

  // ✅ IMAGE HANDLER (IMPORTANT RHF)
  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const file = imageFile[0];
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  }, [imageFile]);

  // ✅ SUBMIT
  const onSubmit = async (data: EventFormData) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "image" && value?.[0]) {
        formData.append("image", value[0]);
      } else {
        formData.append(key, value as any);
      }
    });

    console.log("Événement modifié :", data);
  };

  return (
    <section className="section-padding min-h-screen bg-gradient-to-br from-indigo-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <div className="container-site">

        <AnimatedSection className="mx-auto mb-12 max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-accent to-purple-500 bg-clip-text text-transparent">
            Modifier l'Événement
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
          <textarea {...register("description")} className="input" placeholder="Description" />

          {/* IMAGE */}
          <div>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
            />
            {preview && (
              <img src={preview} className="mt-4 h-40 w-full object-cover rounded-lg" />
            )}
          </div>

          {/* PRICE + CURRENCY */}
          <div className="grid grid-cols-2 gap-4">
            <input {...register("price")} placeholder="Prix" className="input" />
            <input {...register("currency")} placeholder="Devise" className="input" />
          </div>

          {/* DATE */}
          <input type="date" {...register("event_date")} className="input" />

          {/* LOCATION */}
          <input {...register("location")} placeholder="Lieu" className="input" />

          {/* PARTICIPANTS */}
          <div className="grid grid-cols-3 gap-4">
            <input {...register("max_participants")} placeholder="Présentiel" className="input" />
            <input {...register("max_participants_online")} placeholder="Online" className="input" />
            <input {...register("max_participants_hybrid")} placeholder="Hybride" className="input" />
          </div>

          {/* ACTIVE */}
          <div className="flex items-center gap-2">
            <input type="checkbox" {...register("is_active")} />
            <span>Actif</span>
          </div>

          <Button        
            type="submit"
            className="w-full bg-gradient-to-r from-accent to-purple-600 text-white cursor-pointer">
            <Upload className="w-4 h-4" />
            Mettre à jour
          </Button>

        </form>
      </div>
    </section>
  );
}