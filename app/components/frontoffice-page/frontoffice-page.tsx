import { Box, Stack, Typography } from "@mui/material"
import { BreadcrumbsCustom } from "../breadcrumb"
import { IFrontOfficePageProps } from "./frontoffice-page.types"
import theme from "@/app/theme/theme"

const FrontOfficePage = ({
  children,
  breadcrumbs,
  title
}: IFrontOfficePageProps) => {
  const hasBreadcrumbs = !!breadcrumbs?.length

  return (
    <>
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
