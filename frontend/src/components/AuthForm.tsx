"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useRegisterMutation,
  useLoginMutation,
  useResendActivateEmailMutation,
  BASE_URL,
} from "@/src/store/api";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { toogleLoginInDialog, authStatus } from "@/src/store/slice/userSlice";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { BsSendCheck } from "react-icons/bs";
import { motion } from "framer-motion";

const SchemaLogin = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

const SchemaRegister = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(4),
  agreeTerms: z.boolean(),
});
const SchemaResendActivateEmail = z.object({
  email: z.string().email(),
});

const SchemaResetPassword = z.object({
  password: z.string().min(4),
  confirmPassword: z.string().min(4),
});

export type IRegister = z.infer<typeof SchemaRegister>;
export type ILogin = z.infer<typeof SchemaLogin>;
export type IResendActivateEmail = z.infer<typeof SchemaResendActivateEmail>;
export type IResetPassword = z.infer<typeof SchemaResetPassword>;

export default function AuthForm() {
  const router = useRouter();
  //hooks
  const [activeTab, setActiveTab] = useState<"login" | "register" | "forgot">(
    "login"
  );
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isSendEmail, setIsSendEmail] = useState(false);
  const [isLoadingResendEmail, setIsLoadingResendEmail] = useState(false);

  const dispatch = useDispatch();

  // mutation RTK Query
  const [register, { isLoading }] = useRegisterMutation();
  const [login] = useLoginMutation();
  const [resendActivateEmail]=useResendActivateEmailMutation();

  const loginForm = useForm<ILogin>({
    resolver: zodResolver(SchemaLogin),
    defaultValues: {
      email: "winaxa6918@litepax.com",
      password: "1234",
    },
  });
  const registerForm = useForm<IRegister>({
    resolver: zodResolver(SchemaRegister),
    defaultValues: {
      agreeTerms: false,
      email: "",
      name: "",
      password: "",
    },
  });
  const resendActivateEmailForm = useForm<IResendActivateEmail>({
    resolver: zodResolver(SchemaResendActivateEmail),
    defaultValues: {
      email: "winaxa6918@litepax.com",
    },
  });

  const submitLogin: SubmitHandler<ILogin> = async (data) => {
    try {
      const response = await login(data).unwrap();

      if (response.success) {
        toast.success("Connexion réussie");
        dispatch(toogleLoginInDialog());
        dispatch(authStatus(response.success));
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error(`Echec connexion: ${error}`);
    }
  };

  const submitRegister: SubmitHandler<IRegister> = async (data) => {
    try {
      if (data.password !== confirmPassword) {
        console.log("les mots de passe ne sont pas identiques");
        return;
      }
      if (data.agreeTerms) {
        const response = await register(data).unwrap();
        if (response.success) {
          console.log("response auth", response);
          toast.success(
            "Inscription réussie, veuillez consulter votre boite mail pour activer votre compte"
          );
          dispatch(toogleLoginInDialog());
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const submitResendActivateEmail: SubmitHandler<IResendActivateEmail> = async(data) => {
    try {
      setIsLoadingResendEmail(true);
      const response=await resendActivateEmail(data).unwrap();
      

      if(response.success){
        console.log("response resend: ",response);
        setIsSendEmail(true);
        toast.success("Email envoyé");
        setIsLoadingResendEmail(false);
      }
      
    } catch (error) {
      console.log("error resend: ",error);
      setIsSendEmail(false);
      setIsLoadingResendEmail(false);
    }
  };


  return (
    <div className="flex justify-center items-center ">
      <div className="bg-black text-white rounded-2xl shadow-lg w-full max-w-md p-6">
        {/* Tabs */}
        <div className="flex justify-between mb-6 border-b border-gray-700">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 text-center py-2 ${
              activeTab === "login"
                ? "border-b-2 border-blue-500 font-bold"
                : "text-gray-400"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`flex-1 text-center py-2 ${
              activeTab === "register"
                ? "border-b-2 border-blue-500 font-bold"
                : "text-gray-400"
            }`}
          >
            Register
          </button>
          <button
            onClick={() => setActiveTab("forgot")}
            className={`flex-1 text-center py-2 ${
              activeTab === "forgot"
                ? "border-b-2 border-blue-500 font-bold"
                : "text-gray-400"
            }`}
          >
            Resend Email
          </button>
        </div>

        {/* Form */}
        {activeTab === "login" && (
          <>
            <form
              className="space-y-4"
              onSubmit={loginForm.handleSubmit(submitLogin)}
            >
              <div>
                <label className="block mb-1 text-sm">Email</label>
                <input
                  type="email"
                  placeholder="m@example.com"
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                  {...loginForm.register("email")}
                />
              </div>
              {loginForm.formState.errors.email && (
                <p className="text-red-500">L'email doit être valide</p>
              )}
              <div>
                <label className="block mb-1 text-sm">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                  {...loginForm.register("password")}
                />
              </div>
              {loginForm.formState.errors.password && (
                <p className="text-red-500">
                  le mot de passe doit avoir au moins 4 caractères
                </p>
              )}
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold"
                type="submit"
              >
                Login
              </button>
            </form>

            <button
              disabled={isLoadingGoogle}
              className={`flex items-center justify-center space-x-2 w-full bg-gray-800 hover:bg-gray-700 py-2 rounded-lg font-semibold mt-4  ${
                isLoadingGoogle ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {isLoadingGoogle ? (
                <Loader className="animate-spin text-blue-500" size={24} />
              ) : (
                <>
                  <FaGoogle className="text-blue-500" />
                  <span className="text-white text-sm">
                    Se connecter avec Google
                  </span>
                </>
              )}
            </button>
          </>
        )}

        {activeTab === "register" && (
          <form
            className="space-y-4 h-[300px] overflow-x-hidden "
            onSubmit={registerForm.handleSubmit(submitRegister)}
          >
            <div>
              <label className="block mb-1 text-sm">Full Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-3 py-2 rounded-lg bg-gùùray-800 border border-gray-700 text-white"
                {...registerForm.register("name")}
              />
            </div>
            {registerForm.formState.errors.name && (
              <p className="text-red-600 text-sm">
                Le nom doit avoir au moins 3 caractères
              </p>
            )}
            <div>
              <label className="block mb-1 text-sm">Email</label>
              <input
                type="email"
                placeholder="m@example.com"
                className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                {...registerForm.register("email")}
              />
            </div>
            {registerForm.formState.errors.email && (
              <p className="text-red-600 text-sm">L'email doit être valide</p>
            )}
            <div>
              <label className="block mb-1 text-sm">Password</label>
              <input
                type="password"
                placeholder="Choose a password"
                className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                {...registerForm.register("password")}
              />
            </div>
            {registerForm.formState.errors.password && (
              <p className="text-red-600 text-sm">
                le mot de passe doit avoir au moins 4 caractères
              </p>
            )}
            <div>
              <label className="block mb-1 text-sm">Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
              />
            </div>
            {confirmPassword !== registerForm.getValues("password") && (
              <p className="text-red-600 text-sm">
                Les mots de passe ne correspondent pas
              </p>
            )}

            <div className="flex items-center space-x-2">
              <span className="text-sm">
                Accepter les conditions générales {"(case à cocher)"}
              </span>
              <input
                type="checkbox"
                className="checkbox"
                {...registerForm.register("agreeTerms")}
              />
            </div>

            {registerForm.getValues("agreeTerms") === false && (
              <p className="text-red-600 text-sm">
                Veuillez accepter les conditions
              </p>
            )}

            <button
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg font-semibold"
            >
              {isLoading ? "Loading..." : "Register"}
            </button>
          </form>
        )}

        {activeTab === "forgot" &&
          (() => {
            if (isSendEmail) {
              return (
                <div className="flex flex-col items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <BsSendCheck className="text-green-500 text-4xl" />
                  </motion.div>
                  <p className="text-green-500 text-lg">
                    Email envoyé avec succès{" "}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Veuillez consulter votre boite mail
                  </p>
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={() => setIsSendEmail(false)}
                  >
                    Cliquez ici pour revenir au formulaire
                  </span>
                </div>
              );
            } else {
              return (
                <form
                  className="space-y-4"
                  onSubmit={resendActivateEmailForm.handleSubmit(
                    submitResendActivateEmail
                  )}
                >
                  <div>
                    <label className="block mb-1 text-sm">Email</label>
                    <input
                      type="email"
                      placeholder="m@example.com"
                      className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
                      {...resendActivateEmailForm.register("email")}
                    />
                  </div>
                  {resendActivateEmailForm.formState.errors.email && (
                    <p className="text-red-600 text-sm">
                      {resendActivateEmailForm.formState.errors.email.message}
                    </p>
                  )}
                  <button className={`${isLoadingResendEmail ? "cursor-not-allowed" :"cursor-pointer"} w-full bg-yellow-600 hover:bg-yellow-700 py-2 rounded-lg font-semibold flex items-center justify-center`}>
                   {
                    isLoadingResendEmail ? <Loader className='animate-spin text-blue-500' size={24} /> : "Renvoyer l'email d'activation"
                   }
                  </button>
                </form>
              );
            }
          })()}
      </div>
    </div>
  );
}