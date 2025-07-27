import React from "react";
import { Typography as MuiTypography, styled } from "@mui/material";
import type { TypographyProps as MuiTypographyProps } from "@mui/material";

interface CustomTypographyProps {
  gradient?: boolean;
  gradientType?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "sunset"
    | "ocean"
    | "travel";
}

type TypographyProps = MuiTypographyProps & CustomTypographyProps;

const GradientTypography = styled(MuiTypography)<{ gradientType: string }>(
  ({ theme, gradientType }) => ({
    background:
      theme.palette.gradients[
        gradientType as keyof typeof theme.palette.gradients
      ],
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    fontWeight: 700,
  })
);

export const Typography: React.FC<TypographyProps> = ({
  gradient = false,
  gradientType = "primary",
  children,
  ...props
}) => {
  if (gradient) {
    return (
      <GradientTypography gradientType={gradientType} {...props}>
        {children}
      </GradientTypography>
    );
  }

  return <MuiTypography {...props}>{children}</MuiTypography>;
};

// Specialized typography variants
export const Title: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="h1" {...props} />
);

export const Subtitle: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="h2" {...props} />
);

export const Heading: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="h3" {...props} />
);

export const Subheading: React.FC<Omit<TypographyProps, "variant">> = (
  props
) => <Typography variant="h4" {...props} />;

export const Body: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="body1" {...props} />
);

export const Caption: React.FC<Omit<TypographyProps, "variant">> = (props) => (
  <Typography variant="body2" {...props} />
);

export const GradientTitle: React.FC<
  Omit<TypographyProps, "variant" | "gradient">
> = (props) => (
  <Typography variant="h1" gradient gradientType="travel" {...props} />
);

export const GradientHeading: React.FC<
  Omit<TypographyProps, "variant" | "gradient">
> = (props) => (
  <Typography variant="h3" gradient gradientType="primary" {...props} />
);
