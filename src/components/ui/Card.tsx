import React from "react";
import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  CardActions as MuiCardActions,
  CardHeader as MuiCardHeader,
  Box,
} from "@mui/material";
import type { CardProps as MuiCardProps } from "@mui/material/Card";
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  TrendingFlat as TrendingFlatIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { gradients } from "../../theme/colors";
import { Typography } from "./Typography";

// Custom Card Props
interface CustomCardProps {
  cardVariant?: "default" | "elevated" | "outlined" | "hover" | "gradient";
  gradient?: keyof typeof gradients;
  hover?: boolean;
}

type CardProps = MuiCardProps & CustomCardProps;

const StyledCard = styled(MuiCard, {
  shouldForwardProp: (prop) =>
    !["cardVariant", "gradient", "hover"].includes(prop as string),
})<CustomCardProps>(({ theme, cardVariant, gradient, hover }) => {
  const baseStyles = {
    borderRadius: (theme.shape.borderRadius as number) * 2,
    transition: "all 0.3s ease-in-out",
  };

  if (cardVariant === "elevated") {
    return {
      ...baseStyles,
      boxShadow: theme.shadows[8],
      "&:hover": hover
        ? { transform: "translateY(-4px)", boxShadow: theme.shadows[16] }
        : {},
    };
  }

  if (cardVariant === "outlined") {
    return {
      ...baseStyles,
      border: `1px solid ${theme.palette.divider}`,
      boxShadow: "none",
    };
  }

  if (cardVariant === "hover") {
    return {
      ...baseStyles,
      cursor: "pointer",
      "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: theme.shadows[8],
      },
    };
  }

  if (cardVariant === "gradient") {
    const gradientValue = gradient ? gradients[gradient] : gradients.primary;
    return {
      ...baseStyles,
      background: gradientValue,
      color: "white",
      "& .MuiCardContent-root": {
        color: "white",
      },
    };
  }

  return {
    ...baseStyles,
    boxShadow: theme.shadows[2],
  };
});

// Main Card Component
export const Card: React.FC<CardProps> = ({
  cardVariant = "default",
  gradient,
  hover = false,
  children,
  ...props
}) => {
  const muiVariant = cardVariant === "outlined" ? "outlined" : "elevation";

  return (
    <StyledCard
      variant={muiVariant}
      cardVariant={cardVariant}
      gradient={gradient}
      hover={hover}
      {...props}
    >
      {children}
    </StyledCard>
  );
};

// Card Content
export const CardContent = MuiCardContent;
export const CardActions = MuiCardActions;
export const CardHeader = MuiCardHeader;

// Specialized Cards
interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <Card cardVariant="hover">
      <CardContent sx={{ p: 3 }}>
        {icon && <Box sx={{ mb: 2 }}>{icon}</Box>}
        <Typography variant="h6" gutterBottom fontWeight={600}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  trend = "neutral",
  icon,
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUpIcon sx={{ color: "success.main", fontSize: 20 }} />;
      case "down":
        return <TrendingDownIcon sx={{ color: "error.main", fontSize: 20 }} />;
      default:
        return (
          <TrendingFlatIcon sx={{ color: "text.secondary", fontSize: 20 }} />
        );
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "success.main";
      case "down":
        return "error.main";
      default:
        return "text.secondary";
    }
  };

  return (
    <Card cardVariant="elevated" hover>
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight="bold" color="text.primary">
              {value}
            </Typography>
            {subtitle && (
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                {getTrendIcon()}
                <Typography
                  variant="body2"
                  sx={{ ml: 0.5, color: getTrendColor() }}
                >
                  {subtitle}
                </Typography>
              </Box>
            )}
          </Box>
          {icon && (
            <Box
              sx={{
                ml: 2,
                p: 1.5,
                borderRadius: 2,
                backgroundColor: "background.default",
              }}
            >
              {icon}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
