import { FrontOfficePage } from "@/components";
import { ROOT } from "@/routes/paths";
import { Typography } from "@mui/material";

export default function Reviews() {
  const breadcrumbItems = [
    { text: "Home", link: ROOT },
    { text: "Recensioni" },
  ];

  return (
    <FrontOfficePage breadcrumbs={breadcrumbItems} title="Recensioni">
      <Typography variant="h4">Tabbella movies recensioni</Typography>
    </FrontOfficePage>
  );
}
