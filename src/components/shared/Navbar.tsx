import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

interface NavbarProps {
  title: string;
  children?: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({ title, children }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "white",
        color: "text.primary",
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
        borderBottom: "1px solid #E0E0E0",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 700,
            fontSize: "1.5rem",
            color: "text.primary",
            letterSpacing: "-0.02em",
          }}
        >
          <Box component="span" sx={{ color: "secondary.main" }}>
            Tru
          </Box>
          <Box component="span" sx={{ color: "primary.main" }}>
            Trip
          </Box>
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {children}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
