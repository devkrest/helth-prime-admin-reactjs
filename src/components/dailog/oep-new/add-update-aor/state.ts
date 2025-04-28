import { create } from "zustand";

interface IAddUpdateAorDailog {
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
}

export const useAddUpdateAorDailogState =
  create<IAddUpdateAorDailog>((set) => ({
    isLoading: false,
    setIsLoading: (isLoading) => set((p) => ({ ...p, isLoading })),
   
  }));
