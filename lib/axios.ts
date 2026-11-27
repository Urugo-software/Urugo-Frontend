import axios, {
  AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

// error handler
export function AxiosErrorHandler(error: unknown) {
  if (error instanceof AxiosError) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  } else {
    throw new Error("An unexpected error occurred.");
  }
}

const configuredApiBaseUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080").replace(/\/+$/, "");

const api = axios.create({
  baseURL: configuredApiBaseUrl,
  withCredentials: true,
});

type RetryableAuthRequest = InternalAxiosRequestConfig & { _authRetried?: boolean };

let refreshInFlight: Promise<void> | null = null;

function isProtectedApiRequest(url: string | undefined): boolean {
  return Boolean(url && /^\/api\/(?:auth\/session|auth\/landlord\/plan|admin|landlord|renter|schedules|requests)(?:\/|$)/.test(url));
}

async function refreshSessionOnce(): Promise<void> {
  if (!refreshInFlight) {
    refreshInFlight = axios
      .post(
        `${configuredApiBaseUrl}/api/auth/refresh`,
        {},
        { withCredentials: true },
      )
      .then(() => undefined)
      .finally(() => {
        refreshInFlight = null;
      });
  }
  return refreshInFlight;
}

api.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!(error instanceof AxiosError) || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    const request = error.config as RetryableAuthRequest | undefined;
    if (!request || request._authRetried || !isProtectedApiRequest(request.url)) {
      return Promise.reject(error);
    }

    request._authRetried = true;
    try {
      await refreshSessionOnce();
      return await api(request);
    } catch {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("urugo:auth-expired"));
      }
      return Promise.reject(error);
    }
  },
);

export default api;
