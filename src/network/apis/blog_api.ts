import { IBlogModel } from "@/model/blog_model";
import { URLs } from "../apis.endpoints";
import { API_GET, API_POST } from "../axios.services";

export const api_create_blog = async (data: any) => {
  const res = await API_POST<null>({
    url: data.get("id") ? URLs.blogUpdate : URLs.blogCreate,
    data: data,
  });
  return res;
};
export const api_blog_upload_file = async (data: any) => {
  const res = await API_POST<string>({
    url: URLs.blogUploadMedia,
    data: data,
  });
  return res;
};

export const api_list_blog = async (data: any) => {
  const res = await API_GET<IBlogModel[]>({
    url: URLs.blogGetList,
    params: data,
  });

  return res;
};

export const api_get_by_id_blog = async (data: any) => {
  const res = await API_GET<IBlogModel>({
    url: URLs.blogGetById,
    params: data,
  });

  return res;
};
