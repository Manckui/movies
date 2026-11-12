import { ReactNode } from "react";
import { Public_Sans } from "next/font/google";
import "./globals.scss";
import { Sidebar } from "@/components";
import ThemeRegistry from "@/theme/ThemeRegistry";

// Font del tema MUI (vedi typography.fontFamily in theme/theme.ts).
const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-public-sans",
  display: "swap",
});

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="it" className={publicSans.variable}>
      <body>
        <ThemeRegistry>
          <Sidebar>{children}</Sidebar>
        </ThemeRegistry>
      </body>
    </html>
  );
}
