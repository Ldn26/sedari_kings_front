import { Navbar } from "@/components/Navbar";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Package,
  Calendar,
  Loader2,
} from "lucide-react";
import { useOrders } from "@/api/Order";
import Loader from "@/components/Loader";
import { OrderType } from "types/allTypes";

function Order() {
    const { data, isSuccess, isLoading } = useOrders();
  
    console.log(data)
  const [openOrderId, setOpenOrderId] = useState<number | null>(null);

  const toggleOrder = (id: number) => {
    setOpenOrderId(openOrderId === id ? null : id);
  };

  if (isLoading) {
    return (
        <>
 
      <div className="flex flex-col  items-center justify-center">
        <Loader />
      </div>
        </>
    );
  }

  return (
      <div className="container mx-auto px-4 py-2 max-w-5xl">
        <div className="mb-4 animate-fade-in">
          <h1 className="lg:text-4xl   mt-4 text-3xl text-primary font-semibold  tracking-tight">
            Mes Commandes
          </h1>
          <p className="text-muted-foreground text-lg">
            Consultez l'historique de vos achats
          </p>
        </div>

        {data?.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <Package className="w-20 h-20 mx-auto mb-6 text-muted-foreground/40" />
            <p className="text-xl text-muted-foreground">
              Vous n'avez aucune commande pour le moment
            </p>
          </div>
        )}

        <div className="space-y-6">
          {data?.map((order:OrderType , index: number) => {
            const isOpen = openOrderId === order.id;
            const total = order.Products.reduce(
              (sum, p) =>
                sum + (p.price ?? 0) * (p.OrderProduct?.quantity ?? 1),
              0
            );
            return (
              <div
                key={order.id}
                className="group animate-fade-in rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-elegant)]"
                style={{
                  animationDelay: `${index * 100}ms`,
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <button
                  onClick={() => toggleOrder(order.id)}
                  className="w-full bg-card border border-border hover:border-accent/30 transition-all duration-300 p-6 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-6 flex-1">
                    <div className="w-14 h-14    hidden rounded-lg bg-gradient-to-br from-primary to-primary-glow md:flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Package className="w-7 h-7 text-primary-foreground" />
                    </div>
                    {/* Order Info */}
                    <div className="text-left flex-1">
                      <h2 className="lg:text-2xl  md:text:xl  text-sm  font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                        Commande #{order.id}
                      </h2>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">
                          {new Date(order.createdAt).toLocaleDateString(
                            "fr-FR",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Total Amount */}
                    <div className="text-right mr-4">
                      <p className="text-sm text-muted-foreground mb-1">
                        Total
                      </p>
                      <p className="md:text-2xl text:lg   font-bold text-accent">
                        {total.toFixed(2)} €
                      </p>
                    </div>
                  </div>

                  <div className="ml-4">
                    {isOpen ? (
                      <ChevronUp className="w-6 h-6 text-accent transition-transform duration-300" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
                    )}
                  </div>
                </button>

                {/* Collapsible Content */}
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="bg-muted/30 border-t border-border p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <span className="w-1 h-6 bg-accent rounded-full"></span>
                      Détails de la commande
                    </h3>

                    <div className="space-y-3">
                      {order.Products.map((item, itemIndex) => (
                        <div
                          key={item.id}
                          className="bg-card rounded-lg p-4 border border-border hover:border-accent/30 transition-all duration-300 animate-scale-in"
                          style={{
                            animationDelay: `${itemIndex * 50}ms`,
                          }}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex-1">
                              <p className="text-foreground font-semibold text-lg mb-1">
                                {item.name}
                              </p>
                              <p className="text-muted-foreground text-sm">
                                Quantité:{" "}
                                <span className="font-medium">
                                  {item.OrderProduct.quantity}
                                </span>
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-accent font-bold text-xl">
                                {item.price.toFixed(2)} €
                              </p>
                              <p className="text-muted-foreground text-xs">
                                par unité
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Summary */}
                    <div className="mt-6 pt-4 border-t border-border">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-foreground">
                          Total de la commande
                        </span>
                        <span className="text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                          {total.toFixed(2)} €
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
    </div>
  );
}

export default Order;

