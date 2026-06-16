"use client";

import { Button } from "@/components/ui/button";
import { useGetByIdQuoteRequestQuery } from "@/src/store/api";
import { setSelectedQuoteRequest } from "@/src/store/slice/quoteRequestSlice";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  Folder,
  DollarSign,
  MessageSquare,
} from "lucide-react";

export default function QuoteDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();

  const { data, isLoading } = useGetByIdQuoteRequestQuery({ id: id as string });
  const quoteRequest = data?.data;

  useEffect(() => {
    if (quoteRequest) {
      dispatch(setSelectedQuoteRequest(quoteRequest));
    }
  }, [quoteRequest]);

  if (isLoading) {
    return (
      <div className="container-site py-20 text-center animate-pulse">
        <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
          Chargement du devis...
        </p>
      </div>
    );
  }

  if (!quoteRequest) {
    return (
      <div className="container-site py-20 text-center">
        <h1 className="text-3xl font-extrabold text-red-600 dark:text-red-400">
          Devis introuvable
        </h1>
        <Button
          onClick={() => router.push("/quotes")}
          className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:scale-105 transition-transform duration-300 shadow-xl rounded-full px-6 py-3"
        >
          ← Retour aux devis
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-10"
      >
        <div>
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text drop-shadow-lg">
            ✨ Détail du devis
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Informations complètes du client
          </p>
        </div>

        {/* STATUS */}
        {quoteRequest.status && (
          <span
            className={`text-sm px-5 py-2 rounded-full font-semibold shadow-md w-fit transition-all duration-300 ${
              quoteRequest.status === "accepted"
                ? "bg-green-100 text-green-700"
                : quoteRequest.status === "rejected"
                  ? "bg-red-100 text-red-700"
                  : quoteRequest.status === "cancel"
                    ? "bg-gray-100 text-gray-700"
                    : "bg-yellow-100 text-yellow-700"
            }`}
          >
            ✦{" "}
            {quoteRequest.status === "accepted"
              ? "Accepté"
              : quoteRequest.status === "rejected"
                ? "Refusé"
                : quoteRequest.status === "cancel"
                  ? "Annulé"
                  : "En attente"}
          </span>
        )}
      </motion.div>

      {/* CARD CONTAINER */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 space-y-8"
      >
        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* CLIENT */}
          <div className="group p-6 rounded-2xl bg-white/80 dark:bg-gray-800/60 backdrop-blur-md border shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]">
            <h2 className="font-bold text-xl mb-4 group-hover:text-blue-600 transition flex items-center gap-2">
              <User className="text-blue-500" /> Client
            </h2>
            <div className="space-y-3 text-sm">
              <p>
                <Mail className="inline mr-2 text-gray-400" />{" "}
                {quoteRequest?.email}
              </p>
              <p>
                <Phone className="inline mr-2 text-gray-400" />{" "}
                {quoteRequest?.phone}
              </p>
              <p>
                <span className="text-gray-500">Nom :</span>{" "}
                {quoteRequest?.name}
              </p>
            </div>
          </div>

          {/* PROJET */}
          <div className="group p-6 rounded-2xl bg-white/80 dark:bg-gray-800/60 backdrop-blur-md border shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]">
            <h2 className="font-bold text-xl mb-4 group-hover:text-purple-600 transition flex items-center gap-2">
              <Folder className="text-purple-500" /> Projet
            </h2>
            <div className="space-y-3 text-sm">
              <p>
                <span className="text-gray-500">Service :</span>{" "}
                {quoteRequest?.serviceId}
              </p>
              <p>
                <DollarSign className="inline mr-2 text-green-500" />{" "}
                {quoteRequest?.budget}
              </p>
            </div>
          </div>
        </div>

        {/* MESSAGE */}
        <div className="group mt-6 p-6 rounded-2xl bg-white/80 dark:bg-gray-800/60 backdrop-blur-md border shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <h2 className="font-bold text-xl mb-3 group-hover:text-blue-600 transition flex items-center gap-2">
            <MessageSquare className="text-blue-500" /> Message
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
            {quoteRequest?.description}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-10 p-4 rounded-xl bg-white/60 dark:bg-gray-900/50 backdrop-blur-md">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="w-full md:w-auto hover:scale-105 transition-transform"
          >
            ← Retour
          </Button>
          <div className="flex gap-3 w-full md:w-auto">
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 w-full md:w-auto">
              ✅ Accepter
            </Button>
            <Button className="bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 w-full md:w-auto">
              ❌ Refuser
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
