import React from 'react'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import heroImage from "@/assets/hero-furniture.jpg";
function HeroSection() {
    const navigate = useNavigate();
  return (
      <section className="relative h-[calc(100vh-140px)] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-105 animate-hero-zoom"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6  text-white textv-[#CFB53B]  leading-tight">
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
  )
}

export default HeroSection