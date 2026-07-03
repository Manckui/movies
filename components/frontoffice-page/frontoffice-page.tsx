"use client"

import { Avatar, Box, Stack, Typography } from "@mui/material"
import { IFrontOfficePageProps } from "./frontoffice-page.types"
import theme from "@/theme/theme"
import { BreadcrumbsCustom } from "../breadcrumb"
import { useUserStore } from "@/hooks"
import { USER } from "@/routes"
import Link from "next/link"

const FrontOfficePage = ({
  children,
  breadcrumbs,
  title
}: IFrontOfficePageProps) => {
  const hasBreadcrumbs = !!breadcrumbs?.length
  const { user } = useUserStore()

  return (
    <>
      <Stack alignItems={'flex-end'} sx={{ mb: 5 }}>
        <Link href={USER}>
          <Avatar
            src={user.avatarUrl}
            sx={{boxShadow: theme.shadows[5], width: 40, height: 40}}
          />
        </Link>
      </Stack>
      <Box sx={{ mb: 5 }}>
        <Typography
          variant="h4"
          sx={{ color: theme.palette.text.primary, mb: 1 }}>
          {title}
        </Typography>
        {hasBreadcrumbs && (
          <Stack>
            <BreadcrumbsCustom items={breadcrumbs} />
          </Stack>
        )}
      </Box>
      {children}
    </>
  )
}

export { FrontOfficePage }
