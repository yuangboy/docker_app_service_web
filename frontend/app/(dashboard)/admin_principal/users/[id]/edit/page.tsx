"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { Upload } from "lucide-react";

export default function EditUserPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    avatar: null as File | null,
    preview: "",
    is_active: true,
  });

  const [errors, setErrors] = useState<any>({});

  // 👉 SIMULATION : charger un user existant
  useEffect(() => {
    const user = {
      name: "John Doe",
      email: "john@email.com",
      role: "admin",
      is_active: true,
      avatar_url: "https://via.placeholder.com/150",
    };

    setFormData((prev) => ({
      ...prev,
      name: user.name,
      email: user.email,
      role: user.role,
      is_active: user.is_active,
      preview: user.avatar_url,
    }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        avatar: file,
        preview: previewUrl,
      }));
    }
  };

  const validate = () => {
    const newErrors: any = {};

    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email requis";
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const payload = {
      ...formData,
      avatar_url: formData.avatar,
    };

    console.log("Utilisateur modifié :", payload);
  };

  return (
    <section className="section-padding min-h-screen bg-gradient-to-br from-indigo-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      
      <div className="container-site">
        
        {/* HEADER */}
        <AnimatedSection className="mx-auto mb-12 max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">
            Modifier un utilisateur
          </h1>
          <p className="mt-4 text-muted-foreground">
            Mettez à jour les informations de l'utilisateur.
          </p>
        </AnimatedSection>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-2xl space-y-6 rounded-xl border border-gray-200 bg-white/80 dark:bg-gray-900/70 p-8 shadow-lg backdrop-blur-lg"
        >
          {/* NAME */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nom *
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* PASSWORD (optionnel en edit) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nouveau mot de passe
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Laisser vide pour ne pas changer"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
            />
          </div>

          {/* ROLE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Rôle
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
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
              onChange={handleImageChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
            />

            {formData.preview && (
              <img
                src={formData.preview}
                alt="Preview"
                className="mt-4 h-32 w-32 object-cover rounded-full border"
              />
            )}
          </div>

          {/* ACTIVE */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-accent"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Utilisateur actif
            </span>
          </div>

          {/* SUBMIT */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-accent text-white hover:opacity-90 transition-all duration-500 shadow-md flex items-center justify-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Modifier l'utilisateur
          </Button>
        </form>
      </div>
    </section>
  );
}