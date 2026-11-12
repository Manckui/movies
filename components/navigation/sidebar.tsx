"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  useTheme,
  Stack,
  useMediaQuery,
  Chip,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  Movie,
  Person,
  Star,
} from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BrandStyle,
  ContentWrapper,
  LogoStyle,
  MobileMenuButtonStyle,
  NavItemStyle,
  ProfileContainerStyle,
  SidebarBackdropStyle,
  SidebarStyles,
  ToggleButtonStyle,
} from "./sidebar.style";
import { ROOT, REVIEW, USER } from "@/routes";
import { useReviewsStore } from "@/hooks";
import { CURRENT_USER as user } from "@/utils";

interface SidebarProps {
  children: ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  const { reviews } = useReviewsStore();

  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  const handleNavClick = () => {
    if (isMobile) setOpen(false);
  };

  const navItems = [
    { name: "Movies", path: ROOT, icon: Movie },
    { name: "Le mie recensioni", path: REVIEW, icon: Star, badge: reviews.length },
    { name: "Profilo", path: USER, icon: Person },
  ];

  // Il dettaglio film appartiene alla sezione Movies.
  const isActive = (path: string) =>
    path === ROOT
      ? pathname === ROOT || pathname.startsWith("/details")
      : pathname.startsWith(path);

  return (
    <>
      {isMobile && !open && (
        <MobileMenuButtonStyle
          aria-label="Apri menu"
          onClick={() => setOpen(true)}
        >
          <Menu />
        </MobileMenuButtonStyle>
      )}
      {isMobile && open && (
        <SidebarBackdropStyle onClick={() => setOpen(false)} />
      )}
      <SidebarStyles open={open}>
        {/* Logo */}
        <BrandStyle open={open}>
          <LogoStyle>
            <Movie sx={{ fontSize: 22 }} />
          </LogoStyle>
          {open && (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                CineTrack
              </Typography>
              <Typography variant="caption" color="text.disabled">
                Movies dashboard
              </Typography>
            </Box>
          )}
        </BrandStyle>

        {/* Navigation Links */}
        {open && (
          <Typography
            variant="caption"
            sx={{
              color: "text.disabled",
              fontWeight: 700,
              letterSpacing: 1.1,
              textTransform: "uppercase",
              px: 1.5,
              pb: 1,
            }}
          >
            Navigazione
          </Typography>
        )}

        {navItems.map(({ name, path, icon: Icon, badge }) => (
          <Link
            key={path}
            href={path}
            style={{ textDecoration: "none" }}
            onClick={handleNavClick}
            aria-label={name}
          >
            <NavItemStyle open={open} active={isActive(path)}>
              <Icon sx={{ fontSize: 22 }} />
              {open && <Box sx={{ flex: 1 }}>{name}</Box>}
              {open && !!badge && (
                <Chip
                  label={badge}
                  size="small"
                  color="success"
                  sx={{ height: 22, minWidth: 28 }}
                />
              )}
            </NavItemStyle>
          </Link>
        ))}

        <Box sx={{ flex: 1 }} />

        {/* Profile */}
        <Link
          href={USER}
          style={{ textDecoration: "none" }}
          onClick={handleNavClick}
        >
          <ProfileContainerStyle open={open}>
            <Avatar src={user.avatarUrl} sx={{ width: 40, height: 40 }} />
            {open && (
              <Stack sx={{ minWidth: 0 }}>
                <Typography variant="subtitle2" color="text.primary" noWrap>
                  {user.name}
                </Typography>
                <Typography variant="caption" color="text.disabled">
                  Admin
                </Typography>
              </Stack>
            )}
          </ProfileContainerStyle>
        </Link>

        {/* Toggle Button */}
        {!isMobile && (
          <ToggleButtonStyle
            aria-label={open ? "Comprimi menu" : "Espandi menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <ChevronLeft /> : <ChevronRight />}
          </ToggleButtonStyle>
        )}
      </SidebarStyles>
      <ContentWrapper open={open}>{children}</ContentWrapper>
    </>
  );
};

export { Sidebar };
