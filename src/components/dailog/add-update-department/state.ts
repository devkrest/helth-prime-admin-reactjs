import { IUserModel } from "@/model/user_model";
import { create } from "zustand";

interface IAddUpdateDepartmentDailog {
  isLoading: boolean;
  isFetching: boolean;
  setIsLoading: (v: boolean) => void;
  setIsFetching: (v: boolean) => void;
  users: IUserModel[];
  setUsers: (v: IUserModel[]) => void;
}

export const useAddUpdateDepartmentDailogState =
  create<IAddUpdateDepartmentDailog>((set) => ({
    isFetching: true,
    users: [],
    isLoading: false,
    setIsLoading: (isLoading) => set((p) => ({ ...p, isLoading })),
    setIsFetching: (isFetching) => set((p) => ({ ...p, isFetching })),
    setUsers: (users) => set((p) => ({ ...p, users })),
  }));
