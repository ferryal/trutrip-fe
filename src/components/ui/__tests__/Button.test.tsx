import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../../theme/theme";
import {
  Button,
  PrimaryButton,
  SecondaryButton,
  GradientButton1,
  SuccessButton,
  WarningButton,
  ErrorButton,
} from "../Button";

// Wrapper component for theme provider
const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe("Button", () => {
  const mockOnClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders children correctly", () => {
    render(
      <ThemeWrapper>
        <Button>Test Button</Button>
      </ThemeWrapper>
    );

    expect(
      screen.getByRole("button", { name: "Test Button" })
    ).toBeInTheDocument();
  });

  it("handles click events", async () => {
    const user = userEvent.setup();
    render(
      <ThemeWrapper>
        <Button onClick={mockOnClick}>Click me</Button>
      </ThemeWrapper>
    );

    const button = screen.getByRole("button", { name: "Click me" });
    await user.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("applies correct variant classes", () => {
    render(
      <ThemeWrapper>
        <Button variant="outlined">Outlined Button</Button>
      </ThemeWrapper>
    );

    const button = screen.getByRole("button", { name: "Outlined Button" });
    expect(button).toHaveClass("MuiButton-outlined");
  });

  it("applies correct color classes", () => {
    render(
      <ThemeWrapper>
        <Button color="secondary">Secondary Button</Button>
      </ThemeWrapper>
    );

    const button = screen.getByRole("button", { name: "Secondary Button" });
    expect(button).toHaveClass("MuiButton-colorSecondary");
  });

  it("renders gradient button when variant is gradient", () => {
    render(
      <ThemeWrapper>
        <Button variant="gradient" gradient="travel">
          Gradient Button
        </Button>
      </ThemeWrapper>
    );

    const button = screen.getByRole("button", { name: "Gradient Button" });
    expect(button).toBeInTheDocument();
  });

  it("can be disabled", () => {
    render(
      <ThemeWrapper>
        <Button disabled>Disabled Button</Button>
      </ThemeWrapper>
    );

    const button = screen.getByRole("button", { name: "Disabled Button" });
    expect(button).toBeDisabled();
  });
});

describe("Button Variants", () => {
  it("PrimaryButton renders with primary color", () => {
    render(
      <ThemeWrapper>
        <PrimaryButton>Primary</PrimaryButton>
      </ThemeWrapper>
    );

    const button = screen.getByRole("button", { name: "Primary" });
    expect(button).toHaveClass("MuiButton-colorPrimary");
  });

  it("SecondaryButton renders with secondary color", () => {
    render(
      <ThemeWrapper>
        <SecondaryButton>Secondary</SecondaryButton>
      </ThemeWrapper>
    );

    const button = screen.getByRole("button", { name: "Secondary" });
    expect(button).toHaveClass("MuiButton-colorSecondary");
  });

  it("GradientButton1 renders as gradient variant", () => {
    render(
      <ThemeWrapper>
        <GradientButton1>Gradient</GradientButton1>
      </ThemeWrapper>
    );

    const button = screen.getByRole("button", { name: "Gradient" });
    expect(button).toBeInTheDocument();
  });

  it("SuccessButton renders with success color", () => {
    render(
      <ThemeWrapper>
        <SuccessButton>Success</SuccessButton>
      </ThemeWrapper>
    );

    const button = screen.getByRole("button", { name: "Success" });
    expect(button).toHaveClass("MuiButton-colorSuccess");
  });

  it("WarningButton renders with warning color", () => {
    render(
      <ThemeWrapper>
        <WarningButton>Warning</WarningButton>
      </ThemeWrapper>
    );

    const button = screen.getByRole("button", { name: "Warning" });
    expect(button).toHaveClass("MuiButton-colorWarning");
  });

  it("ErrorButton renders with error color", () => {
    render(
      <ThemeWrapper>
        <ErrorButton>Error</ErrorButton>
      </ThemeWrapper>
    );

    const button = screen.getByRole("button", { name: "Error" });
    expect(button).toHaveClass("MuiButton-colorError");
  });
});
