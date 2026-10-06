import type { Metadata } from "next";
import { validateEditableContent } from "@/content/validate";
import CloudSyncBridge from "@/components/CloudSyncBridge";
import "./globals.css";

if (process.env.NODE_ENV !== "production") validateEditableContent();

export const metadata: Metadata = {
  title: "Ressonância",
  description: "Jogo narrativo de despacho, relações e romance"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body><CloudSyncBridge />{children}</body></html>;
}
