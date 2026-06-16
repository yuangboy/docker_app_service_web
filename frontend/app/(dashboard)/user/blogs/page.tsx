"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useGetBlogPostsQuery } from "@/src/store/api";
import { setBlogPosts, setSelectedBlogPost } from "@/src/store/slice/blogPostSlice";
import { IBlogPost } from "@/src/store/interface";
import Image from "next/image";



export default function BlogsPage() {

  const [blogs, setBlogss] = useState<IBlogPost[]>([]);
  const dispatch = useDispatch();
 
  const router = useRouter();
 const { data: dataBlog } = useGetBlogPostsQuery();
  useEffect(() => {
    if (dataBlog?.success) {
      dispatch(setBlogPosts(dataBlog.data));
      dispatch(setSelectedBlogPost(null));
      setBlogss(dataBlog.data);
    }
  }, [dataBlog?.success, dataBlog?.data, dispatch]);

  // loguer dans un autre useEffect qui dépend de blogs

  useEffect(() => {
    console.log("Données du blogs: ", blogs);
  }, [blogs]);


  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3;

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  return (
    <section className="section-padding min-h-screen bg-gradient-to-br from-indigo-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <div className="container-site">
        <AnimatedSection className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
            Blog
          </p>
          <h1 className="mb-6 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">
            Nos derniers articles
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Découvrez nos analyses, conseils et tendances sur le numérique.
          </p>
        </AnimatedSection>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
          >
            {currentBlogs.map((b, i) => (
              <AnimatedSection key={b._id} delay={i * 0.08}>
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white/80 dark:bg-gray-900/70 backdrop-blur-lg shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-accent">
                  <div className="relative">
                    <Image
                      src={b.imageUrl!}
                      width={400}
                      height={320}
                      alt={b.title}
                      className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="mb-2 text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                      {b.title}
                    </h3>
                    <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {b.excrept}
                    </p>
                    <div className="mb-4 flex items-center gap-6 text-xs text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />{" "}
                        {new Date(b.createdAt as string).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-2">
                        <User className="h-3 w-3" /> {b.author}
                      </span>
                    </div>
                    <div className="flex justify-end">
                     
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-accent to-purple-600 text-white hover:from-purple-600 hover:to-accent transition-all duration-500 shadow-md"
                          onClick={() => router.push(`/user/blogs/${b._id}`)}
                        >
                          Lire plus
                        </Button>
                      
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-md border bg-white text-gray-600 hover:bg-accent hover:text-white disabled:opacity-50"
            >
              Précédent
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-md border transition-all duration-300 ${
                  currentPage === i + 1
                    ? "bg-gradient-to-r from-accent to-purple-600 text-white shadow-md"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gradient-to-r hover:from-accent hover:to-purple-600 hover:text-white shadow-md"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-md border bg-white text-gray-600 hover:bg-accent hover:text-white disabled:opacity-50"
            >
              Suivant
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
