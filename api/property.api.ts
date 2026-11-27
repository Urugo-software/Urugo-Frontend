import api, { AxiosErrorHandler } from "@/lib/axios";

export interface PublicPropertyListParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: "rent" | "newest";
  sortOrder?: "asc" | "desc";
  district?: string;
  city?: string;
  province?: string;
  sector?: string;
  property_type?: string;
  bedrooms?: number;
  minBedrooms?: number;
  bathrooms?: number;
  minRent?: number;
  maxRent?: number;
  hasParking?: boolean;
  hasWifi?: boolean;
  securityIncluded?: boolean;
  includesWater?: boolean;
  includesElectricity?: boolean;
}

export interface BackendPublicProperty {
  id: string;
  title?: string;
  address: string;
  city?: string;
  province?: string;
  district: string;
  sector?: string | null;
  bedrooms?: number;
  bathrooms?: number;
  hasParking?: boolean;
  hasWifi?: boolean;
  securityIncluded?: boolean;
  includesWater?: boolean;
  includesElectricity?: boolean;
  monthlyRent: number;
  initialPaymentMonths?: number;
  initialPaymentPrice?: number;
  property_type: string;
  property_photos: string[];
  amenities?: string[];
  status: string;
  description?: string | null;
  contact?: {
    landlord?: {
      name: string;
      phoneNumber: string | null;
    };
    agent?: {
      name: string;
      phoneNumber: string | null;
    };
  };
}

export interface PublicPropertiesResponse {
  success: boolean;
  message: string;
  data: {
    properties: BackendPublicProperty[];
    totalProperties: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface PublicPropertyDetailResponse {
  success: boolean;
  message: string;
  data: BackendPublicProperty;
}

const SERVER_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

/** Server rendered property route request with its existing 400/404 semantics. */
export async function fetchPublicPropertyPageById(
  id: string,
): Promise<BackendPublicProperty | null> {
  const response = await fetch(
    `${SERVER_API_BASE_URL}/api/property/${encodeURIComponent(id)}`,
    { cache: "no-store" },
  );
  if (response.status === 404 || response.status === 400) return null;
  if (!response.ok) {
    throw new Error(`Failed to fetch property (${response.status})`);
  }
  const json = (await response.json()) as { data?: BackendPublicProperty };
  return json.data ?? null;
}

/** Related properties are optional for the detail page, so failures return an empty list. */
export async function fetchRelatedPublicProperties(
  district: string,
): Promise<BackendPublicProperty[]> {
  try {
    const params = new URLSearchParams({ district, limit: "4" });
    const response = await fetch(
      `${SERVER_API_BASE_URL}/api/properties?${params.toString()}`,
      { cache: "no-store" },
    );
    if (!response.ok) return [];
    const json = (await response.json()) as {
      data?: { properties?: BackendPublicProperty[] };
    };
    return json.data?.properties ?? [];
  } catch {
    return [];
  }
}

export async function getFeaturedProperties() {
  try {
    const { data } = await api.get("/api/featured-properties");

    return data;
  } catch (error) {
    AxiosErrorHandler(error);
  }
}

export async function getPublicProperties(
  params: PublicPropertyListParams = {},
): Promise<PublicPropertiesResponse | undefined> {
  try {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(
        ([, value]) => value !== undefined && value !== "",
      ),
    );
    const { data } = await api.get<PublicPropertiesResponse>("/api/properties", {
      params: cleanParams,
    });
    return data;
  } catch (error) {
    AxiosErrorHandler(error);
  }
}

export async function getPublicPropertyById(
  id: string,
): Promise<PublicPropertyDetailResponse | undefined> {
  try {
    const { data } = await api.get<PublicPropertyDetailResponse>(
      `/api/property/${encodeURIComponent(id)}`,
    );
    return data;
  } catch (error) {
    AxiosErrorHandler(error);
  }
}

export async function submitPropertyInquiry(
  propertyId: string,
  payload: { name: string; phone: string; email: string; message: string },
) {
  try {
    const { data } = await api.post(
      `/api/properties/${encodeURIComponent(propertyId)}/inquiries`,
      payload,
    );
    return data;
  } catch (error) {
    AxiosErrorHandler(error);
  }
}

export async function submitPublicViewingRequest(
  propertyId: string,
  payload: {
    name: string;
    phone: string;
    email: string;
    preferredDate: string;
    preferredTime: string;
    note?: string;
  },
) {
  try {
    const { data } = await api.post(
      `/api/properties/${encodeURIComponent(propertyId)}/viewing-requests`,
      payload,
    );
    return data;
  } catch (error) {
    AxiosErrorHandler(error);
  }
}

export async function subscribeNewsletter(email: string) {
  try {
    const { data } = await api.post("/api/newsletter/subscribe", { email });
    return data;
  } catch (error) {
    AxiosErrorHandler(error);
  }
}

export interface PublicAssistantHistoryMessage {
  role: "user" | "assistant";
  content: string;
}

export async function askPublicAssistant(
  message: string,
  conversationHistory: PublicAssistantHistoryMessage[] = [],
) {
  try {
    const { data } = await api.post("/api/public/assistant", {
      message,
      conversationHistory,
    });
    return data;
  } catch (error) {
    AxiosErrorHandler(error);
  }
}
