import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../../theme/theme";
import { TripDetailModal } from "../TripDetailModal";
import type { Trip } from "../../../types/api";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const mockTrip: Trip = {
  id: "1",
  title: "Business Trip to Tokyo",
  description: "Important client meetings and conference attendance",
  user_id: "user1",
  company_id: "company1",
  destination_city: "Tokyo",
  destination_country: "Japan",
  purpose: "business",
  start_date: "2024-06-15",
  end_date: "2024-06-20",
  total_budget: 8000,
  actual_cost: 7500,
  status: "approved",
  priority: "high",
  created_at: "2024-01-15T10:00:00Z",
  updated_at: "2024-01-15T10:00:00Z",
  user: {
    id: "user1",
    email: "jane@company.com",
    full_name: "Jane Smith",
    company_id: "company1",
    department: "Sales",
    role: "Sales Manager",
    travel_grade: "business",
    created_at: "2024-01-01T00:00:00Z",
  },
  company: {
    id: "company1",
    name: "Tech Corp",
    domain: "techcorp.com",
    travel_budget: 100000,
    policy: {
      max_flight_cost: 3000,
      max_hotel_per_night: 400,
      requires_approval_above: 5000,
    },
    created_at: "2024-01-01T00:00:00Z",
  },
  accommodations: [
    {
      id: "acc1",
      trip_id: "1",
      hotel_name: "Tokyo Grand Hotel",
      check_in: "2024-06-15",
      check_out: "2024-06-20",
      room_type: "Business Suite",
      total_cost: 2000,
      status: "confirmed",
      created_at: "2024-01-15T10:00:00Z",
    },
  ],
  trip_itineraries: [
    {
      id: "itin1",
      trip_id: "1",
      day_number: 1,
      date: "2024-06-15",
      activities: [
        { time: "09:00", activity: "Client Meeting", location: "Tokyo Office" },
        {
          time: "14:00",
          activity: "Conference Session",
          location: "Convention Center",
        },
      ],
      notes: "Important day with key clients",
      created_at: "2024-01-15T10:00:00Z",
    },
  ],
};

