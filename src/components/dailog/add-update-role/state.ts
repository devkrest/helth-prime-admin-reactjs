import { create } from "zustand";

interface IAddUpdateRoleDailog {
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
}

export const useAddUpdateRoleDailogState = create<IAddUpdateRoleDailog>(
  (set) => ({
    isLoading: false,

    setIsLoading: (isLoading) => set((p) => ({ ...p, isLoading })),
  })
);
