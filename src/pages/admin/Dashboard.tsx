import StatsCard from "@/components/StatsCard";
import { ShoppingBag, User, Package } from "lucide-react";
import React from "react";

function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Tableau de Bord
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Nombre d’utilisateurs"
          stat={124}
          icon={<User size={24} />}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          // footer="+5.3% depuis la semaine dernière"
        />

        <StatsCard
          title="Produits en stock"
          stat={68}
          icon={<ShoppingBag size={24} />}
          iconBg="bg-yellow-100"
          iconColor="text-yellow-600"
          // footer="3 nouveaux produits ajoutés"
        />

        <StatsCard
          title="Commandes en attente"
          stat={12}
          icon={<Package size={24} />}
          iconBg="bg-red-100"
          iconColor="text-red-600"
          // footer="2 commandes traitées aujourd'hui"
        />
      </div>
    </div>
  );
}

export default Dashboard;
