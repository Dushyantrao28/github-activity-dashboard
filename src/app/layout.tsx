import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "GitPulse — GitHub Activity Dashboard",
  description: "Visualize your GitHub contributions, repositories, and coding patterns in a stunning developer dashboard.",
  keywords: ["GitHub", "dashboard", "analytics", "contributions", "developer tools"],
  authors: [{ name: "GitPulse" }],
  openGraph: {
    title: "GitPulse — GitHub Activity Dashboard",
    description: "Visualize your GitHub activity in a beautiful dashboard.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800;0,14..32,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <Providers>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#161b22",
                color: "#e6edf3",
                border: "1px solid #30363d",
                borderRadius: "10px",
                fontSize: "14px",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
