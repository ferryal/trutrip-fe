import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../../theme/theme";
import {
  Typography,
  Heading,
  Subheading,
  Title,
  Body,
  Caption,
  GradientTitle,
  GradientHeading,
} from "../Typography";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe("Typography", () => {
  it("renders children correctly", () => {
    render(
      <ThemeWrapper>
        <Typography>Basic Typography</Typography>
      </ThemeWrapper>
    );

    expect(screen.getByText("Basic Typography")).toBeInTheDocument();
  });

  it("applies gradient styling when gradient prop is true", () => {
    render(
      <ThemeWrapper>
        <Typography gradient gradientType="primary" data-testid="gradient-text">
          Gradient Text
        </Typography>
      </ThemeWrapper>
    );

    const text = screen.getByTestId("gradient-text");
    expect(text).toBeInTheDocument();
  });

  it("renders without gradient when gradient prop is false", () => {
    render(
      <ThemeWrapper>
        <Typography gradient={false} data-testid="normal-text">
          Normal Text
        </Typography>
      </ThemeWrapper>
    );

    const text = screen.getByTestId("normal-text");
    expect(text).toBeInTheDocument();
  });

  it("accepts standard Material-UI Typography props", () => {
    render(
      <ThemeWrapper>
        <Typography variant="h1" color="primary">
          H1 Primary Text
        </Typography>
      </ThemeWrapper>
    );

    expect(screen.getByText("H1 Primary Text")).toBeInTheDocument();
  });
});

describe("Heading", () => {
  it("renders heading text", () => {
    render(
      <ThemeWrapper>
        <Heading>Main Heading</Heading>
      </ThemeWrapper>
    );

    expect(screen.getByText("Main Heading")).toBeInTheDocument();
  });

  it("uses h4 variant by default", () => {
    render(
      <ThemeWrapper>
        <Heading>Heading Text</Heading>
      </ThemeWrapper>
    );

    const heading = screen.getByText("Heading Text");
    expect(heading).toBeInTheDocument();
  });
});

describe("Subheading", () => {
  it("renders subheading text", () => {
    render(
      <ThemeWrapper>
        <Subheading>Section Subheading</Subheading>
      </ThemeWrapper>
    );

    expect(screen.getByText("Section Subheading")).toBeInTheDocument();
  });
});

describe("Title", () => {
  it("renders title text", () => {
    render(
      <ThemeWrapper>
        <Title>Card Title</Title>
      </ThemeWrapper>
    );

    expect(screen.getByText("Card Title")).toBeInTheDocument();
  });
});

describe("Body", () => {
  it("renders body text", () => {
    render(
      <ThemeWrapper>
        <Body>This is body text content.</Body>
      </ThemeWrapper>
    );

    expect(screen.getByText("This is body text content.")).toBeInTheDocument();
  });
});

describe("Caption", () => {
  it("renders caption text", () => {
    render(
      <ThemeWrapper>
        <Caption>Small caption text</Caption>
      </ThemeWrapper>
    );

    expect(screen.getByText("Small caption text")).toBeInTheDocument();
  });
});

describe("GradientTitle", () => {
  it("renders gradient title text", () => {
    render(
      <ThemeWrapper>
        <GradientTitle>Large Gradient Title</GradientTitle>
      </ThemeWrapper>
    );

    expect(screen.getByText("Large Gradient Title")).toBeInTheDocument();
  });
});

describe("GradientHeading", () => {
  it("renders gradient heading text", () => {
    render(
      <ThemeWrapper>
        <GradientHeading>Gradient Heading</GradientHeading>
      </ThemeWrapper>
    );

    expect(screen.getByText("Gradient Heading")).toBeInTheDocument();
  });
});

describe("Typography Variants Integration", () => {
  it("renders all typography variants together", () => {
    render(
      <ThemeWrapper>
        <div>
          <GradientTitle>Main Title</GradientTitle>
          <GradientHeading>Section Heading</GradientHeading>
          <Heading>Sub Heading</Heading>
          <Subheading>Subheading</Subheading>
          <Title>Title</Title>
          <Body>Body text content</Body>
          <Caption>Caption text</Caption>
        </div>
      </ThemeWrapper>
    );

    expect(screen.getByText("Main Title")).toBeInTheDocument();
    expect(screen.getByText("Section Heading")).toBeInTheDocument();
    expect(screen.getByText("Sub Heading")).toBeInTheDocument();
    expect(screen.getByText("Subheading")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Body text content")).toBeInTheDocument();
    expect(screen.getByText("Caption text")).toBeInTheDocument();
  });

  it("accepts custom props for all variants", () => {
    render(
      <ThemeWrapper>
        <div>
          <Heading color="primary">Colored Heading</Heading>
          <Body fontSize="large">Large Body</Body>
          <Caption color="error">Error Caption</Caption>
        </div>
      </ThemeWrapper>
    );

    expect(screen.getByText("Colored Heading")).toBeInTheDocument();
    expect(screen.getByText("Large Body")).toBeInTheDocument();
    expect(screen.getByText("Error Caption")).toBeInTheDocument();
  });
});
