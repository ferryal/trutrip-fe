// Database entity types based on our Supabase schema
export interface Company {
  id: string;
  name: string;
  domain: string;
  travel_budget: number;
  policy: {
    max_flight_cost: number;
    max_hotel_per_night: number;
    requires_approval_above: number;
  };
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  company_id: string;
  department: string;
  role: string;
  manager_id?: string;
  travel_grade: "standard" | "business" | "premium";
  created_at: string;
  // Relations
  company?: Company;
  manager?: User;
}

export interface Trip {
  id: string;
  title: string;
  description?: string;
  user_id: string;
  company_id: string;
  destination_city: string;
  destination_country: string;
  purpose: "business" | "conference" | "training" | "client_meeting";
  start_date: string;
  end_date: string;
  total_budget?: number;
  actual_cost?: number;
  status:
    | "draft"
    | "submitted"
    | "approved"
    | "rejected"
    | "in_progress"
    | "completed";
  priority: "low" | "medium" | "high" | "urgent";
  approval_notes?: string;
  created_at: string;
  updated_at: string;
  // Relations
  user?: User;
  company?: Company;
  accommodations?: Accommodation[];
  transportation?: Transportation[];
  trip_itineraries?: TripItinerary[];
  ai_recommendations?: AIRecommendation[];
  expenses?: Expense[];
  trip_approvals?: TripApproval[];
}

export interface TripItinerary {
  id: string;
  trip_id: string;
  day_number: number;
  date: string;
  activities: Array<{
    time: string;
    activity: string;
    location: string;
  }>;
  notes?: string;
  created_at: string;
}

export interface Accommodation {
  id: string;
  trip_id: string;
  hotel_name: string;
  address?: string;
  check_in: string;
  check_out: string;
  room_type?: string;
  nightly_rate?: number;
  total_cost?: number;
  booking_reference?: string;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
}

export interface Transportation {
  id: string;
  trip_id: string;
  type: "flight" | "train" | "car_rental" | "taxi" | "uber" | "tube";
  from_location: string;
  to_location: string;
  departure_time?: string;
  arrival_time?: string;
  cost?: number;
  booking_reference?: string;
  details?: Record<string, any>;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  created_at: string;
}

export interface AIRecommendation {
  id: string;
  trip_id: string;
  recommendation_type:
    | "flights"
    | "hotels"
    | "restaurants"
    | "attractions"
    | "business_venues"
    | "cultural_etiquette"
    | "local_tips"
    | "weather_clothing"
    | "networking_events";
  content: Record<string, any>;
  confidence_score: number;
  created_at: string;
}

export interface Expense {
  id: string;
  trip_id: string;
  category:
    | "meals"
    | "transport"
    | "accommodation"
    | "miscellaneous"
    | "conference"
    | "entertainment"
    | "communication";
  amount: number;
  currency: string;
  description?: string;
  date: string;
  receipt_url?: string;
  is_reimbursable: boolean;
  created_at: string;
}

export interface TripApproval {
  id: string;
  trip_id: string;
  approver_id: string;
  status: "pending" | "approved" | "rejected";
  comments?: string;
  approved_at?: string;
  created_at: string;
  // Relations
  approver?: User;
}

// Pagination types
export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Filter types
export interface TripFilters {
  status?: Trip["status"];
  user_id?: string;
  company_id?: string;
  destination?: string;
  purpose?: Trip["purpose"];
  priority?: Trip["priority"];
  start_date_gte?: string;
  start_date_lte?: string;
  search?: string;
}

export interface TripStats {
  total_trips: number;
  total_budget: number;
  total_spent: number;
  by_status: Record<string, number>;
  by_purpose: Record<string, number>;
  by_priority: Record<string, number>;
  average_cost: number;
  upcoming_trips: number;
  completed_trips: number;
}

// Form types
export interface TripFormData {
  title: string;
  description?: string;
  user_id: string;
  company_id: string;
  destination_city: string;
  destination_country: string;
  purpose: Trip["purpose"];
  start_date: string;
  end_date: string;
  total_budget?: number;
  priority: Trip["priority"];
}

export interface TripFormErrors {
  title?: string;
  destination_city?: string;
  destination_country?: string;
  purpose?: string;
  start_date?: string;
  end_date?: string;
  total_budget?: string;
  priority?: string;
  user_id?: string;
  company_id?: string;
  general?: string;
}

// View preferences
export type ViewMode = "card" | "table";

export interface ViewPreferences {
  mode: ViewMode;
  itemsPerPage: number;
}
