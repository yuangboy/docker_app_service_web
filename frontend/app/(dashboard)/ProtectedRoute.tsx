"use client";

import { RootState } from "@/src/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

type Props = {
  children: React.ReactNode;
  allowedRole: "user" | "admin_principal";
};

const ProtectedRoute = ({ children, allowedRole }: Props) => {
  const user = useSelector((state: RootState) => state.user.user);
  const router = useRouter();

  useEffect(() => {
    // 🔒 Pas connecté → login
    if (!user) {
      router.replace("/");
      return;
    }

    // 🔒 Mauvais rôle
    if (user.role !== allowedRole) {
      router.replace("/");
    }
  }, [user, allowedRole, router]);

  // 🔒 Empêche l'affichage tant que user n'est pas vérifié
  if (!user) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
