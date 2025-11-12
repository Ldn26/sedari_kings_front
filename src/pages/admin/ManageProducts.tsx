import {  useState } from "react";
import ProductTableItem from "@/components/ProductTableItem";
import AddProductPopUp from "@/components/AddProductPopUp";
import { useQuery } from "@tanstack/react-query";
import api  from "../../api/axiosIntercepter";
import ProductType from "../../../types/allTypes";
import {  useProducts } from "../../api/Products"; 

export default function Admin() {
  const [openModel, setOpenModel] = useState(false);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "tables",
    stock: "",
    image_url: "",
  });


  const {  products, isLoading, refetch , isSuccess }  = useProducts();
console.log(products)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-xl text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-background">
      {openModel && <AddProductPopUp setOpenModel={setOpenModel} />}
      <div className="container mx-auto px-4 ">
        <div className="w-full ">
          <input
            className="w-full  rounded-xl   border border-gray-300 px-4 py-2 mb-6 focus:outline-none focus:ring-1 focus:ring-orange-800 focus:border-transparent  "
            type="text"
            placeholder="Rechercher un produit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          onClick={() => setOpenModel(true)}
          className="mb-6 px-4 py-1  bg-[#a67c00] text-white rounded-lg hover:bg-gold-700 transition-colors"
        >
          Ajouter un Produit
        </button>

        <div className="grid lg:grid-cols-2 gap-8"></div>
        {/* table header */}
        <div className="hidden  sm:flex items-center justify-between w-full px-2 py-2 border-b border-gray-400 font-semibold text-sm text-muted-foreground">
          <div className="w-24">Image</div>
          <div className="flex-1 text-center  sm:w-1/5">Name</div>
          <div className="flex-1 text-center sm:w-1/5">Category</div>
          <div className="flex-1 sm:w-1/5">Price</div>
          <div className="flex-1 text-center sm:w-1/5">Stock</div>
          <div className="flex gap-1  w-24 justify-end">Actions</div>
        </div>
        <div className="space-y-4 max-h-[750px] overflow-y-auto">
          {products?.products?.length ? (
            products.products.map((product: ProductType) => (
              <ProductTableItem key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-500">Aucun produit trouvé</p>
          )}
        </div>
      </div>
    </div>
  );
}
