"use client";

import { useEffect } from "react";
import { useLandlordProperties } from "@/store/landlord-properties.store";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import { useRenterWorkspace } from "@/store/renter-workspace.store";

export function LandlordStoreHydrator() {
  useEffect(() => {
    void useLandlordProperties.persist.rehydrate();
    void useLandlordWorkspace.persist.rehydrate();
    void useRenterWorkspace.persist.rehydrate();
  }, []);

  return null;
}
