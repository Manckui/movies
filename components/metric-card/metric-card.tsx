import { alpha, Box, Typography } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

interface IMetricCardProps {
  value: string | number;
  label: string;
  color: string;
  icon: SvgIconComponent;
}

const MetricCard = ({ value, label, color, icon: Icon }: IMetricCardProps) => {
  return (
    <Box
      sx={{
        position: "relative",
        flex: 1,
        overflow: "hidden",
        borderRadius: 3,
        p: 3,
        backgroundColor: color,
        color: "#fff",
      }}
    >
      <Typography variant="h3">{value}</Typography>
      <Typography variant="body2" sx={{ opacity: 0.8 }}>
        {label}
      </Typography>
      <Icon
        sx={{
          position: "absolute",
          right: "-40px",
          bottom: "-20px",
          fontSize: "15rem",
          color: alpha("#fff", 0.24),
        }}
      />
    </Box>
  );
};

export { MetricCard };
export type { IMetricCardProps };
