import React, { useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const { createProduct, isLoading, isError, data, error, isSuccess } =
    useCreateProduct();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    price: "",
    category: "tables",
    quantity: "",
    images: [] as string[], // now an array
  });
  // Save multiple images
  const saveImagesToFormData = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const img = new Image();
      img.src = URL.createObjectURL(file);

      await new Promise<void>((resolve) => {
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Resize logic
          const maxWidth = 800;
          const maxHeight = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height = (height * maxWidth) / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = (width * maxHeight) / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);

          // Convert to WebP & remove metadata
          const optimizedImage = canvas.toDataURL("image/webp", 0.7);

          console.log(
            "Optimized image size:",
            (optimizedImage.length / 1024).toFixed(2),
            "KB"
          );

          newImages.push(optimizedImage);
          resolve();
        };
      });
    }

    setFormData({ ...formData, images: [...formData.images, ...newImages] });
  };

  // Handle Add Product
  const handelAddProduct = () => { 
    console.log("the fornData ");
    console.log(formData);
    if (
      !formData.name ||
      !formData.price ||
      !formData.category ||
      !formData.quantity
    )
      return toast({
        variant: "destructive",
        title: "Tous les champs obligatoires doivent être remplis",
        description: "Veuillez remplir tous les champs obligatoires.",
      });
     

    createProduct({
      name: formData.name,
      desc: formData.desc,
      price: parseFloat(formData.price),
      category: formData.category,
      quantity: parseInt(formData.quantity, 10),
      imageUrl: formData.images, // send the array
    });

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
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Centered Card */}
      <Card className="relative animate-fade-in-up w-full max-w-md mx-2">
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
              <select
                id="category"
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

            <div className="space-y-2">
              <Label htmlFor="image">Images du produit</Label>
              <input
                type="file"
                id="images"
                accept="image/*"
                capture="environment"
                multiple
                onChange={(e) => saveImagesToFormData(e)}
                className="w-full border rounded-md px-3 py-2 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formData.images.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Preview ${idx}`}
                      className="w-24 h-24 object-cover rounded"
                    />
                  ))}
                </div>
              )}
            </div>

            <div
              onClick={handelAddProduct}
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
