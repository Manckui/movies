"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  useTheme,
  Stack,
  alpha,
  useMediaQuery,
} from "@mui/material";
import { ArrowBack, ArrowForward, Menu, Movie, Star } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ContentWrapper,
  MobileMenuButtonStyle,
  ProfileContainerStyle,
  SidebarBackdropStyle,
  SidebarStyles,
  ToggleButtonStyle,
} from "./sidebar.style";
import { ROOT, REVIEW, USER } from "@/routes";
import { useUserStore } from "@/hooks";

interface SidebarProps {
  children: ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  const { user } = useUserStore();

  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  const handleNavClick = () => {
    if (isMobile) setOpen(false);
  };

  const navItems = [
    { name: "Movies", path: ROOT, icon: Movie },
    { name: "My Reviews", path: REVIEW, icon: Star },
  ];

  const getNavItemStyle = (path: string) => ({
    color:
      pathname === path
        ? theme.palette.primary.light
        : theme.palette.text.secondary,
    backgroundColor:
      pathname === path && open
        ? alpha(theme.palette.primary.main, 0.08)
        : "transparent",
    "&:hover": {
      backgroundColor:
        pathname === path
          ? alpha(theme.palette.primary.main, 0.2)
          : alpha(theme.palette.grey[500], 0.08),
    },
  });

  return (
    <>
      {isMobile && !open && (
        <MobileMenuButtonStyle onClick={() => setOpen(true)}>
          <Menu />
        </MobileMenuButtonStyle>
      )}
      {isMobile && open && (
        <SidebarBackdropStyle onClick={() => setOpen(false)} />
      )}
      <SidebarStyles open={open}>
        {/* Logo */}
        <Box sx={{ width: "100%" }}>
          <Image
            src="/logo.svg"
            alt="Logo"
            width={open ? 40 : 60}
            height={open ? 40 : 60}
          />
        </Box>

        {/* Profile */}
        <Link
          href={USER}
          style={{ textDecoration: "none", width: "100%" }}
          onClick={handleNavClick}
        >
          <ProfileContainerStyle
            direction={"row"}
            alignItems={"center"}
            gap={2}
            open={open}
          >
            <Avatar
              src={user.avatarUrl}
              sx={{ width: open ? 46 : 34, height: open ? 46 : 34 }}
            />
            {open && (
              <Box gap={0.5}>
                <Typography variant="subtitle1" sx={{ fontSize: "1.7rem" }}>
                  {user.name}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.disabled,
                    fontSize: "1.5rem",
                  }}
                >
                  Admin
                </Typography>
              </Box>
            )}
          </ProfileContainerStyle>
        </Link>

        {/* Navigation Links */}
        <Stack direction={"column"} gap={2} sx={{ width: "100%" }}>
          {open && (
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: "1.3rem",
                fontWeight: 700,
                px: "10px",
                mb: 2,
                textTransform: "uppercase",
              }}
            >
              Movies dashboard
            </Typography>
          )}

          {navItems.map(({ name, path, icon: Icon }) => (
            <Link
              key={path}
              href={path}
              style={{ textDecoration: "none" }}
              onClick={handleNavClick}
            >
              <Stack
                alignItems={"center"}
                direction={"row"}
                justifyContent={open ? "" : "center"}
                sx={{
                  px: "10px",
                  height: "54px",
                  borderRadius: "8px",
                  ...getNavItemStyle(path),
                }}
                gap={2}
              >
                <Icon
                  sx={{
                    width: open ? 28 : 36,
                    height: open ? 28 : 36,
                    color: getNavItemStyle(path).color,
                  }}
                />
                {open && (
                  <Typography
                    variant="body1"
                    sx={{
                      color: getNavItemStyle(path).color,
                      fontSize: "1.6rem",
                      fontWeight: 600,
                    }}
                  >
                    {name}
                  </Typography>
                )}
              </Stack>
            </Link>
          ))}
        </Stack>

        {/* Toggle Button */}
        {!isMobile && (
          <ToggleButtonStyle onClick={() => setOpen(!open)}>
            {open ? <ArrowBack /> : <ArrowForward />}
          </ToggleButtonStyle>
        )}
      </SidebarStyles>
      <ContentWrapper open={open}>{children}</ContentWrapper>
    </>
  );
};

export { Sidebar };
