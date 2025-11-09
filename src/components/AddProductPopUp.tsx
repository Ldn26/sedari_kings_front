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
import { useCreateProduct } from "../api/Products";

function AddProductPopUp({setOpenModel} : {setOpenModel: React.Dispatch<React.SetStateAction<boolean>>}) {
  const [loading, setLoading] = useState(false);
const { createProduct, isLoading, isError, data, error } = useCreateProduct();
const handelAddProduct = () => {
  createProduct({
    name: "Table",
    desc: "Table en bois",
    price: 120,
    quantity: 5,
    category: "tables",
    image_url: "https://example.com/table.jpg",
  });
};     


const [formData, setFormData] = useState({
    name: "",
    desc: "",  
    price: "",
    category: "tables",
    quantity: "",
    image_url: "",
  });
  
   

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Centered Card */}
      <Card className="relative  animate-fade-in-up w-full max-w-md mx-2">
        <button
          className="flex absolute right-4 top-2 hover:scale-105 transition-all items-center justify-center"
          onClick={() => setOpenModel(false)}
        >
          <IoCloseCircleOutline color="black" size={20} />
        </button>
        <CardHeader>
          <CardTitle>Ajouter un Produit</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du produit</Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                onChange={(e) =>
                  setFormData({ ...formData, desc: e.target.value })
                }
                value={formData.desc}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Prix (€)</Label>
                <Input
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  type="number"
                  step="0.01"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                  type="number"
                  required
                />
              </div>
            </div>
  

            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                {/* Trigger that shows the selected value */}
                <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <SelectValue placeholder="Choisir une catégorie" />
                </SelectTrigger>

                {/* Dropdown Content */}
                <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg mt-1 z-50">
                  <SelectItem
                    value="tables"
                    className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  >
                    Tables
                  </SelectItem>
                  <SelectItem
                    value="chaises"
                    className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  >
                    Chaises
                  </SelectItem>
                  <SelectItem
                    value="meubles"
                    className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  >
                    Meubles
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">URL de l'image</Label>
              <Input placeholder="https://..." />
            </div>

            <div
              onClick={handelAddProduct}
              className="w-full"
              // disabled={isLoading}
            >
              {isLoading ? "Ajout en cours..." : "Ajouter le Produit"}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddProductPopUp;
