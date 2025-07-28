import React from "react";
import { Box, Paper } from "@mui/material";
import {
  TrendingUp as TrendingUpIcon,
  AttachMoney as MoneyIcon,
  Flight as FlightIcon,
  Business as BusinessIcon,
  Event as EventIcon,
  Savings as SavingsIcon,
  Flag as PriorityIcon,
  Assignment as DraftIcon,
  HourglassEmpty as PendingIcon,
  Verified as ApprovedIcon,
  Group as ConferenceIcon,
  School as TrainingIcon,
  People as ClientMeetingIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";
import { StatsCard } from "../ui/Card";
import { Typography } from "../ui/Typography";
import type { TripStats as TripStatsType } from "../../types/api";

interface TripStatsProps {
  stats: TripStatsType;
  loading?: boolean;
}

export const TripStats: React.FC<TripStatsProps> = ({
  stats,
  loading = false,
}) => {
  if (loading) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="body1" color="text.secondary">
          Loading statistics...
        </Typography>
      </Box>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const savingsPercentage =
    stats.total_budget > 0
      ? (
          ((stats.total_budget - stats.total_spent) / stats.total_budget) *
          100
        ).toFixed(1)
      : "0";

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "draft":
        return <DraftIcon sx={{ fontSize: 16, color: "text.secondary" }} />;
      case "submitted":
        return <PendingIcon sx={{ fontSize: 16, color: "warning.main" }} />;
      case "approved":
        return <ApprovedIcon sx={{ fontSize: 16, color: "success.main" }} />;
      default:
        return <BusinessIcon sx={{ fontSize: 16, color: "text.secondary" }} />;
    }
  };

  const getPurposeIcon = (purpose: string) => {
    switch (purpose) {
      case "business":
        return <BusinessIcon sx={{ fontSize: 16, color: "text.secondary" }} />;
      case "conference":
        return <ConferenceIcon sx={{ fontSize: 16, color: "primary.main" }} />;
      case "training":
        return <TrainingIcon sx={{ fontSize: 16, color: "success.main" }} />;
      case "client_meeting":
        return (
          <ClientMeetingIcon sx={{ fontSize: 16, color: "warning.main" }} />
        );
      default:
        return <EventIcon sx={{ fontSize: 16, color: "primary.main" }} />;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <ErrorIcon sx={{ fontSize: 16, color: "error.main" }} />;
      case "high":
        return <WarningIcon sx={{ fontSize: 16, color: "warning.main" }} />;
      case "medium":
        return <InfoIcon sx={{ fontSize: 16, color: "primary.main" }} />;
      case "low":
        return <PriorityIcon sx={{ fontSize: 16, color: "text.secondary" }} />;
      default:
        return <PriorityIcon sx={{ fontSize: 16, color: "text.secondary" }} />;
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto" }}>
      {/* Overview Stats */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 2,
          mb: 4,
        }}
      >
        <StatsCard
          title="Total Trips"
          value={stats.total_trips.toString()}
          subtitle="All time"
          trend="up"
          icon={<FlightIcon sx={{ fontSize: 24, color: "primary.main" }} />}
        />

        <StatsCard
          title="Total Budget"
          value={formatCurrency(stats.total_budget)}
          subtitle="Allocated"
          trend="up"
          icon={<MoneyIcon sx={{ fontSize: 24, color: "success.main" }} />}
        />

        <StatsCard
          title="Total Spent"
          value={formatCurrency(stats.total_spent)}
          subtitle="Actual costs"
          trend={stats.total_spent > stats.total_budget ? "down" : "up"}
          icon={
            <TrendingUpIcon
              sx={{
                fontSize: 24,
                color:
                  stats.total_spent > stats.total_budget
                    ? "error.main"
                    : "success.main",
              }}
            />
          }
        />

        <StatsCard
          title="Budget Savings"
          value={`${savingsPercentage}%`}
          subtitle="Under budget"
          trend={parseFloat(savingsPercentage) > 0 ? "up" : "down"}
          icon={
            <SavingsIcon
              sx={{
                fontSize: 24,
                color:
                  parseFloat(savingsPercentage) > 0
                    ? "success.main"
                    : "error.main",
              }}
            />
          }
        />
      </Box>

      {/* Breakdown Sections */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 3,
        }}
      >
        {/* Status Breakdown */}
        <Paper
          sx={{
            p: 3,
            borderRadius: 2,
            backgroundColor: "background.paper",
            border: "1px solid #E0E0E0",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "text.primary",
              mb: 2,
              fontWeight: 600,
              fontSize: "1rem",
            }}
          >
            Trip Status
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {Object.entries(stats.by_status).map(([status, count]) => (
              <Box
                key={status}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  py: 1,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {getStatusIcon(status)}
                  <Typography
                    variant="body2"
                    sx={{ textTransform: "capitalize", color: "text.primary" }}
                  >
                    {status.replace("_", " ")}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "text.primary" }}
                >
                  {count}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>

        {/* Purpose Breakdown */}
        <Paper
          sx={{
            p: 3,
            borderRadius: 2,
            backgroundColor: "background.paper",
            border: "1px solid #E0E0E0",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "text.primary",
              mb: 2,
              fontWeight: 600,
              fontSize: "1rem",
            }}
          >
            Trip Purpose
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {Object.entries(stats.by_purpose).map(([purpose, count]) => (
              <Box
                key={purpose}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  py: 1,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {getPurposeIcon(purpose)}
                  <Typography
                    variant="body2"
                    sx={{ textTransform: "capitalize", color: "text.primary" }}
                  >
                    {purpose.replace("_", " ")}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "text.primary" }}
                >
                  {count}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>

        {/* Priority Breakdown */}
        <Paper
          sx={{
            p: 3,
            borderRadius: 2,
            backgroundColor: "background.paper",
            border: "1px solid #E0E0E0",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "text.primary",
              mb: 2,
              fontWeight: 600,
              fontSize: "1rem",
            }}
          >
            Trip Priority
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {Object.entries(stats.by_priority).map(([priority, count]) => (
              <Box
                key={priority}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  py: 1,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {getPriorityIcon(priority)}
                  <Typography
                    variant="body2"
                    sx={{ textTransform: "capitalize", color: "text.primary" }}
                  >
                    {priority}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "text.primary" }}
                >
                  {count}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
