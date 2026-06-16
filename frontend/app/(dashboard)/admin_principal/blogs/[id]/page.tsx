"use client";

import React, { useEffect } from "react";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useGetBlogPostByIdQuery } from "@/src/store/api";
import { setSelectedBlogPost } from "@/src/store/slice/blogPostSlice";
import Link from "next/link";
import { ArrowLeft, User, Folder, Calendar } from "lucide-react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

export default function ViewBlogPage() {
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();

  const { data, isLoading } = useGetBlogPostByIdQuery({ id: id as string });
  const blog = data?.data;

  useEffect(() => {
    if (blog) {
      dispatch(setSelectedBlogPost(blog));
    }
  }, [blog]);

  if (isLoading) {
    return (
      <div className="container-site py-20 text-center animate-pulse">
        <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
          Chargement de l’article...
        </p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container-site py-20 text-center">
        <h1 className="text-3xl font-extrabold text-red-600 dark:text-red-400">
          Article introuvable
        </h1>
        <Link href="/blogs">
          <Button className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:scale-105 transition-transform duration-300 shadow-xl rounded-full px-6 py-3">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Retour aux articles
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <section className="section-padding min-h-screen bg-gradient-to-br from-indigo-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <div className="container-site">
        {/* HEADER */}
        <AnimatedSection className="mx-auto mb-12 max-w-2xl text-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 drop-shadow-lg">
            📝 Détails de l’Article
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Plongez dans la lecture complète de cet article.
          </p>
        </AnimatedSection>

        {/* CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl space-y-6 rounded-2xl border border-gray-200 bg-white/70 dark:bg-gray-900/70 p-10 shadow-2xl backdrop-blur-lg transition-all duration-500 hover:shadow-indigo-300/40"
        >
          {/* Image */}
          {blog.imageUrl && (
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-72 object-cover rounded-xl border shadow-md hover:scale-[1.02] transition-transform duration-300"
            />
          )}

          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            {blog.title}
          </h2>

          {/* Excerpt */}
          <p className="text-gray-600 dark:text-gray-400 italic">
            {blog.excrept}
          </p>

          {/* Content */}
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mt-4">
            {blog.content}
          </p>

          {/* Infos */}
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 shadow-sm">
              <User className="text-indigo-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Auteur
                </p>
                <p className="font-semibold text-indigo-600 dark:text-indigo-400">
                  {blog.author}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-pink-50 to-red-50 dark:from-gray-800 dark:to-gray-700 shadow-sm">
              <Folder className="text-pink-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Catégorie
                </p>
                <p className="font-semibold text-pink-600 dark:text-pink-400">
                  {blog.category}
                </p>
              </div>
            </div>
            {blog.createdAt && (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 shadow-sm col-span-2">
                <Calendar className="text-green-500" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Date
                  </p>
                  <p className="font-semibold text-green-600 dark:text-green-400">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
