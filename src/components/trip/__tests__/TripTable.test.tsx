import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../../theme/theme";
import { TripTable } from "../TripTable";
import type { Trip, PaginatedResponse } from "../../../types/api";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const mockTrip: Trip = {
  id: "1",
  title: "Business Trip",
  user_id: "user1",
  company_id: "company1",
  destination_city: "London",
  destination_country: "UK",
  purpose: "business",
  start_date: "2024-03-15",
  end_date: "2024-03-20",
  status: "approved",
  priority: "medium",
  total_budget: 5000,
  created_at: "2024-01-15T10:00:00Z",
  updated_at: "2024-01-15T10:00:00Z",
  user: {
    id: "user1",
    email: "test@example.com",
    full_name: "John Doe",
    company_id: "company1",
    department: "Engineering",
    role: "Developer",
    travel_grade: "business",
    created_at: "2024-01-01T00:00:00Z",
  },
};

const mockData: PaginatedResponse<Trip> = {
  data: [mockTrip],
  pagination: {
    page: 1,
    limit: 10,
    total: 1,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  },
};

describe("TripTable", () => {
  const mockCallbacks = {
    onCreateTrip: vi.fn(),
    onViewTrip: vi.fn(),
    onEditTrip: vi.fn(),
    onDeleteTrip: vi.fn(),
    onUpdateTripStatus: vi.fn(),
    onPageChange: vi.fn(),
    onRowsPerPageChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state when loading is true", () => {
    render(
      <ThemeWrapper>
        <TripTable loading={true} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("shows error state when error is provided", () => {
    render(
      <ThemeWrapper>
        <TripTable error="Failed to load trips" {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(
      screen.getByText("Error loading trips: Failed to load trips")
    ).toBeInTheDocument();
  });

  it("shows loading message when data is undefined", () => {
    render(
      <ThemeWrapper>
        <TripTable {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText("Loading trips...")).toBeInTheDocument();
  });

  it("renders table headers", () => {
    render(
      <ThemeWrapper>
        <TripTable data={mockData} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText("Trip")).toBeInTheDocument();
    expect(screen.getByText("Traveler")).toBeInTheDocument();
    expect(screen.getByText("Destination")).toBeInTheDocument();
    expect(screen.getByText("Dates")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Priority")).toBeInTheDocument();
    expect(screen.getByText("Budget")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("renders trip data in table rows", () => {
    render(
      <ThemeWrapper>
        <TripTable data={mockData} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText("Business Trip")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("London, UK")).toBeInTheDocument();
    expect(screen.getByText("Approved")).toBeInTheDocument();
    expect(screen.getByText("Medium")).toBeInTheDocument();
    expect(screen.getByText("$5,000")).toBeInTheDocument();
  });

  it("renders default title", () => {
    render(
      <ThemeWrapper>
        <TripTable data={mockData} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText("Trips")).toBeInTheDocument();
  });

  it("renders custom title when provided", () => {
    render(
      <ThemeWrapper>
        <TripTable data={mockData} title="Custom Table" {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText("Custom Table")).toBeInTheDocument();
  });

  it("shows create button when showCreateButton is true", () => {
    render(
      <ThemeWrapper>
        <TripTable data={mockData} showCreateButton={true} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(
      screen.getByRole("button", { name: /create new trip/i })
    ).toBeInTheDocument();
  });

  it("hides create button when showCreateButton is false", () => {
    render(
      <ThemeWrapper>
        <TripTable
          data={mockData}
          showCreateButton={false}
          {...mockCallbacks}
        />
      </ThemeWrapper>
    );

    expect(
      screen.queryByRole("button", { name: /create new trip/i })
    ).not.toBeInTheDocument();
  });

  it("calls onCreateTrip when create button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <ThemeWrapper>
        <TripTable data={mockData} showCreateButton={true} {...mockCallbacks} />
      </ThemeWrapper>
    );

    const createButton = screen.getByRole("button", {
      name: /create new trip/i,
    });
    await user.click(createButton);

    expect(mockCallbacks.onCreateTrip).toHaveBeenCalled();
  });

  it("shows empty state when no trips", () => {
    const emptyData = { ...mockData, data: [] };

    render(
      <ThemeWrapper>
        <TripTable data={emptyData} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText("No trips found")).toBeInTheDocument();
  });

  it("renders action buttons for each trip", () => {
    render(
      <ThemeWrapper>
        <TripTable data={mockData} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByRole("button", { name: /view/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument();
  });

  it("calls onViewTrip when view button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <ThemeWrapper>
        <TripTable data={mockData} {...mockCallbacks} />
      </ThemeWrapper>
    );

    const viewButton = screen.getByRole("button", { name: /view/i });
    await user.click(viewButton);

    expect(mockCallbacks.onViewTrip).toHaveBeenCalledWith(mockTrip);
  });

  it("calls onEditTrip when edit button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <ThemeWrapper>
        <TripTable data={mockData} {...mockCallbacks} />
      </ThemeWrapper>
    );

    const editButton = screen.getByRole("button", { name: /edit/i });
    await user.click(editButton);

    expect(mockCallbacks.onEditTrip).toHaveBeenCalledWith(mockTrip);
  });

  it("renders pagination when trips are available", () => {
    render(
      <ThemeWrapper>
        <TripTable data={mockData} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText("Showing 1-1 of 1 trips")).toBeInTheDocument();
  });

  it("handles trip without user gracefully", () => {
    const tripWithoutUser = { ...mockTrip, user: undefined };
    const dataWithoutUser = { ...mockData, data: [tripWithoutUser] };

    render(
      <ThemeWrapper>
        <TripTable data={dataWithoutUser} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });

  it("handles trip without budget gracefully", () => {
    const tripWithoutBudget = { ...mockTrip, total_budget: undefined };
    const dataWithoutBudget = { ...mockData, data: [tripWithoutBudget] };

    render(
      <ThemeWrapper>
        <TripTable data={dataWithoutBudget} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText("-")).toBeInTheDocument();
  });
});
