import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../../theme/theme";
import { Pagination } from "../Pagination";
import type { PaginatedResponse } from "../../../types/api";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const mockData: PaginatedResponse<any> = {
  data: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 100,
    totalPages: 10,
    hasNext: true,
    hasPrev: false,
  },
};

describe("Pagination", () => {
  const mockOnPageChange = vi.fn();
  const mockOnRowsPerPageChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays correct trip count information", () => {
    render(
      <ThemeWrapper>
        <Pagination
          data={mockData}
          onPageChange={mockOnPageChange}
          onRowsPerPageChange={mockOnRowsPerPageChange}
        />
      </ThemeWrapper>
    );

    expect(screen.getByText("Showing 1-10 of 100 trips")).toBeInTheDocument();
  });

  it("displays pagination controls", () => {
    render(
      <ThemeWrapper>
        <Pagination
          data={mockData}
          onPageChange={mockOnPageChange}
          onRowsPerPageChange={mockOnRowsPerPageChange}
        />
      </ThemeWrapper>
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByLabelText(/go to first page/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/go to last page/i)).toBeInTheDocument();
  });

  it("calls onPageChange when page is changed", async () => {
    const user = userEvent.setup();
    render(
      <ThemeWrapper>
        <Pagination
          data={mockData}
          onPageChange={mockOnPageChange}
          onRowsPerPageChange={mockOnRowsPerPageChange}
        />
      </ThemeWrapper>
    );

    const nextButton = screen.getByLabelText(/go to next page/i);
    await user.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it("displays per page select with default options", () => {
    render(
      <ThemeWrapper>
        <Pagination
          data={mockData}
          onPageChange={mockOnPageChange}
          onRowsPerPageChange={mockOnRowsPerPageChange}
        />
      </ThemeWrapper>
    );

    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("calls onRowsPerPageChange when rows per page is changed", async () => {
    const user = userEvent.setup();
    render(
      <ThemeWrapper>
        <Pagination
          data={mockData}
          onPageChange={mockOnPageChange}
          onRowsPerPageChange={mockOnRowsPerPageChange}
        />
      </ThemeWrapper>
    );

    const select = screen.getByRole("combobox");
    await user.click(select);

    const option25 = screen.getByRole("option", { name: "25" });
    await user.click(option25);

    expect(mockOnRowsPerPageChange).toHaveBeenCalledWith(25);
  });

  it("disables pagination when only one page", () => {
    const singlePageData = {
      ...mockData,
      pagination: {
        ...mockData.pagination,
        total: 5,
        totalPages: 1,
      },
    };

    render(
      <ThemeWrapper>
        <Pagination
          data={singlePageData}
          onPageChange={mockOnPageChange}
          onRowsPerPageChange={mockOnRowsPerPageChange}
        />
      </ThemeWrapper>
    );

    const firstPageButton = screen.getByLabelText(/go to first page/i);
    const lastPageButton = screen.getByLabelText(/go to last page/i);
    expect(firstPageButton).toBeDisabled();
    expect(lastPageButton).toBeDisabled();
  });

  it("shows correct count for last page", () => {
    const lastPageData = {
      ...mockData,
      pagination: {
        ...mockData.pagination,
        page: 10,
        total: 95,
        hasNext: false,
        hasPrev: true,
      },
    };

    render(
      <ThemeWrapper>
        <Pagination
          data={lastPageData}
          onPageChange={mockOnPageChange}
          onRowsPerPageChange={mockOnRowsPerPageChange}
        />
      </ThemeWrapper>
    );

    expect(screen.getByText("Showing 91-95 of 95 trips")).toBeInTheDocument();
  });

  it("accepts custom rowsPerPageOptions", () => {
    render(
      <ThemeWrapper>
        <Pagination
          data={mockData}
          onPageChange={mockOnPageChange}
          onRowsPerPageChange={mockOnRowsPerPageChange}
          rowsPerPageOptions={[10, 20, 50]}
        />
      </ThemeWrapper>
    );

    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
});
