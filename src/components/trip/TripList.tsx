import React from "react";
import { Box, CircularProgress, Alert } from "@mui/material";
import { TripCard } from "./TripCard";
import { Column, Row } from "../shared/Layout";
import { Typography, Heading } from "../ui/Typography";
import { Button } from "../ui/Button";
import { Pagination } from "../shared/Pagination";
import type { Trip, PaginatedResponse } from "../../types/api";

interface TripListProps {
  data?: PaginatedResponse<Trip>;
  loading?: boolean;
  error?: string | null;
  title?: string;
  showCreateButton?: boolean;
  onCreateTrip?: () => void;
  onViewTrip?: (trip: Trip) => void;
  onEditTrip?: (trip: Trip) => void;
  onDeleteTrip?: (trip: Trip) => void;
  onUpdateTripStatus?: (trip: Trip, status: Trip["status"]) => void;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  emptyMessage?: string;
}

export const TripList: React.FC<TripListProps> = ({
  data,
  loading = false,
  error = null,
  title = "Trips",
  showCreateButton = false,
  onCreateTrip,
  onViewTrip,
  onEditTrip,
  onDeleteTrip,
  onUpdateTripStatus,
  onPageChange,
  onRowsPerPageChange,
  emptyMessage = "No trips found",
}) => {
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

  if (!data) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          Loading trips...
        </Typography>
      </Box>
    );
  }

  return (
    <Column spacing={3}>
      {/* Header */}
      <Row sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Heading>{title}</Heading>
        {showCreateButton && onCreateTrip && (
          <Button variant="gradient" gradient="travel" onClick={onCreateTrip}>
            Create New Trip
          </Button>
        )}
      </Row>

      {/* Trip Cards */}
      {data.data.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {emptyMessage}
          </Typography>
          {showCreateButton && onCreateTrip && (
            <Button variant="contained" onClick={onCreateTrip} sx={{ mt: 2 }}>
              Create Your First Trip
            </Button>
          )}
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
              gap: 3,
            }}
          >
            {data.data.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onView={onViewTrip}
                onEdit={onEditTrip}
                onDelete={onDeleteTrip}
                onUpdateStatus={onUpdateTripStatus}
              />
            ))}
          </Box>

          {/* Pagination */}
          <Pagination
            data={data}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
          />
        </>
      )}
    </Column>
  );
};
