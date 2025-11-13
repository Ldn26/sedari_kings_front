import { Navbar } from "@/components/Navbar";

import Footer from "@/components/Footer";
import ContactUs from "@/components/ContactUs";
import APropos from "@/components/APropos";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhayChooseUs from "@/components/WhayChooseUs";
import HeroSection from "@/components/HeroSection";
export default function Index() {



 

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
<HeroSection />
 <APropos />
<FeaturedProducts />
  
<WhayChooseUs />
      <ContactUs />
      <Footer />
      
    </div>
  );
}
