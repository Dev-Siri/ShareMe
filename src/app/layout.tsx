import { Lato } from "next/font/google";
import "./globals.css";

import GoogleOAuthProvider from "./google-oauth-provider";

const lato = Lato({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin", "latin-ext"],
});

export const metadata = {
  title: "Share Me",
  description:
    "A social media application with new daily pins for everyone anywhere!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={lato.className}>
      <GoogleOAuthProvider clientId={process.env.PUBLIC_GOOGLE_API_KEY!}>
        {children}
      </GoogleOAuthProvider>
    </html>
  );
}
