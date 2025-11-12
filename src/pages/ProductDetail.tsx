// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Navbar } from "@/components/Navbar";
// import { Button } from "@/components/ui/button";
// // import { supabase } from "@/integrations/supabase/client";
// import { useToast } from "@/hooks/use-toast";
// import { ShoppingCart, Minus, Plus } from "lucide-react";
// import { useProduct } from "@/api/Products";
// import Loader from "@/components/Loader";
// import ImageGallery from "react-image-gallery";
// import "react-image-gallery/styles/css/image-gallery.css";


// export default function ProductDetail() {
//   const { id } = useParams();
//   const { data: product, isLoading, isError } = useProduct(id);

//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [quantity, setQuantity] = useState(1);
//   const [loading, setLoading] = useState(false);

//  const images = [
//   {
//     original: "https://picsum.photos/id/1018/1000/600/",
//     thumbnail: "https://picsum.photos/id/1018/250/150/",
//   },
//   {
//     original: "https://picsum.photos/id/1015/1000/600/",
//     thumbnail: "https://picsum.photos/id/1015/250/150/",
//   },
//   {
//     original: "https://picsum.photos/id/1019/1000/600/",
//     thumbnail: "https://picsum.photos/id/1019/250/150/",
//   },
// ];


// const convertToImageGalleryItems = (imageUrls: string[]) => {
//   return imageUrls.map((url) => ({
//     original: url,
//     thumbnail: url,
//   }));
// }

//   // const handleAddToCart = async () => {
//   //   if (!user) {
//   //     toast({
//   //       variant: "destructive",
//   //       title: "Connexion requise",
//   //       description: "Veuillez vous connecter pour ajouter au panier",
//   //     });
//   //     navigate("/auth");
//   //     return;
//   //   }

//   //   setLoading(true);

//   //   const { data: existingItem } = await supabase
//   //     .from('cart_items')
//   //     .select('*')
//   //     .eq('user_id', user.id)
//   //     .eq('product_id', id)
//   //     .single();

//   //   if (existingItem) {
//   //     const { error } = await supabase
//   //       .from('cart_items')
//   //       .update({ quantity: existingItem.quantity + quantity })
//   //       .eq('id', existingItem.id);

//   //     if (error) {
//   //       toast({
//   //         variant: "destructive",
//   //         title: "Erreur",
//   //         description: "Impossible d'ajouter au panier",
//   //       });
//   //     } else {
//   //       toast({
//   //         title: "Panier mis à jour !",
//   //         description: `${quantity} article(s) ajouté(s)`,
//   //       });
//   //     }
//   //   } else {
//   //     const { error } = await supabase
//   //       .from('cart_items')
//   //       .insert({
//   //         user_id: user.id,
//   //         product_id: id,
//   //         quantity,
//   //       });

//   //     if (error) {
//   //       toast({
//   //         variant: "destructive",
//   //         title: "Erreur",
//   //         description: "Impossible d'ajouter au panier",
//   //       });
//   //     } else {
//   //       toast({
//   //         title: "Ajouté au panier !",
//   //         description: `${quantity} article(s) ajouté(s)`,
//   //       });
//   //     }
//   //   }

//   //   setLoading(false);
//   // };

//   // if (!product) {
//   //   return (
//   //     <div className="min-h-screen bg-background">
//   //       <Navbar />
//   //       <div className="container mx-auto px-4 py-20 text-center">
//   //         <p className="text-xl text-muted-foreground">Chargement...</p>
//   //       </div>
//   //     </div>
//   //   );
//   // }
//   console.log(product)

// if(isLoading) return (
//   <div className="min-h-screen bg-background">
//     <Navbar />
//     <div className="container mx-auto px-4 py-20 text-center">
//       <Loader />
//     </div>
//   </div>
// );

 
// if(isError) return <div>Erreur lors du chargement du produit.</div>;
//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <div className="container mx-auto px-4 py-12">
//         <div className="grid md:grid-cols-2 gap-12 items-start">
//           <div className="animate-fade-in">
//             <div className="aspect-square overflow-hidden rounded-lg bg-muted">
//               <img
//                 src={product.imageUrl[0] || "/placeholder.svg"}
//                 alt={product.name}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>

//           <div className="animate-fade-in-up space-y-6">
//             <div>
//               <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
//                 {product.category}
//               </p>
//               <h1 className="text-4xl font-bold mb-4 text-foreground">
//                 {product?.name}
//               </h1>
//               <p className="text-3xl font-bold text-accent">
//                 {product.price.toFixed(2)} €
//               </p>
//             </div>

//             <div className="border-t border-b border-border py-6">
//               <p className="text-muted-foreground leading-relaxed">
//                 {product?.desc}
//               </p>
//             </div>

//             <div className="space-y-4">
//               <div className="flex items-center gap-4">
//                 <span className="text-sm font-medium">Quantité:</span>
//                 <div className="flex items-center border border-border rounded-lg">
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                     disabled={quantity <= 1}
//                   >
//                     <Minus className="h-4 w-4" />
//                   </Button>
//                   <span className="px-6 py-2 font-medium">{quantity}</span>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() =>
//                       setQuantity(Math.min(product.quantity, quantity + 1))
//                     }
//                     disabled={quantity >= product.quantity}
//                   >
//                     <Plus className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>

//               {product.quantity > 0 ? (
//                 <p className=" text-muted-foreground">
//                   {product.quantity} articles en stock
//                 </p>
//               ) : (
//                 <p className="text-sm text-destructive">Rupture de stock</p>
//               )}

//               <Button
//                 size="lg"
//                 className="w-full  "
//                 // onClick={handleAddToCart}
//                 disabled={loading || product.quantity <= 0}
//               >
//                 <ShoppingCart className="h-5 w-5 mr-2" />
//                 {loading ? "Ajout en cours..." : "Ajouter au Panier"}
//               </Button>

//               <ImageGallery
//                 items={product.imageUrl ? convertToImageGalleryItems(product.imageUrl) : []}
//                 // items={images}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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

export default function ProductDetail() {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useProduct(id);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

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
          {/*  ggggallery */}
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
                  src={item.original}
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
                // onClick={handleAddToCart}
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
