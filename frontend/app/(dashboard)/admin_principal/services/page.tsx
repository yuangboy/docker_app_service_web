"use client";

import { useEffect, useState } from "react";
import { Plus, Trash, Pencil, Eye, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { useGetServicesQuery } from "@/src/store/api";
import {
  setSelectedService,
  setServices,
} from "@/src/store/slice/serviceSlice";
import { IService } from "@/src/store/interface";

export default function ServicesPage() {
  const [services, setServicess] = useState<IService[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 4;

  const dispatch = useDispatch();
  const router = useRouter();

  const servicesStore = useSelector(
    (state: RootState) => state.service.services,
  );

  const { data: dataService } = useGetServicesQuery();

  useEffect(() => {
    if (dataService?.success) {
      dispatch(setServices(dataService.data));
      dispatch(setSelectedService(null));
      setServicess(dataService.data);
    }
  }, [dataService?.success, dataService?.data, dispatch]);

  useEffect(() => {
    console.log("Données services: ", services);
  }, [services]);

  console.log("Services store: ", servicesStore);

  const filtered = services.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.priceRange!.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filtered.length / perPage);

  const currentItems = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  const deleteService = (id: any) =>
    setServicess((prev) => prev.filter((s) => s._id !== id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black p-4 md:p-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Services
          </h1>
          <p className="text-gray-500 mt-1">Gérez vos services proposés</p>
        </div>

        {/* SEARCH + BUTTON */}
        <div className="flex gap-3 items-center">
          <div className="relative group">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition" />

            <input
              type="text"
              placeholder="Rechercher un service..."
              className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 
              bg-white/70 dark:bg-gray-900/60 backdrop-blur-md
              focus:ring-2 focus:ring-blue-500 outline-none transition
              shadow-sm hover:shadow-md w-full md:w-auto"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <Button
            onClick={() => router.push("/admin_principal/services/add")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white 
            shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter
          </Button>
        </div>
      </div>

      {/* CARD CONTAINER */}
      <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold mb-6">
          {filtered.length} service(s)
        </h2>

        {/* LIST */}
        <div className="grid gap-4">
          {currentItems.map((s) => (
            <div
              key={s._id}
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
                  {s.title}
                </p>
              </div>

              {/* STATUS + ACTIONS */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                {/* BADGE */}
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium shadow-sm
                  ${
                    s.isActive
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                  }`}
                >
                  ✦ {s.isActive ? "Actif" : "Inactif"}
                </span>

                {/* ACTIONS */}
                <div className="flex gap-3">
                  <Button
                    size="icon"
                    variant="outline"
                    className="hover:scale-110 transition-transform w-10 h-10 bg-yellow-500 hover:bg-yellow-600 text-white"
                    onClick={()=>router.push(`/admin_principal/services/${s._id}`)}
                >
                  
                    <Eye className="w-4 h-4" />
                  </Button>

                  <Button
                    size="icon"
                    variant="outline"
                    className="hover:scale-110 transition-transform w-10 h-10 bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>

                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => deleteService(s._id)}
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
              Aucun service trouvé
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
