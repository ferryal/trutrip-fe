import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from "@mui/material";
import {
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
  Hotel as HotelIcon,
  Flight as FlightIcon,
  Receipt as ReceiptIcon,
  Approval as ApprovalIcon,
  Schedule as ScheduleIcon,
  SmartToy as AIIcon,
} from "@mui/icons-material";
import { Button } from "../ui/Button";
import { Typography, Heading, Subheading } from "../ui/Typography";
import { TripStatusBadge } from "./TripStatusBadge";
import { TripPriorityBadge } from "./TripPriorityBadge";
import type { Trip } from "../../types/api";

interface TripDetailModalProps {
  open: boolean;
  onClose: () => void;
  trip: Trip | null;
  onEdit?: (trip: Trip) => void;
  onDelete?: (trip: Trip) => void;
}

export const TripDetailModal: React.FC<TripDetailModalProps> = ({
  open,
  onClose,
  trip,
  onEdit,
  onDelete,
}) => {
  if (!trip) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number | undefined) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getDuration = () => {
    const start = new Date(trip.start_date);
    const end = new Date(trip.end_date);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1 ? "1 day" : `${diffDays} days`;
  };

  const getDaysUntil = () => {
    const startDate = new Date(trip.start_date);
    const now = new Date();
    const diffTime = startDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Trip has started/ended";
    if (diffDays === 0) return "Trip starts today";
    if (diffDays === 1) return "Trip starts tomorrow";
    return `${diffDays} days until trip`;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Heading>{trip.title}</Heading>
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <TripStatusBadge status={trip.status} />
            <TripPriorityBadge priority={trip.priority} />
          </Box>
        </Box>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* Basic Information */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ mb: 3 }}>
              {trip.description && (
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {trip.description}
                </Typography>
              )}

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 2,
                }}
              >
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <LocationIcon sx={{ mr: 1, color: "primary.main" }} />
                    <Typography variant="body2" color="text.secondary">
                      Destination
                    </Typography>
                  </Box>
                  <Typography variant="body1" fontWeight={600}>
                    {trip.destination_city}, {trip.destination_country}
                  </Typography>
                </Box>

                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <BusinessIcon sx={{ mr: 1, color: "primary.main" }} />
                    <Typography variant="body2" color="text.secondary">
                      Purpose
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    textTransform="capitalize"
                  >
                    {trip.purpose.replace("_", " ")}
                  </Typography>
                </Box>

                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <CalendarIcon sx={{ mr: 1, color: "primary.main" }} />
                    <Typography variant="body2" color="text.secondary">
                      Duration
                    </Typography>
                  </Box>
                  <Typography variant="body1" fontWeight={600}>
                    {getDuration()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(trip.start_date)} - {formatDate(trip.end_date)}
                  </Typography>
                </Box>

                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <MoneyIcon sx={{ mr: 1, color: "primary.main" }} />
                    <Typography variant="body2" color="text.secondary">
                      Budget
                    </Typography>
                  </Box>
                  <Typography variant="body1" fontWeight={600}>
                    {formatCurrency(trip.total_budget)}
                  </Typography>
                  {trip.actual_cost && trip.actual_cost > 0 && (
                    <Typography variant="body2" color="text.secondary">
                      Spent: {formatCurrency(trip.actual_cost)}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Traveler Information */}
          <Box sx={{ minWidth: { md: 300 } }}>
            <Box
              sx={{
                bgcolor: "background.paper",
                p: 2,
                borderRadius: 1,
                border: 1,
                borderColor: "divider",
              }}
            >
              <Subheading gutterBottom>Traveler Information</Subheading>

              {trip.user && (
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <PersonIcon sx={{ mr: 1, fontSize: 20 }} />
                    <Typography variant="body2" fontWeight={600}>
                      {trip.user.full_name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {trip.user.department}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Travel Grade: {trip.user.travel_grade}
                  </Typography>
                </Box>
              )}

              {trip.company && (
                <Box>
                  <Typography variant="body2" fontWeight={600}>
                    {trip.company.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {trip.company.domain}
                  </Typography>
                </Box>
              )}

              <Box
                sx={{
                  mt: 2,
                  p: 1,
                  bgcolor: "background.default",
                  borderRadius: 1,
                }}
              >
                <Typography
                  variant="body2"
                  color="primary.main"
                  fontWeight={600}
                >
                  {getDaysUntil()}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Detailed Sections */}
        <Box>
          {/* Itinerary */}
          {trip.trip_itineraries && trip.trip_itineraries.length > 0 && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ScheduleIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    Itinerary ({trip.trip_itineraries.length} days)
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <List dense>
                  {trip.trip_itineraries.map((itinerary) => (
                    <ListItem
                      key={itinerary.id}
                      sx={{ flexDirection: "column", alignItems: "flex-start" }}
                    >
                      <Typography variant="subtitle2" fontWeight={600}>
                        Day {itinerary.day_number} -{" "}
                        {formatDate(itinerary.date)}
                      </Typography>
                      {itinerary.activities.map((activity, index) => (
                        <Typography key={index} variant="body2" sx={{ ml: 2 }}>
                          {activity.time}: {activity.activity} at{" "}
                          {activity.location}
                        </Typography>
                      ))}
                      {itinerary.notes && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ ml: 2, mt: 1 }}
                        >
                          Notes: {itinerary.notes}
                        </Typography>
                      )}
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          )}

          {/* Accommodations */}
          {trip.accommodations && trip.accommodations.length > 0 && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <HotelIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    Accommodations ({trip.accommodations.length})
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <List dense>
                  {trip.accommodations.map((accommodation) => (
                    <ListItem key={accommodation.id}>
                      <ListItemText
                        primary={accommodation.hotel_name}
                        secondary={
                          <Box>
                            <Typography variant="body2">
                              {accommodation.check_in} to{" "}
                              {accommodation.check_out}
                            </Typography>
                            <Typography variant="body2">
                              {accommodation.room_type} -{" "}
                              {formatCurrency(accommodation.total_cost)}
                            </Typography>
                            <Chip
                              label={accommodation.status}
                              size="small"
                              sx={{ mt: 0.5 }}
                              color={
                                accommodation.status === "confirmed"
                                  ? "success"
                                  : "default"
                              }
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          )}

          {/* Transportation */}
          {trip.transportation && trip.transportation.length > 0 && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <FlightIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    Transportation ({trip.transportation.length})
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <List dense>
                  {trip.transportation.map((transport) => (
                    <ListItem key={transport.id}>
                      <ListItemText
                        primary={`${transport.type.toUpperCase()}: ${transport.from_location} → ${transport.to_location}`}
                        secondary={
                          <Box>
                            {transport.departure_time &&
                              transport.arrival_time && (
                                <Typography variant="body2">
                                  {new Date(
                                    transport.departure_time
                                  ).toLocaleString()}{" "}
                                  -{" "}
                                  {new Date(
                                    transport.arrival_time
                                  ).toLocaleString()}
                                </Typography>
                              )}
                            <Typography variant="body2">
                              Cost: {formatCurrency(transport.cost)}
                            </Typography>
                            <Chip
                              label={transport.status}
                              size="small"
                              sx={{ mt: 0.5 }}
                              color={
                                transport.status === "confirmed"
                                  ? "success"
                                  : "default"
                              }
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          )}

          {/* AI Recommendations */}
          {trip.ai_recommendations && trip.ai_recommendations.length > 0 && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <AIIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    AI Recommendations ({trip.ai_recommendations.length})
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                {trip.ai_recommendations.map((recommendation) => (
                  <Box key={recommendation.id} sx={{ mb: 2 }}>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      textTransform="capitalize"
                    >
                      {recommendation.recommendation_type.replace("_", " ")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Confidence:{" "}
                      {(recommendation.confidence_score * 100).toFixed(0)}%
                    </Typography>
                    {/* Render recommendation content based on type */}
                    <Box
                      sx={{
                        mt: 1,
                        p: 1,
                        bgcolor: "background.default",
                        borderRadius: 1,
                      }}
                    >
                      <pre
                        style={{ whiteSpace: "pre-wrap", fontSize: "0.875rem" }}
                      >
                        {JSON.stringify(recommendation.content, null, 2)}
                      </pre>
                    </Box>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          )}

          {/* Expenses */}
          {trip.expenses && trip.expenses.length > 0 && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ReceiptIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    Expenses ({trip.expenses.length})
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <List dense>
                  {trip.expenses.map((expense) => (
                    <ListItem key={expense.id}>
                      <ListItemText
                        primary={expense.description || expense.category}
                        secondary={
                          <Box>
                            <Typography variant="body2">
                              {formatCurrency(expense.amount)} - {expense.date}
                            </Typography>
                            <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
                              <Chip
                                label={expense.category}
                                size="small"
                                variant="outlined"
                              />
                              <Chip
                                label={
                                  expense.is_reimbursable
                                    ? "Reimbursable"
                                    : "Non-reimbursable"
                                }
                                size="small"
                                color={
                                  expense.is_reimbursable
                                    ? "success"
                                    : "default"
                                }
                              />
                            </Box>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          )}

          {/* Approvals */}
          {trip.trip_approvals && trip.trip_approvals.length > 0 && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ApprovalIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    Approvals ({trip.trip_approvals.length})
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <List dense>
                  {trip.trip_approvals.map((approval) => (
                    <ListItem key={approval.id}>
                      <ListItemText
                        primary={`Approved by: ${approval.approver?.full_name || "Unknown"}`}
                        secondary={
                          <Box>
                            <Typography variant="body2">
                              Status: {approval.status}
                            </Typography>
                            {approval.approved_at && (
                              <Typography variant="body2">
                                Date:{" "}
                                {new Date(
                                  approval.approved_at
                                ).toLocaleString()}
                              </Typography>
                            )}
                            {approval.comments && (
                              <Typography variant="body2">
                                Comments: {approval.comments}
                              </Typography>
                            )}
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            {trip.status === "draft" && onEdit && (
              <Button variant="contained" onClick={() => onEdit(trip)}>
                Edit Trip
              </Button>
            )}
            {onDelete && (
              <Button
                variant="outlined"
                color="error"
                onClick={() => onDelete(trip)}
              >
                Delete Trip
              </Button>
            )}
          </Box>
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
