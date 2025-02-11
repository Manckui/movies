import { ReactNode } from "react"
import ThemeRegistry from "../theme/ThemeRegistry"
import "./globals.scss"
import { Sidebar } from "@/components"

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
