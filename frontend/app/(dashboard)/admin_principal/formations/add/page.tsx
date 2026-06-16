"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// 🔹 Schema Zod
const formationSchema = z.object({
  title: z.string().min(3, "Le titre est requis"),
  description: z.string().optional(),
  price: z.string().min(1, "Le prix est requis"),
  currency: z.string(),
  duration: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  max_participants: z.string().optional(),
  max_participants_online: z.string().optional(),
  max_participants_hybride: z.string().optional(),
  formateur: z.string().optional(),
  is_active: z.boolean(),
  image: z.any().optional(),
});

type FormationFormData = z.infer<typeof formationSchema>;

export default function AddFormationPage() {
  const [preview, setPreview] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormationFormData>({
    resolver: zodResolver(formationSchema),
    defaultValues: {
      currency: "EUR",
      is_active: true,
    },
  });

  // 🔹 Gérer l'image et le preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // IMPORTANT RHF
      setValue("image", file, { shouldValidate: true });
    }
  };

  const onSubmit = (data: FormationFormData) => {
    console.log("Formation validée :", data);
  };

  return (
    <section className="section-padding min-h-screen bg-gradient-to-br from-indigo-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <div className="container-site">
        <AnimatedSection className="mx-auto mb-12 max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">
            Ajouter une Formation
          </h1>
          <p className="mt-4 text-muted-foreground">
            Remplissez les champs pour créer une nouvelle formation.
          </p>
        </AnimatedSection>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto max-w-2xl space-y-6 rounded-xl border bg-white/80 dark:bg-gray-900/70 p-8 shadow-lg backdrop-blur-lg"
        >
          {/* TITLE */}
          <div>
            <label>Titre *</label>
            <input
              {...register("title")}
              className="mt-1 w-full rounded-lg border px-4 py-2"
              placeholder="Ex: Formation React"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          {/* DESCRIPTION */}
          <div>
            <label>Description</label>
            <textarea
              {...register("description")}
              rows={4}
              className="mt-1 w-full rounded-lg border px-4 py-2"
            />
          </div>

          {/* IMAGE */}
          <div>
            <label>Image de la formation</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {preview && <img src={preview} className="mt-4 h-40 w-full object-cover rounded-lg" />}
          </div>

          {/* PRICE + CURRENCY */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Prix *</label>
              <input type="number" {...register("price")} className="mt-1 w-full rounded-lg border px-4 py-2" />
              {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>

            <div>
              <label>Devise</label>
              <select {...register("currency")} className="mt-1 w-full rounded-lg border px-4 py-2">
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="XAF">XAF</option>
              </select>
            </div>
          </div>

          {/* DURATION */}
          <div>
            <label>Durée</label>
            <input {...register("duration")} className="mt-1 w-full rounded-lg border px-4 py-2" placeholder="Ex: 3 semaines" />
          </div>

          {/* DATES */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Date début</label>
              <input type="date" {...register("start_date")} className="mt-1 w-full rounded-lg border px-4 py-2" />
            </div>
            <div>
              <label>Date fin</label>
              <input type="date" {...register("end_date")} className="mt-1 w-full rounded-lg border px-4 py-2" />
            </div>
          </div>

          {/* PARTICIPANTS */}
          <div className="grid grid-cols-3 gap-4">
            <input {...register("max_participants")} placeholder="Présentiel" className="rounded-lg border px-4 py-2" />
            <input {...register("max_participants_online")} placeholder="Online" className="rounded-lg border px-4 py-2" />
            <input {...register("max_participants_hybride")} placeholder="Hybride" className="rounded-lg border px-4 py-2" />
          </div>

          {/* FORMATEUR */}
          <div>
            <label>Formateur</label>
            <input {...register("formateur")} className="mt-1 w-full rounded-lg border px-4 py-2" />
          </div>

          {/* ACTIVE */}
          <div className="flex items-center gap-2">
            <input type="checkbox" {...register("is_active")} />
            <span>Formation active</span>
          </div>

          {/* SUBMIT */}
          <Button 
          type="submit"
          className="w-full bg-gradient-to-r from-accent to-purple-600 text-white flex items-center justify-center gap-2 cursor-pointer">
            <Upload className="w-4 h-4" />
            Ajouter la formation
          </Button>
        </form>
      </div>
    </section>
  );
}