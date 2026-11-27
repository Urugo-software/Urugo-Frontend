import api from "@/lib/axios";
import type { LoginProps } from "@/types";
import type { LandlordPlan } from "@/types/auth";

export interface GoogleAuthInput {
  idToken: string;
  intent: "sign_in" | "register";
  selectedLandlordPlan?: LandlordPlan;
  profile?: {
    name: string;
    phoneNumber: string;
    nationalId: string;
  };
}

export const loginUserService = (credentials: LoginProps) =>
  api.post("/api/auth/login", {
    identifier: credentials.identifier,
    password: credentials.password,
  });

export const googleAuthService = (input: GoogleAuthInput) =>
  api.post("/api/auth/google", input);

export const getAuthSession = () => api.get("/api/auth/session");

export const refreshAuthSession = () => api.post("/api/auth/refresh");

export const logoutUserService = () => api.post("/api/auth/logout");

export const updateLandlordPlanService = (selectedLandlordPlan: LandlordPlan) =>
  api.patch("/api/auth/landlord/plan", { selectedLandlordPlan });
