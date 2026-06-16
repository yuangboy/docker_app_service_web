"use client";

import React,{useState} from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, User, Loader, EyeOff, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { toogleLoginInDialog } from "@/src/store/slice/userSlice";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/src/store/api";
import Link from "next/link";

// ✅ ZOD (avec confirm password + terms)

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,21}$/;

const SchemaRegister = z
  .object({
    name: z.string().min(3, "Nom trop court"),
    email: z.string().email("Email invalide"),
    password: z
      .string()
      .regex(
        passwordRegex,
        "Le mot de passe doit contenir entre 8 et 21 caractères,\n une majuscule, une minuscule, un chiffre et un caractère spécial",
      ),
    confirmPassword: z.string(),
    agreeTerms: z.boolean().refine(val => val === true, {
  message: "Vous devez accepter les conditions",
}),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

type IRegister = z.infer<typeof SchemaRegister>;

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [register, { isLoading }] = useRegisterMutation();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>({
    resolver: zodResolver(SchemaRegister),
  });

  const onSubmit: SubmitHandler<IRegister> = async (data) => {
    try {
      const res = await register({
        name: data.name,
        email: data.email,
        password: data.password,
        agreeTerms: Boolean(data.agreeTerms),
      }).unwrap();

      if (res.success) {
        toast.success("Inscription réussie, vérifiez votre email 📩");
        dispatch(toogleLoginInDialog());
        router.push("/login");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Erreur lors de l'inscription");
    }
  };

  return (
    <section
      className="flex items-center justify-center min-h-screen 
      bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black"
    >
      <div
        className="w-full max-w-md p-8 rounded-2xl shadow-2xl 
        bg-white/80 dark:bg-gray-900/70 backdrop-blur-lg 
        border border-gray-200 dark:border-gray-700"
      >
        <AnimatedSection className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
            Inscription
          </h1>
        </AnimatedSection>

        {/* ✅ IMPORTANT : handleSubmit de RHF */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Nom */}
          <div>
            <input
              {...formRegister("name")}
              placeholder="Nom"
              className="w-full h-12 pl-10 pr-4 rounded-xl
      bg-gray-50 dark:bg-gray-800
      border border-gray-200 dark:border-gray-700
      text-sm text-gray-900 dark:text-white
      placeholder:text-gray-400
      outline-none
      transition-all duration-300

      focus:bg-white dark:focus:bg-gray-900
      focus:border-blue-500
      focus:ring-2 focus:ring-blue-500/20
      focus:shadow-lg"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              {...formRegister("email")}
              placeholder="Email"
              className="w-full h-12 pl-10 pr-4 rounded-xl
      bg-gray-50 dark:bg-gray-800
      border border-gray-200 dark:border-gray-700
      text-sm text-gray-900 dark:text-white
      placeholder:text-gray-400
      outline-none
      transition-all duration-300

      focus:bg-white dark:focus:bg-gray-900
      focus:border-blue-500
      focus:ring-2 focus:ring-blue-500/20
      focus:shadow-lg"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          {/* Password */}
<div className="mb-4">
  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      {...formRegister("password")}
      placeholder="Mot de passe"
      className="w-full h-12 pl-10 pr-10 rounded-xl
        bg-gray-50 dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        text-sm text-gray-900 dark:text-white
        placeholder:text-gray-400
        outline-none
        transition-all duration-300
        focus:bg-white dark:focus:bg-gray-900
        focus:border-blue-500
        focus:ring-2 focus:ring-blue-500/20
        focus:shadow-lg"
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 focus:outline-none"
    >
      {showPassword ? (
        <EyeOff className="h-5 w-5" />
      ) : (
        <Eye className="h-5 w-5" />
      )}
    </button>
  </div>
  {errors.password && (
    <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
  )}
</div>

{/* Confirm Password */}
<div className="mb-4">
  <div className="relative">
    <input
      type={showPasswordConfirm ? "text" : "password"}
      {...formRegister("confirmPassword")}
      placeholder="Confirmer mot de passe"
      className="w-full h-12 pl-10 pr-10 rounded-xl
        bg-gray-50 dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        text-sm text-gray-900 dark:text-white
        placeholder:text-gray-400
        outline-none
        transition-all duration-300
        focus:bg-white dark:focus:bg-gray-900
        focus:border-blue-500
        focus:ring-2 focus:ring-blue-500/20
        focus:shadow-lg"
    />
    <button
      type="button"
      onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 focus:outline-none"
    >
      {showPasswordConfirm ? (
        <EyeOff className="h-5 w-5" />
      ) : (
        <Eye className="h-5 w-5" />
      )}
    </button>
  </div>
  {errors.confirmPassword && (
    <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
  )}
</div>


          {/* Terms */}
          <div className="flex items-center gap-2">
            <input type="checkbox" {...formRegister("agreeTerms")} />
            <span>Accepter les conditions</span>
          </div>
          {errors.agreeTerms && (
            <p className="text-red-500">{errors.agreeTerms.message}</p>
          )}

          <Button
            disabled={isLoading}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent text-white cursor-pointer"
          >
            {isLoading ? (
              <Loader className="animate-spin text-blue-500" size={20} />
            ) : (
              "S’inscrire"
            )}
          </Button>
        </form>

{/* Lien de connexion */}
        <p className="mt-6 text-center text-sm text-muted-foreground ">
          Déjà un compte ?{" "}
          <Link href="/login" className="font-semibold text-blue-600 hover:underline">
            Se connecter
          </Link>
        </p>

      </div>
    </section>
  );
}
