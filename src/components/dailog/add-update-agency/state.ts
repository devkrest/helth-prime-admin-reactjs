import { create } from "zustand";

interface IAddUpdateAgencyDailog {
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
}

export const useAddUpdateAgencyDailogState = create<IAddUpdateAgencyDailog>(
  (set) => ({
    isLoading: false,
    setIsLoading: (isLoading) => set((p) => ({ ...p, isLoading })),
  })
);
