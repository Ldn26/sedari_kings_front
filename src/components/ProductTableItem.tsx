import { Trash2, Edit3 } from "lucide-react"; // Added Edit3 icon
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import GetProductPopUp from "./GetProductPopUp";
import { useState } from "react";

function ProductTableItem({ product }) {
  const [openModel , setOpenModel] = useState(false);
  return (
    <>
      {openModel && (
        <GetProductPopUp setOpenModel={setOpenModel} id={product.id} />
      )}
      <button
        onClick={() => setOpenModel(true)}
        className="w-full  transition-all"
        key={product.id}
      >
        <Card className="w-full hover:bg-gray-100  transition-all animate-fade-in-up">
          <CardContent className="flex    flex-row items-center sm:justify-between p-2 gap-2">
            {/* Image */}
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <img
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-1  flex-row sm:items-center sm:justify-between gap-2 w-full">
              <h3 className="flex-1  sm:w-1/5 font-semibold text-sm sm:text-base">
                {product.name}
              </h3>
              <p className="flex-1 hidden sm:block sm:w-1/5 text-muted-foreground text-xs sm:text-sm">
                {product.category}
              </p>
              <p className="flex-1 sm:w-1/5 text-accent   text-center sm:text-start font-bold text-xs sm:text-sm">
                {product.price.toFixed(2)} €
              </p>
              <p className="flex-1 hidden sm:block sm:w-1/5 text-muted-foreground text-xs sm:text-sm">
                {product.quantity}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  // onClick={() => deleteProduct(product.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  // onClick={() => editProduct(product.id)}
                  className="text-primary hover:text-primary"
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </button>
    </>
  );
}

export default ProductTableItem;
