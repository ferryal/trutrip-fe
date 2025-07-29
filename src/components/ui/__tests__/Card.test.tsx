import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../../theme/theme";
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  FeatureCard,
  StatsCard,
} from "../Card";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe("Card", () => {
  it("renders children correctly", () => {
    render(
      <ThemeWrapper>
        <Card>
          <CardContent>Test Content</CardContent>
        </Card>
      </ThemeWrapper>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("applies default variant correctly", () => {
    render(
      <ThemeWrapper>
        <Card data-testid="card">
          <CardContent>Default Card</CardContent>
        </Card>
      </ThemeWrapper>
    );

    const card = screen.getByTestId("card");
    expect(card).toHaveClass("MuiCard-root");
  });

  it("applies elevated variant correctly", () => {
    render(
      <ThemeWrapper>
        <Card cardVariant="elevated" data-testid="elevated-card">
          <CardContent>Elevated Card</CardContent>
        </Card>
      </ThemeWrapper>
    );

    const card = screen.getByTestId("elevated-card");
    expect(card).toBeInTheDocument();
  });

  it("applies outlined variant correctly", () => {
    render(
      <ThemeWrapper>
        <Card cardVariant="outlined" data-testid="outlined-card">
          <CardContent>Outlined Card</CardContent>
        </Card>
      </ThemeWrapper>
    );

    const card = screen.getByTestId("outlined-card");
    expect(card).toHaveClass("MuiCard-root");
  });

  it("applies hover variant correctly", () => {
    render(
      <ThemeWrapper>
        <Card cardVariant="hover" data-testid="hover-card">
          <CardContent>Hover Card</CardContent>
        </Card>
      </ThemeWrapper>
    );

    const card = screen.getByTestId("hover-card");
    expect(card).toBeInTheDocument();
  });

  it("applies gradient variant correctly", () => {
    render(
      <ThemeWrapper>
        <Card
          cardVariant="gradient"
          gradient="primary"
          data-testid="gradient-card"
        >
          <CardContent>Gradient Card</CardContent>
        </Card>
      </ThemeWrapper>
    );

    const card = screen.getByTestId("gradient-card");
    expect(card).toBeInTheDocument();
  });
});

describe("FeatureCard", () => {
  it("renders title and description", () => {
    render(
      <ThemeWrapper>
        <FeatureCard
          title="Feature Title"
          description="Feature description text"
        />
      </ThemeWrapper>
    );

    expect(screen.getByText("Feature Title")).toBeInTheDocument();
    expect(screen.getByText("Feature description text")).toBeInTheDocument();
  });

  it("renders with icon", () => {
    const TestIcon = () => <div data-testid="test-icon">Icon</div>;

    render(
      <ThemeWrapper>
        <FeatureCard
          title="Feature Title"
          description="Feature description"
          icon={<TestIcon />}
        />
      </ThemeWrapper>
    );

    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  it("renders without icon", () => {
    render(
      <ThemeWrapper>
        <FeatureCard title="Feature Title" description="Feature description" />
      </ThemeWrapper>
    );

    expect(screen.getByText("Feature Title")).toBeInTheDocument();
  });
});

describe("StatsCard", () => {
  it("renders title and value", () => {
    render(
      <ThemeWrapper>
        <StatsCard title="Total Users" value={1234} />
      </ThemeWrapper>
    );

    expect(screen.getByText("Total Users")).toBeInTheDocument();
    expect(screen.getByText("1234")).toBeInTheDocument();
  });

  it("renders with subtitle and trend up", () => {
    render(
      <ThemeWrapper>
        <StatsCard
          title="Revenue"
          value="$50K"
          subtitle="+12% from last month"
          trend="up"
        />
      </ThemeWrapper>
    );

    expect(screen.getByText("+12% from last month")).toBeInTheDocument();
  });

  it("renders with trend down", () => {
    render(
      <ThemeWrapper>
        <StatsCard
          title="Expenses"
          value="$20K"
          subtitle="-5% from last month"
          trend="down"
        />
      </ThemeWrapper>
    );

    expect(screen.getByText("-5% from last month")).toBeInTheDocument();
  });

  it("renders with neutral trend", () => {
    render(
      <ThemeWrapper>
        <StatsCard
          title="Orders"
          value={100}
          subtitle="No change"
          trend="neutral"
        />
      </ThemeWrapper>
    );

    expect(screen.getByText("No change")).toBeInTheDocument();
  });

  it("renders with icon", () => {
    const TestIcon = () => <div data-testid="stats-icon">Stats Icon</div>;

    render(
      <ThemeWrapper>
        <StatsCard title="Metrics" value={42} icon={<TestIcon />} />
      </ThemeWrapper>
    );

    expect(screen.getByTestId("stats-icon")).toBeInTheDocument();
  });

  it("renders without subtitle", () => {
    render(
      <ThemeWrapper>
        <StatsCard title="Simple Stat" value="100%" />
      </ThemeWrapper>
    );

    expect(screen.getByText("Simple Stat")).toBeInTheDocument();
    expect(screen.getByText("100%")).toBeInTheDocument();
  });
});

describe("Card Components", () => {
  it("CardContent renders children", () => {
    render(
      <ThemeWrapper>
        <Card>
          <CardContent>Content Text</CardContent>
        </Card>
      </ThemeWrapper>
    );

    expect(screen.getByText("Content Text")).toBeInTheDocument();
  });

  it("CardActions renders children", () => {
    render(
      <ThemeWrapper>
        <Card>
          <CardActions>
            <button>Action Button</button>
          </CardActions>
        </Card>
      </ThemeWrapper>
    );

    expect(
      screen.getByRole("button", { name: "Action Button" })
    ).toBeInTheDocument();
  });

  it("CardHeader renders children", () => {
    render(
      <ThemeWrapper>
        <Card>
          <CardHeader title="Header Title" />
        </Card>
      </ThemeWrapper>
    );

    expect(screen.getByText("Header Title")).toBeInTheDocument();
  });
});
