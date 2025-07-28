import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
  getTripStats,
  getRecentTrips,
  getTripsByStatus,
  updateTripStatus,
} from "../services/tripService";
import type {
  Trip,
  TripFilters,
  PaginationParams,
  TripFormData,
} from "../types/api";

// Query Keys
export const tripKeys = {
  all: ["trips"] as const,
  lists: () => [...tripKeys.all, "list"] as const,
  list: (filters: TripFilters, pagination: PaginationParams) =>
    [...tripKeys.lists(), filters, pagination] as const,
  details: () => [...tripKeys.all, "detail"] as const,
  detail: (id: string) => [...tripKeys.details(), id] as const,
  stats: (companyId?: string) => [...tripKeys.all, "stats", companyId] as const,
  recent: (limit?: number) => [...tripKeys.all, "recent", limit] as const,
  byStatus: (status: Trip["status"], pagination: PaginationParams) =>
    [...tripKeys.all, "status", status, pagination] as const,
};

// GET Hooks
export const useTrips = (
  filters: TripFilters = {},
  pagination: PaginationParams = {}
) => {
  return useQuery({
    queryKey: tripKeys.list(filters, pagination),
    queryFn: () => getTrips(filters, pagination),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

export const useTrip = (tripId: string) => {
  return useQuery({
    queryKey: tripKeys.detail(tripId),
    queryFn: () => getTripById(tripId),
    enabled: !!tripId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useTripStats = (companyId?: string) => {
  return useQuery({
    queryKey: tripKeys.stats(companyId),
    queryFn: () => getTripStats(companyId),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useRecentTrips = (limit: number = 5) => {
  return useQuery({
    queryKey: tripKeys.recent(limit),
    queryFn: () => getRecentTrips(limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useTripsByStatus = (
  status: Trip["status"],
  pagination: PaginationParams = {}
) => {
  return useQuery({
    queryKey: tripKeys.byStatus(status, pagination),
    queryFn: () => getTripsByStatus(status, pagination),
    staleTime: 3 * 60 * 1000, // 3 minutes
  });
};

// Mutation Hooks
export const useCreateTrip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTrip,
    onSuccess: (newTrip) => {
      // Invalidate all trip lists
      queryClient.invalidateQueries({ queryKey: tripKeys.lists() });
      queryClient.invalidateQueries({ queryKey: tripKeys.stats() });
      queryClient.invalidateQueries({ queryKey: tripKeys.recent() });

      // Optimistically add to cache
      queryClient.setQueryData(tripKeys.detail(newTrip.id), newTrip);
    },
    onError: (error) => {
      console.error("Failed to create trip:", error);
    },
  });
};

export const useUpdateTrip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      tripId,
      updates,
    }: {
      tripId: string;
      updates: Partial<TripFormData>;
    }) => updateTrip(tripId, updates),
    onSuccess: (updatedTrip) => {
      // Update specific trip in cache
      queryClient.setQueryData(tripKeys.detail(updatedTrip.id), updatedTrip);

      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: tripKeys.lists() });
      queryClient.invalidateQueries({ queryKey: tripKeys.stats() });
    },
    onError: (error) => {
      console.error("Failed to update trip:", error);
    },
  });
};

export const useDeleteTrip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTrip,
    onSuccess: (_, tripId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: tripKeys.detail(tripId) });

      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: tripKeys.lists() });
      queryClient.invalidateQueries({ queryKey: tripKeys.stats() });
      queryClient.invalidateQueries({ queryKey: tripKeys.recent() });
    },
    onError: (error) => {
      console.error("Failed to delete trip:", error);
    },
  });
};

export const useUpdateTripStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      tripId,
      status,
      notes,
    }: {
      tripId: string;
      status: Trip["status"];
      notes?: string;
    }) => updateTripStatus(tripId, status, notes),
    onSuccess: (updatedTrip) => {
      // Update specific trip in cache
      queryClient.setQueryData(tripKeys.detail(updatedTrip.id), updatedTrip);

      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: tripKeys.lists() });
      queryClient.invalidateQueries({ queryKey: tripKeys.stats() });
    },
    onError: (error) => {
      console.error("Failed to update trip status:", error);
    },
  });
};
