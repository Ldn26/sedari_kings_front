import React, { useState } from "react";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useCreateOrder } from "../api/Order";
import { useToast } from "@/hooks/use-toast";
import useUserStore from "../store/store";
function ConfirmSellPopUP({
  setOpenModel,
}: {
  setOpenModel: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { createOrder, isLoading, isError, error } = useCreateOrder();
  const { toast } = useToast();

  const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
  const [phoneNumber, setPhoneNumber] = useState("");

  const handelCreateOrder = () => {
    if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
      return toast({
        variant: "destructive",
        title: "Numero de telephone invalide",
        description: "Veuillez entrer un numero de telephone valide.",
      });
    }

    createOrder({
      phoneNbr: phoneNumber,
      user_id: useUserStore.getState().user.id,
      products: useUserStore.getState().cart.map((item) => ({
        product_id: item.id, // backend expects product_id
        quantity: item.quantity || 1, // send quantity
      })),
    });

    if (error) {
      console.log(error);
    }

    useUserStore.getState().clearCart();
    toast({
      title: "Demande envoyée",
      description: "Nous vous contacterons bientôt au numéro fourni.",
    });

    if(isError){
        toast({
          variant: "destructive",
          title: "Erreur lors de la creation de la commande",
          description: "Veuillez reessayer plus tard.",
        });
    }

    setOpenModel(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0  bg-black/50"></div>

      {/* Centered Card */}
      <Card className="relative animate-fade-in-up w-full max-w-md mx-2">
        <button
          className="flex absolute right-4 top-2 hover:scale-105 transition-all items-center justify-center"
          onClick={() => setOpenModel(false)}
        >
          <IoCloseCircleOutline color="red" size={30} />
        </button>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">Confirmer la vente du produit</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-md sm:text-lg">
                Numéro de téléphone
              </Label>
              <Input
                value={phoneNumber}
                type="phone"
                id="phone"
                placeholder="Entrez votre numero de telephone"
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            <div
              onClick={handelCreateOrder}
              className={`w-full flex items-center justify-center p-2 rounded-xl bg-primary ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "opacity-100 cursor-pointer"
              } text-white`}
            >
              {isLoading ? "Envoie en cours..." : "Envoyer  la demande"}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ConfirmSellPopUP;
