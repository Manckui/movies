"use client";

import { FrontOfficePage } from "@/components";
import { getAverageRating, useReviewsStore } from "@/hooks";
import { ROOT } from "@/routes/paths";
import { CURRENT_USER as user } from "@/utils";
import { Avatar, Box, Card, Stack, Typography } from "@mui/material";

// Pagina profilo: solo visualizzazione, senza azioni.
export default function User() {
  const { reviews } = useReviewsStore();

  const breadcrumbItems = [{ text: "Home", link: ROOT }, { text: "Profilo" }];

  const stats = [
    { label: "Recensioni", value: reviews.length },
    {
      label: "Voto medio",
      value: getAverageRating(reviews).toLocaleString("it-IT"),
    },
  ];

  return (
    <FrontOfficePage breadcrumbs={breadcrumbItems} title="Profilo">
      <Card sx={{ overflow: "hidden" }}>
        {/* Copertina */}
        <Box
          sx={(theme) => ({
            height: 160,
            background: `linear-gradient(120deg, ${theme.palette.primary.dark} 0%, ${theme.palette.info.main} 55%, ${theme.palette.info.dark} 100%)`,
          })}
        />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "center", sm: "flex-end" }}
          gap={3}
          sx={{ px: 4, pb: 3, mt: "-56px" }}
        >
          <Avatar
            src={user.avatarUrl}
            sx={{
              width: 128,
              height: 128,
              border: 4,
              borderColor: "background.paper",
            }}
          />
          <Box sx={{ flex: 1, pb: 1, textAlign: { xs: "center", sm: "left" } }}>
            <Typography variant="h4">{user.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              Admin
            </Typography>
          </Box>
          <Stack direction="row" gap={4} sx={{ pb: 1 }}>
            {stats.map((stat) => (
              <Stack key={stat.label} alignItems="center">
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  {stat.value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {stat.label}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Card>
    </FrontOfficePage>
  );
}
