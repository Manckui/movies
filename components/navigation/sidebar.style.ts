import { Box, IconButton, Stack } from "@mui/material"
import { alpha, styled } from "@mui/material/styles"

export const SidebarStyles = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open"
})<{ open: boolean }>(({ theme, open }) => ({
  width: open ? 280 : 60,
  height: "100vh",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  position: "fixed",
  left: 0,
  top: 0,
  transition: "all 0.3s",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),
  borderRight: `2px dashed ${theme.palette.grey[500]}`,
}))

export const ToggleButtonStyle = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: -20,
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: theme.palette.grey[700],
  color: theme.palette.text.primary,
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  borderRadius: "50%",
  "&:hover": { backgroundColor: theme.palette.grey[600] }
}))
export const ProfileContainerStyle = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "open"
})<{ open: boolean }>(({ theme, open }) => ({
  width: "100%",
  maxWidth: 240,
  padding: theme.spacing(2),
  backgroundColor: open ? alpha(theme.palette.grey[500], 0.08) : "transparent",
  borderRadius: "12px",
  margin: theme.spacing(3, 0),
  alignItems: "center",
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(2),
  justifyContent: open ? "flex-start" : "center",
  transition: "background-color 0.3s"
}))

export const ContentWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open"
})<{ open: boolean }>(({ theme, open }) => ({
  paddingLeft: open ? 320 : 120,
  width: "100vw",
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  paddingRight: 40,
  paddingTop: 30,
  paddingBottom: 100,
  transition: "all 0.3s",
}))
