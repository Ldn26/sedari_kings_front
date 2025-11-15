import { Trash2, Edit3 } from "lucide-react"; // Added Edit3 icon
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import GetProductPopUp from "./GetProductPopUp";
import { useState } from "react";
import { useDeleteProduct } from "../api/Products";


function ProductTableItem({ product }) {
  const [openModel , setOpenModel] = useState(false);
    const {
      deleteProduct,
      isLoading: DeleteLoader,
      } = useDeleteProduct(); 
      const [allowEdit, setAllowEdit] = useState(false);

     const custumDeleteProduct = (id : number) => {
       setOpenModel(false);
      deleteProduct(id);
      setAllowEdit(false);
     }

  return (
    <>
      {openModel && (
        <GetProductPopUp
          allowEdit={allowEdit}
          deleteProduct={deleteProduct}
          setOpenModel={setOpenModel}
          id={product.id}
          DeleteLoader={DeleteLoader}
        />
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
                // src={product.imageUrl[0] || "/placeholder.svg"}
                src={
                  product.imageUrl && product.imageUrl.length > 0
                    ? product.imageUrl[0]
                    : "/placeholder.svg"
                }
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="flex flex-1  flex-row sm:items-center sm:justify-between gap-2 w-full">
              <h3 className="flex-1  sm:w-1/5 font-semibold  overflow-hidden  text-sm sm:text-base">
                {product.name}
              </h3>
              <p className="flex-1 hidden sm:block sm:w-1/5 text-muted-foreground text-xs sm:text-sm">
                {product.category}
              </p>
              <p className="flex-1    hidden sm:block sm:w-1/5 text-accent   text-center sm:text-start font-bold text-xs sm:text-sm">
                {product.price.toFixed(2)} €
              </p>
              <p className="flex-1 hidden sm:block sm:w-1/5 text-muted-foreground text-xs sm:text-sm">
                {product.quantity}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <div
                  // variant="ghost"
                  // size="icon"
                  onClick={(e) => {
                    e.stopPropagation();

                    custumDeleteProduct(product.id);
                  }}
                  className="text-destructive    hover:scale-110 transition-all bg-gray-100 flex items-center justify-center rounded-md p-1  border hover:text-destructive"
                >
                  <Trash2 className="h-6 w-6   " />
                </div>

                <div
                  // variant="ghost"
                  // size="icon"
                  onClick={() => setAllowEdit(true)}
                  className="text-primary    hover:scale-110 transition-all bg-gray-100 flex items-center justify-center rounded-md p-1  border hover:text-primary"
                >
                  <Edit3 className="h-6 w-6" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </button>
    </>
  );
}

export default ProductTableItem;
