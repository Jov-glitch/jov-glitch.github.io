import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Jose Vega - Cloud Engineer & DevOps Specialist",
  description:
    "Junior Cloud Engineer | DevOps & IaC Specialist. Building reliable infrastructure for the AI era.",
  keywords: [
    "Cloud Engineer",
    "DevOps",
    "Infrastructure as Code",
    "Terraform",
    "Docker",
    "Kubernetes",
    "AWS",
    "GCP",
  ],
  authors: [{ name: "Jose Vega", url: "https://jessvega.me" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jessvega.me",
    title: "Jose Vega - Cloud Engineer & DevOps Specialist",
    description:
      "Junior Cloud Engineer | DevOps & IaC Specialist. Building reliable infrastructure for the AI era.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="preload"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/regular/style.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/fill/style.css"
        />
      </head>
      <body className="bg-brutal-white text-brutal-black">
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
