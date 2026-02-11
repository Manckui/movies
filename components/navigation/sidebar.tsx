"use client"

import { ReactNode, useState } from "react"
import { Box, Typography, Avatar, useTheme, Stack, alpha } from "@mui/material"
import { ArrowBack, ArrowForward, Movie, Star } from "@mui/icons-material"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ContentWrapper,
  ProfileContainerStyle,
  SidebarStyles,
  ToggleButtonStyle
} from "./sidebar.style"
import { ROOT, REVIEW } from "@/routes"

interface SidebarProps {
  children: ReactNode
}

const Sidebar = ({ children }: SidebarProps) => {
  const theme = useTheme()
  const [open, setOpen] = useState(true)
  const pathname = usePathname()

  const navItems = [
    { name: "Movies", path: ROOT, icon: Movie },
    { name: "My Reviews", path: REVIEW, icon: Star }
  ]

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
          : alpha(theme.palette.grey[500], 0.08)
    }
  })

  return (
    <>
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
        <ProfileContainerStyle
          direction={"row"}
          alignItems={"center"}
          gap={2}
          open={open}>
          <Avatar
            src="/profile.jpg"
            sx={{ width: open ? 46 : 34, height: open ? 46 : 34 }}
          />
          {open && (
            <Box gap={0.5}>
              <Typography variant="subtitle1" sx={{ fontSize: "1.7rem" }}>
                Stan Lee
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.text.disabled, fontSize: "1.5rem" }}>
                Admin
              </Typography>
            </Box>
          )}
        </ProfileContainerStyle>

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
                textTransform: "uppercase"
              }}>
              Movies dashboard
            </Typography>
          )}

          {navItems.map(({ name, path, icon: Icon }) => (
            <Link key={path} href={path} style={{ textDecoration: "none" }}>
              <Stack
                alignItems={"center"}
                direction={"row"}
                justifyContent={open ? "" : "center"}
                sx={{
                  px: "10px",
                  height: "54px",
                  borderRadius: "8px",
                  ...getNavItemStyle(path)
                }}
                gap={2}>
                <Icon
                  sx={{
                    width: open ? 28 : 36,
                    height: open ? 28 : 36,
                    color: getNavItemStyle(path).color
                  }}
                />
                {open && (
                  <Typography
                    variant="body1"
                    sx={{
                      color: getNavItemStyle(path).color,
                      fontSize: "1.6rem",
                      fontWeight: 600
                    }}>
                    {name}
                  </Typography>
                )}
              </Stack>
            </Link>
          ))}
        </Stack>

        {/* Toggle Button */}
        <ToggleButtonStyle onClick={() => setOpen(!open)}>
          {open ? <ArrowBack /> : <ArrowForward />}
        </ToggleButtonStyle>
      </SidebarStyles>
      <ContentWrapper open={open}>{children}</ContentWrapper>
    </>
  )
}

export { Sidebar }
