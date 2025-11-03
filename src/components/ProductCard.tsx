import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  category: string;
  stock: number;
}

export const ProductCard = ({ id, name, price, image_url, category, stock }: ProductCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300 cursor-pointer animate-fade-in-up bg-card"
      onClick={() => navigate(`/produit/${id}`)}
    >
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={image_url || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{category}</p>
        <h3 className="font-semibold text-lg mb-2 text-card-foreground">{name}</h3>
        <p className="text-2xl font-bold text-accent">{price.toFixed(2)} €</p>
        {stock <= 0 && (
          <p className="text-destructive text-sm mt-2">Rupture de stock</p>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          disabled={stock <= 0}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/produit/${id}`);
          }}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Voir le produit
        </Button>
      </CardFooter>
    </Card>
  );
};
