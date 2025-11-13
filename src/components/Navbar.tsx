import { ShoppingCart, User, LogOut, LayoutDashboard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
// import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import useUserStore from "../store/store";
import api from "../api/axiosIntercepter"; // our Axios instance

export const Navbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { SetAccessToken  } = useUserStore();
 const user = useUserStore((state) => state.user);
 console.log(user)


  // const fetchCartCount = async (userId: string) => {
  //   const { data } = await supabase
  //     .from('cart_items')
  //     .select('quantity')
  //     .eq('user_id', userId);

  //   const total = data?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  //   setCartCount(total);
  // };

  const handleLogout = async () => {
    try {
      const res = api.post("/auth/logout");
      console.log(res.data);
      useUserStore.getState().setUser(null);
      SetAccessToken(null);
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Erreur de déconnexion",
        description: "Une erreur est survenue lors de la déconnexion.",
        variant: "destructive",
      });
      console.log(error);
    }
  };

  return (
    <nav className="sticky top-0 z-[100] w-full  mx-auto  container  h-[100px]  border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex  font-medium items-center text-xl justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={"/logo.svg"}
            alt={"Image du produit"}
            className="w-24 h-24 p-2 rounded-2xl"
          />
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <a
            href={!user ? "/#products" : "/produits"}
            className="text-foreground hover:text-accent transition-colors"
          >
            Produits
          </a>

          <a
            href="/#about"
            className="text-foreground hover:text-accent transition-colors"
          >
            À propos
          </a>
          <a
            href="/#contact"
            className="text-foreground hover:text-accent transition-colors"
          >
            Contact
          </a>
          <a
            href="/#whay"
            className="text-foreground hover:text-accent transition-colors"
          >
            Pourquoi nous
          </a>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {isAdmin && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate("/admin")}
                  className="relative"
                >
                  <LayoutDashboard className="h-5 w-5" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/panier")}
                className="relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <Button onClick={() => navigate("/auth")} variant="default">
              <User className="h-6 w-6 mr-2" />
              <p className="text-lg"> Connexion</p>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};
