import api, { AxiosErrorHandler } from "@/lib/axios";

export async function getFeaturedProperties() {
  try {
    const { data } = await api.get("/api/featured-properties");

    return data;
  } catch (error) {
    AxiosErrorHandler(error);
  }
}
