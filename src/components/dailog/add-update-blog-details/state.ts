import { IUserModel } from "@/model/user_model";
import { create } from "zustand";

interface IAddUpdateBlogDailog {
  isLoading: boolean;
  isFetching: boolean;
  setIsLoading: (v: boolean) => void;
  setIsFetching: (v: boolean) => void;
  users: IUserModel[];
  setUsers: (v: IUserModel[]) => void;
}

export const useAddUpdateBlogDailogState =
  create<IAddUpdateBlogDailog>((set) => ({
    isFetching: false,
    users: [],
    isLoading: false,
    setIsLoading: (isLoading) => set((p) => ({ ...p, isLoading })),
    setIsFetching: (isFetching) => set((p) => ({ ...p, isFetching })),
    setUsers: (users) => set((p) => ({ ...p, users })),
  }));
