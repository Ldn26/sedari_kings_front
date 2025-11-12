import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useFilterProduct } from "../api/products";
import ProductType from "types/allTypes";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const { products, totalPages, isLoading, isSuccess } = useFilterProduct({
    name: search,
    category: selectedCategory === "all" ? undefined : selectedCategory,
    page,
    limit: 12,
  });



  
const categories = [
  { value: "all", label: "Tous" },
  { value: "table", label: "Table" },
  { value: "chaise", label: "Chaise" },
  { value: "seddari", label: "Seddari" },
  { value: "lit", label: "Lit" },
  { value: "tete_de_lit", label: "Tete de lit" },
  { value: "semi", label: "Semi" },
  { value: "coussin", label: "Coussin" },
  { value: "pouf", label: "Pouf" },
  { value: "coffre", label: "Coffre" },
  { value: "docier", label: "Docier" },
  { value: "coudoire", label: "Coudoire" },
  { value: "autre", label: "Autre" },
];
 

  console.log(totalPages)



 console.log(products);


  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-4">
        <div className="text-center mb-4 animate-fade-in">
          <h1 className="text-5xl font-bold  text-foreground">
            Notre Collection
          </h1>
          <p className="text-xl mt-4 text-muted-foreground">
            Découvrez nos meubles d'exception
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-4 mb-2 flex-wrap">
          {categories.map((cat) => (
            <Button
              key={cat.value}
              variant={selectedCategory === cat.value ? "default" : "outline"}
              onClick={() => {
                setSelectedCategory(cat.value);
                setPage(1); // reset page when changing category
              }}
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Search */}
        <div className="my-4 w-full text-center">
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // reset page when searching
            }}
            className="border  b rounded px-3 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Productsssss */}
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-4 mb-8">
            <Button
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </Button>
            <span className="px-3 py-1 border rounded">{page}</span>
            <Button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Next
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {!isLoading &&
            isSuccess &&
            products.map((pro: ProductType) => (
              <ProductCard key={pro.id} product={pro} />
            ))}
        </div>

        {/* No Products */}
        {!isLoading && isSuccess && products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              Aucun produit trouvé
            </p>
          </div>
        )}

        {/* No Products */}
        {!isLoading && isSuccess && products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              Aucun produit trouvé
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
