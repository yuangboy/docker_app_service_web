"use client";

import { useEffect, useState } from "react";
import { Eye, Trash, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IContact } from "@/src/store/interface";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useGetContactsQuery } from "@/src/store/api";
import { setContacts,setSelectedContact} from "@/src/store/slice/contactSlice";

export default function ContactMessagesPage() {
  

 const [messages, setMessagess] = useState<IContact[]>([]);
 const router = useRouter();
 const dispatch = useDispatch();

 const { data: dataContacts } = useGetContactsQuery();

 useEffect(() => {
   if (dataContacts?.success) {
     dispatch(setContacts(dataContacts.data));
     dispatch(setSelectedContact(null));
     setMessagess(dataContacts.data);
   }
 }, [dataContacts?.success, dataContacts?.data, dispatch]);


  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 4;

  const filtered = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / perPage);

  const currentItems = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  const deleteMessage = (id: string) =>
    setMessagess((prev) => prev.filter((m) => m._id !== id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black p-4 md:p-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Messages Contact
          </h1>
          <p className="text-gray-500 mt-1">
            Gérez les messages envoyés via le formulaire de contact
          </p>
        </div>

        {/* SEARCH */}
        <div className="relative group w-full md:w-1/3">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition" />

          <input
            type="text"
            placeholder="Rechercher un message..."
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
        <h2 className="text-lg font-semibold mb-6">
          {filtered.length} message(s)
        </h2>

        {/* LIST */}
        <div className="grid gap-4">
          {currentItems.map((m) => (
            <div
              key={m._id}
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
                  {m.subject}
                </p>
                <p className="text-sm text-gray-500">
                  {m.name} — {m.email}
                </p>
              </div>

              {/* STATUS + ACTIONS */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                {/* BADGE */}
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium shadow-sm
                  ${
                    m.isRead === true
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                      : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                  }`}
                >
                  ✦ {m.isRead ? "Lu" : "Non lu"}
                </span>

                {/* ACTIONS */}
                <div className="flex gap-3">
                  <Button
                    size="icon"
                    variant="outline"
                    className="hover:scale-110 transition-transform w-10 h-10 bg-yellow-500 hover:bg-yellow-600 text-white"
                 
                    onClick={()=>router.push(`/admin_principal/messages/${m._id}`)}
                 >
                    
                    <Eye className="w-4 h-4" />
                  </Button>

                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => m._id && deleteMessage(m._id)}
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
              Aucun message trouvé
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
