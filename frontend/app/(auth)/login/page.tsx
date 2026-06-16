"use client";

import { useEffect, useState } from "react";
import { Mail, Lock, Loader, EyeOff, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/src/store/api";
import { RootState } from "@/src/store/store";
import { authStatus, setUser } from "@/src/store/slice/userSlice";
import toast from "react-hot-toast";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,21}$/;

  // ✅ ZOD (avec confirm password + terms)
  const SchemaLogin = z.object({
    email: z.string().email("Email invalide"),
    password: z
      .string()
      .regex(
        passwordRegex,
        "Le mot de passe doit contenir entre 8 et 21 caractères,\n avec au moins une majuscule, minuscule,chiffre et des caractères spéciaux",
      ),
  });

  type ILogin = z.infer<typeof SchemaLogin>;

  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  // const user=useSelector((state:RootState)=>state.user.user);

  const [login, { isLoading }] = useLoginMutation();

  const {
    register: formLogin,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: zodResolver(SchemaLogin),
  });

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    try {
      const res = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      if (res.success) {
        const role = res.data?.role;

        // 🔥 récupérer redirection
        const redirectUrl = localStorage.getItem("redirectAfterLogin");
        const redirectUrl2 = localStorage.getItem(
          "redirectAfterLoginForInscriptionModule",
        );

        // 🔥 nettoyer
        if (redirectUrl) {
          localStorage.removeItem("redirectAfterLogin");
        }
        if (redirectUrl2) {
          localStorage.removeItem("redirectAfterLoginForInscriptionModule");
        }

        // 🔥 update store
        dispatch(authStatus(res.success));
        dispatch(setUser(res.data));
        toast.success("Connexion établie");

        // 🔥 priorité à l’intention utilisateur
        if (redirectUrl) {
          router.push(redirectUrl);
          return;
        }

        // 🔥 fallback par rôle
        if (role === "admin_principal") {
          router.push("/admin_principal");
        } else if (role === "user") {
          router.push("/user");
        } else {
          router.push("/");
        }
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Erreur lors de l'authentification");
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
          <h1
            className="text-4xl font-bold text-transparent bg-clip-text 
                         bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
          >
            Connexion
          </h1>
          <p className="mt-2 text-muted-foreground">
            Accédez à votre tableau de bord.
          </p>
        </AnimatedSection>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-foreground">
              Email
            </label>
            <div className="flex items-center gap-2 rounded-xl bg-gray-50 dark:bg-gray-800 px-4 shadow-inner">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <input
                {...formLogin("email")}
                className="h-12 w-full bg-transparent text-sm text-foreground focus:outline-none"
                placeholder="votre@email.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Mot de passe */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-foreground">
              Mot de passe
            </label>
            <div className="flex items-center gap-2 rounded-xl bg-gray-50 dark:bg-gray-800 px-4 shadow-inner">
              <Lock className="h-5 w-5 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                {...formLogin("password")}
                className="h-12 w-full bg-transparent text-sm text-foreground focus:outline-none"
                placeholder="Votre mot de passe"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Eye className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Bouton connexion */}
          <Button
            disabled={isLoading}
            type="submit"
            size="lg"
            className="w-full px-6 py-3 text-white font-semibold rounded-xl 
                       bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                       shadow-lg hover:shadow-2xl transition-transform duration-300 
                       hover:scale-105 hover:-translate-y-1 flex items-center justify-center cursor-pointer"
          >
            {isLoading ? (
              <Loader className="animate-spin text-blue-500" size={20} />
            ) : (
              "Se connecter"
            )}
          </Button>
        </form>

        {/* Lien inscription */}
        <p className="mt-6 text-center text-sm text-muted-foreground ">
          Pas encore de compte ?{" "}
          <Link
            href="/register"
            className="font-semibold text-blue-600 hover:underline"
          >
            Créez-en un
          </Link>
        </p>
      </div>
    </section>
  );
}
