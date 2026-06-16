"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash, Mail, User, Calendar } from "lucide-react";
import Link from "next/link";
import { setSelectedContact } from "@/src/store/slice/contactSlice";
import { useGetContactByIdQuery } from "@/src/store/api";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

export default function MessageDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();

  const { data, isLoading } = useGetContactByIdQuery({ id: id as string });
  const message = data?.data;

  useEffect(() => {
    if (message) {
      dispatch(setSelectedContact(message));
    }
  }, [message]);

  if (isLoading) {
    return (
      <div className="container-site py-20 text-center animate-pulse">
        <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
          Chargement du contact...
        </p>
      </div>
    );
  }

  if (!message) {
    return (
      <div className="container-site py-20 text-center">
        <h1 className="text-3xl font-extrabold text-red-600 dark:text-red-400">
          Message introuvable
        </h1>
        <Link href="/contacts">
          <Button className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:scale-105 transition-transform duration-300 shadow-xl rounded-full px-6 py-3">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Retour aux contacts
          </Button>
        </Link>
      </div>
    );
  }

  const deleteMessage = () => {
    router.back();
  };

  return (
    <section className="section-padding min-h-screen bg-gradient-to-br from-indigo-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6 max-w-3xl mx-auto p-8 bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-2xl backdrop-blur-lg hover:shadow-indigo-300/40 transition-all duration-500"
      >
        {/* Header actions */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Retour
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={deleteMessage}
            className="hover:scale-105 transition-transform bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl  duration-300 w-full md:w-auto"
          >
            <Trash className="w-4 h-4 mr-2" /> Supprimer
          </Button>
        </div>

        {/* Subject */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          {message.subject}
        </h1>

        {/* Infos */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 shadow-sm">
            <User className="text-indigo-500" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Nom</p>
              <p className="font-semibold text-indigo-600 dark:text-indigo-400">
                {message.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-red-50 dark:from-gray-800 dark:to-gray-700 shadow-sm">
            <Mail className="text-pink-500" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
              <p className="font-semibold text-pink-600 dark:text-pink-400">
                {message.email}
              </p>
            </div>
          </div>
          <div className="col-span-2 flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 shadow-sm">
            <Calendar className="text-green-500" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Statut</p>
              <p
                className={`font-semibold ${
                  message.isRead === true
                    ? "text-green-600 dark:text-green-400"
                    : "text-yellow-600 dark:text-yellow-400"
                }`}
              >
                {message.isRead ? "Lu" : "Non lu"}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            Contenu du message
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {message.content}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
