import axios, { AxiosError } from "axios";
import { URLs, apiBaseUrl } from "./apis.endpoints";
import IBaseModal from "../model/base_model";
import { IUserModel } from "../model/user_model";
import { toast } from "sonner";
import { LocalStorageUserStore } from "@/lib/const-value";

const api = axios.create({ baseURL: apiBaseUrl });

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    let isLogin = null;
    try {
      isLogin = JSON.parse(originalRequest?.data).isLogin;
    } catch (e) {}

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response?.status === 401 && originalRequest && !isLogin) {
      try {
        const user = localStorage.getItem(LocalStorageUserStore);
        if (!user) {
          return;
        }
        const parsedUser = JSON.parse(user);
        const refreshToken = parsedUser?.refresh_token;
        // console.log(refreshToken);
        // const id = parsedUser?.id;
        const response = await axios.post<IBaseModal<IUserModel>>(
          URLs.apiBaseUrl + URLs.tokenGenerate,

          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );
        const { r } = response.data;
        //console.log('Come here to ...');

        localStorage.setItem(LocalStorageUserStore, JSON.stringify(r));

        // Retry the original request with the new token
        setToken();
        originalRequest.headers.Authorization = `Bearer ${r?.token}`;
        return axios(originalRequest);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          //  console.log('EE==>', JSON.stringify(error.response?.data));
          if (error?.response?.status === 401) {
            localStorage.clear();
            toast("Your session is expired.");
            window.location.reload();
          }
        }
        return Promise.reject(error);
        // Handle refresh token error or redirect to login
      }
    }

    if (!error.response) {
      toast("Please check you internet connection.");
    } else if (error?.response?.status === 401 && isLogin) {
      const m = (error.response.data as any)?.m ?? "";
      toast(m);
    } else if (error?.response?.status === 400) {
      // console.log(JSON.stringify(error.response.data));
      const m = (error.response.data as any)?.m ?? "";
      toast(m ?? "You missed some filed to fill.");
    } else if (error?.response?.status === 500) {
      const m = (error.response.data as any)?.m ?? "";
      toast(m ?? "Opps! something went wrong. Please try again.");
    }

    return Promise.reject(error);
  }
);

export const API_POST = async <T>({
  url,
  data,
}: {
  url: string;
  data: any;
}): Promise<IBaseModal<T>> => {
  try {
    setToken();
    
    const { data: res, status } = await api.post<IBaseModal<T>>(url, data, {
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });

    console.log("DATA ==>", res, "STATUS ==>", status);

    if (!res.s) {
      toast(res.m);
    }
    return res;
  } catch (e: any) {
    console.log("ERRORR ==>", JSON.stringify(e.response.data));
    return { s: 0, m: "Opps! something went wrong.", r: null, error: null };
  }
};

export const API_GET = async <T>({
  url,
  params,
}: {
  url: string;
  params: any;
}): Promise<IBaseModal<T>> => {
  try {
    setToken();
    const { data: res, status } = await api.get<IBaseModal<T>>(url, {
      params: params,
    });

    console.log("DATA ==>", res, "STATUS ==>", status);

    if (!res.s) {
      toast(res.m);
    }
    return res;
  } catch (e) {
    // if (axios.isAxiosError(e)) {
    //   if (e.response) {
    //     const {data, status} = e.response;
    //     console.log(data, status);
    //     if (status === 400) {
    //       notifyMessage('You missed some filed to fill.');
    //     }
    //     return data;
    //   }
    // }
    console.log("ERRORRR ==>", e);
    return { s: 0, m: "Opps! something went wrong.", r: null, error: null };
  }
};

export const setToken = () => {
  const user = localStorage.getItem(LocalStorageUserStore);
  if (!user) {
    return;
  }
  const parsedUser = JSON.parse(user);
  const token = parsedUser?.token;
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// export function addToFormData(
//   formData: FormData,
//   fields: Record<string, string | Blob>,
// ): FormData {
//   console.log(fields);
//   for (const [key, value] of Object.entries(fields)) {
//     formData.append(key, value);
//   }
//   return formData;
// }
