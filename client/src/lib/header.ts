import { AUTH_TOKEN } from "./utils";

export const getHeaders = async (
  authToken?: string,
  isFormData: boolean = false
): Promise<Record<string, string>> => {
  const apiKey = import.meta.env.VITE_API_KEY;

  const _token = localStorage.getItem(AUTH_TOKEN);
  const token =
    authToken == null ? (_token != null ? _token : undefined) : authToken;

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
    ...(apiKey && { "X-Api-Key": apiKey }),
    ...(!isFormData && {
      "Content-Type": "application/json",
    }),
  };

  return headers;
};
