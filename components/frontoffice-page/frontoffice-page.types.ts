import { ReactNode } from "react"
import { BreadcrumbItem } from "../breadcrumb"

export interface IFrontOfficePageProps {
  children: ReactNode

  breadcrumbs?: BreadcrumbItem[]

  title: string
}
