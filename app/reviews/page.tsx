"use client";

import { FrontOfficePage } from "@/components";
import { useReviewsStore } from "@/hooks";
import { ROOT } from "@/routes/paths";
import { Typography } from "@mui/material";
import { useEffect } from "react";

export default function Reviews() {
  const { reviews } = useReviewsStore();

  useEffect(() => {
    console.log("reviews from store:", reviews);
  }, [reviews]);

  const breadcrumbItems = [
    { text: "Home", link: ROOT },
    { text: "Recensioni" },
  ];

  return (
    <FrontOfficePage breadcrumbs={breadcrumbItems} title="Recensioni">
      <Typography variant="h4">Tabella movies recensioni</Typography>
    </FrontOfficePage>
  );
}
