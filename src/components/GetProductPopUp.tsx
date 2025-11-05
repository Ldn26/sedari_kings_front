import React, { useState } from "react";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { Select } from "./ui/select";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/Products";
import { Loader } from "lucide-react";
function GetProductPopUp({setOpenModel  , id} : {setOpenModel: React.Dispatch<React.SetStateAction<boolean>> , id: number}) {

   const {data  : product, isLoading  , isError  } = useQuery({
    queryKey: ['product', id],
    queryFn: getProductById(id),
   })

   const  [canEdit , setcatEdit]  = useState(false)

   if(isLoading) return <Loader  />
    if(isError) return <div>Error loading product</div>


  const producta = {
    id: "1",
    name: "Chaise Moderne",
    description:
      "Une chaise moderne et confortable, parfaite pour votre salon ou bureau.",
    price: 49.99,
    category: "chaises",
    stock: 25,
    image_url: "/placeholder.svg",
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0  bg-black/50"></div>
      {/* Centered Card */}
      <Card className="relative  animate-fade-in-up w-full max-w-3xl mx-2">
        <button
          className="flex absolute right-4 top-2 hover:scale-105 transition-all items-center justify-center"
           onClick={() => setOpenModel(false)}
        >
          <IoCloseCircleOutline color="black" size={20} />
        </button>
        <CardHeader>
          <CardTitle> Produit Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du produit</Label>
              {/* <Input required  value={product.name}  editable={canEdit}/> */}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea rows={3}   />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Prix (€)</Label>
                <Input type="number" step="0.01" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input type="number" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tables">Tables</SelectItem>
                  <SelectItem value="chaises">Chaises</SelectItem>
                  <SelectItem value="meubles">Meubles</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">URL de l'image</Label>
              <Input placeholder="https://..." />
            </div>

            <div className="flex flex-col lg:flex-row  justify-between  gap-8">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Editi en cours..." : "Editer le Produit"}
              </Button>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Supprision en cours..." : "Supprimer le Produit"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default GetProductPopUp;
