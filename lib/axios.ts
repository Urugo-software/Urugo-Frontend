import axios, { AxiosError } from "axios";

// error handler
export function AxiosErrorHandler(error: unknown) {
  if (error instanceof AxiosError) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  } else {
    throw new Error("An unexpected error occurred.");
  }
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});
export default api;
