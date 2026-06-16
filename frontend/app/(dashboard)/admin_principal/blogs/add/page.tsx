"use client";

import React, { useState,useEffect} from "react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddBlogPostMutation } from "@/src/store/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// ✅ SCHÉMA ZOD
const blogSchema = z.object({
  title: z.string().min(3, "Le titre est requis (min 3 caractères)"),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  author: z.string().optional(),
  category: z.string().optional(),
  imageUrl: z.any().optional(),
});

type BlogFormData = z.infer<typeof blogSchema>;

export default function AddBlogPage() {

  const router = useRouter();
    const [preview, setPreview] = useState<string>("");
  
    const [AddBlogPost, { isLoading }] = useAddBlogPostMutation();
  
    const {
      register,
      handleSubmit,
      setValue,
      reset,
      formState: { errors, isSubmitting },
    } = useForm<BlogFormData>({
      resolver: zodResolver(blogSchema)
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
    const onSubmit = async (data: BlogFormData) => {
      try {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(key, value as any);
          }
        });

        const res = await AddBlogPost(formData).unwrap();

        if (res.success) {
          console.log("enregistrement avec succèss");
          toast.success("Enregistrement avec succèss");
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
        
        <AnimatedSection className="mx-auto mb-12 max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">
            Ajouter un Article
          </h1>
          <p className="mt-4 text-muted-foreground text-lg">
            Publiez un nouvel article de blog.
          </p>
        </AnimatedSection>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto max-w-2xl space-y-6 rounded-xl border border-gray-200 bg-white/80 dark:bg-gray-900/70 p-8 shadow-lg backdrop-blur-lg"
        >
          {/* TITLE */}
          <div>
            <label>Titre</label>
            <input
              {...register("title")}
              className="mt-1 w-full rounded-lg border px-4 py-2"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* EXCERPT */}
          <div>
            <label>Extrait</label>
            <input
              {...register("excerpt")}
              className="mt-1 w-full rounded-lg border px-4 py-2"
            />
          </div>

          {/* CONTENT */}
          <div>
            <label>Contenu</label>
            <textarea
              {...register("content")}
              rows={6}
              className="mt-1 w-full rounded-lg border px-4 py-2"
            />
            {errors.content && (
              <p className="text-red-500 text-sm">{errors.content.message}</p>
            )}
          </div>

          {/* IMAGE */}
          <div>
            <label>Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />

            {preview && (
              <img
                src={preview}
                className="mt-4 h-40 w-full object-cover rounded-lg"
              />
            )}
          </div>

          {/* AUTHOR */}
          <div>
            <label>Auteur</label>
            <input
              {...register("author")}
              className="mt-1 w-full rounded-lg border px-4 py-2"
            />
            {errors.author && (
              <p className="text-red-500 text-sm">{errors.author.message}</p>
            )}
          </div>

          {/* CATEGORY */}
          <div>
            <label>Catégorie</label>
            <input
              {...register("category")}
              className="mt-1 w-full rounded-lg border px-4 py-2"
            />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          {/* SUBMIT */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-accent to-purple-600 text-white cursor-pointer"
          >
            Publier
          </Button>
        </form>
      </div>
    </section>
  );
}