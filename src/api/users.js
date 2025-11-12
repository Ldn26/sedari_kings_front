import api from "../api/axiosIntercepter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useUsersNumber = () => {
  const { data, isLoading, refetch, isSuccess } = useQuery({
    queryKey: ["users"],

    
    queryFn: async () => {
      const res = await api.get("/users_nbr", {});
      return res.data;
    },
  });
  return {
    data,
    isLoading,
    refetch,
    isSuccess,
  };
};


