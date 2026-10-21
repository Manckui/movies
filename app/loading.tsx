// Mostrata da Next mentre il Server Component carica i dati.
import { Skeleton, Stack } from "@mui/material";

export default function Loading() {
  return (
    <Stack gap={2}>
      <Skeleton variant="rectangular" width="100%" height={56} />
      <Skeleton variant="rectangular" width="100%" height={420} />
    </Stack>
  );
}
