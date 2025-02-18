import { ReactNode } from "react"
import "./globals.scss"
import { Sidebar } from "@/components"
import ThemeRegistry from "@/theme/ThemeRegistry"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <Sidebar>{children}</Sidebar>
        </ThemeRegistry>
      </body>
    </html>
  )
}

