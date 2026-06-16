import Link from "next/link";
import React from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaFacebook,
  FaWhatsapp,
  FaYoutube,
  FaInstagram,
  FaTiktok,
  FaTelegram,
} from "react-icons/fa";
import Image from "next/image";

const footerLinks = [
  {
    title: "Entreprise",
    links: [
      { label: "À propos", path: "/a-propos" },
      { label: "Carrière", path: "/careers" },
      { label: "Contact", path: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Nos services", path: "/services" },
      { label: "Projets", path: "/projets" },
      { label: "Formation", path: "/formation" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Blog", path: "/blog" },
      { label: "Événements", path: "/evenements" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="relative border-t border-gray-200 bg-white/70 dark:bg-gray-900/80 text-gray-700 dark:text-gray-300 backdrop-blur-md transition-colors duration-500">
      <div className="container-site py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:text-accent transition-colors"
            >
              <Image
                alt=""
                src={"/images/logo/a-logo.png"}
                width={100}
                height={100}
              />
            </Link>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 max-w-xs">
              Solutions IT fiables et innovantes pour les entreprises
              ambitieuses.
            </p>

            {/* Contact Info avec hover animé */}
            <div className="space-y-2 text-sm font-medium">
              <div className="flex items-center gap-2 group cursor-pointer">
                <Mail className="h-5 w-5 text-accent group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:text-blue-600 transition-colors duration-300">
                  contact@colabing-group.com
                </span>
              </div>
              <div className="flex items-center gap-2 group cursor-pointer">
                <Phone className="h-5 w-5 text -500 group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:text-green-600 transition-colors duration-300">
                  +242 06-546-37-46
                </span>
              </div>
              <div className="flex items-center gap-2 group cursor-pointer">
                <MapPin className="h-5 w-5 text-500 group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:text-red-600 transition-colors duration-300">
                  32 bis Rue Mbamou, Moungali, Brazzaville, République du Congo
                </span>
              </div>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title} className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-700 pb-1">
                {group.title}
              </h3>
              <ul className="space-y-1">
                {group.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Icons avec glow futuriste */}
        <div className="flex justify-center gap-4 mt-8 flex-wrap">
          <Link
            href="https://linkedin.com/company/colabing-group"
            target="_blank"
            className="group"
          >
            <FaLinkedin className="h-7 w-7 text-gray-700 dark:text-gray-300 transition-all duration-300 group-hover:text-blue-500 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.7)]" />
          </Link>
          <Link
            href="https://github.com/colabing-group"
            target="_blank"
            className="group"
          >
            <FaGithub className="h-7 w-7 text-gray-700 dark:text-gray-300 transition-all duration-300 group-hover:text-black dark:group-hover:text-white group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(0,0,0,0.6)]" />
          </Link>
          <Link
            href="https://twitter.com/colabing-group"
            target="_blank"
            className="group"
          >
            <FaTwitter className="h-7 w-7 text-gray-700 dark:text-gray-300 transition-all duration-300 group-hover:text-sky-400 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.7)]" />
          </Link>
          <Link
            href="https://facebook.com/colabing-group"
            target="_blank"
            className="group"
          >
            <FaFacebook className="h-7 w-7 text-gray-700 dark:text-gray-300 transition-all duration-300 group-hover:text-blue-600 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.7)]" />
          </Link>
          <Link
            href="https://wa.me/242065463746"
            target="_blank"
            className="group"
          >
            <FaWhatsapp className="h-7 w-7 text-gray-700 dark:text-gray-300 transition-all duration-300 group-hover:text-green-500 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.7)]" />
          </Link>
          <Link
            href="https://www.youtube.com/@colabinggroup4320"
            target="_blank"
            className="group"
          >
            <FaYoutube className="h-7 w-7 text-gray-700 dark:text-gray-300 transition-all duration-300 group-hover:text-red-600 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(239,68,68,0.7)]" />
          </Link>
          <Link
            href="https://www.instagram.com/colabingtech/?utm_source=ig_web_button_share_sheet"
            target="_blank"
            className="group"
          >
            <FaInstagram className="h-7 w-7 text-gray-700 dark:text-gray-300 transition-all duration-300 group-hover:text-pink-500 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(236,72,153,0.7)]" />
          </Link>
          <Link
            href="https://www.tiktok.com/@colabinggrouptech"
            target="_blank"
            className="group"
          >
            <FaTiktok className="h-7 w-7 text-gray-700 dark:text-gray-300 transition-all duration-300 group-hover:text-black dark:group-hover:text-white group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(0,0,0,0.6)]" />
          </Link>
          <Link
            href="https://t.me/colabing-group"
            target="_blank"
            className="group"
          >
            <FaTelegram className="h-7 w-7 text-gray-700 dark:text-gray-300 transition-all duration-300 group-hover:text-sky-500 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.7)]" />
          </Link>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-gray-300 dark:border-gray-700 pt-4 text-center text-xs text-gray-500 dark:text-gray-400 hover:text-accent transition-colors duration-300">
          © {new Date().getFullYear()} colabing-group. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
