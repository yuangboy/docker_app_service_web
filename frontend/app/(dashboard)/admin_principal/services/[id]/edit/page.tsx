"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { Upload } from "lucide-react";

type ServiceData = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  icon: string | null;
  price_range: string;
  is_active: boolean;
};

type ServiceFormState = {
  id: string;
  title: string;
  description: string;
  icon: File | null;
  previewIcon: string;
  image_url: File | null;
  preview: string;
  currentImage: string;
  currentIcon: string;
  price_range: string;
  is_active: boolean;
};

type Errors = {
  title?: string;
};

export default function EditServiceForm({
  serviceData,
  onSubmit,
}: {
  serviceData: ServiceData;
  onSubmit: (service: ServiceFormState) => void;
}) {
  const [service, setService] = useState<ServiceFormState>({
    id: "",
    title: "",
    description: "",
    icon: null,
    previewIcon: "",
    image_url: null,
    preview: "",
    currentImage: "",
    currentIcon: "",
    price_range: "",
    is_active: true,
  });

  const [errors, setErrors] = useState<Errors>({});

  // Pré-remplissage
  useEffect(() => {
    if (serviceData) {
      setService({
        id: serviceData.id,
        title: serviceData.title || "",
        description: serviceData.description || "",
        icon: null,
        previewIcon: "",
        image_url: null,
        preview: "",
        currentImage: serviceData.image_url || "",
        currentIcon: serviceData.icon || "",
        price_range: serviceData.price_range || "",
        is_active: serviceData.is_active ?? true,
      });
    }
  }, [serviceData]);


const handleChange = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => {
  const { name, value, type } = e.target;

  if (type === "checkbox") {
    const input = e.target as HTMLInputElement; // ✅ cast explicite
    setService((prev) => ({ ...prev, [name]: input.checked }));
  } else if (type === "file") {
    const input = e.target as HTMLInputElement; // ✅ cast explicite
    const file = input.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);

      if (name === "icon") {
        setService((prev) => ({
          ...prev,
          icon: file,
          previewIcon: previewUrl,
        }));
      } else {
        setService((prev) => ({
          ...prev,
          image_url: file,
          preview: previewUrl,
        }));
      }
    }
  } else {
    setService((prev) => ({ ...prev, [name]: value }));
  }
};



  const validate = (): Errors => {
    const newErrors: Errors = {};
    if (!service.title.trim()) newErrors.title = "Le titre est requis";
    return newErrors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    onSubmit(service);
  };

  return (
    <section className="section-padding min-h-screen bg-gradient-to-br from-indigo-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <div className="container-site">
        {/* HEADER */}
        <AnimatedSection className="mx-auto mb-12 max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">
            Modifier le Service
          </h1>
          <p className="mt-4 text-muted-foreground">
            Mettez à jour les informations de votre service.
          </p>
        </AnimatedSection>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-2xl space-y-6 rounded-xl border border-gray-200 bg-white/80 dark:bg-gray-900/70 p-8 shadow-lg backdrop-blur-lg"
        >
          {/* ... le reste du formulaire inchangé ... */}
        </form>
      </div>
    </section>
  );
}
