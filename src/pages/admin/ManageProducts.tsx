import { useState } from "react";
import ProductTableItem from "@/components/ProductTableItem";
import AddProductPopUp from "@/components/AddProductPopUp";
import ProductType from "../../../types/allTypes";
import { useProducts } from "../../api/Products";
import Loader from "@/components/Loader";
import  categories  from  "../../data/categories";
import { IoAdd } from "react-icons/io5";

export default function Admin() {
  const [openModel, setOpenModel] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const { products , isLoading } = useProducts();
  




  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader />
      </div>
    );
  }


  // const filteredProducts = products.filter((product: ProductType) => {
  //   const matchesSearch = product.name
  //     .toLowerCase()
  //     .includes(search.toLowerCase());
  //   const matchesCategory = category === "all" || product.category === category;
  //   return matchesSearch && matchesCategory;
  // });

  const filteredProducts = products.filter((product: ProductType) => {
    const matchesSearch = search
      ? product.name.toLowerCase().includes(search.toLowerCase())
      : true; // if search is empty, include all

    const matchesCategory = category === "all" || product.category === category;

    return matchesSearch && matchesCategory;
  });


  return (
    <div className=" ">
      {openModel && <AddProductPopUp setOpenModel={setOpenModel} />}
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between my-2">
          <h1 className="text-xl font-semibold  ">Rechercher par :</h1>

          <button
            onClick={() => setOpenModel(true)}
            className="px-4 py-2 bg-green-700 flex items-center text-white rounded-lg hover:bg-gold-700 transition-colors"
          >
            <IoAdd size={24} />
            Ajouter un Produit
          </button>
        </div>




        <div className="flex flex-col sm:flex-row sm:items-center  gap-4 mb-6">
          <div className="flex items-center gap-2  ">
            <h1 className="text-primary font-semibold">Nom</h1>
            <input
              className="w-[300px] xl:w-[500px] rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-orange-800 focus:border-transparent"
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
        <div className="space-y-4  pb-[60px] border max-h-[760px]  overflow-y-scroll">
          {filteredProducts.length ? (
            filteredProducts.map((product: ProductType) => (
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
