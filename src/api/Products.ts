import api from "./axiosIntercepter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ProductType from "../../types/allTypes";

export const useProducts = () => {
  const query = useQuery<ProductType[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await api.get("/products");
      return res.data as ProductType[];
    },
  });

  return {
    products: query.data || [],
    isLoading: query.isLoading,
    refetch: query.refetch,
    isSuccess: query.isSuccess,
  };
};

export const useProduct = (id?: number) => {
  const query = useQuery<ProductType>({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await api.get(`/product/${id}`);
      return res.data.product as ProductType;
    },
    enabled: !!id,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
};

export const useProductNumber = () => {
  const query = useQuery<{
    productscount: number; count: number 
}>({
    queryKey: ["productNumber"],
    queryFn: async () => {
      const res = await api.get("/product_nbr");
      return res.data;
    },
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    refetch: query.refetch,
    isSuccess: query.isSuccess,
    isError: query.isError,
  };
};

export const useEditProduct = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    ProductType,
    Error,
    { productId: number; productData: ProductType }
  >({
    mutationFn: async ({ productId, productData }) => {
      if (!productId) throw new Error("Product ID is required");
      if (!productData.name || !productData.price || !productData.category || !productData.desc) {
        throw new Error("All product fields are required");
      }
      const res = await api.patch(`/product/${productId}`, productData);
      return res.data as ProductType;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", variables.productId] });
    },
  });

  return {
    updateProduct: mutation.mutate,
    data: mutation.data,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ProductType, Error, ProductType>({
    mutationFn: async (productData) => {
      const res = await api.post("/product", productData);
      return res.data.product as ProductType;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return {
    createProduct: mutation.mutate,
    data: mutation.data,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ProductType, Error, number>({
    mutationFn: async (id) => {
      const res = await api.delete(`/product/${id}`);
      return res.data as ProductType;
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
    },
  });

  return {
    deleteProduct: mutation.mutate,
    data: mutation.data,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

interface FilterProductParams {
  name?: string;
  category?: string;
  page?: number;
  limit?: number;
}

interface FilterProductResponse {
  products: ProductType[];
  total: number;
  totalPages: number;
  page: number;
}

export const useFilterProduct = ({
  name = "",
  category = "all",
  page = 1,
  limit = 10,
}: FilterProductParams) => {
  const query = useQuery<FilterProductResponse>({
    queryKey: ["products", name, category, page, limit],
    queryFn: async () => {
      const params: Record<string, unknown> = { page, limit };
      if (name) params.name = name;
      if (category && category !== "all") params.category = category;

      const res = await api.get("/products/filter", { params });
      return res.data as FilterProductResponse;
    },
    staleTime: 5000, 
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
