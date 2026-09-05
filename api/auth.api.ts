import api, { AxiosErrorHandler } from "@/lib/axios";
import { LoginProps } from "@/types";

export async function loginUserService({ identifier, password }: LoginProps) {
  try {
    const { data } = await api.post("/public/auth/login", {
      identifier,
      password,
    });
    return data;
  } catch (error) {
    AxiosErrorHandler(error);
  }
}
