import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { tmdbImage } from "@/utils";

interface IMovieTitleCellProps {
  title: string;
  posterPath?: string;
  subtitle?: string;
}

// Locandina + titolo + riga secondaria.
const MovieTitleCell = ({ title, posterPath, subtitle }: IMovieTitleCellProps) => (
  <Stack direction="row" alignItems="center" gap={1.75} sx={{ height: "100%", minWidth: 0 }}>
    <Box
      sx={{
        position: "relative",
        width: 40,
        height: 56,
        minWidth: 40,
        borderRadius: 1,
        overflow: "hidden",
        boxShadow: 4,
        bgcolor: "grey.700",
      }}
    >
      <Image src={tmdbImage(posterPath, "w92")} alt={title} fill sizes="40px" style={{ objectFit: "cover" }} />
    </Box>
    <Box sx={{ minWidth: 0 }}>
      <Typography variant="subtitle2" noWrap title={title}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="caption" color="text.secondary" noWrap component="div">
          {subtitle}
        </Typography>
      )}
    </Box>
  </Stack>
);

// Media TMDB (0-10) con barra colorata.
const ScoreCell = ({ value }: { value?: number }) => {
  if (value === undefined || value === null) return <>—</>;
  const color = value >= 7.5 ? "success" : value >= 6 ? "warning" : "error";

  return (
    <Stack direction="row" alignItems="center" gap={1.25} sx={{ width: "100%" }}>
      <Typography variant="subtitle2" sx={{ fontVariantNumeric: "tabular-nums", minWidth: 24 }}>
        {value.toFixed(1)}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={value * 10}
        color={color}
        sx={{ width: 56 }}
        aria-label={`Media TMDB ${value.toFixed(1)} su 10`}
      />
    </Stack>
  );
};

export { MovieTitleCell, ScoreCell };
