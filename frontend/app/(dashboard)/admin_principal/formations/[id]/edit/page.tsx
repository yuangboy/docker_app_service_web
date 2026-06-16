"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { Upload } from "lucide-react";

export default function EditFormationPage({ formationId }: { formationId: string }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null as File | null,
    preview: "",
    price: "",
    currency: "EUR",
    duration: "",
    start_date: "",
    end_date: "",
    max_participants: "",
    max_participants_online: "",
    max_participants_hybride: "",
    formateur: "",
    is_active: true,
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFormation = async () => {
      const fakeData = {
        title: "Formation React",
        description: "Apprendre React de zéro à avancé",
        image_url: "https://via.placeholder.com/400",
        price: "200",
        currency: "EUR",
        duration: "3 semaines",
        start_date: "2026-04-01",
        end_date: "2026-04-21",
        max_participants: "20",
        max_participants_online: "50",
        max_participants_hybride: "30",
        formateur: "John Doe",
        is_active: true,
      };

      setFormData((prev) => ({
        ...prev,
        ...fakeData,
        preview: fakeData.image_url,
      }));

      setLoading(false);
    };

    fetchFormation();
  }, [formationId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
        image: file,
        preview: previewUrl,
      }));
    }
  };

  const validate = () => {
    const newErrors: any = {};

    if (!formData.title.trim()) newErrors.title = "Le titre est requis";
    if (!formData.price) newErrors.price = "Le prix est requis";

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
      image_url: formData.image || formData.preview,
    };

    console.log("Formation modifiée :", payload);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }

  return (
    <section className="section-padding min-h-screen bg-gradient-to-br from-indigo-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <div className="container-site">

        {/* HEADER */}
        <AnimatedSection className="mx-auto mb-12 max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">
            Modifier la Formation
          </h1>
          <p className="mt-4 text-muted-foreground">
            Mettez à jour les informations de la formation.
          </p>
        </AnimatedSection>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-2xl space-y-6 rounded-xl border border-gray-200 bg-white/80 dark:bg-gray-900/70 p-8 shadow-lg backdrop-blur-lg"
        >
          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Titre *
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-accent focus:ring-accent"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-accent focus:ring-accent"
            />
          </div>

          {/* IMAGE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Image de la formation
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
                className="mt-4 h-40 w-full object-cover rounded-lg border"
              />
            )}
          </div>

          {/* PRICE + CURRENCY */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Prix *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-accent focus:ring-accent"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Devise
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-accent focus:ring-accent"
              >
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="XAF">XAF</option>
              </select>
            </div>
          </div>

          {/* DURATION */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Durée
            </label>
            <input
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-accent focus:ring-accent"
            />
          </div>

          {/* DATES */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Date début
              </label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Date fin
              </label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>
          </div>

          {/* PARTICIPANTS */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Participants (présentiel)
            </label>
            <input
              type="number"
              name="max_participants"
              value={formData.max_participants}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-accent focus:ring-accent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Participants en ligne
              </label>
              <input
                type="number"
                name="max_participants_online"
                value={formData.max_participants_online}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-accent focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Participants hybride
              </label>
              <input
                type="number"
                name="max_participants_hybride"
                value={formData.max_participants_hybride}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-accent focus:ring-accent"
              />
            </div>
          </div>

          {/* FORMATEUR */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Formateur
            </label>
            <input
              type="text"
              name="formateur"
              value={formData.formateur}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-accent focus:ring-accent"
            />
          </div>

          {/* ACTIVE */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Formation active
            </span>
          </div>

          {/* SUBMIT */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-accent to-purple-600 text-white hover:from-purple-600 hover:to-accent transition-all duration-500 shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            Mettre à jour la formation
          </Button>
        </form>
      </div>
    </section>
  );
}