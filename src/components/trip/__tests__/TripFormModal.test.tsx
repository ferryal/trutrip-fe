import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { theme } from "../../../theme/theme";
import { TripFormModal } from "../TripFormModal";
import type { Trip } from "../../../types/api";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {children}
    </LocalizationProvider>
  </ThemeProvider>
);

const mockCompanies = [
  { id: "company1", name: "Tech Corp" },
  { id: "company2", name: "Design Studio" },
];

const mockUsers = [
  { id: "user1", full_name: "John Doe", department: "Engineering" },
  { id: "user2", full_name: "Jane Smith", department: "Sales" },
];

const mockTrip: Trip = {
  id: "1",
  title: "Business Trip to London",
  description: "Client meetings",
  user_id: "user1",
  company_id: "company1",
  destination_city: "London",
  destination_country: "United Kingdom",
  purpose: "business",
  start_date: "2024-06-15",
  end_date: "2024-06-20",
  total_budget: 5000,
  status: "draft",
  priority: "medium",
  created_at: "2024-01-15T10:00:00Z",
  updated_at: "2024-01-15T10:00:00Z",
};

describe("TripFormModal", () => {
  const mockCallbacks = {
    onClose: vi.fn(),
    onSubmit: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("does not render when open is false", () => {
    render(
      <ThemeWrapper>
        <TripFormModal
          open={false}
          companies={mockCompanies}
          users={mockUsers}
          {...mockCallbacks}
        />
      </ThemeWrapper>
    );

    expect(screen.queryByText("Create New Trip")).not.toBeInTheDocument();
  });

  it("renders create mode when no trip is provided", () => {
    render(
      <ThemeWrapper>
        <TripFormModal
          open={true}
          companies={mockCompanies}
          users={mockUsers}
          {...mockCallbacks}
        />
      </ThemeWrapper>
    );

    expect(screen.getByText("Create New Trip")).toBeInTheDocument();
  });

  it("renders edit mode when trip is provided", () => {
    render(
      <ThemeWrapper>
        <TripFormModal
          open={true}
          trip={mockTrip}
          companies={mockCompanies}
          users={mockUsers}
          {...mockCallbacks}
        />
      </ThemeWrapper>
    );

    expect(screen.getByText("Edit Trip")).toBeInTheDocument();
  });

  it("renders all required form fields", () => {
    render(
      <ThemeWrapper>
        <TripFormModal
          open={true}
          companies={mockCompanies}
          users={mockUsers}
          {...mockCallbacks}
        />
      </ThemeWrapper>
    );

    expect(screen.getByLabelText(/trip title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/destination city/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/destination country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/total budget/i)).toBeInTheDocument();

    // Use role selectors for MUI select components
    const selects = screen.getAllByRole("combobox");
    expect(selects.length).toBeGreaterThanOrEqual(4); // traveler, company, purpose, priority
  });

  it("populates form with trip data in edit mode", () => {
    render(
      <ThemeWrapper>
        <TripFormModal
          open={true}
          trip={mockTrip}
          companies={mockCompanies}
          users={mockUsers}
          {...mockCallbacks}
        />
      </ThemeWrapper>
    );

    expect(
      screen.getByDisplayValue("Business Trip to London")
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("Client meetings")).toBeInTheDocument();
    expect(screen.getByDisplayValue("London")).toBeInTheDocument();
    expect(screen.getByDisplayValue("United Kingdom")).toBeInTheDocument();
  });

  it("renders form with required fields and submit button", async () => {
    render(
      <ThemeWrapper>
        <TripFormModal
          open={true}
          companies={mockCompanies}
          users={mockUsers}
          {...mockCallbacks}
        />
      </ThemeWrapper>
    );

    const submitButton = screen.getByRole("button", { name: /create trip/i });
    expect(submitButton).toBeInTheDocument();

    // Check that required fields are marked as required
    const titleField = screen.getByLabelText(/trip title/i);
    expect(titleField).toHaveAttribute("required");
  });

  it("can interact with form fields", async () => {
    const user = userEvent.setup();
    render(
      <ThemeWrapper>
        <TripFormModal
          open={true}
          companies={mockCompanies}
          users={mockUsers}
          {...mockCallbacks}
        />
      </ThemeWrapper>
    );

    // Fill form fields
    await user.type(screen.getByLabelText(/trip title/i), "Test Trip");
    await user.type(screen.getByLabelText(/destination city/i), "Paris");
    await user.type(screen.getByLabelText(/destination country/i), "France");

    // Check that the values were entered
    expect(screen.getByDisplayValue("Test Trip")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Paris")).toBeInTheDocument();
    expect(screen.getByDisplayValue("France")).toBeInTheDocument();
  });

  it("calls onClose when cancel button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <ThemeWrapper>
        <TripFormModal
          open={true}
          companies={mockCompanies}
          users={mockUsers}
          {...mockCallbacks}
        />
      </ThemeWrapper>
    );

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    await user.click(cancelButton);

    expect(mockCallbacks.onClose).toHaveBeenCalled();
  });

  it("displays error message when provided", () => {
    render(
      <ThemeWrapper>
        <TripFormModal
          open={true}
          error="Failed to create trip"
          companies={mockCompanies}
          users={mockUsers}
          {...mockCallbacks}
        />
      </ThemeWrapper>
    );

    expect(screen.getByText("Failed to create trip")).toBeInTheDocument();
  });

  it("disables form when loading", () => {
    render(
      <ThemeWrapper>
        <TripFormModal
          open={true}
          loading={true}
          companies={mockCompanies}
          users={mockUsers}
          {...mockCallbacks}
        />
      </ThemeWrapper>
    );

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    const submitButton = screen.getByRole("button", { name: /create trip/i });

    expect(cancelButton).toBeDisabled();
    expect(submitButton).toBeDisabled();
  });

  it("renders form inputs correctly", async () => {
    render(
      <ThemeWrapper>
        <TripFormModal
          open={true}
          companies={mockCompanies}
          users={mockUsers}
          {...mockCallbacks}
        />
      </ThemeWrapper>
    );

    // Check that all text inputs exist
    const titleInput = screen.getByLabelText(/trip title/i);
    const cityInput = screen.getByLabelText(/destination city/i);
    const countryInput = screen.getByLabelText(/destination country/i);
    const budgetInput = screen.getByLabelText(/total budget/i);

    expect(titleInput).toBeInTheDocument();
    expect(cityInput).toBeInTheDocument();
    expect(countryInput).toBeInTheDocument();
    expect(budgetInput).toBeInTheDocument();
  });

  it("can open purpose dropdown", async () => {
    const user = userEvent.setup();
    render(
      <ThemeWrapper>
        <TripFormModal
          open={true}
          companies={mockCompanies}
          users={mockUsers}
          {...mockCallbacks}
        />
      </ThemeWrapper>
    );

    // Find and click purpose select
    const selects = screen.getAllByRole("combobox");
    const purposeSelect = selects[2]; // Purpose is typically the 3rd select
    await user.click(purposeSelect);

    // Check that menu options appear (use getAllByText for multiple instances)
    const businessOptions = screen.getAllByText("Business");
    expect(businessOptions.length).toBeGreaterThan(0);

    expect(screen.getByText("Conference")).toBeInTheDocument();
    expect(screen.getByText("Training")).toBeInTheDocument();
    expect(screen.getByText("Client Meeting")).toBeInTheDocument();
  });

  it("can open priority dropdown", async () => {
    const user = userEvent.setup();
    render(
      <ThemeWrapper>
        <TripFormModal
          open={true}
          companies={mockCompanies}
          users={mockUsers}
          {...mockCallbacks}
        />
      </ThemeWrapper>
    );

    // Find and click priority select
    const selects = screen.getAllByRole("combobox");
    const prioritySelect = selects[3]; // Priority is typically the 4th select
    await user.click(prioritySelect);

    // Check that menu options appear (use getAllByText for multiple instances)
    expect(screen.getByText("Low")).toBeInTheDocument();
    const mediumOptions = screen.getAllByText("Medium");
    expect(mediumOptions.length).toBeGreaterThan(0);
    expect(screen.getByText("High")).toBeInTheDocument();
    expect(screen.getByText("Urgent")).toBeInTheDocument();
  });

  it("has budget input field", async () => {
    const user = userEvent.setup();
    render(
      <ThemeWrapper>
        <TripFormModal
          open={true}
          companies={mockCompanies}
          users={mockUsers}
          {...mockCallbacks}
        />
      </ThemeWrapper>
    );

    const budgetField = screen.getByLabelText(/total budget/i);
    expect(budgetField).toBeInTheDocument();

    // Test that budget field accepts input
    await user.type(budgetField, "1000");
    expect(screen.getByDisplayValue("1000")).toBeInTheDocument();
  });

  it("shows proper button text for edit mode", () => {
    render(
      <ThemeWrapper>
        <TripFormModal
          open={true}
          trip={mockTrip}
          companies={mockCompanies}
          users={mockUsers}
          {...mockCallbacks}
        />
      </ThemeWrapper>
    );

    expect(
      screen.getByRole("button", { name: /update trip/i })
    ).toBeInTheDocument();
  });

  it("handles empty companies and users arrays", () => {
    render(
      <ThemeWrapper>
        <TripFormModal
          open={true}
          companies={[]}
          users={[]}
          {...mockCallbacks}
        />
      </ThemeWrapper>
    );

    // Check that select components exist even with empty arrays
    const selects = screen.getAllByRole("combobox");
    expect(selects.length).toBeGreaterThanOrEqual(2); // At least traveler and company selects
  });

  it("renders form structure correctly", () => {
    render(
      <ThemeWrapper>
        <TripFormModal
          open={true}
          companies={mockCompanies}
          users={mockUsers}
          {...mockCallbacks}
        />
      </ThemeWrapper>
    );

    // Check overall form structure
    expect(screen.getByText("Create New Trip")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create trip/i })
    ).toBeInTheDocument();
  });
});
