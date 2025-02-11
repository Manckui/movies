import { FrontOfficePage } from "@/components"
import { ROOT } from "@/routes/paths"
import { Typography } from "@mui/material"

export default function Home() {
  const breadcrumbItems = [{ text: "Home", link: ROOT }, { text: "Recensioni" }]

  return (
    <FrontOfficePage breadcrumbs={breadcrumbItems} title="Recensioni">
      <Typography variant="h4">Tabbella</Typography>
    </FrontOfficePage>
  )
}
