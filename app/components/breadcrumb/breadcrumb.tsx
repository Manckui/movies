"use client"

import { useTheme } from "@mui/material/styles"
import Link from "next/link"
import { BreadcrumbsCustomStyles } from "./breadcrumb.styles"
import { BreadcrumbsCustomProps } from "./breadcrumb.types"

const BreadcrumbsCustom = ({ items }: BreadcrumbsCustomProps) => {
  const theme = useTheme()

  return (
    <BreadcrumbsCustomStyles separator={<span></span>} aria-label="breadcrumb">
      {items.map((item, index) => {
        if (item?.link) {
          return (
            <Link
              key={index}
              href={item.link || "/"}
              style={{
                textDecoration: "none",
                color:
                  items.length === 1
                    ? theme.palette.text.disabled
                    : index === items.length - 1
                      ? theme.palette.text.disabled
                      : theme.palette.text.primary,
                ...theme.typography.subtitle2
              }}>
              {item.text}
            </Link>
          )
        } else {
          return (
            <span
              key={index}
              style={{
                color: theme.palette.text.disabled,
                ...theme.typography.subtitle2
              }}>
              {item.text}
            </span>
          )
        }
      })}
    </BreadcrumbsCustomStyles>
  )
}

export { BreadcrumbsCustom }
