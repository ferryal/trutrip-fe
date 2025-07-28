import React from "react";
import { Box, IconButton, Menu, MenuItem, Divider } from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
} from "@mui/icons-material";
import { Card, CardContent, CardActions } from "../ui/Card";
import { Typography } from "../ui/Typography";
import { Button } from "../ui/Button";
import { Row, Column } from "../shared/Layout";
import { TripStatusBadge } from "./TripStatusBadge";
import { TripPriorityBadge } from "./TripPriorityBadge";
import type { Trip } from "../../types/api";

interface TripCardProps {
  trip: Trip;
  onView?: (trip: Trip) => void;
  onEdit?: (trip: Trip) => void;
  onDelete?: (trip: Trip) => void;
  onUpdateStatus?: (trip: Trip, status: Trip["status"]) => void;
  showActions?: boolean;
}

export const TripCard: React.FC<TripCardProps> = ({
  trip,
  onView,
  onEdit,
  onDelete,
  onUpdateStatus,
  showActions = true,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatCurrency = (amount: number | undefined) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getDaysUntil = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilStart = getDaysUntil(trip.start_date);

  return (
    <Card cardVariant="elevated" hover>
      <CardContent sx={{ p: 2.5 }}>
        {/* Header */}
        <Row
          sx={{
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 1.5,
          }}
        >
          <Column spacing={0.5}>
            <Typography
              variant="h6"
              sx={{ fontSize: "1.1rem", lineHeight: 1.3 }}
            >
              {trip.title}
            </Typography>
            <Row spacing={0.5} sx={{ alignItems: "center" }}>
              <TripStatusBadge status={trip.status} size="small" />
              <TripPriorityBadge priority={trip.priority} size="small" />
            </Row>
          </Column>
          {showActions && (
            <IconButton onClick={handleMenuClick} size="small">
              <MoreVertIcon fontSize="small" />
            </IconButton>
          )}
        </Row>

        {/* Destination */}
        <Column spacing={1} sx={{ mb: 1.5 }}>
          <Row spacing={1.5} sx={{ alignItems: "center" }}>
            <Row spacing={0.5} sx={{ alignItems: "center", flex: 1 }}>
              <LocationIcon color="primary" fontSize="small" />
              <Typography variant="body2" fontWeight={600}>
                {trip.destination_city}, {trip.destination_country}
              </Typography>
            </Row>
            {daysUntilStart > 0 && (
              <Typography
                variant="body2"
                color="primary.main"
                fontWeight={600}
                sx={{ fontSize: "0.8rem" }}
              >
                {daysUntilStart} days to go
              </Typography>
            )}
          </Row>
        </Column>

        {/* Trip Details */}
        <Column spacing={1}>
          <Row spacing={1.5} sx={{ alignItems: "center" }}>
            <Row spacing={0.5} sx={{ alignItems: "center", flex: 1 }}>
              <CalendarIcon fontSize="small" color="action" />
              <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
                {formatDate(trip.start_date)} - {formatDate(trip.end_date)}
              </Typography>
            </Row>
            <Row spacing={0.5} sx={{ alignItems: "center" }}>
              <PersonIcon fontSize="small" color="action" />
              <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
                {trip.user?.full_name || "Unknown"} •{" "}
                {trip.user?.department || "N/A"}
              </Typography>
            </Row>
          </Row>

          <Row spacing={1.5} sx={{ alignItems: "center" }}>
            <Row spacing={0.5} sx={{ alignItems: "center", flex: 1 }}>
              <BusinessIcon fontSize="small" color="action" />
              <Typography
                variant="body2"
                textTransform="capitalize"
                sx={{ fontSize: "0.85rem" }}
              >
                {trip.purpose.replace("_", " ")}
              </Typography>
            </Row>
            <Row spacing={0.5} sx={{ alignItems: "center" }}>
              <MoneyIcon fontSize="small" color="action" />
              <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
                {formatCurrency(trip.total_budget)}
              </Typography>
            </Row>
          </Row>
        </Column>

        {/* AI Recommendations Preview */}
        {trip.ai_recommendations && trip.ai_recommendations.length > 0 && (
          <Box
            sx={{
              mt: 1.5,
              p: 1.5,
              bgcolor: "background.dark",
              borderRadius: 1,
            }}
          >
            <Typography
              variant="body2"
              color="primary.main"
              fontWeight={600}
              sx={{ fontSize: "0.8rem" }}
            >
              🤖 AI Recommendations Available
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "0.75rem" }}
            >
              {trip.ai_recommendations.length} recommendation
              {trip.ai_recommendations.length > 1 ? "s" : ""} ready
            </Typography>
          </Box>
        )}
      </CardContent>

      {showActions && (
        <CardActions sx={{ px: 2.5, py: 1.5, bgcolor: "background.dark" }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => onView?.(trip)}
            sx={{ fontSize: "0.8rem" }}
          >
            View Details
          </Button>
          {trip.status === "draft" && (
            <Button
              variant="contained"
              size="small"
              onClick={() => onEdit?.(trip)}
              sx={{ fontSize: "0.8rem" }}
            >
              Edit Trip
            </Button>
          )}
        </CardActions>
      )}

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            onView?.(trip);
            handleMenuClose();
          }}
        >
          View Details
        </MenuItem>
        {trip.status === "draft" && (
          <MenuItem
            onClick={() => {
              onEdit?.(trip);
              handleMenuClose();
            }}
          >
            Edit Trip
          </MenuItem>
        )}
        {trip.status === "draft" && (
          <MenuItem
            onClick={() => {
              onUpdateStatus?.(trip, "submitted");
              handleMenuClose();
            }}
          >
            Submit for Approval
          </MenuItem>
        )}
        {(trip.status === "submitted" || trip.status === "approved") && (
          <MenuItem
            onClick={() => {
              onUpdateStatus?.(trip, "draft");
              handleMenuClose();
            }}
          >
            Move to Draft
          </MenuItem>
        )}
        <Divider />
        <MenuItem
          onClick={() => {
            onDelete?.(trip);
            handleMenuClose();
          }}
          sx={{ color: "error.main" }}
        >
          Delete Trip
        </MenuItem>
      </Menu>
    </Card>
  );
};
