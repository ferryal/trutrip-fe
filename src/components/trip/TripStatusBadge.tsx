import React from "react";
import { Chip } from "@mui/material";
import type { Trip } from "../../types/api";

interface TripStatusBadgeProps {
  status: Trip["status"];
  size?: "small" | "medium";
}

const statusConfig = {
  draft: {
    label: "Draft",
    color: "#9E9E9E" as const,
    bgColor: "#F5F5F5" as const,
  },
  submitted: {
    label: "Submitted",
    color: "#FF9800" as const,
    bgColor: "#FFF3E0" as const,
  },
  approved: {
    label: "Approved",
    color: "#4CAF50" as const,
    bgColor: "#E8F5E8" as const,
  },
  rejected: {
    label: "Rejected",
    color: "#F44336" as const,
    bgColor: "#FFEBEE" as const,
  },
  in_progress: {
    label: "In Progress",
    color: "#2196F3" as const,
    bgColor: "#E3F2FD" as const,
  },
  completed: {
    label: "Completed",
    color: "#009688" as const,
    bgColor: "#E0F2F1" as const,
  },
};

export const TripStatusBadge: React.FC<TripStatusBadgeProps> = ({
  status,
  size = "small",
}) => {
  const config = statusConfig[status];

  return (
    <Chip
      label={config.label}
      size={size}
      sx={{
        backgroundColor: config.bgColor,
        color: config.color,
        fontWeight: 600,
        border: `1px solid ${config.color}20`,
        "& .MuiChip-label": {
          fontSize: size === "small" ? "0.75rem" : "0.875rem",
        },
      }}
    />
  );
};
