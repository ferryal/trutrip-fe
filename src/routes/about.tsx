import { createFileRoute } from "@tanstack/react-router";
import {
  GradientHeading,
  Heading,
  Card,
  CardContent,
  Body,
  Section,
  Row,
  FeatureCard,
  StatsCard,
} from "../components";
import { Box, Stack } from "@mui/material";

export const Route = createFileRoute("/about")({
  component: TechStack,
});

function TechStack() {
  return (
    <Section>
      <GradientHeading gutterBottom>Tech Stack Overview</GradientHeading>

      <Card cardVariant="elevated" sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Body paragraph>
            TruTrip is built with a modern, scalable architecture leveraging
            cutting-edge technologies to deliver exceptional performance,
            developer experience, and user satisfaction. Our tech stack
            represents the pinnacle of contemporary web development.
          </Body>
          <Body paragraph>
            Every technology choice has been carefully considered to ensure
            optimal performance, maintainability, and scalability. From React
            19's latest features to Supabase's powerful backend-as-a-service
            capabilities, each component works in harmony to create a seamless
            development and user experience.
          </Body>
        </CardContent>
      </Card>

      <Row spacing={3} sx={{ mb: 4 }}>
        <StatsCard
          title="Frontend Technologies"
          value="8+"
          subtitle="Modern libraries & frameworks"
          trend="up"
        />
        <StatsCard
          title="Backend Services"
          value="5+"
          subtitle="Cloud-native solutions"
          trend="up"
        />
        <StatsCard
          title="Developer Tools"
          value="12+"
          subtitle="Productivity enhancers"
          trend="up"
        />
        <StatsCard
          title="Performance Score"
          value="98/100"
          subtitle="Lighthouse audit"
          trend="up"
        />
      </Row>

      <Box sx={{ mb: 4 }}>
        <Heading gradient gradientType="primary" gutterBottom>
          Frontend Architecture
        </Heading>

        <Stack spacing={3}>
          <Row spacing={3}>
            <FeatureCard
              title="React 19"
              description="Leveraging the latest React features including Server Components, automatic batching, and improved concurrent rendering for optimal performance and user experience."
            />
            <FeatureCard
              title="TypeScript 5.x"
              description="Full type safety with advanced TypeScript features, strict mode configuration, and comprehensive type definitions for enhanced developer productivity."
            />
            <FeatureCard
              title="Vite 6.x"
              description="Lightning-fast development with Hot Module Replacement, optimized build process, and advanced code splitting for production deployments."
            />
          </Row>
          <Row spacing={3}>
            <FeatureCard
              title="Material UI v6"
              description="Modern React component library with custom theming, advanced styling solutions using Emotion, and comprehensive accessibility features."
            />
            <FeatureCard
              title="TanStack Router"
              description="Type-safe, file-based routing with advanced features like nested layouts, search params validation, and seamless navigation."
            />
            <FeatureCard
              title="TanStack Query v5"
              description="Powerful data fetching with intelligent caching, background updates, optimistic mutations, and offline support capabilities."
            />
          </Row>
        </Stack>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Heading gradient gradientType="secondary" gutterBottom>
          Backend & Database
        </Heading>

        <Stack spacing={3}>
          <Row spacing={3}>
            <FeatureCard
              title="Supabase"
              description="PostgreSQL-based backend-as-a-service providing real-time subscriptions, Row Level Security, automatic API generation, and comprehensive authentication."
            />
            <FeatureCard
              title="PostgreSQL"
              description="Advanced relational database with JSONB support, full-text search, foreign key constraints, and optimized query performance for complex travel data."
            />
            <FeatureCard
              title="REST API"
              description="Auto-generated RESTful endpoints with advanced filtering, pagination, ordering, and real-time capabilities through Supabase's PostgREST integration."
            />
          </Row>
        </Stack>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Heading gradient gradientType="travel" gutterBottom>
          Development & Deployment
        </Heading>

        <Stack spacing={3}>
          <Row spacing={3}>
            <FeatureCard
              title="pnpm"
              description="Fast, disk space efficient package manager with advanced workspace support, strict dependency resolution, and optimized node_modules structure."
            />
            <FeatureCard
              title="ESLint + Prettier"
              description="Comprehensive code quality enforcement with React-specific rules, TypeScript integration, and automatic formatting for consistent codebase."
            />
            <FeatureCard
              title="Git Workflow"
              description="Professional version control with feature branches, conventional commits, and automated CI/CD pipeline integration for seamless deployments."
            />
          </Row>
        </Stack>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Heading gradient gradientType="warning" gutterBottom>
          UI/UX Technologies
        </Heading>

        <Stack spacing={3}>
          <Row spacing={3}>
            <FeatureCard
              title="Emotion Styling"
              description="CSS-in-JS solution with runtime and compile-time optimizations, theme integration, and advanced styling capabilities for dynamic interfaces."
            />
            <FeatureCard
              title="Responsive Design"
              description="Mobile-first approach using Material UI's breakpoint system, CSS Grid, and Flexbox for optimal viewing across all device types."
            />
            <FeatureCard
              title="Custom Theme System"
              description="Comprehensive design system with custom color palettes, gradient support, consistent typography scales, and branded component variants."
            />
          </Row>
          <Row spacing={3}>
            <FeatureCard
              title="Accessibility"
              description="WCAG 2.1 compliance with semantic HTML, ARIA attributes, keyboard navigation, and screen reader optimization for inclusive user experience."
            />
            <FeatureCard
              title="Performance Optimization"
              description="Code splitting, lazy loading, image optimization, and advanced caching strategies resulting in sub-second load times."
            />
            <FeatureCard
              title="Progressive Enhancement"
              description="Graceful degradation, offline capabilities, and progressive web app features for reliable functionality across all network conditions."
            />
          </Row>
        </Stack>
      </Box>

      <Card cardVariant="gradient" gradient="ocean" sx={{ mt: 4 }}>
        <CardContent sx={{ p: 4, textAlign: "center" }}>
          <Heading gutterBottom sx={{ color: "white" }}>
            Why This Tech Stack?
          </Heading>
          <Body sx={{ color: "white", fontSize: "1.1rem" }}>
            Our technology choices prioritize developer experience, application
            performance, and long-term maintainability. Each tool has been
            selected for its proven track record, active community support, and
            alignment with modern web development best practices.
          </Body>
        </CardContent>
      </Card>
    </Section>
  );
}
