import { apiRequest, buildQueryParams } from "../lib/api";
import type { Company, User } from "../types/api";

// GET /companies - Fetch all companies
export async function getCompanies(): Promise<Company[]> {
  const params = {
    select: "*",
    order: "name.asc",
  };

  const queryString = buildQueryParams(params);
  return apiRequest<Company[]>(`/companies?${queryString}`);
}

// GET /companies/:id - Fetch single company
export async function getCompanyById(companyId: string): Promise<Company> {
  const companies = await apiRequest<Company[]>(
    `/companies?id=eq.${companyId}`
  );

  if (companies.length === 0) {
    throw new Error("Company not found");
  }

  return companies[0];
}

// GET /users - Get users by company
export async function getUsersByCompany(companyId: string): Promise<User[]> {
  const params = {
    select: `
      *,
      company:companies(name, domain),
      manager:users(full_name, email)
    `,
    company_id: `eq.${companyId}`,
    order: "full_name.asc",
  };

  const queryString = buildQueryParams(params);
  return apiRequest<User[]>(`/users?${queryString}`);
}

// POST /companies - Create new company
export async function createCompany(
  companyData: Omit<Company, "id" | "created_at">
): Promise<Company> {
  return apiRequest<Company>("/companies", {
    method: "POST",
    body: JSON.stringify(companyData),
  });
}

// PATCH /companies/:id - Update company
export async function updateCompany(
  companyId: string,
  updates: Partial<Company>
): Promise<Company> {
  const companies = await apiRequest<Company[]>(
    `/companies?id=eq.${companyId}`,
    {
      method: "PATCH",
      body: JSON.stringify(updates),
    }
  );

  if (companies.length === 0) {
    throw new Error("Company not found");
  }

  return companies[0];
}
