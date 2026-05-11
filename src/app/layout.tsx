import type { Metadata } from "next";
import { Geist, Geist_Mono, Lexend } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Header from "@/features/tiptap-editor-demo/components/header";
import "@/styles/globals.css";
import "@/features/tiptap-editor/styles/index.css";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TiptapEditor — Feature Demo",
  description: "Demo of the TiptapEditor reusable feature module",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${lexend.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
