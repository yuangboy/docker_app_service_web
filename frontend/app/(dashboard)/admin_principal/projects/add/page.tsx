"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { ArrowLeft, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddProjectMutation } from "@/src/store/api";
import toast from "react-hot-toast";

// 🔹 Schema Zod pour validation
const projectSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().optional(),
  imageUrl: z.any().optional(),
  category: z.string().optional(),
  clientName: z.string().optional(),
  completionDate: z.string().optional(),
  isActive: z.boolean(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

export default function AddProjectPage() {
  const router = useRouter();
  const [preview, setPreview] = useState<string>("");

  const [addProject, { isLoading }] = useAddProjectMutation();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: { isActive: true },
  });

  // 🔹 Gestion de l'image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setValue("imageUrl", file, { shouldValidate: true });
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // 🔹 Submit
  const onSubmit = async (data: ProjectFormData) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value as any);
        }
      });

      const res = await addProject(formData).unwrap();

      if (res.success) {
        console.log("enregistrement avec succèss");
          toast.success(
            res.message ? res.message : "Enregistrement avec succèss",
          );
        reset();
        setPreview("");

      }
    } catch (err) {
      console.error(err);
      alert("❌ Erreur lors de l'ajout du projet.");
    }
  };

  return (
    <section className="section-padding min-h-screen bg-gradient-to-br from-indigo-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <div className="container-site">
        {/* HEADER */}
        <AnimatedSection className="mx-auto mb-12 max-w-2xl text-center relative">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="absolute left-0 top-0 flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Retour
          </Button>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">
            Ajouter un Projet
          </h1>
          <p className="mt-4 text-muted-foreground">
            Ajoutez un projet à votre portfolio professionnel.
          </p>
        </AnimatedSection>

        {/* FORM */}
        <AnimatedSection>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto max-w-2xl space-y-6 rounded-xl border border-gray-200 bg-white/80 dark:bg-gray-900/70 p-8 shadow-lg backdrop-blur-lg"
          >
            {/* TITLE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Titre *
              </label>
              <input
                {...register("title")}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            {/* CATEGORY */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Catégorie *
              </label>
              <select
                {...register("category")}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
              >
                <option value="">Choisir</option>
                <option value="Web">Web</option>
                <option value="Mobile">Mobile</option>
                <option value="Cloud">Cloud</option>
                <option value="ERP">ERP</option>
                <option value="Data">Data</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* CLIENT */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Client
              </label>
              <input
                {...register("clientName")}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>

            {/* DATE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Date
              </label>
              <input
                type="date"
                {...register("completionDate")}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                {...register("description")}
                rows={4}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>

            {/* IMAGE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-4 h-40 w-full object-cover rounded-lg border"
                />
              )}
            </div>

            {/* ACTIVE */}
            <div className="flex items-center gap-2">
              <input type="checkbox" {...register("isActive")} />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Projet actif
              </span>
            </div>

            {/* SUBMIT */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-accent to-purple-600 text-white flex items-center justify-center gap-2 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              {isSubmitting ? "Enregistrement..." : "Ajouter le projet"}
            </Button>
          </form>
        </AnimatedSection>
      </div>
    </section>
  );
}
