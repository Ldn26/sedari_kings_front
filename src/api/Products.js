import api from "../api/axiosIntercepter"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

 


   
export const useProducts = () => {
  const {
    data: products,
    isLoading,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await api.get("/products", {});
      return res.data;
    },
  });

  return {
    products,
    isLoading,
    refetch,
    isSuccess,
  };
};




    export const useProduct = (id) => {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await api.get(`/product/${id}`);
      return res.data.product;
    },
    enabled: !!id, // prevents running when id is undefined or null
  });

  return {
    data,
    isLoading,
    isError,
    error
  };
};

  
 
export  const useProductNumber = ()=>{
     const { data , isLoading, refetch , isSuccess } = useQuery({
      queryKey: ["products"],
      queryFn: async () => {
        const res = await api.get("/product_nbr", {});
        return res.data;
      },
    }
  
  )
  return  {
 data,
 isLoading,
 refetch,
 isSuccess ,   
}
}




 
   export const useEditProduct = () => {
     const queryClient = useQueryClient();
     const mutation = useMutation({
       mutationFn: async ({productId, productData}) => {
        console.log("product data from the mutation")
        console.log(productData);
        if(!productId){
          throw new Error("Product ID is required");
        }
        if(!productData.name == undefined || !productData.price == undefined  || !productData.category == undefined  , !productData.description == undefined  ){
          throw new Error("All product fields are required");
        }
         const res = await api.patch(`product/${productId}`, productData);
         console.log(res.data)
         return res.data;
       },
       onSuccess: () => {
         queryClient.invalidateQueries(["products"]);
         queryClient.invalidateQueries(["product", id]);
       },
     });

     return {
       updateProduct: mutation.mutate,
       data: mutation.data,
       isLoading: mutation.isLoading,
       isError: mutation.isError,
       error: mutation.error,
       isSuccess: mutation.isSuccess,
     };
   };

     

  



  export const useCreateProduct  = () => {
      const queryClient = useQueryClient();
const mutation = useMutation({
    mutationFn: async (productData) => {
      const res = await api.post(`/product`, productData);
      return res.data.product;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    }})
  
    return {
      createProduct: mutation.mutate,
      data: mutation.data,
      isLoading: mutation.isLoading,
      isError: mutation.isError,
      error: mutation.error,
      isSuccess: mutation.isSuccess,
    }
  }




 
 
 
 

  
     







export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/product/${id}`);
      return res.data; // return data from API
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries(["products"]);
      queryClient.invalidateQueries(["product", id]);
    },
  });

  return {
    deleteProduct: mutation.mutate, // function to call
    data: mutation.data,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};












// useFilterProduct  by name and cate
export const useFilterProduct = ({
  name = "",
  category = "all",
  page = 1,
  limit = 10,
}) => {
  const query = useQuery({
    queryKey: ["products", name, category, page, limit],
    queryFn: async () => {
      const params = { page, limit };
      if (name) params.name = name;
      if (category && category !== "all") params.category = category;

      const res = await api.get("/products/filter", { params });
      return res.data; // { products, total, page, totalPages }
    },
    keepPreviousData: true, // useful for pagination
  });

  return {
    products: query.data?.products || [],
    total: query.data?.total || 0,
    totalPages: query.data?.totalPages || 1,
    page: query.data?.page || 1,
    isLoading: query.isLoading,
    refetch: query.refetch,
    isSuccess: query.isSuccess,
  };
};