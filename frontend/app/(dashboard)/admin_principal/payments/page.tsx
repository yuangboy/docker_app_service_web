"use client";

import { useState } from "react";
import { Eye, Check, RefreshCcw, Trash, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentsPage() {
  const [payments, setPayments] = useState([
    {
      id: 1,
      type: "Formation",
      item: "React",
      user: "John",
      amount: 100,
      status: "En attente",
    },
    {
      id: 2,
      type: "Événement",
      item: "Conférence",
      user: "Marie",
      amount: 50,
      status: "Payé",
    },
    {
      id: 3,
      type: "Formation",
      item: "Next.js",
      user: "Alice",
      amount: 120,
      status: "Payé",
    },
  ]);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 4;

  const filtered = payments.filter(
    (p) =>
      p.item.toLowerCase().includes(search.toLowerCase()) ||
      p.user.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / perPage);

  const currentItems = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  const markPaid = (id: number) =>
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Payé" } : p)),
    );

  const refund = (id: number) =>
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Remboursé" } : p)),
    );

  const deleteItem = (id: number) =>
    setPayments((prev) => prev.filter((p) => p.id !== id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black p-4 md:p-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Paiements
          </h1>
          <p className="text-gray-500 mt-1">
            Gérez les paiements des formations et événements
          </p>
        </div>

        {/* SEARCH */}
        <div className="relative group w-full md:w-1/3">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition" />

          <input
            type="text"
            placeholder="Rechercher un paiement..."
            className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 
            bg-white/70 dark:bg-gray-900/60 backdrop-blur-md
            focus:ring-2 focus:ring-blue-500 outline-none transition
            shadow-sm hover:shadow-md w-full"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* CARD CONTAINER */}
      <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
        <div className="grid gap-4">
          {currentItems.map((p) => (
            <div
              key={p.id}
              className="group flex flex-col md:flex-row md:justify-between md:items-center gap-4 p-5 rounded-2xl
              bg-white/70 dark:bg-gray-800/60 backdrop-blur-md
              border border-gray-200 dark:border-gray-700
              shadow-md hover:shadow-2xl
              transition-all duration-300
              hover:-translate-y-1 hover:scale-[1.01]"
            >
              {/* INFO */}
              <div>
                <p className="font-semibold text-lg group-hover:text-blue-600 transition">
                  {p.item} <span className="text-gray-400">({p.type})</span>
                </p>
                <p className="text-sm text-gray-500">
                  {p.user} — {p.amount} FCFA
                </p>
              </div>

              {/* STATUS + ACTIONS */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                {/* BADGE STATUS */}
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium shadow-sm
                  ${
                    p.status === "Payé"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                      : p.status === "En attente"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                  }`}
                >
                  ✦ {p.status}
                </span>

                {/* ACTIONS */}
                <div className="flex gap-3">
                  <Button
                    size="icon"
                    variant="outline"
                    className="hover:scale-110 transition-transform w-10 h-10 bg-yellow-500 hover:bg-yellow-600 text-white"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>

                  {p.status !== "Payé" && (
                    <Button
                      size="icon"
                      onClick={() => markPaid(p.id)}
                      className="hover:scale-110 transition-transform w-10 h-10 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                  )}

                  <Button
                    size="icon"
                    onClick={() => refund(p.id)}
                    className="hover:scale-110 transition-transform w-10 h-10 bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    <RefreshCcw className="w-4 h-4" />
                  </Button>

                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => deleteItem(p.id)}
                    className="hover:scale-110 transition-transform w-10 h-10 bg-red-500 hover:bg-red-600 text-white"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {currentItems.length === 0 && (
            <p className="text-center text-gray-400 py-10">
              Aucun paiement trouvé
            </p>
          )}
        </div>

        {/* PAGINATION */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-10 p-4 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-md">
          <p className="text-sm text-gray-500">
            Page {currentPage} sur {totalPages || 1}
          </p>

          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Précédent
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={`transition hover:scale-105 ${
                  page === currentPage
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : ""
                }`}
              >
                {page}
              </Button>
            ))}

            <Button
              size="sm"
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Suivants
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
