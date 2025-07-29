import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../../theme/theme";
import { TripPriorityBadge } from "../TripPriorityBadge";
import type { Trip } from "../../../types/api";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe("TripPriorityBadge", () => {
  it("renders low priority correctly", () => {
    render(
      <ThemeWrapper>
        <TripPriorityBadge priority="low" />
      </ThemeWrapper>
    );

    expect(screen.getByText("Low")).toBeInTheDocument();
  });

  it("renders medium priority correctly", () => {
    render(
      <ThemeWrapper>
        <TripPriorityBadge priority="medium" />
      </ThemeWrapper>
    );

    expect(screen.getByText("Medium")).toBeInTheDocument();
  });

  it("renders high priority correctly", () => {
    render(
      <ThemeWrapper>
        <TripPriorityBadge priority="high" />
      </ThemeWrapper>
    );

    expect(screen.getByText("High")).toBeInTheDocument();
  });

  it("renders urgent priority correctly", () => {
    render(
      <ThemeWrapper>
        <TripPriorityBadge priority="urgent" />
      </ThemeWrapper>
    );

    expect(screen.getByText("Urgent")).toBeInTheDocument();
  });

  it("renders with small size by default", () => {
    render(
      <ThemeWrapper>
        <TripPriorityBadge priority="medium" />
      </ThemeWrapper>
    );

    const chip = screen.getByText("Medium").closest(".MuiChip-root");
    expect(chip).toHaveClass("MuiChip-sizeSmall");
  });

  it("renders with medium size when specified", () => {
    render(
      <ThemeWrapper>
        <TripPriorityBadge priority="medium" size="medium" />
      </ThemeWrapper>
    );

    const chip = screen.getByText("Medium").closest(".MuiChip-root");
    expect(chip).toHaveClass("MuiChip-sizeMedium");
  });

  it("all priority variants render as chips", () => {
    const priorities: Trip["priority"][] = ["low", "medium", "high", "urgent"];

    priorities.forEach((priority) => {
      const { unmount } = render(
        <ThemeWrapper>
          <TripPriorityBadge priority={priority} />
        </ThemeWrapper>
      );

      const chipText = priority.charAt(0).toUpperCase() + priority.slice(1);
      const chip = screen.getByText(chipText).closest(".MuiChip-root");
      expect(chip).toHaveClass("MuiChip-root");
      expect(chip).toHaveClass("MuiChip-outlined");

      unmount();
    });
  });

  it("applies correct styling for all priorities", () => {
    render(
      <ThemeWrapper>
        <div>
          <TripPriorityBadge priority="low" />
          <TripPriorityBadge priority="medium" />
          <TripPriorityBadge priority="high" />
          <TripPriorityBadge priority="urgent" />
        </div>
      </ThemeWrapper>
    );

    expect(screen.getByText("Low")).toBeInTheDocument();
    expect(screen.getByText("Medium")).toBeInTheDocument();
    expect(screen.getByText("High")).toBeInTheDocument();
    expect(screen.getByText("Urgent")).toBeInTheDocument();
  });

  it("uses outlined variant for all priorities", () => {
    render(
      <ThemeWrapper>
        <TripPriorityBadge priority="urgent" />
      </ThemeWrapper>
    );

    const chip = screen.getByText("Urgent").closest(".MuiChip-root");
    expect(chip).toHaveClass("MuiChip-outlined");
  });
});
