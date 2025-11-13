
function WhayChooseUs() {
  return (
    <section
      id="whay"
      className="py-24 bg-gradient-to-b from-muted/80 to-muted"
    >
      <div className="container mx-auto px-4">
     

          <div className="text-center   animate-fade-in">
            <div className="text-primary   z-[100] top-20 left-0 w-full h-40 pointer-events-none opacity-15">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-5xl  lg:text-8xl font-bold     transform text-primary rotate-6">
                  Pourquoi Nous Choisir{" "}
                </div>
              </div>
            </div>
          </div>
       
          {/* <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Nous combinons expertise, passion et matériaux de qualité pour
            offrir des créations uniques qui vous ressemblent.
          </p> */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Qualité Artisanale",
              description:
                "Chaque pièce est fabriquée à la main par nos artisans experts.",
              icon: "/el1.png",
            },
            {
              title: "Design Unique",
              description:
                "Des créations originales qui reflètent votre personnalité.",
              icon: "/el2.png",
            },
            {
              title: "Matériaux Nobles",
              description:
                "Sélection rigoureuse des meilleurs bois et matériaux.",
              icon: "/el3.png",
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
  );
}

export default WhayChooseUs