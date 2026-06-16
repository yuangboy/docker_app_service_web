"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAddQuoteRequestMutation, useGetServicesQuery } from "@/src/store/api";
import { IService } from "@/src/store/interface";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { useTheme } from "@/context/ThemeContext";
import {useSelector} from "react-redux";
import { RootState } from "@/src/store/store";

import { useForm, useWatch,SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast"
/* ---------------- ZOD ---------------- */
const devisSchema = z
  .object({
    serviceId: z.string().min(1, "Service requis"),
    name: z.string().min(2, "Nom requis"),
    email: z.string().email("Email invalide"),
    phone: z.string().optional(),
    type: z.enum(["Individual", "Entreprise"]),
    companyName: z.string().optional(),
    description: z.string().min(10, "Description trop courte"),
    budget: z.string().optional(),
  })
  .refine(
    (data) =>
      data.type === "Individual" ||
      (data.type === "Entreprise" && !!data.companyName),
    {
      message: "Le nom de l'entreprise est requis",
      path: ["companyName"],
    },
  );

type DevisFormData = z.infer<typeof devisSchema>;

export default function DevisPage() {
  const { darkMode } = useTheme();
  const searchParams = useSearchParams();
  const serviceIdFromUrl = searchParams.get("serviceId") || "";
  const user=useSelector((state:RootState)=>state.user.user);

  const router=useRouter();
  const { data: dataService, isLoading } = useGetServicesQuery();
  const [addQuoteRequest, {isLoading:isLoadingQuoteRequest }] = useAddQuoteRequestMutation();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<DevisFormData>({
    resolver: zodResolver(devisSchema),
    defaultValues: {
      serviceId: "",
      type: "Individual",
    },
  });

  const selectedType = useWatch({ control, name: "type" });

 useEffect(() => {
   if (dataService?.data?.length && serviceIdFromUrl) {
     const exists = dataService.data.find(
       (s: IService) => s._id === serviceIdFromUrl,
     );
     if (exists && exists._id) {
       setValue("serviceId", exists._id);
     }
   }
 }, [dataService, serviceIdFromUrl, setValue]);

  const selectedService = dataService?.data?.find(
    (s: IService) => s._id === watch("serviceId"),
  );

  const onSubmit: SubmitHandler<DevisFormData> = async(data: DevisFormData) => {
    try {
 const payload = {
   serviceId: data.serviceId,
   name: data.name,
   email: data.email,
   phone: data.phone,
   type: data.type,
   companyName: data.type === "Entreprise" ? data.companyName : undefined,
   description: data.description,
   budget: data.budget,
 };

 if(!user){
    console.log("user not found");
   return;
 }

 const res = await addQuoteRequest({...payload,userId:String(user._id)}).unwrap();


 if(res.success){
    toast.success("Devis envoyé avec succès !");
    console.log("✅ Devis créé :", res.data);
     reset();
     router.replace("/user")

 }

 

        
    } catch (error:any) {
        console.log(error);
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
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Demande de devis
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Obtenez une estimation personnalisée
            </p>
          </div>

          {/* SERVICE */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Service</label>
            <select
              {...register("serviceId")}
              className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="">-- Choisir un service --</option>
              {dataService?.data?.map((s: IService) => (
                <option key={s._id} value={s._id}>
                  {s.title}
                </option>
              ))}
            </select>
            {errors.serviceId && (
              <p className="text-red-500 text-sm">{errors.serviceId.message}</p>
            )}
            {selectedService && (
              <p className="text-xs text-gray-500">✔ {selectedService.title}</p>
            )}
          </div>

          {/* TYPE */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Type</label>
            <select
              {...register("type")}
              className="w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Individual">Individuel</option>
              <option value="Entreprise">Entreprise</option>
            </select>
          </div>

          {/* COMPANY */}
          {selectedType === "Entreprise" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Nom de l'entreprise</label>
              <input {...register("companyName")} className="input" />
              {errors.companyName && (
                <p className="text-red-500 text-sm">
                  {errors.companyName.message}
                </p>
              )}
            </div>
          )}

          {/* GRID */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm">Nom</label>
              <input {...register("name")} className="input" />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm">Email</label>
              <input {...register("email")} className="input" />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm">Téléphone</label>
            <input {...register("phone")} className="input" />
          </div>

          <div>
            <label className="text-sm">Description</label>
            <textarea {...register("description")} rows={4} className="input" />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm">Budget</label>
            <input {...register("budget")} className="input" />
          </div>

          {/* SUBMIT */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:scale-[1.02] transition"
          >
            {isLoading ? "Chargement..." : "Envoyer la demande"}
          </Button>
        </form>
      </AnimatedSection>

      {/* STYLE UTILITAIRE */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 10px 14px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          outline: none;
          transition: all 0.2s;
        }
        .input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
        }
      `}</style>
    </section>
  );
}
