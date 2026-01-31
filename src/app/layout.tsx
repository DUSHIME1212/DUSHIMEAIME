import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import LoadingSlider from "~/components/ui/LoadingAnimation";
import { SmoothCursor } from "~/components/ui/smooth-cursor";
import PageTransition from "~/components/magicui/PageTransition";
import FancyLoader from "~/components/magicui/FancyLoader";

export const metadata: Metadata = {
  title: "Don Aime Portfolio",
  description: "Don Aime Portfolio",
  icons: [{ rel: "icon", url: "/logo23.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`font-dmsans`}>
      <body>
        <FancyLoader/>
        <Navbar />
        <PageTransition>  {/* Plays on every route change */}
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
