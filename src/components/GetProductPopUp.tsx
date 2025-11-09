import React, { useState, useEffect } from "react";
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
import { Loader } from "lucide-react";
import { useProduct, useDeleteProduct } from "../api/Products";

function GetProductPopUp({
  setOpenModel,
  id,
}: {
  setOpenModel: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) {
  const {
    deleteProduct,
    data: deleteData,
    isLoading: DeleteLoader,
    isError: DeleteIsError,
    error: DeleteError,
  } = useDeleteProduct();

  const { data: product, isLoading, isError, error } = useProduct(id);

  const [canEdit, setCanEdit] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    price: 0,
    quantity: 0,
    category: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({ 
        name: product.name,
        desc: product.desc,
        price: product.price,
        quantity: product.quantity,
        category: product.category,
      });
    }
  }, [product]);


  if (isLoading) return <Loader />;
  if (isError) return <div>Erreur lors du chargement du produit.</div>;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
      {/* Centered Card */}
      <Card className="relative animate-fade-in-up w-full max-w-3xl mx-2">
        <button
          className="flex absolute right-4 top-2 hover:scale-105 transition-all items-center justify-center"
          onClick={() => setOpenModel(false)}
        >
          <IoCloseCircleOutline color="black" size={20} />
        </button>
        <CardHeader>
          <CardTitle>Produit Details</CardTitle>
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
                disabled={!canEdit}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                value={formData.desc}
                onChange={(e) =>
                  setFormData({ ...formData, desc: e.target.value })
                }
                rows={3}
                disabled={!canEdit}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Prix (€)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: parseFloat(e.target.value),
                    })
                  }
                  disabled={!canEdit}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      quantity: parseInt(e.target.value),
                    })
                  }
                  disabled={!canEdit}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              {canEdit ? (
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tables">Tables</SelectItem>
                    <SelectItem value="chaises">Chaises</SelectItem>
                    <SelectItem value="meubles">Meubles</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Input value={product.category} disabled />
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">URL de l'image</Label>
              <Input placeholder="https://..." />
            </div>

            <div className="flex flex-col lg:flex-row justify-between gap-8">
              {!canEdit ? (
                <div
                  className="w-full bg-primary  p-2 text-white  rounded-xl flex items-center justify-center hover:scale-105 transition-all"
                  onClick={() => {
                    setCanEdit(true);
                  }}
                  // disabled={isLoading}
                >
                  Editer le Produit
                </div>
              ) : (
                <div
                  className="w-full bg-primary  p-2 text-white  rounded-xl flex items-center justify-center hover:scale-105 transition-all"
                  // onClick={handelEdit(product.id)}
                  // disabled={isLoading}
                >
                  Save changes
                </div>
              )}

              <div
                className="w-full bg-primary  p-2 text-white  rounded-xl flex items-center justify-center hover:scale-105 transition-all"
                onClick={() => deleteProduct(id)}
                // disabled={DeleteLoader}
              >
                {DeleteLoader
                  ? "Supprision en cours..."
                  : "Supprimer le Produit"}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default GetProductPopUp;
