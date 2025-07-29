import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../../theme/theme";
import { Navbar } from "../Navbar";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe("Navbar", () => {
  it("renders the TruTrip brand correctly", () => {
    render(
      <ThemeWrapper>
        <Navbar />
      </ThemeWrapper>
    );

    expect(screen.getByText("Tru")).toBeInTheDocument();
    expect(screen.getByText("Trip")).toBeInTheDocument();
  });

  it("renders children in the right section", () => {
    render(
      <ThemeWrapper>
        <Navbar>
          <div data-testid="navbar-child">Test Child</div>
        </Navbar>
      </ThemeWrapper>
    );

    expect(screen.getByTestId("navbar-child")).toBeInTheDocument();
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("renders without children", () => {
    render(
      <ThemeWrapper>
        <Navbar />
      </ThemeWrapper>
    );

    expect(screen.getByText("Tru")).toBeInTheDocument();
    expect(screen.getByText("Trip")).toBeInTheDocument();
  });

  it("has correct AppBar structure", () => {
    render(
      <ThemeWrapper>
        <Navbar />
      </ThemeWrapper>
    );

    const appBar = screen.getByRole("banner");
    expect(appBar).toBeInTheDocument();
    expect(appBar).toHaveClass("MuiAppBar-root");
  });

  it("displays brand with correct styling structure", () => {
    render(
      <ThemeWrapper>
        <Navbar />
      </ThemeWrapper>
    );

    const truText = screen.getByText("Tru");
    const tripText = screen.getByText("Trip");

    expect(truText).toBeInTheDocument();
    expect(tripText).toBeInTheDocument();
  });

  it("renders multiple children correctly", () => {
    render(
      <ThemeWrapper>
        <Navbar>
          <span data-testid="child1">Child 1</span>
          <span data-testid="child2">Child 2</span>
        </Navbar>
      </ThemeWrapper>
    );

    expect(screen.getByTestId("child1")).toBeInTheDocument();
    expect(screen.getByTestId("child2")).toBeInTheDocument();
  });
});
