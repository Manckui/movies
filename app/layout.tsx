import { ReactNode } from "react"
import Sidebar from "./components/sidebar/Sidebar"
import ThemeRegistry from "./theme/ThemeRegistry"
import "./globals.scss"
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
