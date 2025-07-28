import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Navbar, Container } from "../components";
import { Button as MuiButton, Box } from "@mui/material";

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar title="TruTrip">
        <MuiButton
          color="inherit"
          component={Link}
          to="/"
          sx={{
            mr: 2,
            color: "text.primary",
            "&:hover": { backgroundColor: "rgba(0, 183, 183, 0.1)" },
          }}
          variant="text"
        >
          Home
        </MuiButton>
        <MuiButton
          color="inherit"
          component={Link}
          to="/dashboard"
          sx={{
            mr: 2,
            color: "text.primary",
            "&:hover": { backgroundColor: "rgba(0, 183, 183, 0.1)" },
          }}
          variant="text"
        >
          Dashboard
        </MuiButton>
        <MuiButton
          color="inherit"
          component={Link}
          to="/about"
          variant="text"
          sx={{
            color: "text.primary",
            "&:hover": { backgroundColor: "rgba(0, 183, 183, 0.1)" },
          }}
        >
          Tech Stack
        </MuiButton>
      </Navbar>

      {/* Add top padding to account for fixed navbar */}
      <Box sx={{ pt: 10 }}>
        <Container maxWidth="lg" padding="large">
          <Outlet />
        </Container>
      </Box>

      <TanStackRouterDevtools />
    </>
  ),
});
