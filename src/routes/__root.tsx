import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Navbar, Container } from "../components";
import { Button as MuiButton } from "@mui/material";

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar title="TruTrip">
        <MuiButton
          color="inherit"
          component={Link}
          to="/"
          sx={{ mr: 2 }}
          variant="text"
        >
          Home
        </MuiButton>
        <MuiButton
          color="inherit"
          component={Link}
          to="/dashboard"
          sx={{ mr: 2 }}
          variant="text"
        >
          Dashboard
        </MuiButton>
        <MuiButton color="inherit" component={Link} to="/about" variant="text">
          Tech Stack
        </MuiButton>
      </Navbar>

      <Container maxWidth="lg" padding="large">
        <Outlet />
      </Container>

      <TanStackRouterDevtools />
    </>
  ),
});
