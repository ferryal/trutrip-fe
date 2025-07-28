import React from "react";
import { Typography as MuiTypography } from "@mui/material";
import type { TypographyProps as MuiTypographyProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { gradients } from "../../theme/colors";

// Enhanced Typography with gradient support
interface GradientTypographyProps {
  gradient?: boolean;
  gradientType?: keyof typeof gradients;
}

type TypographyProps = MuiTypographyProps & GradientTypographyProps;

const StyledTypography = styled(MuiTypography)<GradientTypographyProps>(
  ({ gradient, gradientType }) => ({
    ...(gradient && {
      background: gradients[gradientType || "primary"],
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      display: "inline-block",
    }),
  })
);

export const Typography: React.FC<TypographyProps> = ({
  gradient,
  gradientType,
  children,
  ...props
}) => {
  return (
    <StyledTypography
      gradient={gradient}
      gradientType={gradientType}
      {...props}
    >
      {children}
    </StyledTypography>
  );
};

// Predefined typography variants
export const Heading: React.FC<TypographyProps> = ({ children, ...props }) => (
  <Typography variant="h4" fontWeight={600} {...props}>
    {children}
  </Typography>
);

export const Subheading: React.FC<TypographyProps> = ({
  children,
  ...props
}) => (
  <Typography variant="h5" fontWeight={500} {...props}>
    {children}
  </Typography>
);

export const Title: React.FC<TypographyProps> = ({ children, ...props }) => (
  <Typography variant="h6" fontWeight={600} {...props}>
    {children}
  </Typography>
);

export const Body: React.FC<TypographyProps> = ({ children, ...props }) => (
  <Typography variant="body1" {...props}>
    {children}
  </Typography>
);

export const Caption: React.FC<TypographyProps> = ({ children, ...props }) => (
  <Typography variant="caption" color="text.secondary" {...props}>
    {children}
  </Typography>
);

// Brand-specific typography
export const GradientTitle: React.FC<TypographyProps> = ({
  children,
  ...props
}) => (
  <Typography
    variant="h2"
    fontWeight={700}
    color="text.primary"
    sx={{
      fontSize: { xs: "2.5rem", md: "3.75rem" },
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
    }}
    {...props}
  >
    {children}
  </Typography>
);

export const GradientHeading: React.FC<TypographyProps> = ({
  children,
  ...props
}) => (
  <Typography
    variant="h3"
    fontWeight={600}
    color="text.primary"
    sx={{
      fontSize: { xs: "2rem", md: "3rem" },
      lineHeight: 1.3,
      letterSpacing: "-0.01em",
    }}
    {...props}
  >
    {children}
  </Typography>
);
