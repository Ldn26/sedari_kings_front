import { useState } from "react";
import { useDeleteOrder, useOrders, useUpdateStatus } from "@/api/Order";
import Loader from "@/components/Loader";
import OrderTableItem from "@/components/OrderTableItem";
import { OrderType } from "../../../types/allTypes";
import { Package } from "lucide-react";
export default function ManageOrders() {
  const [searchDate, setSearchDate] = useState(""); 
  const [status, setStatus] = useState("all");

  const { data: orders, isSuccess, isLoading } = useOrders();







  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-[#f7f3ef]  flex items-center justify-center">
  //       <Loader />
  //     </div>
  //   );
  // }







  // FILTERS
  const filteredOrders = orders.filter((order: OrderType) => {
    const orderDate = order.createdAt.slice(0, 10); // "2025-11-14"

    const matchesDate = searchDate ? orderDate === searchDate : true;

    const matchesStatus =
      status === "all"
        ? true
        : (status === "En attente" && order.status === "En attente") ||
          (status === "Expédiée" && order.status === "Expédiée") ||
          (status === "Livrée" && order.status === "Livrée");

    return matchesDate && matchesStatus;
  });

  return (
    <div className="">
      <div className="container mx-auto px-4 py-6">
        {/* HEADER */}
        <h1 className="sm:text-2xl  text-xl mb-4  font-bold text-[#5a4634]">
          Gestion des Commandes
        </h1>

   

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          {/* STATUS FILTER */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#5a4634]">Statut :</span>
            <select
              className="rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c49a6c] text-[#5a4634]"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">Tous</option>
              <option value="En attente">En attente</option>
              <option value="Expédiée">Expédiée</option>
              <option value="Livrée">Livrée</option>
            </select>
          </div>

          {/* DATE FILTER */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#5a4634]">Date :</span>
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#c49a6c] text-[#5a4634]"
            />
          </div>

          {/* RESET */}
          <button
            onClick={() => {
              setSearchDate("");
              setStatus("all");
            }}
            className="px-4 py-2 rounded-xl bg-[#c49a6c] text-white hover:bg-[#a17d4d] transition-all"
          >
            Réinitialiser
          </button>
        </div>

        {/* HEADER COLUMNS */}
        <div className="flex items-center justify-between w-full px-2 py-2 font-semibold text-sm text-[#5a4634] border-b border-gray-300">
          <div className="flex-1 text-left text-xs sm:text-md sm:w-1/5">
            Client
          </div>
          <div className="flex-1 hidden sm:block text-center text-xs sm:text-md sm:w-1/5">
            Date
          </div>
          <div className="flex-1 text-center text-xs sm:text-md sm:w-1/5">
            Téléphone
          </div>
          <div className="flex-1 hidden sm:block text-center text-xs sm:text-md sm:w-1/5">
            Prix
          </div>
          <div className="flex-1 text-center text-xs sm:text-md sm:w-1/5">
            Statut
          </div>
          <div className="flex-1 flex justify-end text-xs sm:text-md sm:w-1/5">
            Action
          </div>
        </div>
   
        {/* LIST */}
        <div className="space-y-4 max-h-[750px] overflow-y-auto">
          {filteredOrders.length ? (
            filteredOrders.map((order: OrderType) => (
              <OrderTableItem key={order.id} order={order} />
            ))
          ) : (
          <div className="text-center py-20 animate-fade-in">
            <Package className="w-20 h-20 mx-auto mb-6 text-muted-foreground/40" />
            <p className="text-xl text-muted-foreground">
              Vous n'avez aucune commande pour le moment
            </p>
          </div>
     
          )}
        </div>
      </div>
    </div>
  );
}
