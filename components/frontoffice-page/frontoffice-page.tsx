import { Avatar, Box, Stack, Typography } from "@mui/material"
import { IFrontOfficePageProps } from "./frontoffice-page.types"
import theme from "@/theme/theme"
import { BreadcrumbsCustom } from "../breadcrumb"

const FrontOfficePage = ({
  children,
  breadcrumbs,
  title
}: IFrontOfficePageProps) => {
  const hasBreadcrumbs = !!breadcrumbs?.length

  return (
    <>
      <Stack alignItems={'flex-end'} sx={{ mb: 5 }}>
        <Avatar
          src="/profile.jpg"
          sx={{boxShadow: theme.shadows[5], width: 40, height: 40}}
        />
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
