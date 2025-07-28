import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import {
  GradientTitle,
  Button,
  Card,
  CardContent,
  CenteredBox,
  Row,
  Body,
  Caption,
} from "./components";
import { Avatar } from "@mui/material";

function App() {
  const [count, setCount] = useState(0);

  return (
    <CenteredBox
      sx={{
        padding: 4,
        minHeight: "100vh",
      }}
    >
      <Row spacing={4} sx={{ mb: 4 }}>
        <Avatar
          src={viteLogo}
          alt="Vite logo"
          sx={{
            width: 80,
            height: 80,
            cursor: "pointer",
            "&:hover": { transform: "scale(1.1)" },
            transition: "transform 0.3s ease",
          }}
          component="a"
          href="https://vite.dev"
          target="_blank"
        />
        <Avatar
          src={reactLogo}
          alt="React logo"
          sx={{
            width: 80,
            height: 80,
            cursor: "pointer",
            animation: "spin 20s linear infinite",
            "&:hover": { animationDuration: "1s" },
          }}
          component="a"
          href="https://react.dev"
          target="_blank"
        />
      </Row>

      <GradientTitle gutterBottom>Vite + React</GradientTitle>

      <Card cardVariant="elevated" sx={{ minWidth: 350, mb: 4 }}>
        <CardContent sx={{ textAlign: "center", p: 4 }}>
          <Button
            variant="gradient"
            gradient="travel"
            size="large"
            onClick={() => setCount((count) => count + 1)}
            sx={{ mb: 3 }}
          >
            count is {count}
          </Button>
          <Body color="text.secondary">
            Edit <code>src/App.tsx</code> and save to test HMR
          </Body>
        </CardContent>
      </Card>

      <Caption color="text.secondary" sx={{ textAlign: "center" }}>
        Click on the Vite and React logos to learn more
      </Caption>

      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </CenteredBox>
  );
}

export default App;
