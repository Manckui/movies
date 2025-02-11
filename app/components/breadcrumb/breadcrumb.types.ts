// Definizione delle props del componente Breadcrumb
export interface BreadcrumbItem {
  text: string;
  link?: string;
}

export interface BreadcrumbsCustomProps {
  items: BreadcrumbItem[];
}
