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


function AddProductPopUp({setOpenModel} : {setOpenModel: React.Dispatch<React.SetStateAction<boolean>>}) {
  const [loading, setLoading] = useState(false);
   
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Centered Card */}
      <Card className="relative  animate-fade-in-up w-full max-w-md mx-2">
          <button className="flex absolute right-4 top-2 hover:scale-105 transition-all items-center justify-center" onClick={() => setOpenModel(false)}>
            <IoCloseCircleOutline color="black"  size={20} />
          </button>
        <CardHeader>
          <CardTitle>Ajouter un Produit</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du produit</Label>
              <Input required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea rows={3} />
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

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Ajout en cours..." : "Ajouter le Produit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddProductPopUp;
