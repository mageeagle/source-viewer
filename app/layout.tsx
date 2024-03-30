import type { Metadata } from "next";
import "./globals.css";
import AboutPopUp from "@/components/ui/InfoOverlay";
import OscClient from "@/components/osc/OscClient";
import OscState from "@/components/osc/OscState";

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Source Viewer for Object Based Audio Spatialization with OSC",
  description: "Eagle Wu 2023",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <div className="w-screen h-screen">
          <OscClient />
          <OscState />
          {children}
        </div>
      </body>
    </html>
  );
}
