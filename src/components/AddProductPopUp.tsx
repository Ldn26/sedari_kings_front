import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useCreateProduct } from "../api/Products";
import categories from "../data/categories";
import { useToast } from "@/hooks/use-toast";

function AddProductPopUp({
  setOpenModel,
}: {
  setOpenModel: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { createProduct, isLoading } = useCreateProduct();
  const { toast } = useToast();
  







  const [formData, setFormData] = useState<{
    name: string;
    desc: string;
    price: string;
    category: string;
    quantity: string;
    images: File[];
  }>({
    name: "",
    desc: "",
    price: "",
    category: "tables",
    quantity: "",
    images: [],
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);


  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newFiles],
    }));
  };

  useEffect(() => {
    const urls = formData.images.map((file) => URL.createObjectURL(file));
    setPreviewImages(urls);

    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [formData.images]);


  const handleAddProduct = () => {
    if (
      !formData.name ||
      !formData.price ||
      !formData.category ||
      !formData.quantity
    ) {
      return toast({
        variant: "destructive",
        title: "Tous les champs obligatoires doivent être remplis",
        description: "Veuillez remplir tous les champs obligatoires.",
      });
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("desc", formData.desc);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("quantity", formData.quantity);

    formData.images.forEach((file) => {
      data.append("images", file); // key must match backend multer array
    });

    createProduct(data);

    toast({
      variant: "default",
      title: "Produit ajouté avec succès !",
      description: "Le produit a été ajouté à l'inventaire.",
    });

    setOpenModel(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0  bg-black/50"></div>
      {/* Centered Card */}
      <Card className="relative animate-fade-in-up w-full    max-w-md mx-4 ">
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
            {/* Name */}
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

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                value={formData.desc}
                onChange={(e) =>
                  setFormData({ ...formData, desc: e.target.value })
                }
                rows={3}
              />
            </div>

            {/* Price & Quantity */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Prix (€)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
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

            {/* Images */}
            <div className="space-y-2">
              <Label htmlFor="images">Images du produit</Label>
              <input
                type="file"
                id="images"
                accept="image/*"
                multiple
                onChange={handleImagesChange}
                className="w-full border rounded-md px-3 py-2 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {previewImages.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {previewImages.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`Preview ${idx}`}
                      className="w-24 h-24 object-cover rounded"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <div
              onClick={handleAddProduct}
              className={`w-full flex items-center justify-center p-2 rounded-xl bg-primary ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "opacity-100 cursor-pointer"
              } text-white`}
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
