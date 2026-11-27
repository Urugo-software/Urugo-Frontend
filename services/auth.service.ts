import type { AxiosResponse } from "axios";

import {
  getAuthSession,
  googleAuthService,
  loginUserService,
  updateLandlordPlanService,
} from "@/api/auth.api";
import type { GoogleAuthInput } from "@/api/auth.api";
import type { LoginProps } from "@/types";
import type { AuthResponse, AuthUser } from "@/types/auth";

export const AUTH_SESSION_QUERY_KEY = ["auth", "session"] as const;

function userFromResponse(response: AxiosResponse<AuthResponse>): AuthUser {
  const user = response.data?.user ?? response.data?.data?.user;
  if (!user?.id || !user.role || !Array.isArray(user.roles)) {
    throw new Error("The authentication response was incomplete.");
  }
  return user;
}

export async function loginWithPassword(credentials: LoginProps): Promise<AuthUser> {
  return userFromResponse(await loginUserService(credentials));
}

export async function loginWithGoogle(input: GoogleAuthInput): Promise<AuthUser> {
  return userFromResponse(await googleAuthService(input));
}

export async function loadAuthSession(): Promise<AuthUser> {
  return userFromResponse(await getAuthSession());
}

export async function saveLandlordPlan(selectedLandlordPlan: NonNullable<AuthUser["selectedLandlordPlan"]>): Promise<AuthUser> {
  return userFromResponse(await updateLandlordPlanService(selectedLandlordPlan));
}
