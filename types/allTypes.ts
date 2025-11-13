type ProductType = {
  id: number;
  name: string;
  price: number;
  category: string;
  desc: string; // match API field
  quantity: string | number;
  createdAt?: string;
  imageUrl: string[]  | null;
  updatedAt?: string;
  height?: number | null;
  width?: number | null;
};

export default ProductType;
