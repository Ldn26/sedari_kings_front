import React from 'react'
import ProductType from "types/allTypes"; // import your type
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide  } from "swiper/react";
import { useFilterProduct } from "../api/products";
import "swiper/css";
import { ProductCard } from "@/components/ProductCard";
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
function FeaturedProducts() {
  const navigate = useNavigate();


      const { products :featuredProducts, isLoading, isSuccess } = useFilterProduct({
         search: "" ,
         category:  "all"  , 
          page: 1,
         limit: 12,
       });
    
          const {
            products: featuredProducts2,
            isLoading2,
            isSuccess2,
          } = useFilterProduct({
            search: "",
            category: "all",
            page: 2,
            limit: 12,
          });
     
 
  return (
    <section id='products' className="py-20 relative z-50 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center   animate-fade-in">
          <div className="text-primary  z-[100] top-20 left-0 w-full h-40 pointer-events-none opacity-10">
            <div className="w-full h-full flex items-center justify-center">
              <div className="lg:text-8xl text-5xl font-bold    transform text-primary rotate-6">
                Produits Vedettes{" "}
              </div>
            </div>
          </div>
 
        </div>

        {isLoading ? (
          <p className="text-center text-muted-foreground">
            Chargement des produits...
          </p>
        ) : isSuccess && featuredProducts.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Aucun produit trouvé.
          </p>
        ) : (
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            loop={true}
            modules={[Autoplay]}
            autoplay={{
              delay: 500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            // onSlideChange={() => console.log("slide change")}
            // onSwiper={(swiper) => console.log(swiper)}
          >
            {featuredProducts.map((product: ProductType) => (
              <SwiperSlide key={product.id}>
                <ProductCard key={product.id} product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        {/* secend Swipper */}
        {isLoading2 ? (
          <p className="text-center text-muted-foreground">
            Chargement des produits...
          </p>
        ) : isSuccess2 && featuredProducts2.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Aucun produit trouvé.
          </p>
        ) : (
          <Swiper
            slidesPerView={1}
            modules={[Autoplay]}
            spaceBetween={20}
            loop={true}
            autoplay={{
              delay: 500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            // onSlideChange={() => console.log("slide change")}
            // onSwiper={(swiper) => console.log(swiper)}
          >
            {featuredProducts2.map((product: ProductType) => (
              <SwiperSlide key={product.id}>
                <ProductCard key={product.id} product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

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
  );
}

export default FeaturedProducts