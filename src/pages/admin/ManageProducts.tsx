import { useState } from "react";
import ProductTableItem from "@/components/ProductTableItem";
import AddProductPopUp from "@/components/AddProductPopUp";
import ProductType from "../../../types/allTypes";
import { useProducts } from "../../api/Products";
import  categories  from  "../../data/categories";
import { IoAdd } from "react-icons/io5";
import { Package } from "lucide-react";
import Loader from "@/components/Loader";

export default function Admin() {
  const [openModel, setOpenModel] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const { products  } = useProducts();


console.log("products")
console.log(products)


  const filteredProducts = products.filter((product: ProductType) => {
    const matchesSearch = search
      ? product.name.toLowerCase().includes(search.toLowerCase())
      : true; // if search is empty, include all
    const matchesCategory = category === "all" || product.category === category;

    return matchesSearch && matchesCategory;
  });




  return (
    <div className="w-full  flex items-center    ">
      {openModel && <AddProductPopUp setOpenModel={setOpenModel} />}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between   my-2">
          <h1 className="xs:text-xl font-semibold  text-md   ">Rechercher par :</h1>

          <button
            onClick={() => setOpenModel(true)}
            className="sm:px-4    px-[4px] py-2  bg-green-800 flex items-center text-white rounded-lg hover:bg-gold-700 transition-colors"
          >
            <IoAdd size={24} />
            Ajouter un Produit
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center  gap-4 mb-6">
          <div className="flex items-center gap-2  ">
            <h1 className="text-primary font-semibold">Nom</h1>
            <input
              className="w-[240px]  xs:w-[300px]    xl:w-[500px] rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-orange-800 focus:border-transparent"
              type="text"
              placeholder="Rechercher un produit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <div className="flex    gap-2 items-center justify-center">
              <h1 className="text-primary t  font-semibold">type </h1>
              <select
                className="rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-orange-800 focus:border-transparent"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => {
                setSearch("");
                setCategory("all");
              }}
              className="px-4 py-2  te rounded-lg  hover:bg-orange-900  bg-primary text-white   transition-colors"
            >
              Réinitialiser
            </button>
          </div>
        </div>

        <div className="hidden sm:flex items-center justify-between w-full px-2 py-2 border-b border-gray-400 font-semibold text-sm text-muted-foreground">
          <div className="w-24">Image</div>
          <div className="flex-1 text-center sm:w-1/5">Name</div>
          <div className="flex-1 text-center sm:w-1/5">Category</div>
          <div className="flex-1 sm:w-1/5">Price</div>
          <div className="flex-1 text-center sm:w-1/5">Stock</div>
          <div className="flex gap-1 w-24 justify-end">Actions</div>
        </div>

        {/* Products List */}
        <div className="space-y-4   pb-[100px]    max-h-[760px]  overflow-y-auto">
          {/* {isLoading  && (
            <div className=" flex items-center justify-center">
              <Loader/>
            </div>
          )} */}

          {filteredProducts.length ? (
            filteredProducts.map((product: ProductType) => (
              <ProductTableItem
                key={product.id}
                product={product}
              />
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
