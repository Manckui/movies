import { ReactNode } from "react"
import { BreadcrumbItem } from "../breadcrumb"

export interface IFrontOfficePageProps {
  children?: ReactNode

  breadcrumbs?: BreadcrumbItem[]

  title: string

  /** Testo descrittivo sotto il titolo. */
  subtitle?: string

  /** Azioni allineate a destra dell'intestazione (es. pulsanti). */
  action?: ReactNode
}
