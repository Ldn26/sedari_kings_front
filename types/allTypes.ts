type ProductType = {
  id: number;
  name: string;
  price: number;
  category: string;
  desc: string; // match API field
  quantity:  number;
  createdAt?: string;
  imageUrl: string[]  | null;
  updatedAt?: string;
  height?: number | null;
  width?: number | null;
};

export default ProductType;


export type OrderType = {
  id?: number;
  user_id: number;
  phoneNbr: string;
  status?: string;
  Products: 
  { id: number , 
    OrderProduct : { quantity : number }
    ,category :string , name :string ,price :number }[];
  createdAt?: string;
  updatedAt?: string; 
  User ?: {id: number, name: string, email: string}
 
};



export type CreateOrderProduct = {
  user_id: number;
  phoneNbr: string;
  products: { product_id: number ; quantity : number }[]; }


