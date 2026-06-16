"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  LogIn,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  Loader,
} from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { usePathname, useRouter } from "next/navigation";
import { clsx } from "clsx";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import { BsPerson } from "react-icons/bs";
import { useLogoutUserMutation, useUserMeQuery } from "@/src/store/api";
import { logout, authStatus, setUser } from "@/src/store/slice/userSlice";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { IUser } from "@/src/store/interface";


interface NavbarProps {
  id: number;
  href: string;
  name: string;
}

const Navbars: NavbarProps[] = [
  { id: 1, href: "/about", name: "A Propos" },
  { id: 2, href: "/services", name: "Service" },
  { id: 3, href: "/projects", name: "Projet" },
  { id: 4, href: "/formations", name: "Formation" },
  { id: 5, href: "/blogs", name: "Blog" },
  { id: 6, href: "/events", name: "Evenement" },
];

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { darkMode, toggleTheme } = useTheme();

  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const [userName, setUserName] = useState<IUser>();
  const { data: dataUserMe, isLoading: isLoadingUserMe } = useUserMeQuery();

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const userR = useSelector((state: RootState) => state.user.user);

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 0.8,
    });
  });

 const handleContact = (e: React.MouseEvent<HTMLButtonElement>) => {
   e.preventDefault();
   router.push("/contact");
 };

 const handleLogout = async () => {
   try {
     const response = await logoutUser().unwrap();
     if (response.success) {
       dispatch(logout());
       dispatch(setUser(null));
       dispatch(authStatus(false));
       toast.success("Vous êtes déconnecté !");
       router.push("/");
     }
   } catch (error) {
     console.log(error);
   }
 };

 useEffect(() => {
   if (dataUserMe?.success && isLoggedIn) {
     setUserName(dataUserMe.data);
     dispatch(setUser(dataUserMe.data));
   } else if (!isLoggedIn) {
     setUserName(undefined);
     dispatch(setUser(null));
   }
 }, [dataUserMe, isLoggedIn]);



  return (
    <div
      ref={navRef}
      className="fixed top-0 w-full z-50 bg-white/90 dark:bg-[#001b4a]/90 backdrop-blur-md shadow-md"
    >
      <div className="flex items-center justify-between h-[70px] px-4 lg:px-10">
        {/* LOGO */}
        <Link href="/">
          <Image
            src="/images/logo/evoCore1.png"
            alt="logo"
            width={70}
            height={70}
          />
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden lg:flex gap-8 font-medium text-[#001b4a] dark:text-gray-200">
          {Navbars.map((nav) => (
            <li key={nav.id}>
              <Link
                href={nav.href}
                className={clsx(
                  pathname === nav.href
                    ? "text-pink-500 font-semibold"
                    : "hover:text-blue-600",
                )}
              >
                {nav.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex items-center gap-4">
          {userName ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-4 bg-[#001b4a] rounded-full shadow-md hover:bg-[#003cdb] transition"
              >
                <BsPerson className="text-white" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg p-2">
                  <button
                    onClick={handleLogout}
                    disabled={isLoadingUserMe}
                    className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    {isLoading ? (
                      <Loader
                        className="animate-spin text-blue-500"
                        size={20}
                      />
                    ) : (
                      "Se déconnecter"
                    )}
                  </button>
                  <Link
                    className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                    href={
                      userR?.role === "admin_principal"
                        ? "/admin_principal"
                        : userR?.role === "user"
                          ? "/user"
                          : "/"
                    }
                  >
                    Accéder au dashboard
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <button
              className="flex items-center gap-2 px-4 py-2 bg-[#001b4a] rounded-full shadow-md hover:bg-[#003cdb] transition"
              onClick={() => router.push("/login")}
            >
              <LogIn className="w-4 h-4 text-white" />
              <span className="text-white font-bold">Connexion</span>
            </button>
          )}

          <button
            onClick={() => router.push("/contact")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-full text-white"
          >
            Contact
            <ArrowUpRight className="w-4" />
          </button>

          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700"
          >
            {darkMode ? <Sun /> : <Moon />}
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#001b4a] px-6 py-6 space-y-6">
          {Navbars.map((nav) => (
            <Link
              key={nav.id}
              href={nav.href}
              onClick={() => setMenuOpen(false)}
              className="block text-lg"
            >
              {nav.name}
            </Link>
          ))}

          <div className="flex flex-col gap-4 pt-4 border-t">
            {userName ? (
                <>
               <Link
                    className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                    href={
                      userR?.role === "admin_principal"
                        ? "/admin_principal"
                        : userR?.role === "user"
                          ? "/user"
                          : "/"
                    }
                  >
                    Accéder au dashboard
                  </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-500"
              >
                <LogOut />
                Déconnexion
              </button>
              </>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="flex items-center gap-2"
              >
                <LogIn />
                Connexion
              </button>
            )}

            <button
              onClick={() => router.push("/contact")}
              className="flex items-center gap-2"
            >
              Contact
              <ArrowUpRight />
            </button>

            <button onClick={toggleTheme} className="flex items-center gap-2">
              {darkMode ? <Sun /> : <Moon />}
              Thème
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
