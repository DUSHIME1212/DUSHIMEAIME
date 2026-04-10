import "~/styles/globals.css";

import { type Metadata } from "next";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import LoadingSlider from "~/components/ui/LoadingAnimation";
import { SmoothCursor } from "~/components/ui/smooth-cursor";
import PageTransition from "~/components/magicui/PageTransition";
import FancyLoader from "~/components/magicui/FancyLoader";

export const metadata: Metadata = {
  title: "Don Aime Portfolio",
  description: "Creative Developer & UX Enthusiast Portfolio",
  icons: [{ rel: "icon", url: "/logo23.png" }],
};

import { ThemeProvider } from "~/components/theme-provider";
import { ThemeToggle } from "~/components/ThemeToggle";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className="font-notion antialiased">
      <body className="bg-background text-foreground selection:bg-notion-blue/20 selection:text-notion-blue">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <FancyLoader/>
          <Navbar />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
