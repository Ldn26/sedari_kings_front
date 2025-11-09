
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
         (set) => ({
      user: null,
      openPopUp: false,
      setOpenPopUp: (open) => set({ openPopUp: open }),
      
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      accessToken: null,
      SetAccessToken: (token) => set({ accessToken: token }),
      clearAccessToken: () => set({ accessToken: null }),
    }),
    {
      name: "user-storage", // key in localStorage
    }
  )
);

export default useUserStore;
