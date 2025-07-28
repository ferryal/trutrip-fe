import React from "react";
import { ToggleButton, ToggleButtonGroup, Box, Tooltip } from "@mui/material";
import {
  ViewModule as CardViewIcon,
  ViewList as TableViewIcon,
} from "@mui/icons-material";
import type { ViewMode } from "../../types/api";

interface ViewToggleProps {
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({
  view,
  onViewChange,
}) => {
  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newView: ViewMode | null
  ) => {
    if (newView !== null) {
      onViewChange(newView);
    }
  };

  return (
    <Box>
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={handleChange}
        size="small"
        sx={{
          gap: 1,
          "& .MuiToggleButton-root": {
            borderRadius: 1,
            px: 2,
            py: 1,
            "&.Mui-selected": {
              backgroundColor: "primary.main",
              color: "white",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            },
          },
        }}
      >
        <ToggleButton value="card">
          <Tooltip title="Card View">
            <CardViewIcon fontSize="small" />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value="table">
          <Tooltip title="Table View">
            <TableViewIcon fontSize="small" />
          </Tooltip>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};
