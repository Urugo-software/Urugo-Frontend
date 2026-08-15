import api from "@/lib/axios";
import { LoginProps } from "@/types";
import { AxiosError } from "axios";

export function AxiosErrorHandler(error: unknown) {
  if (error instanceof AxiosError) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  } else {
    throw new Error("An unexpected error occurred.");
  }
}

export async function loginUserService({
  email_phone,
  username,
  password,
}: LoginProps) {
  try {
    const { data } = await api.post("/public/auth/login", {
      email_phone,
      username,
      password,
    });
    return data;
  } catch (error) {
    AxiosErrorHandler(error);
  }
}
