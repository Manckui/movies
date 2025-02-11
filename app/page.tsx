import { Typography } from "@mui/material"
import { FrontOfficePage } from "@/components"
import { ROOT } from "@/routes"

export default function Home() {
  const breadcrumbItems = [{ text: "Home", link: ROOT }, { text: "Movies" }]

  return (
    <FrontOfficePage breadcrumbs={breadcrumbItems} title="Movies">
      <Typography variant="h4">Tabbella</Typography>
    </FrontOfficePage>
  )
}
