"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useAddServiceMutation } from "@/src/store/api";
import { useRouter } from "next/navigation";


// 🔹 Schema Zod pour validation
const serviceSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().optional(),
  icon: z.any().optional(),
  imageUrl: z.any().optional(),
  priceRange: z.string().optional(),
  isActive: z.boolean(),
});


type ServiceFormData = z.infer<typeof serviceSchema>;

export default function AddServiceForm() {
  
    const router = useRouter();
    const [preview, setPreview] = useState<string>("");
  
    const [AddService, { isLoading }] = useAddServiceMutation();
  
    const {
      register,
      handleSubmit,
      setValue,
      reset,
      formState: { errors, isSubmitting },
    } = useForm<ServiceFormData>({
      resolver: zodResolver(serviceSchema),
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
    const onSubmit = async (data: ServiceFormData) => {
      try {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(key, value as any);
          }
        });

        const res = await AddService(formData).unwrap();

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
        <AnimatedSection className="mx-auto mb-12 max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">
            Ajouter un Service
          </h1>
          <p className="mt-4 text-muted-foreground">
            Remplissez les champs pour créer un nouveau service.
          </p>
        </AnimatedSection>

        {/* FORM */}
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
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-accent focus:ring-accent"
              placeholder="Ex: Création site web"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={4}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-accent focus:ring-accent"
            />
          </div>

          {/* ICON */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Icône
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("icon")}
              // onChange={handleImageChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
            />
          </div> */}

          {/* IMAGE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Image du service
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 h-40 w-full object-cover rounded-lg border"
              />
            )}
          </div>

          {/* PRICE RANGE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              prix
            </label>
            <input
              {...register("priceRange")}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-accent focus:ring-accent"
              placeholder="Ex: 500 FCFA"
            />
          </div>

          {/* IS ACTIVE */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("isActive")}
              className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Service actif
            </span>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-accent to-purple-600 text-white hover:from-purple-600 hover:to-accent transition-all duration-500 shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            Ajouter le service
          </Button>
        </form>
      </div>
    </section>
  );
}