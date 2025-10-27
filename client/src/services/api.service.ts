import { getHeaders } from "@/lib/header";
import { message } from "antd";
import axios, { type AxiosRequestConfig } from "axios";

interface ApiOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  headers?: Record<string, string>;
}

export const apiRequest = async (
  link: string,
  options: ApiOptions = {},
  isURL = false
) => {
  try {
    const hostURL = import.meta.env.VITE_API_URL || "http://localhost:9000/api";
    const uri = isURL ? link : `${hostURL}${link}`;
    const isFormData = options.body instanceof FormData;
    const defaultHeaders = await getHeaders(undefined, isFormData);

    const axiosConfig: AxiosRequestConfig = {
      url: uri,
      method: options.method || "GET",
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      data: isFormData ? options.body : options.body ? options.body : undefined,
    };

    const response = await axios(axiosConfig);

    if (response.data?.data != null) return response.data.data;

    if (response.data?.success && response.data?.message != null) {
      message.success(response.data.message);
      return true;
    }

    if (response.data?.message != null) message.warning(response.data.message);
    return response.data;
  } catch (error) {
    console.error(error, axios.isAxiosError(error));
    if (axios.isAxiosError(error)) {
      if (error.response?.data?.message) {
        // toast.error(error.response.data.message);
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    }
  }
};
