import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
 import useUserStore from "../store/store";
import ConfirmSellPopUP from "@/components/ConfirmSellPopUP";
import { useState } from "react";
import ProductType from "types/allTypes";
 const addURL =import.meta.env.MODE == "development" ? "https://kingofsedari.com/" : ""; 
  

export default function Cart() {
  const { toast } = useToast();
  const navigate = useNavigate();
const cartCount = useUserStore((state) => state.cartCount);

 const cart = useUserStore((state) => state.cart);
 const removeFromCart = useUserStore((state) => state.removeFromCart);
 const updateQuantity = useUserStore((state) => state.updateQuantity);

const [Open,SetOpenModel] = useState(false);


const removeElement = (itemId: number) => {
    removeFromCart(itemId);
    toast({
      title: "Article supprimé",
      description: "L'article a été supprimé de votre panier.",
    });

}

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price || 0) * item.quantity,
      0
    );
  };








  return (
    <div>
      {Open && <ConfirmSellPopUP setOpenModel={SetOpenModel} />}

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-foreground animate-fade-in">
          Mon Panier
        </h1>

        {cart.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-xl text-muted-foreground mb-6">
                Votre panier est vide
              </p>
              <Button onClick={() => navigate("/produits")}>
                Continuer mes achats
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item: ProductType) => (
                <Card key={item.id} className="animate-fade-in-up">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={
                            item.imageUrl && item.imageUrl.length > 0
                              ? addURL + item.imageUrl[0]
                              : "/placeholder.svg"
                          }
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">
                          {item.name}
                        </h3>
                        <p className="text-accent font-bold text-xl mb-4">
                          {item.price.toFixed(2)} €
                        </p>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-border rounded-lg">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                updateQuantity(item.id, item.quantity - 1);
                              }}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="px-4 py-2 font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                updateQuantity(item.id, item.quantity + 1);
                              }}
                              disabled={item.quantity >= (item.quantity || 0)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeElement(item.id)}
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
                      <span className="font-medium">
                        {calculateTotal().toFixed(2)} €
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Livraison</span>
                      <span className="font-medium">Gratuite</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-accent">
                      {calculateTotal().toFixed(2)} €
                    </span>
                  </div>

                  <Button
                    onClick={() => SetOpenModel(true)}
                    className="w-full"
                    size="lg"
                  >
                    Envoyer votre commande
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
