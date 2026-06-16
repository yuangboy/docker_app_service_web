"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/src/components/shared/AnimateSection";
import { useTheme } from "@/context/ThemeContext";

import { useGetBlogPostByIdQuery } from "@/src/store/api";
import { setSelectedBlogPost } from "@/src/store/slice/blogPostSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";

// const blogs = [
//   {
//     id: "avenir-du-cloud",
//     title: "L’avenir du Cloud Computing",
//     author: "Jean Dupont",
//     date: "15 mars 2026",
//     image: "/images/Partenariat.png",
//     excerpt:
//       "Le cloud continue de transformer les entreprises, mais quelles sont les prochaines évolutions ?",
//     content:
//       "Dans cet article, nous explorons les tendances émergentes du cloud computing : edge computing, sécurité renforcée, et intégration de l’IA. Les entreprises doivent anticiper ces changements pour rester compétitives...",
//   },
//   {
//     id: "securite-applications-web",
//     title: "Sécurité des Applications Web",
//     author: "Marie Lenoir",
//     date: "10 mars 2026",
//     image: "/images/Partenariat.png",
//     excerpt:
//       "Les menaces évoluent rapidement, découvrez les meilleures pratiques pour protéger vos applications.",
//     content:
//       "La cybersécurité est devenue un enjeu majeur. OWASP Top 10, tests d’intrusion et bonnes pratiques de développement sécurisé sont essentiels pour garantir la fiabilité de vos applications...",
//   },
// ];

export default function DetailBlogPage() {
  const { darkMode } = useTheme();
  const params = useParams();
  const { id } = params;

  // const blog = blogs.find((b) => b.id === id);

  const dispatch = useDispatch();

  //  const projectStore=useSelector((state:RootState)=>state.project.projects);

  const { data, isLoading, error } = useGetBlogPostByIdQuery({
    id: id as string,
  });

  const blog = data?.data;

  useEffect(() => {
    if (blog) {
      dispatch(setSelectedBlogPost(blog));
    }
  }, [blog]);

  if (isLoading) {
    return (
      <div className="container-site py-20 text-center">
        Chargement service...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container-site py-20 text-center">
        <h1 className="text-2xl font-bold">Article introuvable</h1>
        <Link href="/blogs">
          <Button className="mt-6 bg-gradient-to-r from-accent to-purple-600 text-white hover:from-purple-600 hover:to-accent transition-all duration-500 shadow-lg">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux articles
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <section
      className={`section-padding min-h-screen bg-gradient-to-br ${
        darkMode
          ? "from-gray-900 via-gray-800 to-black"
          : "from-indigo-50 via-white to-gray-100"
      }`}
    >
      <div className="container-site">
        {/* Header */}
        <AnimatedSection className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500">
            {blog.title}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {/* {blog.excerpt} */}
          </p>
        </AnimatedSection>

        {/* Image */}
        <AnimatedSection className="mt-12">
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src={blog.imageUrl!}
              width={400}
              height={320}
              alt={blog.title}
              className="w-full h-80 object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </AnimatedSection>

        {/* Infos rapides */}
        <AnimatedSection className="mt-8 flex justify-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4" /> {blog?.createdAt}
          </span>
          <span className="flex items-center gap-2">
            <User className="h-4 w-4" /> {blog.author}
          </span>
        </AnimatedSection>

        {/* Contenu */}
        <AnimatedSection className="mt-12 max-w-3xl mx-auto text-left bg-white/80 dark:bg-gray-900/70 backdrop-blur-lg rounded-xl p-8 shadow-lg">
          <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-line">
            {blog.content}
          </p>
        </AnimatedSection>

        {/* Bouton retour */}
        <AnimatedSection className="mt-16 text-center">
          <Link href="/blogs">
            <Button
              size="lg"
              className="bg-gradient-to-r from-accent to-purple-600 text-white hover:from-purple-600 hover:to-accent transition-all duration-500 shadow-lg"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux articles
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
