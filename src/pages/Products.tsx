import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
// import { supabase } from "@/integrations/supabase/client";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Products() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(category || "all");

  // useEffect(() => {
  //   // fetchProducts();
  // }, [selectedCategory]);

  // const fetchProducts = async () => {
  //   let query = supabase.from('products').select('*');
    
  //   if (selectedCategory !== "all") {
  //     query = query.eq('category', selectedCategory);
  //   }
    
  //   const { data } = await query;
  //   if (data) setProducts(data);
  // };

  const categories = [
    { value: "all", label: "Tous" },
    { value: "tables", label: "Tables" },
    { value: "chaises", label: "Chaises" },
    { value: "meubles", label: "Meubles" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 text-foreground">Notre Collection</h1>
          <p className="text-xl text-muted-foreground">
            Découvrez nos meubles d'exception
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map((cat) => (
            <Button
              key={cat.value}
              variant={selectedCategory === cat.value ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat.value)}
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              Aucun produit trouvé dans cette catégorie
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
