import { alpha, Box, Card, Stack, Typography } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

interface IMetricCardProps {
  value: string | number;
  label: string;
  color: string;
  icon: SvgIconComponent;
}

const MetricCard = ({ value, label, color, icon: Icon }: IMetricCardProps) => {
  return (
    <Card
      component={Stack}
      direction="row"
      alignItems="center"
      gap={2}
      sx={{ flex: 1, px: 3, py: 2.5 }}
    >
      <Box
        sx={{
          width: 52,
          height: 52,
          minWidth: 52,
          borderRadius: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: alpha(color, 0.16),
          color,
        }}
      >
        <Icon sx={{ fontSize: 26 }} />
      </Box>
      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, lineHeight: "38px" }}>
          {value}
        </Typography>
      </Box>
    </Card>
  );
};

export { MetricCard };
export type { IMetricCardProps };
