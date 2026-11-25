"use client";

import { useEffect } from "react";
import { useLandlordProperties } from "@/store/landlord-properties.store";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";

export function LandlordStoreHydrator() {
  useEffect(() => {
    void useLandlordProperties.persist.rehydrate();
    void useLandlordWorkspace.persist.rehydrate();
  }, []);

  return null;
}
