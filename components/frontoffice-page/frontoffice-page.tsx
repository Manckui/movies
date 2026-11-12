"use client"

import { Avatar, Box, Stack, Typography } from "@mui/material"
import { IFrontOfficePageProps } from "./frontoffice-page.types"
import { BreadcrumbsCustom } from "../breadcrumb"
import { useUserStore } from "@/hooks"
import { USER } from "@/routes"
import Link from "next/link"

const FrontOfficePage = ({
  children,
  breadcrumbs,
  title,
  subtitle,
  action
}: IFrontOfficePageProps) => {
  const hasBreadcrumbs = !!breadcrumbs?.length
  const { user } = useUserStore()

  return (
    <Stack gap={3}>
      <Stack alignItems={"flex-end"}>
        <Link href={USER} aria-label="Profilo">
          <Avatar
            src={user.avatarUrl}
            sx={{
              width: 40,
              height: 40,
              boxShadow: (theme) => `0 0 0 2px ${theme.palette.primary.main}`
            }}
          />
        </Link>
      </Stack>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-start", sm: "flex-end" }}
        justifyContent="space-between"
        gap={2}>
        <Box>
          {hasBreadcrumbs && (
            <Box sx={{ mb: 1 }}>
              <BreadcrumbsCustom items={breadcrumbs} />
            </Box>
          )}
          <Typography variant="h3" component="h1" color="text.primary">
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        {action && (
          <Stack direction="row" gap={1.5}>
            {action}
          </Stack>
        )}
      </Stack>

      {children}
    </Stack>
  )
}

export { FrontOfficePage }
