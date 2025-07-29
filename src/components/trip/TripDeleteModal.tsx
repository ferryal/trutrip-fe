import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import { Button } from "../ui/Button";
import { Typography } from "../ui/Typography";
import type { Trip } from "../../types/api";

interface TripDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  trip: Trip | null;
  loading?: boolean;
}

export const TripDeleteModal: React.FC<TripDeleteModalProps> = ({
  open,
  onClose,
  onConfirm,
  trip,
  loading = false,
}) => {
  if (!trip) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WarningIcon color="error" />
          <Typography variant="h6">Delete Trip</Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ py: 1 }}>
          <Typography variant="body1" gutterBottom>
            Are you sure you want to delete this trip? This action cannot be
            undone.
          </Typography>

          <Box
            sx={{
              mt: 2,
              p: 2,
              backgroundColor: "grey.50",
              borderRadius: 1,
              border: "1px solid",
              borderColor: "grey.200",
            }}
          >
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Trip Details:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Title:</strong> {trip.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Destination:</strong> {trip.destination_city},{" "}
              {trip.destination_country}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Dates:</strong>{" "}
              {new Date(trip.start_date).toLocaleDateString()} -{" "}
              {new Date(trip.end_date).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 1 }}>
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={loading}
          sx={{ flex: 1 }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
          disabled={loading}
          startIcon={<DeleteIcon />}
          sx={{ flex: 1 }}
        >
          {loading ? "Deleting..." : "Delete Trip"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
