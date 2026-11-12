import { Box, IconButton, Stack } from "@mui/material"
import { alpha, styled } from "@mui/material/styles"

export const SIDEBAR_WIDTH = 280
export const SIDEBAR_COLLAPSED_WIDTH = 88

export const SidebarStyles = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open"
})<{ open: boolean }>(({ theme, open }) => ({
  width: open ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH,
  height: "100vh",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  position: "fixed",
  left: 0,
  top: 0,
  zIndex: theme.zIndex.appBar,
  transition: theme.transitions.create("width"),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.75),
  padding: theme.spacing(3, 2),
  borderRight: `1px dashed ${alpha(theme.palette.grey[500], 0.2)}`,
  [theme.breakpoints.down("md")]: {
    width: SIDEBAR_WIDTH,
    zIndex: theme.zIndex.drawer,
    transform: open ? "translateX(0)" : "translateX(-100%)",
    transition: theme.transitions.create("transform"),
  },
}))

export const BrandStyle = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "open"
})<{ open: boolean }>(({ theme, open }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: open ? "flex-start" : "center",
  gap: theme.spacing(1.5),
  padding: theme.spacing(0, open ? 1 : 0, 3.5),
}))

export const LogoStyle = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  minWidth: 40,
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
  background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
  boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.32)}`,
}))

export const NavItemStyle = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "active"
})<{ open: boolean; active: boolean }>(({ theme, open, active }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: open ? "flex-start" : "center",
  gap: theme.spacing(1.75),
  height: 48,
  padding: theme.spacing(0, 1.5),
  borderRadius: 10,
  fontSize: "1.4rem",
  fontWeight: 600,
  color: active ? theme.palette.primary.light : theme.palette.text.secondary,
  backgroundColor: active
    ? alpha(theme.palette.primary.main, 0.12)
    : "transparent",
  transition: theme.transitions.create("background-color"),
  "&:hover": {
    backgroundColor: active
      ? alpha(theme.palette.primary.main, 0.2)
      : alpha(theme.palette.grey[500], 0.08),
  },
}))

export const SidebarBackdropStyle = styled(Box)(({ theme }) => ({
  position: "fixed",
  inset: 0,
  backgroundColor: alpha(theme.palette.common.black, 0.5),
  zIndex: theme.zIndex.drawer - 1,
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}))

export const MobileMenuButtonStyle = styled(IconButton)(({ theme }) => ({
  position: "fixed",
  top: theme.spacing(2),
  left: theme.spacing(2),
  zIndex: theme.zIndex.drawer - 2,
  backgroundColor: theme.palette.grey[700],
  color: theme.palette.text.primary,
  boxShadow: `0 4px 10px ${alpha(theme.palette.common.black, 0.2)}`,
  "&:hover": { backgroundColor: theme.palette.grey[600] },
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}))

export const ToggleButtonStyle = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: -14,
  top: 32,
  width: 28,
  height: 28,
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.secondary,
  border: `1px dashed ${alpha(theme.palette.grey[500], 0.32)}`,
  borderRadius: "50%",
  "& svg": { fontSize: 16 },
  "&:hover": { backgroundColor: theme.palette.grey[800] }
}))

export const ProfileContainerStyle = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "open"
})<{ open: boolean }>(({ theme, open }) => ({
  width: "100%",
  padding: theme.spacing(1.5),
  backgroundColor: open ? alpha(theme.palette.grey[500], 0.08) : "transparent",
  borderRadius: 12,
  alignItems: "center",
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(1.5),
  justifyContent: open ? "flex-start" : "center",
  transition: theme.transitions.create("background-color"),
  "&:hover": {
    backgroundColor: alpha(theme.palette.grey[500], 0.16),
  },
}))

export const ContentWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open"
})<{ open: boolean }>(({ theme, open }) => ({
  paddingLeft: (open ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH) + 40,
  width: "100%",
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  paddingRight: 40,
  paddingTop: 24,
  paddingBottom: 64,
  transition: theme.transitions.create("padding"),
  [theme.breakpoints.down("md")]: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 72,
  },
}))
