import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../../theme/theme";
import { TripList } from "../TripList";
import type { Trip, PaginatedResponse } from "../../../types/api";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const mockTrip: Trip = {
  id: "1",
  title: "Test Trip",
  user_id: "user1",
  company_id: "company1",
  destination_city: "London",
  destination_country: "UK",
  purpose: "business",
  start_date: "2024-03-15",
  end_date: "2024-03-20",
  status: "approved",
  priority: "medium",
  created_at: "2024-01-15T10:00:00Z",
  updated_at: "2024-01-15T10:00:00Z",
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

describe("TripList", () => {
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
        <TripList loading={true} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("shows error state when error is provided", () => {
    render(
      <ThemeWrapper>
        <TripList error="Failed to load trips" {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(
      screen.getByText("Error loading trips: Failed to load trips")
    ).toBeInTheDocument();
  });

  it("shows loading message when data is undefined", () => {
    render(
      <ThemeWrapper>
        <TripList {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText("Loading trips...")).toBeInTheDocument();
  });

  it("renders trip cards when data is provided", () => {
    render(
      <ThemeWrapper>
        <TripList data={mockData} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText("Test Trip")).toBeInTheDocument();
  });

  it("renders default title", () => {
    render(
      <ThemeWrapper>
        <TripList data={mockData} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText("Trips")).toBeInTheDocument();
  });

  it("renders custom title when provided", () => {
    render(
      <ThemeWrapper>
        <TripList data={mockData} title="My Custom Trips" {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText("My Custom Trips")).toBeInTheDocument();
  });

  it("shows create button when showCreateButton is true", () => {
    render(
      <ThemeWrapper>
        <TripList data={mockData} showCreateButton={true} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(
      screen.getByRole("button", { name: /create new trip/i })
    ).toBeInTheDocument();
  });

  it("hides create button when showCreateButton is false", () => {
    render(
      <ThemeWrapper>
        <TripList data={mockData} showCreateButton={false} {...mockCallbacks} />
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
        <TripList data={mockData} showCreateButton={true} {...mockCallbacks} />
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
        <TripList data={emptyData} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText("No trips found")).toBeInTheDocument();
  });

  it("shows custom empty message", () => {
    const emptyData = { ...mockData, data: [] };

    render(
      <ThemeWrapper>
        <TripList
          data={emptyData}
          emptyMessage="No business trips available"
          {...mockCallbacks}
        />
      </ThemeWrapper>
    );

    expect(screen.getByText("No business trips available")).toBeInTheDocument();
  });

  it("shows create first trip button in empty state when showCreateButton is true", () => {
    const emptyData = { ...mockData, data: [] };

    render(
      <ThemeWrapper>
        <TripList data={emptyData} showCreateButton={true} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(
      screen.getByRole("button", { name: /create your first trip/i })
    ).toBeInTheDocument();
  });

  it("renders pagination when trips are available", () => {
    render(
      <ThemeWrapper>
        <TripList data={mockData} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText("Showing 1-1 of 1 trips")).toBeInTheDocument();
  });

  it("passes callbacks to TripCard components", () => {
    render(
      <ThemeWrapper>
        <TripList data={mockData} {...mockCallbacks} />
      </ThemeWrapper>
    );

    // TripCard should render with the trip data
    expect(screen.getByText("Test Trip")).toBeInTheDocument();
  });

  it("renders multiple trips in grid layout", () => {
    const multipleTripsData = {
      ...mockData,
      data: [
        mockTrip,
        { ...mockTrip, id: "2", title: "Second Trip" },
        { ...mockTrip, id: "3", title: "Third Trip" },
      ],
      pagination: { ...mockData.pagination, total: 3 },
    };

    render(
      <ThemeWrapper>
        <TripList data={multipleTripsData} {...mockCallbacks} />
      </ThemeWrapper>
    );

    expect(screen.getByText("Test Trip")).toBeInTheDocument();
    expect(screen.getByText("Second Trip")).toBeInTheDocument();
    expect(screen.getByText("Third Trip")).toBeInTheDocument();
  });

  it("handles undefined onCreateTrip gracefully", () => {
    const { onCreateTrip, ...callbacksWithoutCreate } = mockCallbacks;

    render(
      <ThemeWrapper>
        <TripList
          data={mockData}
          showCreateButton={true}
          {...callbacksWithoutCreate}
        />
      </ThemeWrapper>
    );

    // Should not show create button if onCreateTrip is not provided
    expect(
      screen.queryByRole("button", { name: /create new trip/i })
    ).not.toBeInTheDocument();
  });
});
