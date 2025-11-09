import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { IoCloseCircleOutline } from "react-icons/io5";
import Loader from "../components/Loader";
import { useProduct, useDeleteProduct, useEditProduct } from "../api/Products";
import { useToast } from "@/hooks/use-toast";
import  categories  from "../data/categories";


function GetProductPopUp({
  setOpenModel,
  id,
  deleteProduct,
  DeleteLoader,
  allowEdit,
}: {
  setOpenModel: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  deleteProduct: ReturnType<typeof useDeleteProduct>;
  DeleteLoader: boolean;
  allowEdit :boolean;
}) {
  const {
    isSuccess,
    updateProduct,
    isError: EditIsError,
    isLoading: EditLoading,
  } = useEditProduct();
  const { toast } = useToast();
  const handelEdit = (productId: number) => {
    if (!formData.name || !formData.desc || !formData.category) {
      toast({
        variant: "destructive",
        title: "Veuillez remplir tous les champs obligatoires.",
      });
      return;
    }
    updateProduct({ productId, productData: formData });
    setCanEdit(false);
    if (isSuccess) {
      toast({
        title: "Produit modifié avec succès !",
        description: "Les modifications ont été enregistrées.",
      });
    }
    if (EditIsError) {
      toast({
        variant: "destructive",
        title: "Erreur lors de la modification du produit.",
        description: "Veuillez réessayer plus tard.",
      });
    }
    setOpenModel(false);
  };

  const { data: product, isLoading, isError } = useProduct(id);
  const [canEdit, setCanEdit] = useState(false);

useEffect(() => {
   if (allowEdit) {
     setCanEdit(true);
     setOpenModel(true);
   }
} , []);

  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    price: 0,
    quantity: 0,
    category: "",
  });

  useEffect(() => {
    console.log(product);
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
              <select
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                disabled={!canEdit}
                className="w-full border rounded-md px-3 py-2 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Sélectionnez une catégorie
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">URL de l'image</Label>
              <Input placeholder="https://..." />
            </div>

            <div className="flex flex-col lg:flex-row justify-between gap-8">
              {!canEdit ? (
                <div
                  className="w-full bg-primary  cursor-pointer p-2 text-white  rounded-xl flex items-center justify-center hover:scale-105 transition-all"
                  onClick={() => {
                    setCanEdit(true);
                  }}
                  // disabled={isLoading}
                >
                  Editer le Produit
                </div>
              ) : (
                <div
                  className="w-full bg-green-700  cursor-pointer  p-2 text-white  rounded-xl flex items-center justify-center hover:scale-105 transition-all"
                  onClick={() => handelEdit(product.id)}
                  // disabled={isLoading}
                >
                  {EditLoading ? "Modification en cours..." : "Sauvegarder "}
                </div>
              )}

              <div
                className={`w-full bg-red-700        p-2 text-white ${
                  DeleteLoader
                    ? " opacity-50 cursor-not-allowed"
                    : "cursor-pointer opacity-100 "
                } rounded-xl flex items-center justify-center hover:scale-105 transition-all`}
                onClick={() => deleteProduct(id)}
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
