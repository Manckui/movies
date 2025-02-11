import { Breadcrumbs } from "@mui/material"
import { styled } from "@mui/material/styles"

export const BreadcrumbsCustomStyles = styled(Breadcrumbs)(({ theme }) => ({
  "& .MuiBreadcrumbs-separator": {
    width: 4,
    height: 4,
    borderRadius: "50%",
    backgroundColor: theme.palette.text.disabled,
    display: "inline-block",
    margin: theme.spacing(0, 2)
  }
}))
