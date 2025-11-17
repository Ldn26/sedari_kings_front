

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { useProduct } from "@/api/Products";
import Loader from "@/components/Loader";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
 import useUserStore  from "../store/store";
export default function ProductDetail() {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useProduct(id);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const { addTocart } = useUserStore.getState();
  
const handleAddToCart = () => {
  if (!product) return;
  setLoading(true);

  try {
    addTocart({
      ...product,
      quantity, 
    });

    toast({
      title: "Succès",
      description: `${quantity} x ${product.name} ajouté au panier.`,
      variant: "default",
    });
  } catch (error) {
    toast({
      title: "Erreur",
      description: "Une erreur est survenue lors de l'ajout au panier.",
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
};


  const convertToImageGalleryItems = (imageUrls: string[]) =>
    imageUrls.map((url) => ({
      original: url,
      thumbnail: url,
    }));

  if (isLoading)
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <Loader />
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center text-red-600">
          Erreur lors du chargement du produit.
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="animate-fade-in w-full rounded-lg bg-muted">
            <ImageGallery
              items={
                product.imageUrl
                  ? convertToImageGalleryItems(product.imageUrl)
                  : []
              }
              showPlayButton={false}
              showFullscreenButton={true}
              isfullscreen={false}
              thumbnailPosition="bottom"
              showNav={true}
              lazyLoad={true}
              showBullets={true}
              additionalClass="rounded-lg"
              renderItem={(item) => (
                <img
                  src={item.original }
                  alt={product.name}
                  style={{ width: "100%", height: "auto" }}
                  className="rounded-lg max-h-[80vh] md:max-h-[90vh] object-contain"
                />
              )}
            />
          </div>
          {/* Right: Product Info */}
          <div className="animate-fade-in-up flex flex-col gap-6">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                {product.category}
              </p>
              <h1 className="text-4xl font-bold mb-4 text-foreground">
                {product?.name}
              </h1>
              <p className="text-3xl font-bold text-accent">
                {product.price.toFixed(2)} €
              </p>
            </div>

            <div className="border-t border-b border-border py-6">
              <p className="text-muted-foreground font-bold leading-relaxed">
                {product?.desc}
              </p>
            </div>

            <div className="flex flex-col gap-4">
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
                    onClick={() =>
                      setQuantity(Math.min(product.quantity, quantity + 1))
                    }
                    disabled={quantity >= product.quantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {product.quantity > 0 ? (
                <p className="text-muted-foreground">
                  {product.quantity} articles en stock
                </p>
              ) : (
                <p className="text-sm text-destructive">Rupture de stock</p>
              )}

              <Button
                size="lg"
                className="w-full"
                onClick={handleAddToCart}
                disabled={loading || product.quantity <= 0}
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
