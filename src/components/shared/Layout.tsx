import React from "react";
import {
  Container as MuiContainer,
  Box,
  Stack,
  AppBar,
  Toolbar,
  styled,
} from "@mui/material";
import type { ContainerProps, BoxProps, StackProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Enhanced Container with custom styling
interface CustomContainerProps extends ContainerProps {
  background?: "default" | "dark" | "darker" | "gradient";
  padding?: "none" | "small" | "medium" | "large";
}

const GradientContainer = styled(MuiContainer)(({ theme }) => ({
  background: theme.palette.gradients.travel,
  color: "#FFFFFF",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
}));

export const Container: React.FC<CustomContainerProps> = ({
  background = "default",
  padding = "medium",
  children,
  ...props
}) => {
  const theme = useTheme();

  const paddingValue = {
    none: 0,
    small: 0,
    medium: 0,
    large: 0,
  }[padding];

  if (background === "gradient") {
    return (
      <GradientContainer {...props}>
        <Box sx={{ py: paddingValue }}>{children}</Box>
      </GradientContainer>
    );
  }

  const backgroundColor = {
    default: theme.palette.background.default,
    dark: theme.palette.background.dark,
    darker: theme.palette.background.darker,
  }[background as "default" | "dark" | "darker"];

  return (
    <MuiContainer
      {...props}
      sx={{
        backgroundColor,
        py: paddingValue,
        ...props.sx,
      }}
    >
      {children}
    </MuiContainer>
  );
};

// Section component for consistent spacing
export const Section: React.FC<
  BoxProps & { spacing?: "small" | "medium" | "large" }
> = ({ spacing = "medium", children, ...props }) => {
  const spacingValue = {
    small: 4,
    medium: 0,
    large: 0,
  }[spacing];

  return (
    <Box sx={{ py: spacingValue, ...props.sx }} {...props}>
      {children}
    </Box>
  );
};

// Flex layouts
export const Row: React.FC<StackProps> = ({ children, ...props }) => (
  <Stack direction="row" spacing={2} {...props}>
    {children}
  </Stack>
);

export const Column: React.FC<StackProps> = ({ children, ...props }) => (
  <Stack direction="column" spacing={2} {...props}>
    {children}
  </Stack>
);

// Centered content
export const CenteredBox: React.FC<BoxProps> = ({ children, ...props }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      ...props.sx,
    }}
    {...props}
  >
    {children}
  </Box>
);

// Navbar component
interface NavbarProps {
  title: string;
  children?: React.ReactNode;
  gradient?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  title,
  children,
  gradient = true,
}) => {
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      sx={{
        background: gradient
          ? theme.palette.gradients.travel
          : theme.palette.primary.main,
        boxShadow: "0px 4px 20px rgba(33, 150, 243, 0.3)",
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1, fontWeight: 700, fontSize: "1.25rem" }}>
          {title}
        </Box>
        {children}
      </Toolbar>
    </AppBar>
  );
};
