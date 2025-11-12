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
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const { SetAccessToken  } = useUserStore();
  useEffect(() => {
    const currentUser = useUserStore.getState().user;
    setUser(currentUser);
    if (currentUser && currentUser.isAdmin === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

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
    <nav className="sticky top-0 z-50 w-full   h-[80px]  border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            {/* <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
Seddari Kings
            </h1> */}
            <img
              src={"/logo.svg"}
              alt={"Image du produit"}
              className="w-20 h-20 p-2 rounded-2xl"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/produits"
              className="text-foreground hover:text-accent transition-colors"
            >
              Produits
            </Link>
            <Link
              to="/produits?category=tables"
              className="text-foreground hover:text-accent transition-colors"
            >
              
            </Link>
            <Link
              to="/produits?category=chaises"
              className="text-foreground hover:text-accent transition-colors"
            >
              À propos
            </Link>
            <Link
              to="/produits?category=meubles"
              className="text-foreground hover:text-accent transition-colors"
            >
              Contact
            </Link>
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
                <User className="h-4 w-4 mr-2" />
                Connexion
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
