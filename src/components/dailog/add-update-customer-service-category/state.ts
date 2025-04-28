import { create } from "zustand";

interface IAddUpdateCustomerDailog {
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
}

export const useAddUpdateCustomerDailogState = create<IAddUpdateCustomerDailog>(
  (set) => ({
    isLoading: false,
    setIsLoading: (isLoading) => set((p) => ({ ...p, isLoading })),
  })
);
