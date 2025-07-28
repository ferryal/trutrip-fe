import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Button } from "../ui/Button";
import { Typography } from "../ui/Typography";
import type { Trip, TripFormData, TripFormErrors } from "../../types/api";

interface TripFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: TripFormData) => void;
  trip?: Trip | null;
  loading?: boolean;
  error?: string | null;
  companies?: Array<{ id: string; name: string }>;
  users?: Array<{ id: string; full_name: string; department: string }>;
}

const initialFormData: TripFormData = {
  title: "",
  description: "",
  user_id: "",
  company_id: "",
  destination_city: "",
  destination_country: "",
  purpose: "business",
  start_date: "",
  end_date: "",
  total_budget: undefined,
  priority: "medium",
};

const validateForm = (data: TripFormData): TripFormErrors => {
  const errors: TripFormErrors = {};

  if (!data.title.trim()) {
    errors.title = "Trip title is required";
  }

  if (!data.destination_city.trim()) {
    errors.destination_city = "Destination city is required";
  }

  if (!data.destination_country.trim()) {
    errors.destination_country = "Destination country is required";
  }

  if (!data.user_id) {
    errors.user_id = "Traveler is required";
  }

  if (!data.company_id) {
    errors.company_id = "Company is required";
  }

  if (!data.start_date) {
    errors.start_date = "Start date is required";
  }

  if (!data.end_date) {
    errors.end_date = "End date is required";
  }

  if (data.start_date && data.end_date) {
    const startDate = new Date(data.start_date);
    const endDate = new Date(data.end_date);

    if (startDate >= endDate) {
      errors.end_date = "End date must be after start date";
    }

    // Check if start date is in the past (allow same day)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);

    if (startDate < today) {
      errors.start_date = "Start date cannot be in the past";
    }
  }

  if (data.total_budget !== undefined && data.total_budget <= 0) {
    errors.total_budget = "Budget must be greater than 0";
  }

  return errors;
};

export const TripFormModal: React.FC<TripFormModalProps> = ({
  open,
  onClose,
  onSubmit,
  trip = null,
  loading = false,
  error = null,
  companies = [],
  users = [],
}) => {
  const [formData, setFormData] = React.useState<TripFormData>(initialFormData);
  const [errors, setErrors] = React.useState<TripFormErrors>({});
  const isEditing = Boolean(trip);

  React.useEffect(() => {
    if (trip) {
      setFormData({
        title: trip.title,
        description: trip.description || "",
        user_id: trip.user_id,
        company_id: trip.company_id,
        destination_city: trip.destination_city,
        destination_country: trip.destination_country,
        purpose: trip.purpose,
        start_date: trip.start_date,
        end_date: trip.end_date,
        total_budget: trip.total_budget,
        priority: trip.priority,
      });
    } else {
      setFormData(initialFormData);
    }
    setErrors({});
  }, [trip, open]);

  const handleInputChange = (field: keyof TripFormData) => (event: any) => {
    const value = event.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (field in errors) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleDateChange =
    (field: "start_date" | "end_date") => (date: Date | null) => {
      if (date) {
        setFormData((prev) => ({
          ...prev,
          [field]: date.toISOString().split("T")[0],
        }));

        // Clear error when user selects date
        if (errors[field]) {
          setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
      }
    };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData);
  };

  const handleClose = () => {
    setFormData(initialFormData);
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          <Typography variant="h6">
            {isEditing ? "Edit Trip" : "Create New Trip"}
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Trip Title */}
            <TextField
              fullWidth
              label="Trip Title"
              value={formData.title}
              onChange={handleInputChange("title")}
              error={Boolean(errors.title)}
              helperText={errors.title}
              required
            />

            {/* Description */}
            <TextField
              fullWidth
              label="Description"
              value={formData.description}
              onChange={handleInputChange("description")}
              multiline
              rows={3}
              placeholder="Brief description of the trip purpose and objectives..."
            />

            {/* Traveler and Company */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 3,
              }}
            >
              <FormControl fullWidth error={Boolean(errors.user_id)} required>
                <InputLabel>Traveler</InputLabel>
                <Select
                  value={formData.user_id}
                  label="Traveler"
                  onChange={handleInputChange("user_id")}
                >
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.full_name} - {user.department}
                    </MenuItem>
                  ))}
                </Select>
                {errors.user_id && (
                  <FormHelperText>{errors.user_id}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                error={Boolean(errors.company_id)}
                required
              >
                <InputLabel>Company</InputLabel>
                <Select
                  value={formData.company_id}
                  label="Company"
                  onChange={handleInputChange("company_id")}
                >
                  {companies.map((company) => (
                    <MenuItem key={company.id} value={company.id}>
                      {company.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.company_id && (
                  <FormHelperText>{errors.company_id}</FormHelperText>
                )}
              </FormControl>
            </Box>

            {/* Destination */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 3,
              }}
            >
              <TextField
                fullWidth
                label="Destination City"
                value={formData.destination_city}
                onChange={handleInputChange("destination_city")}
                error={Boolean(errors.destination_city)}
                helperText={errors.destination_city}
                required
              />

              <TextField
                fullWidth
                label="Destination Country"
                value={formData.destination_country}
                onChange={handleInputChange("destination_country")}
                error={Boolean(errors.destination_country)}
                helperText={errors.destination_country}
                required
              />
            </Box>

            {/* Purpose and Priority */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 3,
              }}
            >
              <FormControl fullWidth>
                <InputLabel>Purpose</InputLabel>
                <Select
                  value={formData.purpose}
                  label="Purpose"
                  onChange={handleInputChange("purpose")}
                >
                  <MenuItem value="business">Business</MenuItem>
                  <MenuItem value="conference">Conference</MenuItem>
                  <MenuItem value="training">Training</MenuItem>
                  <MenuItem value="client_meeting">Client Meeting</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={formData.priority}
                  label="Priority"
                  onChange={handleInputChange("priority")}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="urgent">Urgent</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Dates */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 3,
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Start Date"
                  value={
                    formData.start_date ? new Date(formData.start_date) : null
                  }
                  onChange={handleDateChange("start_date")}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: Boolean(errors.start_date),
                      helperText: errors.start_date,
                      required: true,
                    },
                  }}
                  minDate={new Date()}
                />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="End Date"
                  value={formData.end_date ? new Date(formData.end_date) : null}
                  onChange={handleDateChange("end_date")}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: Boolean(errors.end_date),
                      helperText: errors.end_date,
                      required: true,
                    },
                  }}
                  minDate={
                    formData.start_date
                      ? new Date(formData.start_date)
                      : new Date()
                  }
                />
              </LocalizationProvider>
            </Box>

            {/* Budget */}
            <TextField
              fullWidth
              label="Total Budget"
              type="number"
              value={formData.total_budget || ""}
              onChange={handleInputChange("total_budget")}
              error={Boolean(errors.total_budget)}
              helperText={errors.total_budget}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              inputProps={{ min: 0, step: 100 }}
              sx={{ maxWidth: { sm: "50%" } }}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button variant="outlined" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="gradient"
            gradient="travel"
            loading={loading}
            disabled={loading}
          >
            {isEditing ? "Update Trip" : "Create Trip"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
