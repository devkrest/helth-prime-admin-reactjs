import { create } from "zustand";

interface IAddUpdateModuleDailog {
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
}

export const useAddUpdateModuleDailogState = create<IAddUpdateModuleDailog>(
  (set) => ({
    isLoading: false,

    setIsLoading: (isLoading) => set((p) => ({ ...p, isLoading })),
  })
);
