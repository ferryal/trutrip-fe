import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../../theme/theme";
import { TripStats } from "../TripStats";
import type { TripStats as TripStatsType } from "../../../types/api";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const mockStats: TripStatsType = {
  total_trips: 50,
  total_budget: 250000,
  total_spent: 200000,
  by_status: {
    draft: 5,
    submitted: 10,
    approved: 25,
    rejected: 3,
    in_progress: 4,
    completed: 3,
  },
  by_purpose: {
    business: 30,
    conference: 8,
    training: 7,
    client_meeting: 5,
  },
  by_priority: {
    low: 10,
    medium: 25,
    high: 12,
    urgent: 3,
  },
  average_cost: 4000,
  upcoming_trips: 15,
  completed_trips: 3,
};

describe("TripStats", () => {
  it("shows loading state when loading is true", () => {
    render(
      <ThemeWrapper>
        <TripStats stats={mockStats} loading={true} />
      </ThemeWrapper>
    );

    expect(screen.getByText("Loading statistics...")).toBeInTheDocument();
  });

  it("renders total trips stat", () => {
    render(
      <ThemeWrapper>
        <TripStats stats={mockStats} />
      </ThemeWrapper>
    );

    expect(screen.getByText("Total Trips")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
  });

  it("renders total budget stat with currency formatting", () => {
    render(
      <ThemeWrapper>
        <TripStats stats={mockStats} />
      </ThemeWrapper>
    );

    expect(screen.getByText("Total Budget")).toBeInTheDocument();
    expect(screen.getByText("$250,000")).toBeInTheDocument();
  });

  it("renders total spent stat with currency formatting", () => {
    render(
      <ThemeWrapper>
        <TripStats stats={mockStats} />
      </ThemeWrapper>
    );

    expect(screen.getByText("Total Spent")).toBeInTheDocument();
    expect(screen.getByText("$200,000")).toBeInTheDocument();
  });

  it("calculates and displays budget savings percentage", () => {
    render(
      <ThemeWrapper>
        <TripStats stats={mockStats} />
      </ThemeWrapper>
    );

    expect(screen.getByText("Budget Savings")).toBeInTheDocument();
    expect(screen.getByText("20.0%")).toBeInTheDocument();
  });

  it("renders status breakdown section", () => {
    render(
      <ThemeWrapper>
        <TripStats stats={mockStats} />
      </ThemeWrapper>
    );

    expect(screen.getByText("Trip Status")).toBeInTheDocument();
    expect(screen.getByText("Draft")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("Approved")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
  });

  it("renders purpose breakdown section", () => {
    render(
      <ThemeWrapper>
        <TripStats stats={mockStats} />
      </ThemeWrapper>
    );

    expect(screen.getByText("Trip Purpose")).toBeInTheDocument();
    expect(screen.getByText("Business")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
    expect(screen.getByText("Conference")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
  });

  it("renders priority breakdown section", () => {
    render(
      <ThemeWrapper>
        <TripStats stats={mockStats} />
      </ThemeWrapper>
    );

    expect(screen.getByText("Trip Priority")).toBeInTheDocument();
    expect(screen.getByText("Low")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("Medium")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
  });

  it("transforms underscore-separated strings to readable format", () => {
    const statsWithUnderscores = {
      ...mockStats,
      by_status: {
        ...mockStats.by_status,
        in_progress: 5,
      },
      by_purpose: {
        ...mockStats.by_purpose,
        client_meeting: 8,
      },
    };

    render(
      <ThemeWrapper>
        <TripStats stats={statsWithUnderscores} />
      </ThemeWrapper>
    );

    expect(screen.getByText("In progress")).toBeInTheDocument();
    expect(screen.getByText("Client meeting")).toBeInTheDocument();
  });

  it("handles zero budget gracefully", () => {
    const zeroStats = {
      ...mockStats,
      total_budget: 0,
      total_spent: 0,
    };

    render(
      <ThemeWrapper>
        <TripStats stats={zeroStats} />
      </ThemeWrapper>
    );

    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  it("shows negative savings when overspent", () => {
    const overspentStats = {
      ...mockStats,
      total_budget: 100000,
      total_spent: 120000,
    };

    render(
      <ThemeWrapper>
        <TripStats stats={overspentStats} />
      </ThemeWrapper>
    );

    expect(screen.getByText("-20.0%")).toBeInTheDocument();
  });

  it("renders all overview stats cards", () => {
    render(
      <ThemeWrapper>
        <TripStats stats={mockStats} />
      </ThemeWrapper>
    );

    expect(screen.getByText("Total Trips")).toBeInTheDocument();
    expect(screen.getByText("Total Budget")).toBeInTheDocument();
    expect(screen.getByText("Total Spent")).toBeInTheDocument();
    expect(screen.getByText("Budget Savings")).toBeInTheDocument();
  });

  it("renders all breakdown sections", () => {
    render(
      <ThemeWrapper>
        <TripStats stats={mockStats} />
      </ThemeWrapper>
    );

    expect(screen.getByText("Trip Status")).toBeInTheDocument();
    expect(screen.getByText("Trip Purpose")).toBeInTheDocument();
    expect(screen.getByText("Trip Priority")).toBeInTheDocument();
  });

  it("displays status counts correctly", () => {
    render(
      <ThemeWrapper>
        <TripStats stats={mockStats} />
      </ThemeWrapper>
    );

    Object.entries(mockStats.by_status).forEach(([count]) => {
      expect(screen.getByText(count.toString())).toBeInTheDocument();
    });
  });

  it("displays purpose counts correctly", () => {
    render(
      <ThemeWrapper>
        <TripStats stats={mockStats} />
      </ThemeWrapper>
    );

    Object.entries(mockStats.by_purpose).forEach(([count]) => {
      expect(screen.getByText(count.toString())).toBeInTheDocument();
    });
  });

  it("displays priority counts correctly", () => {
    render(
      <ThemeWrapper>
        <TripStats stats={mockStats} />
      </ThemeWrapper>
    );

    Object.entries(mockStats.by_priority).forEach(([count]) => {
      expect(screen.getByText(count.toString())).toBeInTheDocument();
    });
  });
});
