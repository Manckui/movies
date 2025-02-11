import { ReactNode } from "react"
import { BreadcrumbItem } from "../breadcrumb"

export interface IFrontOfficePageProps {
  children: ReactNode

  metaTitle?: string

  hideMetaTitleSuffix?: boolean

  breadcrumbs?: BreadcrumbItem[]

  title: string
}
