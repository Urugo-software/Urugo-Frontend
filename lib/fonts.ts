import { IBM_Plex_Mono, Epilogue, Merriweather } from "next/font/google";

export const ibm = IBM_Plex_Mono({
  variable: "--font-ibm",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
});

export const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
  fallback: ["Georgia", "Cambria", "Times New Roman", "Times", "serif"],
});
