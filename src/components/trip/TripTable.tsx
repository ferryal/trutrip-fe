import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  TablePagination,
  CircularProgress,
  Alert,
  Box,
  Tooltip,
} from "@mui/material";
import {
  MoreVert as MoreVertIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { Typography, Heading } from "../ui/Typography";
import { Button } from "../ui/Button";
import { Row } from "../shared/Layout";
import { TripStatusBadge } from "./TripStatusBadge";
import { TripPriorityBadge } from "./TripPriorityBadge";
import type { Trip, PaginatedResponse } from "../../types/api";

interface TripTableProps {
  data?: PaginatedResponse<Trip>;
  loading?: boolean;
  error?: string | null;
  title?: string;
  showCreateButton?: boolean;
  onCreateTrip?: () => void;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onViewTrip?: (trip: Trip) => void;
  onEditTrip?: (trip: Trip) => void;
  onDeleteTrip?: (trip: Trip) => void;
  onUpdateTripStatus?: (trip: Trip, status: Trip["status"]) => void;
}

export const TripTable: React.FC<TripTableProps> = ({
  data,
  loading = false,
  error = null,
  title = "Trips",
  showCreateButton = false,
  onCreateTrip,
  onPageChange,
  onRowsPerPageChange,
  onViewTrip,
  onEditTrip,
  onDeleteTrip,
  onUpdateTripStatus,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<{
    [key: string]: HTMLElement | null;
  }>({});

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    tripId: string
  ) => {
    setAnchorEl((prev) => ({ ...prev, [tripId]: event.currentTarget }));
  };

  const handleMenuClose = (tripId: string) => {
    setAnchorEl((prev) => ({ ...prev, [tripId]: null }));
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

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        Error loading trips: {error}
      </Alert>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No trips found
        </Typography>
        {showCreateButton && onCreateTrip && (
          <Button variant="contained" onClick={onCreateTrip} sx={{ mt: 2 }}>
            Create Your First Trip
          </Button>
        )}
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Row
        sx={{ justifyContent: "space-between", alignItems: "center", mb: 3 }}
      >
        <Heading>{title}</Heading>
        {showCreateButton && onCreateTrip && (
          <Button variant="gradient" gradient="travel" onClick={onCreateTrip}>
            Create New Trip
          </Button>
        )}
      </Row>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Trip Details</TableCell>
                <TableCell>Destination</TableCell>
                <TableCell>Traveler</TableCell>
                <TableCell>Dates</TableCell>
                <TableCell>Budget</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data.map((trip) => {
                const daysUntilStart = getDaysUntil(trip.start_date);
                const isOpen = Boolean(anchorEl[trip.id]);

                return (
                  <TableRow key={trip.id} hover>
                    {/* Trip Details */}
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {trip.title}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mt: 0.5,
                          }}
                        >
                          <BusinessIcon
                            fontSize="small"
                            sx={{ mr: 0.5, color: "text.secondary" }}
                          />
                          <Typography
                            variant="caption"
                            textTransform="capitalize"
                          >
                            {trip.purpose.replace("_", " ")}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    {/* Destination */}
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LocationIcon
                          fontSize="small"
                          sx={{ mr: 0.5, color: "primary.main" }}
                        />
                        <Box>
                          <Typography variant="body2" fontWeight={600}>
                            {trip.destination_city}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {trip.destination_country}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    {/* Traveler */}
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <PersonIcon
                          fontSize="small"
                          sx={{ mr: 0.5, color: "text.secondary" }}
                        />
                        <Box>
                          <Typography variant="body2">
                            {trip.user?.full_name || "Unknown"}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {trip.user?.department || "N/A"}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    {/* Dates */}
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CalendarIcon
                          fontSize="small"
                          sx={{ mr: 0.5, color: "text.secondary" }}
                        />
                        <Box>
                          <Typography variant="body2">
                            {formatDate(trip.start_date)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            to {formatDate(trip.end_date)}
                          </Typography>
                          {daysUntilStart > 0 && (
                            <Typography
                              variant="caption"
                              color="primary.main"
                              sx={{ display: "block" }}
                            >
                              {daysUntilStart} days to go
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </TableCell>

                    {/* Budget */}
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <MoneyIcon
                          fontSize="small"
                          sx={{ mr: 0.5, color: "text.secondary" }}
                        />
                        <Box>
                          <Typography variant="body2" fontWeight={600}>
                            {formatCurrency(trip.total_budget)}
                          </Typography>
                          {trip.actual_cost && trip.actual_cost > 0 && (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Spent: {formatCurrency(trip.actual_cost)}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <TripStatusBadge status={trip.status} />
                    </TableCell>

                    {/* Priority */}
                    <TableCell>
                      <TripPriorityBadge priority={trip.priority} />
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => onViewTrip?.(trip)}
                            sx={{ mr: 1 }}
                          >
                            <ViewIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        {trip.status === "draft" && (
                          <Tooltip title="Edit Trip">
                            <IconButton
                              size="small"
                              onClick={() => onEditTrip?.(trip)}
                              sx={{ mr: 1 }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}

                        <IconButton
                          size="small"
                          onClick={(event) => handleMenuClick(event, trip.id)}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>

                        <Menu
                          anchorEl={anchorEl[trip.id]}
                          open={isOpen}
                          onClose={() => handleMenuClose(trip.id)}
                          transformOrigin={{
                            horizontal: "right",
                            vertical: "top",
                          }}
                          anchorOrigin={{
                            horizontal: "right",
                            vertical: "bottom",
                          }}
                        >
                          <MenuItem
                            onClick={() => {
                              onViewTrip?.(trip);
                              handleMenuClose(trip.id);
                            }}
                          >
                            <ViewIcon fontSize="small" sx={{ mr: 1 }} />
                            View Details
                          </MenuItem>

                          {trip.status === "draft" && (
                            <MenuItem
                              onClick={() => {
                                onEditTrip?.(trip);
                                handleMenuClose(trip.id);
                              }}
                            >
                              <EditIcon fontSize="small" sx={{ mr: 1 }} />
                              Edit Trip
                            </MenuItem>
                          )}

                          {trip.status === "draft" && (
                            <MenuItem
                              onClick={() => {
                                onUpdateTripStatus?.(trip, "submitted");
                                handleMenuClose(trip.id);
                              }}
                            >
                              Submit for Approval
                            </MenuItem>
                          )}

                          {(trip.status === "submitted" ||
                            trip.status === "approved") && (
                            <MenuItem
                              onClick={() => {
                                onUpdateTripStatus?.(trip, "draft");
                                handleMenuClose(trip.id);
                              }}
                            >
                              Move to Draft
                            </MenuItem>
                          )}

                          <Divider />
                          <MenuItem
                            onClick={() => {
                              onDeleteTrip?.(trip);
                              handleMenuClose(trip.id);
                            }}
                            sx={{ color: "error.main" }}
                          >
                            <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                            Delete Trip
                          </MenuItem>
                        </Menu>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={data.pagination.total}
          page={data.pagination.page - 1}
          onPageChange={(_, newPage) => onPageChange(newPage + 1)}
          rowsPerPage={data.pagination.limit}
          onRowsPerPageChange={(event) =>
            onRowsPerPageChange(parseInt(event.target.value, 10))
          }
          rowsPerPageOptions={[5, 10, 25, 50]}
          showFirstButton
          showLastButton
        />
      </Paper>
    </Box>
  );
};
