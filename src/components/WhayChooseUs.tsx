
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
              icon: "/sec15.png",
            },
            {
              title: "Design Unique",
              description:
                "Des créations originales qui reflètent votre personnalité.",
              icon: "/sec14.png",
            },
            {
              title: "Matériaux Nobles",
              description:
                "Sélection rigoureuse des meilleurs bois et matériaux.",
              icon: "/sec16.png",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group   rounded-xl  relative block bg-black"
            >
              <img
                alt=""
                src={feature.icon}
                className="absolute inset-0  rounded-xl h-full w-full object-fit opacity-75 transition-opacity  group-hover:opacity-50"
              />

              <div className="relative p-4 sm:p-6 lg:p-8">
                <div className="bg-primary rounded-md w-fit p-2">
                  <p className="text-sm font-extrabold uppercase tracking-widest text-white">
                    {feature.title}
                  </p>
                </div>

                <p className="text-xl font-bold text-white mt-2 sm:text-2xl">
                  {feature.description}
                </p>

                <div className="mt-32 sm:mt-48 lg:mt-64">
                  <div className="translate-y-8 transform opacity-0 transition-all group-hover:-translate-y-10 group-hover:opacity-100">
                    <p className="text-lg font-bold  text-white">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhayChooseUs