import React from "react";
import {
  Box,
  Pagination as MuiPagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import type { PaginatedResponse } from "../../types/api";

interface PaginationProps {
  data: PaginatedResponse<any>;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  rowsPerPageOptions?: number[];
}

export const Pagination: React.FC<PaginationProps> = ({
  data,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [5, 10, 25, 50],
}) => {
  const { pagination } = data;

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    onPageChange(page);
  };

  const handleRowsPerPageChange = (event: any) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
  };

  const startItem = (pagination.page - 1) * pagination.limit + 1;
  const endItem = Math.min(
    pagination.page * pagination.limit,
    pagination.total
  );

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 2,
        py: 2,
      }}
    >
      {/* Items count and rows per page */}
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}
      >
        <Typography variant="body2" color="text.secondary">
          Showing {startItem}-{endItem} of {pagination.total} trips
        </Typography>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Per page</InputLabel>
          <Select
            value={pagination.limit}
            label="Per page"
            onChange={handleRowsPerPageChange}
          >
            {rowsPerPageOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Pagination controls */}
      <MuiPagination
        count={pagination.totalPages}
        page={pagination.page}
        onChange={handlePageChange}
        color="primary"
        showFirstButton
        showLastButton
        disabled={pagination.totalPages <= 1}
        sx={{
          "& .MuiPaginationItem-root": {
            fontWeight: 500,
          },
          "& .MuiPaginationItem-page.Mui-selected": {
            backgroundColor: "primary.main",
            color: "white",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          },
        }}
      />
    </Box>
  );
};
