import React from "react";
import { Button as MuiButton, styled } from "@mui/material";
import type { ButtonProps as MuiButtonProps } from "@mui/material";

interface CustomButtonProps {
  variant?: "contained" | "outlined" | "text" | "gradient";
  color?: "primary" | "secondary" | "success" | "warning" | "error";
  gradient?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "sunset"
    | "ocean"
    | "travel";
  children?: React.ReactNode;
}

type ButtonProps = Omit<MuiButtonProps, "variant" | "color"> &
  CustomButtonProps;

const GradientButton = styled(MuiButton)<{ gradientType: string }>(
  ({ theme, gradientType }) => ({
    background:
      theme.palette.gradients[
        gradientType as keyof typeof theme.palette.gradients
      ],
    color: "#FFFFFF",
    fontWeight: 600,
    "&:hover": {
      background:
        theme.palette.gradients[
          gradientType as keyof typeof theme.palette.gradients
        ],
      transform: "translateY(-2px)",
      boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.2)",
    },
  })
);

export const Button: React.FC<ButtonProps> = ({
  variant = "contained",
  color = "primary",
  gradient,
  children,
  ...props
}) => {
  if (variant === "gradient" && gradient) {
    return (
      <GradientButton gradientType={gradient} {...props}>
        {children}
      </GradientButton>
    );
  }

  return (
    <MuiButton
      variant={variant as "contained" | "outlined" | "text"}
      color={color}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

// Specialized button variants
export const PrimaryButton: React.FC<Omit<ButtonProps, "color">> = (props) => (
  <Button color="primary" {...props} />
);

export const SecondaryButton: React.FC<Omit<ButtonProps, "color">> = (
  props
) => <Button color="secondary" {...props} />;

export const GradientButton1: React.FC<
  Omit<ButtonProps, "variant" | "gradient">
> = (props) => <Button variant="gradient" gradient="travel" {...props} />;

export const SuccessButton: React.FC<Omit<ButtonProps, "color">> = (props) => (
  <Button color="success" {...props} />
);

export const WarningButton: React.FC<Omit<ButtonProps, "color">> = (props) => (
  <Button color="warning" {...props} />
);

export const ErrorButton: React.FC<Omit<ButtonProps, "color">> = (props) => (
  <Button color="error" {...props} />
);
