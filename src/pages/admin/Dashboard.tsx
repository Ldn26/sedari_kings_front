import StatsCard from "@/components/StatsCard";
import { ShoppingBag, User, Package } from "lucide-react";
import { useProductNumber } from "../../api/Products";
import { useUsersNumber } from "../../api/users";
import { UseorderNumber } from "@/api/Order";
function Dashboard() {
  const {
    data: productnbr,
    isLoading: ProductNbrLoader,
    isError,
  } = useProductNumber(); // Use your data fetching hook here
  const {
    data: usersnbr,
    isLoading: userNbrLoader,
    isError: isErrorUsers,
  }
   = useUsersNumber(); // Use your data fetching hook here

   
       const {
         data: orderNumber,
         isLoading: orderNumbeisLoading,
         isError: isErrorOrderNumber,
       } = UseorderNumber();



  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Tableau de Bord
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Nombre d’utilisateurs"
          stat={
            isErrorUsers
              ? "Erreur"
              : userNbrLoader
              ? "^._.^"
              : usersnbr.users ?? 0
          }
          icon={<User size={24} />}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
          // footer="+5.3% depuis la semaine dernière"
        />
        <StatsCard
          title="Produits en stock"
          stat={
            isError
              ? "Erreur"
              : ProductNbrLoader
              ? "^._.^"
              : productnbr.productscount ?? 0
          }
          icon={<ShoppingBag size={24} />}
          iconBg="bg-yellow-100"
          iconColor="text-yellow-600"
        />

        <StatsCard
          title="Commandes en attente"
          stat={
            isErrorOrderNumber
              ? "Erreur"
              : orderNumbeisLoading
              ? "^._.^"
              : orderNumber.orderCount ?? 0
          }
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
