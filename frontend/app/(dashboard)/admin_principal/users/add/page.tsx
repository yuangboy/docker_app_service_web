"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// 🔹 Schema Zod pour validation
const userSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
  role: z.enum(["user", "admin"]),
  avatar: z.any().optional(),
  is_active: z.boolean(),
});

type UserFormData = z.infer<typeof userSchema>;

export default function AddUserPage() {
  const [preview, setPreview] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: { role: "user", is_active: true },
  });

  // 🔹 Gestion de l'avatar avec preview
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    setValue("avatar", file, { shouldValidate: true });
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const onSubmit = (data: UserFormData) => {
    console.log("Nouvel utilisateur :", data);
  };

  return (
    <section className="section-padding min-h-screen bg-gradient-to-br from-indigo-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <div className="container-site">

        {/* HEADER */}
        <AnimatedSection className="mx-auto mb-12 max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">
            Ajouter un utilisateur
          </h1>
          <p className="mt-4 text-muted-foreground">
            Remplissez les champs pour créer un nouvel utilisateur.
          </p>
        </AnimatedSection>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto max-w-2xl space-y-6 rounded-xl border border-gray-200 bg-white/80 dark:bg-gray-900/70 p-8 shadow-lg backdrop-blur-lg"
        >

          {/* NAME */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nom *
            </label>
            <input
              {...register("name")}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
              placeholder="Ex: John Doe"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email *
            </label>
            <input
              type="email"
              {...register("email")}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Mot de passe *
            </label>
            <input
              type="password"
              {...register("password")}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* ROLE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Rôle
            </label>
            <select
              {...register("role")}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
            >
              <option value="user">Utilisateur</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* AVATAR */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Avatar
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 h-32 w-32 object-cover rounded-full border"
              />
            )}
          </div>

          {/* ACTIVE */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("is_active")}
              className="h-4 w-4 rounded border-gray-300 text-accent"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Utilisateur actif
            </span>
          </div>

          {/* SUBMIT */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-accent to-purple-600 text-white hover:from-purple-600 hover:to-accent transition-all duration-500 shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            Ajouter l'utilisateur
          </Button>

        </form>
      </div>
    </section>
  );
}