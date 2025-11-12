import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-furniture.jpg";
import Footer from "@/components/Footer";
import ContactUs from "@/components/ContactUs";
import useUserStore from "../store/store";

export default function Index() {
  const navigate = useNavigate();

  // Example featured products
  const featuredProducts = [
    {
      id: 1,
      name: "Canapé Confort",
      price: 899,
      desc: "Canapé luxueux en cuir véritable pour votre salon.",
      imageUrl: ["/products/canape.jpg"],
      quantity: 5,
      category: "Salon",
    },
    {
      id: 2,
      name: "Table à Manger Élégante",
      price: 499,
      desc: "Table moderne en bois massif pour vos repas en famille.",
      imageUrl: ["/products/table.jpg"],
      quantity: 3,
      category: "Salle à manger",
    },
    {
      id: 3,
      name: "Chaise Design",
      price: 129,
      desc: "Chaise ergonomique et design pour bureau ou salon.",
      imageUrl: ["/products/chaise.jpg"],
      quantity: 10,
      category: "Bureau",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[calc(100vh-80px)] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-105 animate-hero-zoom"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6  text-whie text-[#CFB53B]  leading-tight">
              Quand L'Élégance Rencontre le Confort
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
              Découvrez notre collection exclusive de meubles sur mesure qui
              transformeront votre intérieur en un espace unique.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/produits")}
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8"
            >
              Explorer la Collection
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Produits Vedettes</h2>
            <p className="text-xl text-muted-foreground">
              Sélection de nos pièces les plus prisées
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12 animate-fade-in-up">
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/produits")}
            >
              Voir Tous les Produits
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gradient-to-b from-muted/80 to-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Pourquoi Nous Choisir
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Nous combinons expertise, passion et matériaux de qualité pour
              offrir des créations uniques qui vous ressemblent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Qualité Artisanale",
                description:
                  "Chaque pièce est fabriquée à la main par nos artisans experts.",
                icon: "/tiroir.png",
              },
              {
                title: "Design Unique",
                description:
                  "Des créations originales qui reflètent votre personnalité.",
                icon: "/design.png",
              },
              {
                title: "Matériaux Nobles",
                description:
                  "Sélection rigoureuse des meilleurs bois et matériaux.",
                icon: "/materiaux.png",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-card p-8 rounded-2xl text-center flex flex-col items-center justify-center shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="bg-accent/10 p-6 rounded-full mb-6 flex items-center justify-center hover:bg-accent/20 transition-all duration-300 animate-bounce-slow">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-base md:text-lg">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <ContactUs />

      {/* Footer */}
      <Footer />
    </div>
  );
}
