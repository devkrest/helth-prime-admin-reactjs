import { useEffect } from "react";
import { useAddUpdateBlogState } from "./state";
import { api_list_blog } from "@/network/apis/blog_api";

export const useBlogCtrl = () => {
  const ctrl = useAddUpdateBlogState();

  const getBlogList = async ({ skip }: { skip: number }) => {
    ctrl.setIsLoading(true);

    const res = await api_list_blog({ skip });

    if (res && res.s && res.r) {
      if (skip > 0) {
        ctrl.setBlog([...ctrl.blog, ...res.r]);
      } else {
        ctrl.setBlog(res.r);
      }
    }

    ctrl.setIsLoading(false);
  };

  useEffect(() => {
    getBlogList({ skip: 0 });
  }, []);

  return {
    ...ctrl,
    getBlogList,
  };
};
