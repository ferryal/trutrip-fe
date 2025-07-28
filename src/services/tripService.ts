import { apiRequest, buildQueryParams } from "../lib/api";
import type {
  Trip,
  TripFilters,
  TripStats,
  PaginatedResponse,
  PaginationParams,
  TripFormData,
} from "../types/api";

// GET /trips - Fetch trips with optional filters, relations, and pagination
export async function getTrips(
  filters: TripFilters = {},
  pagination: PaginationParams = {}
): Promise<PaginatedResponse<Trip>> {
  const { page = 1, limit = 10 } = pagination;
  const offset = (page - 1) * limit;

  const params: Record<string, any> = {
    select: `
      *,
      users(id, full_name, department, travel_grade),
      companies(id, name, policy),
      accommodations(*),
      transportation(*),
      trip_itineraries(*),
      ai_recommendations(*),
      expenses(*),
      trip_approvals(*, users(full_name))
    `,
    order: "created_at.desc",
    limit: limit.toString(),
    offset: offset.toString(),
  };

  // Apply filters
  if (filters.status) {
    params["status"] = `eq.${filters.status}`;
  }
  if (filters.user_id) {
    params["user_id"] = `eq.${filters.user_id}`;
  }
  if (filters.company_id) {
    params["company_id"] = `eq.${filters.company_id}`;
  }
  if (filters.destination) {
    params["destination_city"] = `ilike.%${filters.destination}%`;
  }
  if (filters.purpose) {
    params["purpose"] = `eq.${filters.purpose}`;
  }
  if (filters.priority) {
    params["priority"] = `eq.${filters.priority}`;
  }
  if (filters.start_date_gte) {
    params["start_date"] = `gte.${filters.start_date_gte}`;
  }
  if (filters.start_date_lte) {
    params["start_date"] = `lte.${filters.start_date_lte}`;
  }
  if (filters.search) {
    params["or"] =
      `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,destination_city.ilike.%${filters.search}%`;
  }

  const queryString = buildQueryParams(params);

  // Get trips data
  const trips = await apiRequest<Trip[]>(`/trips?${queryString}`);

  // Get total count for pagination
  const countParams: Record<string, any> = {
    select: "count",
    ...(filters.status && { status: `eq.${filters.status}` }),
    ...(filters.user_id && { user_id: `eq.${filters.user_id}` }),
    ...(filters.company_id && { company_id: `eq.${filters.company_id}` }),
    ...(filters.destination && {
      destination_city: `ilike.%${filters.destination}%`,
    }),
    ...(filters.purpose && { purpose: `eq.${filters.purpose}` }),
    ...(filters.priority && { priority: `eq.${filters.priority}` }),
    ...(filters.start_date_gte && {
      start_date: `gte.${filters.start_date_gte}`,
    }),
    ...(filters.start_date_lte && {
      start_date: `lte.${filters.start_date_lte}`,
    }),
    ...(filters.search && {
      or: `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,destination_city.ilike.%${filters.search}%`,
    }),
  };

  const countQueryString = buildQueryParams(countParams);
  const countResult = await apiRequest<any[]>(`/trips?${countQueryString}`, {
    headers: {
      Prefer: "count=exact",
    },
  });

  const total = parseInt(countResult[0]?.count || "0");
  const totalPages = Math.ceil(total / limit);

  return {
    data: trips,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
}

// GET /trips/:id - Fetch single trip with full details
export async function getTripById(tripId: string): Promise<Trip> {
  const params = {
    select: `
      *,
      users(id, full_name, department, travel_grade, email),
      companies(id, name, policy, domain),
      accommodations(*),
      transportation(*),
      trip_itineraries(*),
      ai_recommendations(*),
      expenses(*),
      trip_approvals(*, users(full_name, email))
    `,
  };

  const queryString = buildQueryParams(params);
  const trips = await apiRequest<Trip[]>(
    `/trips?id=eq.${tripId}&${queryString}`
  );

  if (trips.length === 0) {
    throw new Error("Trip not found");
  }

  return trips[0];
}

// POST /trips - Create new trip
export async function createTrip(tripData: TripFormData): Promise<Trip> {
  const newTrip = {
    ...tripData,
    status: "draft" as const,
    actual_cost: 0,
    updated_at: new Date().toISOString(),
  };

  const result = await apiRequest<Trip[]>("/trips", {
    method: "POST",
    body: JSON.stringify(newTrip),
  });

  return result[0];
}

// PATCH /trips/:id - Update trip
export async function updateTrip(
  tripId: string,
  updates: Partial<TripFormData>
): Promise<Trip> {
  const updateData = {
    ...updates,
    updated_at: new Date().toISOString(),
  };

  const trips = await apiRequest<Trip[]>(`/trips?id=eq.${tripId}`, {
    method: "PATCH",
    body: JSON.stringify(updateData),
  });

  if (trips.length === 0) {
    throw new Error("Trip not found");
  }

  return trips[0];
}

// DELETE /trips/:id - Delete trip
export async function deleteTrip(tripId: string): Promise<void> {
  await apiRequest<void>(`/trips?id=eq.${tripId}`, {
    method: "DELETE",
  });
}

// GET /trips - Advanced: Get trip statistics
export async function getTripStats(companyId?: string): Promise<TripStats> {
  const params: Record<string, any> = {
    select: "status,total_budget,actual_cost,purpose,priority,start_date",
  };

  if (companyId) {
    params["company_id"] = `eq.${companyId}`;
  }

  const queryString = buildQueryParams(params);
  const trips = await apiRequest<Partial<Trip>[]>(`/trips?${queryString}`);

  // Process statistics
  const now = new Date();
  const stats: TripStats = {
    total_trips: trips.length,
    total_budget: trips.reduce(
      (sum, trip) => sum + (trip.total_budget || 0),
      0
    ),
    total_spent: trips.reduce((sum, trip) => sum + (trip.actual_cost || 0), 0),
    by_status: {},
    by_purpose: {},
    by_priority: {},
    average_cost: 0,
    upcoming_trips: 0,
    completed_trips: 0,
  };

  trips.forEach((trip) => {
    // Status distribution
    if (trip.status) {
      stats.by_status[trip.status] = (stats.by_status[trip.status] || 0) + 1;
    }

    // Purpose distribution
    if (trip.purpose) {
      stats.by_purpose[trip.purpose] =
        (stats.by_purpose[trip.purpose] || 0) + 1;
    }

    // Priority distribution
    if (trip.priority) {
      stats.by_priority[trip.priority] =
        (stats.by_priority[trip.priority] || 0) + 1;
    }

    // Upcoming vs completed
    if (trip.start_date) {
      const startDate = new Date(trip.start_date);
      if (startDate > now) {
        stats.upcoming_trips++;
      } else if (trip.status === "completed") {
        stats.completed_trips++;
      }
    }
  });

  // Calculate average cost
  const tripsWithCost = trips.filter(
    (trip) => trip.actual_cost && trip.actual_cost > 0
  );
  if (tripsWithCost.length > 0) {
    stats.average_cost = stats.total_spent / tripsWithCost.length;
  }

  return stats;
}

// GET /trips - Get recent trips
export async function getRecentTrips(limit: number = 5): Promise<Trip[]> {
  const params = {
    select: `
      *,
      users(full_name, department),
      companies(name)
    `,
    order: "created_at.desc",
    limit: limit.toString(),
  };

  const queryString = buildQueryParams(params);
  return apiRequest<Trip[]>(`/trips?${queryString}`);
}

// GET /trips - Get trips by status with pagination
export async function getTripsByStatus(
  status: Trip["status"],
  pagination: PaginationParams = {}
): Promise<PaginatedResponse<Trip>> {
  return getTrips({ status }, pagination);
}

// PATCH /trips/:id - Update trip status
export async function updateTripStatus(
  tripId: string,
  status: Trip["status"],
  notes?: string
): Promise<Trip> {
  return updateTrip(tripId, {
    status,
    approval_notes: notes,
  } as any);
}
