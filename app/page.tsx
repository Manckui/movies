import { Typography } from "@mui/material"
import { FrontOfficePage } from "./components/frontoffice-page"
import { ROOT } from "./routes/paths"

export default function Home() {
  const breadcrumbItems = [{ text: "Home", link: ROOT }, { text: "Movies" }]

  return (
    <FrontOfficePage breadcrumbs={breadcrumbItems} title="Movies">
      <Typography variant="h4">Tabbella</Typography>
    </FrontOfficePage>
  )
}
