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
        const isLast = index === items.length - 1
        const style = {
          ...theme.typography.body2,
          textDecoration: "none",
          color: isLast ? theme.palette.text.primary : theme.palette.text.secondary,
          fontWeight: isLast ? 600 : 400
        }

        if (item?.link && !isLast) {
          return (
            <Link key={index} href={item.link} style={style}>
              {item.text}
            </Link>
          )
        }

        return (
          <span key={index} style={style} aria-current={isLast ? "page" : undefined}>
            {item.text}
          </span>
        )
      })}
    </BreadcrumbsCustomStyles>
  )
}

export { BreadcrumbsCustom }
