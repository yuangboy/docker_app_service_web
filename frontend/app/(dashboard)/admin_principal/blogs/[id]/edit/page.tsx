"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// 🔹 Fake API
const fetchBlog = async (id: string) => {
  return {
    title: "Exemple de Blog",
    excerpt: "Résumé court de l'article existant",
    content: "Contenu complet de l'article existant...",
    image: "/images/blog.png",
    author: "John Doe",
    category: "Tech",
  };
};

// 🔹 Schema Zod
const blogSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  image: z.any().optional(),
  author: z.string().optional(),
  category: z.string().optional(),
});

type BlogFormData = z.infer<typeof blogSchema>;

export default function EditBlogPage({ params }: { params: { id: string } }) {
  const [preview, setPreview] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
  });

  // 🔹 Charger les données existantes
  useEffect(() => {
    fetchBlog(params.id).then((data) => {
      reset(data); // ✅ injecte les données dans RHF
      setPreview(data.image); // preview initiale
    });
  }, [params.id, reset]);

  // 🔹 Gestion image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    // IMPORTANT RHF
    setValue("image", file, { shouldValidate: true });
  };

  const onSubmit = (data: BlogFormData) => {
    console.log("Article mis à jour :", data);
  };

  return (
    <section className="section-padding min-h-screen bg-gradient-to-br from-indigo-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <div className="container-site">

        {/* HEADER */}
        <AnimatedSection className="mx-auto mb-12 max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">
            Éditer l'Article
          </h1>
          <p className="mt-4 text-muted-foreground text-lg">
            Modifiez les informations ci-dessous pour mettre à jour votre article.
          </p>
        </AnimatedSection>

        {/* FORM */}
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
          </div>

          {/* IMAGE */}
          <div>
            <label>Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {preview && (
              <img
                src={preview}
                className="mt-4 h-40 w-full object-cover rounded-lg border"
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
          </div>

          {/* CATEGORY */}
          <div>
            <label>Catégorie</label>
            <input
              {...register("category")}
              className="mt-1 w-full rounded-lg border px-4 py-2"
            />
          </div>

          {/* SUBMIT */}
          <Button 
          type="submit"
          className="w-full bg-gradient-to-r from-accent to-purple-600 text-white cursor-pointer" >
            Mettre à jour
          </Button>
        </form>
      </div>
    </section>
  );
}