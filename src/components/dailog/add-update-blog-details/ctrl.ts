import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddUpdateBlogDailogState } from "./state";
import { toast } from "sonner";
import { api_create_blog } from "@/network/apis/blog_api";
import { createSlug } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { IBlogModel } from "@/model/blog_model";
import { useEffect } from "react";
import { api_all_user_list } from "@/network/apis/user_api";
import imageCompression from "browser-image-compression";
import { format } from "date-fns";

export const blogAddUpdateFormSchema = z.object({
  title: z.string({ required_error: "Title is required." }).min(2, {
    message: "Title must be at least 1 characters.",
  }),
  category: z.string({ required_error: "Category is required." }).min(2, {
    message: "Category must be at least 1 characters.",
  }),
  description: z.string({ required_error: "Description is required." }).min(2, {
    message: "Description must be at least 1 characters.",
  }),
  alt: z.string(),
  display_date: z.date({required_error:"Select a display date of the blog."}),
  create_by: z.string({ required_error: "Create by is required." }),
  status: z.string({ required_error: "Blog status is required." }),
  keyword: z
    .array(
      z.object({
        id: z.string(),
        text: z.string(),
      }),
      { required_error: "Please add keyword" }
    )
    .refine((v) => v.length, { message: "Please add keyword" }),
  file: z.instanceof(File).optional(),
});

export const useAddBlogDailogCtrl = ({
  onClose,
  blog,
  htmlContent,
}: {
  onClose: (v: boolean) => void;
  blog?: IBlogModel;
  htmlContent: string;
}) => {
  const {
    isLoading,
    setIsLoading,
    isFetching,
    setIsFetching,
    setUsers,
    users,
  } = useAddUpdateBlogDailogState();

  const navigator = useNavigate();

  const form = useForm<z.infer<typeof blogAddUpdateFormSchema>>({
    resolver: zodResolver(blogAddUpdateFormSchema),
    defaultValues: {
      title: blog?.title ?? "",
      category: blog?.category ?? "",
      create_by: blog?.create_by ? "" + blog?.create_by : undefined,
      description: blog?.description ?? "",
      alt: blog?.alt ?? "",
      keyword: blog?.keyword ?? [],
      file: undefined,
      status: blog?.status ? `${blog?.status}` : "0",
      display_date:blog?.display_date ? new Date(blog?.display_date) : new Date()
    },
    //  shouldUnregister: false,
  });

  const onSubmit = async (values: z.infer<typeof blogAddUpdateFormSchema>) => {
    //console.log(values);

    if (!values.file && !blog?.cover_photo) {
      return toast("Please select cover photo");
    }
    setIsLoading(true);

    const f = new FormData();
    f.append("title", values.title);
    f.append("category", values.category);
    f.append("description", values.description);
    f.append("keyword", JSON.stringify(values.keyword));
    f.append("status",values.status);
    f.append("alt",values.alt);
    f.append("display_date",format(values.display_date,"yyyy-MM-dd"));
    f.append("create_by", values.create_by);
    if (values.file) {
      const options = {
        maxSizeMB: 1.8,
        //maxWidthOrHeight: 2656,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(values.file, options);
        //console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
        //console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

        f.append("file", compressedFile, compressedFile.name);

        // await uploadToServer(compressedFile); // write your own logic
      } catch (error) {
        console.log(error);
      }
    }

    f.append("html", htmlContent);
    f.append("slug", createSlug(values.title));

    if (blog) {
      f.append("id", blog.id + "");
    }
    const res = await api_create_blog(f);

    if (res.s) {
      onClose(true);
      navigator("/blog");
    } else {
      toast(res?.m ?? "Opps! something went wrong. Please try again.");
    }

    setIsLoading(false);
  };

  const getUsers = async () => {
    setIsFetching(true);
    const res = await api_all_user_list();
    setUsers(res?.r ?? []);
    setIsFetching(false);
    return res.r;
  };

  useEffect(() => {
    getUsers();
  }, []);

  return {
    form,
    isLoading,
    onSubmit,
    isFetching,
    users,
  };
};
