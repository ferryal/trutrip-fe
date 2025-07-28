import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import {
  Box,
  Tab,
  Tabs,
  Alert,
  Snackbar,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Search as SearchIcon,
  BarChart as StatsIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import {
  useTrips,
  useTripStats,
  useUpdateTripStatus,
  useDeleteTrip,
  useCreateTrip,
  useUpdateTrip,
} from "../hooks/useTrips";
import { getCompanies, getUsersByCompany } from "../services/companyService";
import {
  TripList,
  TripTable,
  TripStats,
  TripFormModal,
  TripDetailModal,
  ViewToggle,
  Container,
  Section,
  Row,
  Button,
} from "../components";
import { GradientTitle, Heading } from "../components/ui/Typography";
import type {
  Trip,
  TripFilters,
  ViewMode,
  PaginationParams,
  TripFormData,
} from "../types/api";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  // UI State
  const [activeTab, setActiveTab] = React.useState(0);
  const [viewMode, setViewMode] = React.useState<ViewMode>("card");
  const [pagination, setPagination] = React.useState<PaginationParams>({
    page: 1,
    limit: 10,
  });
  const [filters, setFilters] = React.useState<TripFilters>({});
  const [searchTerm, setSearchTerm] = React.useState("");

  // Modal State
  const [tripFormModal, setTripFormModal] = React.useState<{
    open: boolean;
    trip: Trip | null;
    mode: "create" | "edit";
  }>({ open: false, trip: null, mode: "create" });

  const [tripDetailModal, setTripDetailModal] = React.useState<{
    open: boolean;
    trip: Trip | null;
  }>({ open: false, trip: null });

  const [statsModal, setStatsModal] = React.useState(false);

  // Snackbar State
  const [snackbar, setSnackbar] = React.useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info";
  }>({ open: false, message: "", severity: "info" });

  // Companies and Users for form
  const [companies, setCompanies] = React.useState<
    Array<{ id: string; name: string }>
  >([]);
  const [users, setUsers] = React.useState<
    Array<{ id: string; full_name: string; department: string }>
  >([]);

  // Build filters based on active tab and search
  const getFiltersForTab = () => {
    const baseFilters: TripFilters = {
      ...filters,
      ...(searchTerm && { search: searchTerm }),
    };

    switch (activeTab) {
      case 1:
        return { ...baseFilters, status: "draft" as const };
      case 2:
        return { ...baseFilters, status: "submitted" as const };
      case 3:
        return { ...baseFilters, status: "approved" as const };
      default:
        return baseFilters; // Recent trips - no status filter
    }
  };

  // API Hooks
  const {
    data: tripsData,
    isLoading: tripsLoading,
    error: tripsError,
  } = useTrips(getFiltersForTab(), pagination);

  const { data: stats, isLoading: statsLoading } = useTripStats();
  const updateTripStatusMutation = useUpdateTripStatus();
  const deleteTripMutation = useDeleteTrip();
  const createTripMutation = useCreateTrip();
  const updateTripMutation = useUpdateTrip();

  // Load companies and users on mount
  React.useEffect(() => {
    const loadData = async () => {
      try {
        const companiesData = await getCompanies();
        setCompanies(companiesData);

        if (companiesData.length > 0) {
          const usersData = await getUsersByCompany(companiesData[0].id);
          setUsers(usersData);
        }
      } catch (error) {
        console.error("Failed to load companies/users:", error);
      }
    };

    loadData();
  }, []);

  // Event Handlers
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const handleRowsPerPageChange = (limit: number) => {
    setPagination({ page: 1, limit });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page
  };

  // CRUD Handlers
  const handleCreateTrip = () => {
    setTripFormModal({ open: true, trip: null, mode: "create" });
  };

  const handleEditTrip = (trip: Trip) => {
    setTripFormModal({ open: true, trip, mode: "edit" });
  };

  const handleViewTrip = (trip: Trip) => {
    setTripDetailModal({ open: true, trip });
  };

  const handleDeleteTrip = async (trip: Trip) => {
    if (window.confirm(`Are you sure you want to delete "${trip.title}"?`)) {
      try {
        await deleteTripMutation.mutateAsync(trip.id);
        setSnackbar({
          open: true,
          message: "Trip deleted successfully",
          severity: "success",
        });
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Failed to delete trip",
          severity: "error",
        });
      }
    }
  };

  const handleUpdateTripStatus = async (trip: Trip, status: Trip["status"]) => {
    try {
      await updateTripStatusMutation.mutateAsync({
        tripId: trip.id,
        status,
        notes: `Status updated to ${status}`,
      });
      setSnackbar({
        open: true,
        message: `Trip status updated to ${status}`,
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to update trip status",
        severity: "error",
      });
    }
  };

  // Form Handlers
  const handleTripFormSubmit = async (data: TripFormData) => {
    try {
      if (tripFormModal.mode === "create") {
        await createTripMutation.mutateAsync(data);
        setSnackbar({
          open: true,
          message: "Trip created successfully",
          severity: "success",
        });
      } else if (tripFormModal.trip) {
        await updateTripMutation.mutateAsync({
          tripId: tripFormModal.trip.id,
          updates: data,
        });
        setSnackbar({
          open: true,
          message: "Trip updated successfully",
          severity: "success",
        });
      }
      setTripFormModal({ open: false, trip: null, mode: "create" });
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Failed to ${tripFormModal.mode} trip`,
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 1:
        return "Draft Trips";
      case 2:
        return "Pending Approval";
      case 3:
        return "Approved Trips";
      default:
        return "Recent Trips";
    }
  };

  const getEmptyMessage = () => {
    switch (activeTab) {
      case 1:
        return "No draft trips. Start planning your next trip!";
      case 2:
        return "No trips pending approval.";
      case 3:
        return "No approved trips yet.";
      default:
        return "No recent trips. Create your first trip to get started!";
    }
  };

  return (
    <Container maxWidth="xl" padding="large">
      <Section>
        <GradientTitle gutterBottom>TruTrip Dashboard</GradientTitle>

        {/* Controls Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { md: "center" },
            gap: 2,
            mt: 4,
            mb: 2,
          }}
        >
          {/* Search and Filters */}
          <Row spacing={2} sx={{ flexWrap: "wrap" }}>
            <TextField
              size="small"
              placeholder="Search trips..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 250 }}
            />

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={filters.priority || ""}
                label="Priority"
                onChange={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    priority: (e.target.value as Trip["priority"]) || undefined,
                  }));
                  setPagination((prev) => ({ ...prev, page: 1 }));
                }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="urgent">Urgent</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Purpose</InputLabel>
              <Select
                value={filters.purpose || ""}
                label="Purpose"
                onChange={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    purpose: (e.target.value as Trip["purpose"]) || undefined,
                  }));
                  setPagination((prev) => ({ ...prev, page: 1 }));
                }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="business">Business</MenuItem>
                <MenuItem value="conference">Conference</MenuItem>
                <MenuItem value="training">Training</MenuItem>
                <MenuItem value="client_meeting">Client Meeting</MenuItem>
              </Select>
            </FormControl>
          </Row>

          {/* View Toggle and Statistics */}
          <Row spacing={1}>
            <Tooltip title="View Statistics">
              <IconButton
                onClick={() => setStatsModal(true)}
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                }}
              >
                <StatsIcon />
              </IconButton>
            </Tooltip>
            <ViewToggle view={viewMode} onViewChange={handleViewModeChange} />
          </Row>
        </Box>

        {/* Tabs for different trip views */}
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Recent Trips" />
            <Tab label="Draft Trips" />
            <Tab label="Pending Approval" />
            <Tab label="Approved Trips" />
          </Tabs>
        </Box>

        {/* Content Section */}
        <Box sx={{ mt: 3 }}>
          {viewMode === "card" ? (
            <TripList
              data={tripsData}
              loading={tripsLoading}
              error={tripsError?.message}
              title={getTabTitle()}
              showCreateButton={true}
              onCreateTrip={handleCreateTrip}
              onViewTrip={handleViewTrip}
              onEditTrip={handleEditTrip}
              onDeleteTrip={handleDeleteTrip}
              onUpdateTripStatus={handleUpdateTripStatus}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              emptyMessage={getEmptyMessage()}
            />
          ) : (
            <TripTable
              data={tripsData}
              loading={tripsLoading}
              error={tripsError?.message}
              title={getTabTitle()}
              showCreateButton={true}
              onCreateTrip={handleCreateTrip}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onViewTrip={handleViewTrip}
              onEditTrip={handleEditTrip}
              onDeleteTrip={handleDeleteTrip}
              onUpdateTripStatus={handleUpdateTripStatus}
            />
          )}
        </Box>

        {/* Global Error Display */}
        {tripsError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Error loading trips: {tripsError.message}
          </Alert>
        )}

        {/* Statistics Modal */}
        <Dialog
          open={statsModal}
          onClose={() => setStatsModal(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #E0E0E0",
              pb: 2,
            }}
          >
            <Typography
              variant="h5"
              fontWeight={600}
              sx={{ color: "text.primary" }}
            >
              <Box component="span" sx={{ color: "secondary.main" }}>
                Trip
              </Box>{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                Statistics
              </Box>
            </Typography>
            <IconButton
              onClick={() => setStatsModal(false)}
              sx={{
                color: "text.secondary",
                "&:hover": { backgroundColor: "rgba(0, 183, 183, 0.1)" },
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            {stats && <TripStats stats={stats} loading={statsLoading} />}
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={() => setStatsModal(false)}>
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Trip Form Modal */}
        <TripFormModal
          open={tripFormModal.open}
          onClose={() =>
            setTripFormModal({ open: false, trip: null, mode: "create" })
          }
          onSubmit={handleTripFormSubmit}
          trip={tripFormModal.trip}
          loading={createTripMutation.isPending || updateTripMutation.isPending}
          error={
            createTripMutation.error?.message ||
            updateTripMutation.error?.message
          }
          companies={companies}
          users={users}
        />

        {/* Trip Detail Modal */}
        <TripDetailModal
          open={tripDetailModal.open}
          onClose={() => setTripDetailModal({ open: false, trip: null })}
          trip={tripDetailModal.trip}
          onEdit={handleEditTrip}
          onDelete={handleDeleteTrip}
        />

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Section>
    </Container>
  );
}
