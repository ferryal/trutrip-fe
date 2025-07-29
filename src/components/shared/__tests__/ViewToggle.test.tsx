import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../../theme/theme";
import { ViewToggle } from "../ViewToggle";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe("ViewToggle", () => {
  const mockOnViewChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders toggle button group", () => {
    render(
      <ThemeWrapper>
        <ViewToggle view="card" onViewChange={mockOnViewChange} />
      </ThemeWrapper>
    );

    // Check that toggle buttons are rendered
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
  });

  it("has correct selected state for card view", () => {
    render(
      <ThemeWrapper>
        <ViewToggle view="card" onViewChange={mockOnViewChange} />
      </ThemeWrapper>
    );

    const buttons = screen.getAllByRole("button");
    // First button should be selected (card view)
    expect(buttons[0]).toHaveAttribute("aria-pressed", "true");
    expect(buttons[1]).toHaveAttribute("aria-pressed", "false");
  });

  it("has correct selected state for table view", () => {
    render(
      <ThemeWrapper>
        <ViewToggle view="table" onViewChange={mockOnViewChange} />
      </ThemeWrapper>
    );

    const buttons = screen.getAllByRole("button");
    // Second button should be selected (table view)
    expect(buttons[0]).toHaveAttribute("aria-pressed", "false");
    expect(buttons[1]).toHaveAttribute("aria-pressed", "true");
  });

  it("calls onViewChange with table when table button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <ThemeWrapper>
        <ViewToggle view="card" onViewChange={mockOnViewChange} />
      </ThemeWrapper>
    );

    const buttons = screen.getAllByRole("button");
    const tableButton = buttons[1]; // Second button is table view
    await user.click(tableButton);

    expect(mockOnViewChange).toHaveBeenCalledWith("table");
    expect(mockOnViewChange).toHaveBeenCalledTimes(1);
  });

  it("calls onViewChange with card when card button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <ThemeWrapper>
        <ViewToggle view="table" onViewChange={mockOnViewChange} />
      </ThemeWrapper>
    );

    const buttons = screen.getAllByRole("button");
    const cardButton = buttons[0]; // First button is card view
    await user.click(cardButton);

    expect(mockOnViewChange).toHaveBeenCalledWith("card");
    expect(mockOnViewChange).toHaveBeenCalledTimes(1);
  });

  it("does not call onViewChange when clicking already selected button", async () => {
    const user = userEvent.setup();
    render(
      <ThemeWrapper>
        <ViewToggle view="card" onViewChange={mockOnViewChange} />
      </ThemeWrapper>
    );

    const buttons = screen.getAllByRole("button");
    const cardButton = buttons[0]; // Already selected card button
    await user.click(cardButton);

    // Should not call onViewChange for already selected view
    expect(mockOnViewChange).not.toHaveBeenCalled();
  });

  it("has proper accessibility attributes", () => {
    render(
      <ThemeWrapper>
        <ViewToggle view="card" onViewChange={mockOnViewChange} />
      </ThemeWrapper>
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);

    buttons.forEach((button) => {
      expect(button).toHaveAttribute("type", "button");
      expect(button).toHaveAttribute("aria-pressed");
    });
  });
});
