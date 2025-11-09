import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
// import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Contact } from "lucide-react";
import heroImage from "@/assets/hero-furniture.jpg";
import Footer from "@/components/Footer";
import ContactUs from "@/components/ContactUs";
import useUserStore from "../store/store";

export default function Index() {
  useEffect(() => {
    const user = useUserStore.getState().user;
    //  if(user.isAdmin) {
  }, []);
  console.log("the user from zustand ");
  console.log(useUserStore.getState());

  // const navigate = useNavigate();
  // const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  // useEffect(() => {
  //   const fetchFeaturedProducts = async () => {
  //     const { data } = await supabase
  //       .from('products')
  //       .select('*')
  //       .limit(3);

  //     if (data) setFeaturedProducts(data);
  //   };

  //   fetchFeaturedProducts();
  // }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-primary-foreground animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Quand L'Élégance Rencontre le confort
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
              Découvrez notre collection exclusive de meubles sur mesure qui
              transformeront votre intérieur
            </p>
            <Button
              size="lg"
              // onClick={() => navigate("/produits")}
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8"
            >
              Explorer la Collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      {/* products  ywdy*/}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Produits Vedettes
            </h2>
            <p className="text-xl text-muted-foreground">
              Sélection de nos pièces les plus prisées
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))} */}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              // onClick={() => navigate("/produits")}
            >
              Voir Tous les Produits
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      <ContactUs />

      {/* why chouuse Us */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Pourquoi Nous Choisir
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Qualité Artisanale",
                description:
                  "Chaque pièce est fabriquée à la main par nos artisans experts",
              },
              {
                title: "Design Unique",
                description:
                  "Des créations originales qui reflètent votre personnalité",
              },
              {
                title: "Matériaux Nobles",
                description:
                  "Sélection rigoureuse des meilleurs bois et matériaux",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-card items-center justify-center flex flex-col p-8 rounded-lg text-center hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  className={"w-24 h-24  founianima "}
                  src="/tiroir.png"
                  alt="fourn"
                />
                <h3 className="text-2xl font-bold mb-4 text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
