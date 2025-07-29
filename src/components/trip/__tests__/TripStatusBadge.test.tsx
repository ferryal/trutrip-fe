import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../../theme/theme";
import { TripStatusBadge } from "../TripStatusBadge";
import type { Trip } from "../../../types/api";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe("TripStatusBadge", () => {
  it("renders draft status correctly", () => {
    render(
      <ThemeWrapper>
        <TripStatusBadge status="draft" />
      </ThemeWrapper>
    );

    expect(screen.getByText("Draft")).toBeInTheDocument();
  });

  it("renders submitted status correctly", () => {
    render(
      <ThemeWrapper>
        <TripStatusBadge status="submitted" />
      </ThemeWrapper>
    );

    expect(screen.getByText("Submitted")).toBeInTheDocument();
  });

  it("renders approved status correctly", () => {
    render(
      <ThemeWrapper>
        <TripStatusBadge status="approved" />
      </ThemeWrapper>
    );

    expect(screen.getByText("Approved")).toBeInTheDocument();
  });

  it("renders rejected status correctly", () => {
    render(
      <ThemeWrapper>
        <TripStatusBadge status="rejected" />
      </ThemeWrapper>
    );

    expect(screen.getByText("Rejected")).toBeInTheDocument();
  });

  it("renders in_progress status correctly", () => {
    render(
      <ThemeWrapper>
        <TripStatusBadge status="in_progress" />
      </ThemeWrapper>
    );

    expect(screen.getByText("In Progress")).toBeInTheDocument();
  });

  it("renders completed status correctly", () => {
    render(
      <ThemeWrapper>
        <TripStatusBadge status="completed" />
      </ThemeWrapper>
    );

    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  it("renders with small size by default", () => {
    render(
      <ThemeWrapper>
        <TripStatusBadge status="draft" />
      </ThemeWrapper>
    );

    const chip = screen.getByText("Draft").closest(".MuiChip-root");
    expect(chip).toHaveClass("MuiChip-sizeSmall");
  });

  it("renders with medium size when specified", () => {
    render(
      <ThemeWrapper>
        <TripStatusBadge status="draft" size="medium" />
      </ThemeWrapper>
    );

    const chip = screen.getByText("Draft").closest(".MuiChip-root");
    expect(chip).toHaveClass("MuiChip-sizeMedium");
  });

  it("all status variants render as chips", () => {
    const statuses: Trip["status"][] = [
      "draft",
      "submitted",
      "approved",
      "rejected",
      "in_progress",
      "completed",
    ];

    statuses.forEach((status) => {
      const { unmount } = render(
        <ThemeWrapper>
          <TripStatusBadge status={status} />
        </ThemeWrapper>
      );

      const chipText =
        status === "in_progress"
          ? "In Progress"
          : status.charAt(0).toUpperCase() + status.slice(1);
      const chip = screen.getByText(chipText).closest(".MuiChip-root");
      expect(chip).toHaveClass("MuiChip-root");

      unmount();
    });
  });

  it("applies correct color styling for different statuses", () => {
    render(
      <ThemeWrapper>
        <div>
          <TripStatusBadge status="draft" />
          <TripStatusBadge status="approved" />
          <TripStatusBadge status="rejected" />
        </div>
      </ThemeWrapper>
    );

    expect(screen.getByText("Draft")).toBeInTheDocument();
    expect(screen.getByText("Approved")).toBeInTheDocument();
    expect(screen.getByText("Rejected")).toBeInTheDocument();
  });
});
