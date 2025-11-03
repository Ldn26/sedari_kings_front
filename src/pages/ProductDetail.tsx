import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
// import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { User } from "@supabase/supabase-js";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setUser(session?.user ?? null);
  //   });

  //   fetchProduct();
  // }, [id]);

  // const fetchProduct = async () => {
  //   const { data } = await supabase
  //     .from('products')
  //     .select('*')
  //     .eq('id', id)
  //     .single();
    
  //   if (data) setProduct(data);
  // };

  // const handleAddToCart = async () => {
  //   if (!user) {
  //     toast({
  //       variant: "destructive",
  //       title: "Connexion requise",
  //       description: "Veuillez vous connecter pour ajouter au panier",
  //     });
  //     navigate("/auth");
  //     return;
  //   }

  //   setLoading(true);

  //   const { data: existingItem } = await supabase
  //     .from('cart_items')
  //     .select('*')
  //     .eq('user_id', user.id)
  //     .eq('product_id', id)
  //     .single();

  //   if (existingItem) {
  //     const { error } = await supabase
  //       .from('cart_items')
  //       .update({ quantity: existingItem.quantity + quantity })
  //       .eq('id', existingItem.id);

  //     if (error) {
  //       toast({
  //         variant: "destructive",
  //         title: "Erreur",
  //         description: "Impossible d'ajouter au panier",
  //       });
  //     } else {
  //       toast({
  //         title: "Panier mis à jour !",
  //         description: `${quantity} article(s) ajouté(s)`,
  //       });
  //     }
  //   } else {
  //     const { error } = await supabase
  //       .from('cart_items')
  //       .insert({
  //         user_id: user.id,
  //         product_id: id,
  //         quantity,
  //       });

  //     if (error) {
  //       toast({
  //         variant: "destructive",
  //         title: "Erreur",
  //         description: "Impossible d'ajouter au panier",
  //       });
  //     } else {
  //       toast({
  //         title: "Ajouté au panier !",
  //         description: `${quantity} article(s) ajouté(s)`,
  //       });
  //     }
  //   }

  //   setLoading(false);
  // };

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-xl text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="animate-fade-in">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="animate-fade-in-up space-y-6">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                {product.category}
              </p>
              <h1 className="text-4xl font-bold mb-4 text-foreground">{product.name}</h1>
              <p className="text-3xl font-bold text-accent">{product.price.toFixed(2)} €</p>
            </div>

            <div className="border-t border-b border-border py-6">
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Quantité:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-6 py-2 font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {product.stock > 0 ? (
                <p className="text-sm text-muted-foreground">
                  {product.stock} articles en stock
                </p>
              ) : (
                <p className="text-sm text-destructive">Rupture de stock</p>
              )}

              <Button
                size="lg"
                className="w-full"
                // onClick={handleAddToCart}
                disabled={loading || product.stock <= 0}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {loading ? "Ajout en cours..." : "Ajouter au Panier"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
