"use client";

import React, { useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  useGetAllModuleQuery,
  useGetEventAllQuery,
  useInscriptionEventMutation,
  useInscriptionModuleMutation,
} from "@/src/store/api";
import { IEvent, IModule } from "@/src/store/interface";
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
const devisSchema = z.object({
  eventId: z.string().min(1, "Module requis"),
  type: z
    .enum(["hybrid", "online", "onsite"])
    .refine((val) => ["hybrid", "online", "onsite"].includes(val), {
      message: "Type requis",
    }),
  fullName: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(6, "Le numéro est requis"),
  description: z.string().optional(),
});

type InscriptionFormData = z.infer<typeof devisSchema>;

 interface IInscriptionPayload {
  eventId: string;
  type: "hybrid" | "online" | "onsite";
  fullName: string;
  email: string;
  phone: string;
  description?: string;
}

export default function DevisPage() {
  const { darkMode } = useTheme();
  const {id}=useParams();
  // const searchParams = useSearchParams();
  // const eventIdFromUrl = searchParams.get("eventId") || "";
  const eventIdFromUrl = id;
  const user = useSelector((state: RootState) => state.user.user);

  const router = useRouter();
  const { data: dataEvents, isLoading } = useGetEventAllQuery();
  const [inscription, { isLoading: isSubmitting }] =
    useInscriptionEventMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<InscriptionFormData>({
    resolver: zodResolver(devisSchema),
    defaultValues: {
      eventId: "",
      type: "online",
    },
  });

  /* ================= INIT MODULE ================= */
useEffect(() => {
  if (dataEvents?.data?.length && eventIdFromUrl) {
    const exists = dataEvents.data.find(
      (m) => m._id === eventIdFromUrl,
    );
    if (exists) setValue("eventId", exists._id!);
  }
}, [dataEvents, eventIdFromUrl, setValue]);

  /* ================= SELECTED MODULE ================= */
  const selectedService = dataEvents?.data?.find(
    (m: IEvent) => m._id === watch("eventId"),
  );



  /* ================= SUBMIT ================= */
  const onSubmit: SubmitHandler<InscriptionFormData> = async (data) => {
    try {
      if (!user) {
        console.log("user not found");
        return;
      }

      const payload: IInscriptionPayload = {
        eventId: data.eventId,
        type: data.type,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        description: data.description,
      };

      const res = await inscription({
        ...payload,
        userId: String(user._id),
      }).unwrap();

      if (res.success) {
        toast.success("Inscription envoyée avec succès !");
        reset();
        router.replace("/user");
      }
    } catch (error: unknown) {
  console.log(error);

  if (
    typeof error === "object" &&
    error !== null &&
    "data" in error
  ) {
    const err = error as { data?: { message?: string } };
    toast.error(err.data?.message || "Erreur serveur");
  } else {
    toast.error("Erreur lors de l'inscription");
  }
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
          className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border shadow-2xl rounded-3xl p-8 space-y-6"
        >
          {/* TITLE */}
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Inscription à l'evenement
            </h1>
          </div>

          {/* MODULE */}
          <div>
            <label className="text-sm font-medium">Module</label>
            <select {...register("eventId")} className="input" disabled={true}>
              <option value="">-- Choisir un evenent --</option>
              {dataEvents?.data?.map((m: IEvent) => (
                <option key={m._id} value={m._id}>
                  {m.title}
                </option>
              ))}
            </select>
            {errors.eventId && (
              <p className="error">{errors.eventId.message}</p>
            )}
          </div>

          {/* TYPE */}
          <div>
            <label className="text-sm font-medium">Type</label>
            <select {...register("type")} className="input">
              <option value="">-- Type de formation --</option>
              <option value="hybrid">Hybride</option>
              <option value="online">En ligne</option>
              <option value="onsite">Présentiel</option>
            </select>
            {errors.type && <p className="error">{errors.type.message}</p>}
          </div>

          {/* USER INFOS */}
          <div>
            <label className="text-sm">Nom</label>
            <input {...register("fullName")} className="input" />
            {errors.fullName && (
              <p className="error">{errors.fullName.message}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label>Téléphone</label>
              <input {...register("phone")} className="input" />
              {errors.phone && <p className="error">{errors.phone.message}</p>}
            </div>

            <div>
              <label>Email</label>
              <input {...register("email")} className="input" />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label>Description</label>
            <textarea {...register("description")} className="input" />
          </div>

          {/* SUBMIT */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
          >
            {isSubmitting ? "Envoi..." : "S'inscrire"}
          </Button>
        </form>
      </AnimatedSection>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 10px;
          border-radius: 10px;
          border: 1px solid #ddd;
        }
        .error {
          color: red;
          font-size: 12px;
        }
      `}</style>
    </section>
  );
}
