import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../../theme/theme";
import { TripCard } from "../TripCard";
import type { Trip } from "../../../types/api";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const mockTrip: Trip = {
  id: "1",
  title: "Business Trip to London",
  description: "Important client meetings",
  user_id: "user1",
  company_id: "company1",
  destination_city: "London",
  destination_country: "United Kingdom",
  purpose: "business",
  start_date: "2024-03-15",
  end_date: "2024-03-20",
  total_budget: 5000,
  actual_cost: 4500,
  status: "approved",
  priority: "high",
  created_at: "2024-01-15T10:00:00Z",
  updated_at: "2024-01-15T10:00:00Z",
  user: {
    id: "user1",
    email: "john@company.com",
    full_name: "John Doe",
    company_id: "company1",
    department: "Engineering",
    role: "Senior Developer",
    travel_grade: "business",
    created_at: "2024-01-01T00:00:00Z",
  },
  ai_recommendations: [
    {
      id: "rec1",
      trip_id: "1",
      recommendation_type: "hotels",
      content: { hotels: ["Hotel A", "Hotel B"] },
      confidence_score: 0.9,
      created_at: "2024-01-15T10:00:00Z",
    },
  ],
};

describe("TripCard", () => {
  const mockCallbacks = {
    onView: vi.fn(),
    onEdit: vi.fn(),
    onDelete: vi.fn(),
    onUpdateStatus: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders trip title correctly", () => {
    render(
      <ThemeWrapper>
        <TripCard trip={mockTrip} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText("Business Trip to London")).toBeInTheDocument();
  });

  it("renders destination information", () => {
    render(
      <ThemeWrapper>
        <TripCard trip={mockTrip} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText("London, United Kingdom")).toBeInTheDocument();
  });

  it("renders user information", () => {
    render(
      <ThemeWrapper>
        <TripCard trip={mockTrip} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText(/John Doe • Engineering/)).toBeInTheDocument();
  });

  it("renders trip dates", () => {
    render(
      <ThemeWrapper>
        <TripCard trip={mockTrip} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText(/Mar 15, 2024 - Mar 20, 2024/)).toBeInTheDocument();
  });

  it("renders budget information", () => {
    render(
      <ThemeWrapper>
        <TripCard trip={mockTrip} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText("$5,000")).toBeInTheDocument();
  });

  it("renders trip purpose", () => {
    render(
      <ThemeWrapper>
        <TripCard trip={mockTrip} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText("business")).toBeInTheDocument();
  });

  it("renders status and priority badges", () => {
    render(
      <ThemeWrapper>
        <TripCard trip={mockTrip} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText("Approved")).toBeInTheDocument();
    expect(screen.getByText("High")).toBeInTheDocument();
  });

  it("shows AI recommendations section when available", () => {
    render(
      <ThemeWrapper>
        <TripCard trip={mockTrip} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(
      screen.getByText("🤖 AI Recommendations Available")
    ).toBeInTheDocument();
    expect(screen.getByText("1 recommendation ready")).toBeInTheDocument();
  });

  it("renders View Details button", () => {
    render(
      <ThemeWrapper>
        <TripCard trip={mockTrip} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(
      screen.getByRole("button", { name: /view details/i })
    ).toBeInTheDocument();
  });

  it("shows Edit Trip button for draft status", () => {
    const draftTrip = { ...mockTrip, status: "draft" as const };

    render(
      <ThemeWrapper>
        <TripCard trip={draftTrip} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(
      screen.getByRole("button", { name: /edit trip/i })
    ).toBeInTheDocument();
  });

  it("does not show Edit Trip button for non-draft status", () => {
    render(
      <ThemeWrapper>
        <TripCard trip={mockTrip} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(
      screen.queryByRole("button", { name: /edit trip/i })
    ).not.toBeInTheDocument();
  });

  it("calls onView when View Details is clicked", async () => {
    const user = userEvent.setup();
    render(
      <ThemeWrapper>
        <TripCard trip={mockTrip} {...mockCallbacks} />
      </ThemeWrapper>
    );

    const viewButton = screen.getByRole("button", { name: /view details/i });
    await user.click(viewButton);

    expect(mockCallbacks.onView).toHaveBeenCalledWith(mockTrip);
  });

  it("calls onEdit when Edit Trip is clicked", async () => {
    const user = userEvent.setup();
    const draftTrip = { ...mockTrip, status: "draft" as const };

    render(
      <ThemeWrapper>
        <TripCard trip={draftTrip} {...mockCallbacks} />
      </ThemeWrapper>
    );

    const editButton = screen.getByRole("button", { name: /edit trip/i });
    await user.click(editButton);

    expect(mockCallbacks.onEdit).toHaveBeenCalledWith(draftTrip);
  });

  it("hides actions when showActions is false", () => {
    render(
      <ThemeWrapper>
        <TripCard trip={mockTrip} {...mockCallbacks} showActions={false} />
      </ThemeWrapper>
    );

    expect(
      screen.queryByRole("button", { name: /view details/i })
    ).not.toBeInTheDocument();
  });

  it("handles trip without user gracefully", () => {
    const tripWithoutUser = { ...mockTrip, user: undefined };

    render(
      <ThemeWrapper>
        <TripCard trip={tripWithoutUser} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText(/Unknown • N\/A/)).toBeInTheDocument();
  });

  it("handles trip without AI recommendations", () => {
    const tripWithoutAI = { ...mockTrip, ai_recommendations: undefined };

    render(
      <ThemeWrapper>
        <TripCard trip={tripWithoutAI} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(
      screen.queryByText("🤖 AI Recommendations Available")
    ).not.toBeInTheDocument();
  });

  it("shows days until trip for future trips", () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 10);
    const futureTrip = {
      ...mockTrip,
      start_date: futureDate.toISOString().split("T")[0],
    };

    render(
      <ThemeWrapper>
        <TripCard trip={futureTrip} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText(/\d+ days to go/)).toBeInTheDocument();
  });

  it("renders card with proper structure", () => {
    render(
      <ThemeWrapper>
        <TripCard trip={mockTrip} {...mockCallbacks} />
      </ThemeWrapper>
    );

    // Check that the card container exists
    const cardContainer = screen
      .getByText("Business Trip to London")
      .closest(".MuiCard-root");
    expect(cardContainer).toBeInTheDocument();
  });
});
