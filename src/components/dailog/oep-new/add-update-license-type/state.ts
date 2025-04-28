import { create } from "zustand";

interface IAddUpdateLicenseTypeDailog {
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
}

export const useAddUpdateLicenseDailogState =
  create<IAddUpdateLicenseTypeDailog>((set) => ({
    isLoading: false,
    setIsLoading: (isLoading) => set((p) => ({ ...p, isLoading })),
   
  }));
