import React from "react";
import { Chip } from "@mui/material";
import type { Trip } from "../../types/api";

interface TripPriorityBadgeProps {
  priority: Trip["priority"];
  size?: "small" | "medium";
}

const priorityConfig = {
  low: {
    label: "Low",
    color: "#757575" as const,
    bgColor: "#FAFAFA" as const,
  },
  medium: {
    label: "Medium",
    color: "#FF9800" as const,
    bgColor: "#FFF3E0" as const,
  },
  high: {
    label: "High",
    color: "#FF5722" as const,
    bgColor: "#FFF3E0" as const,
  },
  urgent: {
    label: "Urgent",
    color: "#F44336" as const,
    bgColor: "#FFEBEE" as const,
  },
};

export const TripPriorityBadge: React.FC<TripPriorityBadgeProps> = ({
  priority,
  size = "small",
}) => {
  const config = priorityConfig[priority];

  return (
    <Chip
      label={config.label}
      size={size}
      variant="outlined"
      sx={{
        backgroundColor: config.bgColor,
        color: config.color,
        borderColor: config.color,
        fontWeight: 500,
        "& .MuiChip-label": {
          fontSize: size === "small" ? "0.75rem" : "0.875rem",
        },
      }}
    />
  );
};
