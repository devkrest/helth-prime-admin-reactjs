import { IBlogModel } from "@/model/blog_model";
import { create } from "zustand";

interface IBlogSchema {
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
  blog: IBlogModel[];
  setBlog: (v: IBlogModel[]) => void;
}

export const useAddUpdateBlogState = create<IBlogSchema>((set) => ({
  blog: [],
  isLoading: false,
  setIsLoading: (isLoading) => set((p) => ({ ...p, isLoading })),
  setBlog: (blog) => set((p) => ({ ...p, blog })),
}));
