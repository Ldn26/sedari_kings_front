import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Armchair, Sparkles, Hammer, Sofa } from "lucide-react";
import ProductType from "types/allTypes";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
function APropos() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const features = [
    {
      id: 1,
      title: "Matériaux Nobles",
      description:
        "Sélection rigoureuse de bois massif, tissus précieux et finitions durables pour un mobilier qui traverse le temps.",
      image: "/sec10.png",
    },

    {
      id: 3,
      title: "Design Sur-Mesure",
      description:
        "Conception personnalisée adaptée à votre style, vos besoins et l'architecture de votre espace.",
      image: "./sec9.png",
    },
    {
      id: 2,
      title: "Savoir-Faire Artisanal",
      description:
        "Techniques ancestrales transmises de génération en génération par nos maîtres artisans marocains.",
      image: "/sec8.png",
      icon: Hammer,
    },
    {
      id: 4,
      title: "Confort Premium",
      description:
        "Ergonomie et qualité exceptionnelle pour des moments de détente absolue dans votre salon marocain.",
      image: "./sec7.png",
    },
  ];




  return (
    <section
      ref={ref}
      id="about"
      className="relative py-24   bg-gradient-to-b from-muted/80 to-muted overflow-hidden"
    >
      <div className="text-center   animate-fade-in">
        <div className="text-primary   z-[100] top-20 left-0 w-full h-40 pointer-events-none opacity-15">
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-5xl  lg:text-8xl font-bold     transform text-primary rotate-6">
            {/* in fr */}
              À Propos de Nous
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-20 left-0 w-full h-40 pointer-events-none opacity-10">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-8xl font-bold text-[#7B542F]/20 transform -rotate-12">
            KING OF SEDARI
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row items-center gap-12 mb-20"
        >
          {/* Image */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative rounded-md overflow-hidden shadow-2xl group">
              <motion.img
                src="/sec.jpg"
                alt="Salon marocain luxueux"
                className="w-full h-96 object-covver"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7 }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#7B542F]/50 to-transparent" />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="w-full lg:w-1/2 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <motion.div
              className="inline-flex items-center gap-3 bg-[#7B542F] text-white px-6 py-3 rounded-full shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Armchair className="w-6 h-6" />
              <span className="font-semibold">Depuis 2023</span>
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              KING OF SEDARI
            </motion.h2>

            <motion.div
              className="h-1 w-20 bg-[#CFB53B]"
              initial={{ width: 0 }}
              animate={isInView ? { width: 80 } : { width: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            />

            <motion.p
              className="text-xl text-muted-foreground leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Nous créons des salons marocains sur-mesure qui subliment votre
              intérieur, mêlant{" "}
              <span className="text-[#7B542F] font-semibold">
                artisanat traditionnel
              </span>{" "}
              et
              <span className="text-[#7B542F] font-semibold">
                {" "}
                design contemporain
              </span>
              .
            </motion.p>

            <motion.p
              className="text-lg text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              Chaque pièce est une œuvre unique, conçue avec passion pour
              transformer votre espace en un havre de confort et d'élégance.
            </motion.p>
          </motion.div>
        </motion.div>

        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 30000,
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
          {features.map((feature, index) => (
            <SwiperSlide
              className="h-[450px] rounded-xl shadow-md hover:shadow-2xl overflow-hidden  min-w-[280px] max-w-[320px] transition-all bg-white"
              key={feature.id}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full hover:scale-105 transition-all   object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#7B542F]/80 to-transparent" />
                <div
                  className="absolute bottom-4 left-4 right-4"
                ></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>


        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <motion.div
            className="bg-primary rounded-xl p-12 text-center shadow-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h3
              className="text-3xl font-bold text-white mb-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              Notre Mission
            </motion.h3>
            <motion.p
              className="text-xl text-white/90 leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              Créer des espaces élégants, chaleureux et uniques avec un service
              clé en main : de la conception initiale à l'installation finale,
              nous vous accompagnons à chaque étape.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default APropos;