describe("TripDetailModal", () => {
  const mockCallbacks = {
    onClose: vi.fn(),
    onEdit: vi.fn(),
    onDelete: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns null when trip is null", () => {
    const { container } = render(
      <ThemeWrapper>
        <TripDetailModal open={true} trip={null} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(container.firstChild).toBeNull();
  });

  it("does not render when open is false", () => {
    render(
      <ThemeWrapper>
        <TripDetailModal open={false} trip={mockTrip} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(
      screen.queryByText("Business Trip to Tokyo")
    ).not.toBeInTheDocument();
  });

  it("renders modal when open is true and trip is provided", () => {
    render(
      <ThemeWrapper>
        <TripDetailModal open={true} trip={mockTrip} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText("Business Trip to Tokyo")).toBeInTheDocument();
  });

  it("renders trip title and description", () => {
    render(
      <ThemeWrapper>
        <TripDetailModal open={true} trip={mockTrip} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText("Business Trip to Tokyo")).toBeInTheDocument();
    expect(
      screen.getByText("Important client meetings and conference attendance")
    ).toBeInTheDocument();
  });

  it("renders status and priority badges", () => {
    render(
      <ThemeWrapper>
        <TripDetailModal open={true} trip={mockTrip} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText("Approved")).toBeInTheDocument();
    expect(screen.getByText("High")).toBeInTheDocument();
  });

  it("renders destination information", () => {
    render(
      <ThemeWrapper>
        <TripDetailModal open={true} trip={mockTrip} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText("Tokyo, Japan")).toBeInTheDocument();
  });

  it("renders trip purpose", () => {
    render(
      <ThemeWrapper>
        <TripDetailModal open={true} trip={mockTrip} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText("business")).toBeInTheDocument();
  });

  it("renders formatted dates and duration", () => {
    render(
      <ThemeWrapper>
        <TripDetailModal open={true} trip={mockTrip} {...mockCallbacks} />
      </ThemeWrapper>
    );

    // Check that trip duration is displayed (should be "5 days")
    expect(screen.getByText("5 days")).toBeInTheDocument();
  });

  it("renders budget information", () => {
    render(
      <ThemeWrapper>
        <TripDetailModal open={true} trip={mockTrip} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText("$8,000.00")).toBeInTheDocument();
    expect(screen.getByText("Spent: $7,500.00")).toBeInTheDocument();
  });

  it("renders traveler information", () => {
    render(
      <ThemeWrapper>
        <TripDetailModal open={true} trip={mockTrip} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText("Traveler Information")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("Sales")).toBeInTheDocument();
    expect(screen.getByText("Travel Grade: business")).toBeInTheDocument();
  });

  it("renders company information", () => {
    render(
      <ThemeWrapper>
        <TripDetailModal open={true} trip={mockTrip} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText("Tech Corp")).toBeInTheDocument();
    expect(screen.getByText("techcorp.com")).toBeInTheDocument();
  });

  it("renders itinerary section when available", () => {
    render(
      <ThemeWrapper>
        <TripDetailModal open={true} trip={mockTrip} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText(/Itinerary \(1 days\)/)).toBeInTheDocument();
  });

  it("renders accommodation section when available", () => {
    render(
      <ThemeWrapper>
        <TripDetailModal open={true} trip={mockTrip} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText(/Accommodations \(1\)/)).toBeInTheDocument();
  });

  it("calls onClose when Close button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <ThemeWrapper>
        <TripDetailModal open={true} trip={mockTrip} {...mockCallbacks} />
      </ThemeWrapper>
    );

    const closeButton = screen.getByRole("button", { name: /close/i });
    await user.click(closeButton);

    expect(mockCallbacks.onClose).toHaveBeenCalled();
  });

  it("shows Edit Trip button for draft status", () => {
    const draftTrip = { ...mockTrip, status: "draft" as const };

    render(
      <ThemeWrapper>
        <TripDetailModal open={true} trip={draftTrip} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(
      screen.getByRole("button", { name: /edit trip/i })
    ).toBeInTheDocument();
  });

  it("does not show Edit Trip button for non-draft status", () => {
    render(
      <ThemeWrapper>
        <TripDetailModal open={true} trip={mockTrip} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(
      screen.queryByRole("button", { name: /edit trip/i })
    ).not.toBeInTheDocument();
  });

  it("calls onEdit when Edit Trip button is clicked", async () => {
    const user = userEvent.setup();
    const draftTrip = { ...mockTrip, status: "draft" as const };

    render(
      <ThemeWrapper>
        <TripDetailModal open={true} trip={draftTrip} {...mockCallbacks} />
      </ThemeWrapper>
    );

    const editButton = screen.getByRole("button", { name: /edit trip/i });
    await user.click(editButton);

    expect(mockCallbacks.onEdit).toHaveBeenCalledWith(draftTrip);
  });

  it("shows Delete Trip button when onDelete is provided", () => {
    render(
      <ThemeWrapper>
        <TripDetailModal open={true} trip={mockTrip} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(
      screen.getByRole("button", { name: /delete trip/i })
    ).toBeInTheDocument();
  });

  it("calls onDelete when Delete Trip button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <ThemeWrapper>
        <TripDetailModal open={true} trip={mockTrip} {...mockCallbacks} />
      </ThemeWrapper>
    );

    const deleteButton = screen.getByRole("button", { name: /delete trip/i });
    await user.click(deleteButton);

    expect(mockCallbacks.onDelete).toHaveBeenCalledWith(mockTrip);
  });

  it("shows days until trip for future trips", () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    const futureTrip = {
      ...mockTrip,
      start_date: futureDate.toISOString().split("T")[0],
    };

    render(
      <ThemeWrapper>
        <TripDetailModal open={true} trip={futureTrip} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText(/\d+ days until trip/)).toBeInTheDocument();
  });

  it("handles trip without optional data gracefully", () => {
    const minimalTrip = {
      ...mockTrip,
      description: undefined,
      user: undefined,
      company: undefined,
      accommodations: undefined,
      trip_itineraries: undefined,
      actual_cost: undefined,
    };

    render(
      <ThemeWrapper>
        <TripDetailModal open={true} trip={minimalTrip} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText("Business Trip to Tokyo")).toBeInTheDocument();
  });
});
