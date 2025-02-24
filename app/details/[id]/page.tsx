import { FrontOfficePage } from "@/components"
import { ROOT } from "@/routes/paths"
import { Typography } from "@mui/material"

export default function Details() {
  const breadcrumbItems = [{ text: "Home", link: ROOT }, { text: "Recensioni" }]

  return (
    <FrontOfficePage breadcrumbs={breadcrumbItems} title="Recensioni">
      <Typography variant="h4">Dettaglio Movies</Typography>
    </FrontOfficePage>
  )
}
