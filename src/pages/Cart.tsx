import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    image_url: string;
    stock: number;
  };
}

export default function Cart() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetchCartItems();
  // }, []);

  // const fetchCartItems = async () => {
  //   const { data: { user } } = await supabase.auth.getUser();
    
  //   if (!user) {
  //     navigate("/auth");
  //     return;
  //   }

  //   const { data } = await supabase
  //     .from('cart_items')
  //     .select(`
  //       id,
  //       quantity,
  //       product:products (
  //         id,
  //         name,
  //         price,
  //         image_url,
  //         stock
  //       )
  //     `)
  //     .eq('user_id', user.id);

  //   if (data) setCartItems(data as any);
  //   setLoading(false);
  // };

  // const updateQuantity = async (itemId: string, newQuantity: number) => {
  //   if (newQuantity <= 0) return;

  //   const { error } = await supabase
  //     .from('cart_items')
  //     .update({ quantity: newQuantity })
  //     .eq('id', itemId);

  //   if (!error) {
  //     fetchCartItems();
  //   }
  // };

  // const removeItem = async (itemId: string) => {
  //   const { error } = await supabase
  //     .from('cart_items')
  //     .delete()
  //     .eq('id', itemId);

  //   if (!error) {
  //     toast({
  //       title: "Article supprimé",
  //       description: "L'article a été retiré du panier",
  //     });
  //     fetchCartItems();
  //   }
  // };

  const calculateTotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + (item.product?.price || 0) * item.quantity,
      0
    );
  };

  if (loading) {
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
        <h1 className="text-4xl font-bold mb-8 text-foreground animate-fade-in">Mon Panier</h1>

        {cartItems.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-xl text-muted-foreground mb-6">Votre panier est vide</p>
              <Button onClick={() => navigate("/produits")}>
                Continuer mes achats
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="animate-fade-in-up">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={item.product?.image_url || "/placeholder.svg"}
                          alt={item.product?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{item.product?.name}</h3>
                        <p className="text-accent font-bold text-xl mb-4">
                          {item.product?.price.toFixed(2)} €
                        </p>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-border rounded-lg">
                            <Button
                              variant="ghost"
                              size="icon"
                              // onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="px-4 py-2 font-medium">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              // onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= (item.product?.stock || 0)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            // onClick={() => removeItem(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-20 animate-fade-in">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-2xl font-bold">Récapitulatif</h2>
                  
                  <div className="border-t border-b border-border py-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sous-total</span>
                      <span className="font-medium">{calculateTotal().toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Livraison</span>
                      <span className="font-medium">Gratuite</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-accent">{calculateTotal().toFixed(2)} €</span>
                  </div>
                  
                  <Button className="w-full" size="lg">
                    Procéder au paiement
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate("/produits")}
                  >
                    Continuer mes achats
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
