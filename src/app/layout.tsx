import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import LoadingSlider from "~/components/ui/LoadingAnimation";

export const metadata: Metadata = {
  title: "Don Aime Portfolio",
  description: "Don Aime Portfolio",
  icons: [{ rel: "icon", url: "/logo23.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`font-dmsans`}>
      <body>
        {/* <LoadingSlider /> */}
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
