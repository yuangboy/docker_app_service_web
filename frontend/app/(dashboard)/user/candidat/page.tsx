"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useAddCareerMutation,
  useGetAllCareerInfosQuery,
} from "@/src/store/api";
import { ICareerInfo } from "@/src/store/interface";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { useTheme } from "@/context/ThemeContext";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

/* ---------------- ZOD ---------------- */
const careerSchema = z.object({
  careerInfoId: z.string().min(1, "Carrière requise"),
  fullName: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  position: z.string().optional(),
  experience: z.string().optional(),
  coverLetter: z.string().min(10, "Lettre de motivation trop courte"),
  cvUrl: z.any().optional(),
});

type CareerFormData = z.infer<typeof careerSchema>;

export default function CareerPage() {
  const { darkMode } = useTheme();
  const searchParams = useSearchParams();
  const careerInfoIdFromUrl = searchParams.get("careerInfoId") || "";
  const user = useSelector((state: RootState) => state.user.user);

  const [preview, setPreview] = useState<string>("");

  const router = useRouter();
  const { data: dataService, isLoading } = useGetAllCareerInfosQuery();
  const [addCareer, { isLoading: isSubmitting }] = useAddCareerMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CareerFormData>({
    resolver: zodResolver(careerSchema),
    defaultValues: {
      careerInfoId: "",
    },
  });

  /* ---------------- SYNC URL ---------------- */
  useEffect(() => {
    if (dataService?.data?.length && careerInfoIdFromUrl) {
      const exists = dataService.data.find(
        (s: ICareerInfo) => s._id === careerInfoIdFromUrl,
      );
      if (exists) setValue("careerInfoId", exists._id);
    }
  }, [dataService, careerInfoIdFromUrl, setValue]);

  const selectedCareer = dataService?.data?.find(
    (s: ICareerInfo) => s._id === watch("careerInfoId"),
  );

  /* ---------------- FILE ---------------- */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("cvUrl", file, { shouldValidate: true });

      // preview uniquement si image
      if (file.type.startsWith("image/")) {
        setPreview(URL.createObjectURL(file));
      } else {
        setPreview("");
      }
    }
  };

  /* ---------------- SUBMIT ---------------- */
  const onSubmit: SubmitHandler<CareerFormData> = async (data) => {
    try {
      const formData = new FormData();

      if (user?._id) {
        formData.append("userId", user._id);
      }

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value as any);
        }
      });

      const res = await addCareer(formData).unwrap();

      if (res.success) {
        toast.success(res.message || "Candidature envoyée avec succès");
        // reset();
        setPreview("");
        router.push("/user");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Erreur lors de l'envoi");
    }
  };

  return (
    <section
      className={`min-h-screen flex items-center justify-center px-4 py-16 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          : "bg-gradient-to-br from-indigo-50 via-white to-gray-100"
      }`}
    >
      <AnimatedSection className="w-full max-w-3xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-3xl p-8 space-y-6"
        >
          {/* TITLE */}
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Candidature
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Postulez à une opportunité
            </p>
          </div>

          {/* SELECT */}
          <div>
            <label className="text-sm font-medium">Poste</label>
            <select {...register("careerInfoId")} className="input">
              <option value="">-- Choisir un poste --</option>
              {dataService?.data?.map((s: ICareerInfo) => (
                <option key={s._id} value={s._id}>
                  {s.title}
                </option>
              ))}
            </select>
            {errors.careerInfoId && (
              <p className="error">{errors.careerInfoId.message}</p>
            )}
            {selectedCareer && (
              <p className="text-xs text-gray-500 mt-1">
                ✔ {selectedCareer.title}
              </p>
            )}
          </div>

          {/* NOM / EMAIL */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label>Nom complet</label>
              <input {...register("fullName")} className="input" />
              {errors.fullName && (
                <p className="error">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label>Email</label>
              <input type="email" {...register("email")} className="input" />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>
          </div>

          {/* PHONE */}
          <div>
            <label>Téléphone</label>
            <input {...register("phone")} className="input" />
          </div>

          {/* POSITION */}
          <div>
            <label>Poste souhaité</label>
            <input {...register("position")} className="input" />
          </div>

          {/* EXPERIENCE */}
          <div>
            <label>Expérience</label>
            <input {...register("experience")} className="input" />
          </div>

          {/* COVER LETTER */}
          <div>
            <label>Lettre de motivation</label>
            <textarea {...register("coverLetter")} rows={4} className="input" />
            {errors.coverLetter && (
              <p className="error">{errors.coverLetter.message}</p>
            )}
          </div>

          {/* FILE */}
          <div>
            <label>CV (PDF ou image)</label>
            <input
              type="file"
              accept=".pdf,image/*"
              onChange={handleFileChange}
            />

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="mt-4 h-40 w-full object-cover rounded-lg border"
              />
            )}
          </div>

          {/* SUBMIT */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:scale-[1.02] transition"
          >
            {isSubmitting ? "Envoi..." : "Envoyer la candidature"}
          </Button>
        </form>
      </AnimatedSection>

      {/* STYLE */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 10px 14px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          outline: none;
        }
        .input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
        }
        .error {
          color: red;
          font-size: 12px;
        }
      `}</style>
    </section>
  );
}
