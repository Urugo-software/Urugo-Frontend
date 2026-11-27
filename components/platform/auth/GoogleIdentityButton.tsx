"use client";

import Script from "next/script";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

interface GoogleCredentialResponse {
  credential?: string;
}

interface GoogleIdentityApi {
  accounts: {
    id: {
      initialize(options: {
        client_id: string;
        callback(response: GoogleCredentialResponse): void;
      }): void;
      renderButton(element: HTMLElement, options: Record<string, unknown>): void;
    };
  };
}

declare global {
  interface Window {
    google?: GoogleIdentityApi;
  }
}

interface GoogleIdentityButtonProps {
  mode: "signin_with" | "signup_with";
  onCredential: (idToken: string) => void;
  disabled?: boolean;
}

export function GoogleIdentityButton({ mode, onCredential, disabled = false }: GoogleIdentityButtonProps) {
  const t = useTranslations("auth.google");
  const containerRef = useRef<HTMLDivElement>(null);
  const onCredentialRef = useRef(onCredential);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim();

  useEffect(() => {
    onCredentialRef.current = onCredential;
  }, [onCredential]);

  const renderGoogleButton = useCallback(() => {
    if (!scriptLoaded || !clientId || !window.google || !containerRef.current || disabled) return;
    const container = containerRef.current;
    container.replaceChildren();
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: (response) => {
        if (typeof response.credential === "string" && response.credential) {
          onCredentialRef.current(response.credential);
        }
      },
    });
    window.google.accounts.id.renderButton(container, {
      type: "standard",
      theme: "outline",
      size: "large",
      shape: "rectangular",
      text: mode,
      width: Math.max(240, Math.floor(container.getBoundingClientRect().width)),
      logo_alignment: "left",
    });
  }, [clientId, disabled, mode, scriptLoaded]);

  useEffect(() => {
    renderGoogleButton();
    const container = containerRef.current;
    return () => container?.replaceChildren();
  }, [renderGoogleButton]);

  if (!clientId) {
    return <p role="status" className="text-center text-xs text-faint">{t("notConfigured")}</p>;
  }

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onReady={() => setScriptLoaded(true)}
      />
      <div
        ref={containerRef}
        aria-label={t("buttonLabel")}
        aria-disabled={disabled || !scriptLoaded}
        className={`flex min-h-11 w-full justify-center ${disabled ? "pointer-events-none opacity-50" : ""}`}
      />
      {!scriptLoaded && <p className="text-center text-xs text-faint">{t("loading")}</p>}
    </>
  );
}
