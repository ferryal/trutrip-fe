# TruTrip Frontend

A travel management application built with React 19, TanStack Router, TanStack Query, Material UI, and Supabase.

## 🚀 Features

### ✅ **Completed**

- **Material UI Integration** - Custom themed components with beautiful gradients
- **TanStack Router** - Type-safe routing with file-based routing
- **TanStack Query v5** - Data fetching and caching with React Query
- **Supabase Integration** - Backend-as-a-Service with PostgreSQL
- **CRUD Operations** - Full Create, Read, Update, Delete functionality for trips
- **Corporate Travel Dashboard** - Complete trip management interface
- **Real-time Statistics** - Trip analytics and reporting
- **Responsive Design** - Mobile-friendly Material UI components
- **Unit Testing Suite** - 59 comprehensive tests with 100% pass rate

### 🎯 **Architecture Highlights**

- **Clean Code Structure** - Separated API services, hooks, and components
- **Type Safety** - Full TypeScript integration with database types
- **Reusable Components** - Modular UI components with custom theming
- **Direct REST API Calls** - Using fetch with Supabase REST API
- **Optimistic Updates** - TanStack Query mutations with cache management
- **Test-Driven Development** - Comprehensive unit test coverage

## 🛠 Setup Instructions

### 1. **Prerequisites**

- Node.js v23.6.1+ (use `nvm use v23.6.1`)
- pnpm package manager
- Supabase account and project

### 2. **Install Dependencies**

```bash
# Switch to the correct Node version
nvm use v23.6.1

# Install dependencies
pnpm install
```

### 3. **Environment Configuration**

Create a `.env` file in the root directory:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. **Database Setup**

1. Run the provided SQL schema in your Supabase SQL Editor
2. Import the sample data SQL (55+ trips with complex relationships)
3. Verify tables: `companies`, `users`, `trips`, `accommodations`, `transportation`, etc.

### 5. **Start Development**

```bash
pnpm dev
```

Visit `http://localhost:5174` to view the application.

## 📖 Usage Instructions

### **🖥️ Development Workflow**

```bash
# Start development server
pnpm dev

# Run linting
pnpm lint

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### **🧪 Testing Commands**

```bash
# Run complete test suite (59 tests, ~8 seconds)
pnpm test:clean

# Run individual component tests
pnpm vitest run src/components/ui/__tests__/Button.test.tsx
pnpm vitest run src/components/shared/__tests__/Navbar.test.tsx

# Start test UI (interactive testing)
pnpm test:ui

# Get help with available test commands
pnpm test:help

# Run tests with detailed output
pnpm test:clean --reporter=verbose
```

### **🧭 Application Navigation**

1. **Home Page** (`/`) - Feature overview and welcome
2. **Dashboard** (`/dashboard`) - Main trip management interface
   - View trip statistics and analytics
   - Browse and filter trips by status
   - Create, edit, and delete trips
   - View trip details and itineraries
3. **About Page** (`/about`) - Technology stack and features

### **💼 Trip Management Workflow**

1. **View Trips** - Dashboard displays all trips with filtering options
2. **Create Trip** - Click "Add Trip" to create new travel requests
3. **Edit Trip** - Click edit icon on any trip card
4. **Status Management** - Track trip progression (Draft → Submitted → Approved → Completed)
5. **Analytics** - Monitor budgets, expenses, and travel statistics

## 🧪 Unit Testing

### **✅ Test Coverage**

- **59 comprehensive unit tests** with 100% pass rate
- **6 core components** thoroughly tested
- **Fast execution** (~8 seconds total)
- **Zero dependencies** on external mocking libraries

| Component             | Tests    | Coverage Area                     |
| --------------------- | -------- | --------------------------------- |
| **Button**            | 12 tests | Variants, interactions, styling   |
| **Typography**        | 14 tests | Gradient styling, variants, props |
| **Navbar**            | 6 tests  | Branding, children, structure     |
| **Pagination**        | 8 tests  | Controls, callbacks, states       |
| **TripPriorityBadge** | 9 tests  | Priority levels, styling          |
| **TripStatusBadge**   | 10 tests | Status types, styling             |

### **🔧 Testing Technology**

- **Vitest** - Fast, test runner
- **React Testing Library** - Component testing utilities
- **jsdom** - DOM environment for tests
- **@testing-library/jest-dom** - Custom DOM matchers

### **🎯 Testing Strategy**

- **Component-focused** - Tests core functionality without over-mocking
- **User-centric** - Tests simulate real user interactions
- **Performance-optimized** - Fast test execution for CI/CD
- **Maintenance-free** - No complex mocking strategies

## 📊 **Dashboard Features**

### **Trip Management**

- ✅ View all trips with rich details
- ✅ Filter by status (Draft, Submitted, Approved, etc.)
- ✅ Real-time status updates
- ✅ Trip creation, editing, and deletion
- ✅ Priority and status badges

### **Statistics Dashboard**

- ✅ Total trips and budget tracking
- ✅ Expense monitoring and savings calculation
- ✅ Status distribution (Draft, Approved, Completed, etc.)
- ✅ Purpose breakdown (Business, Conference, Training, etc.)
- ✅ Priority analysis (Low, Medium, High, Urgent)

### **Data Integration**

- ✅ **Complex Trip Data** - Full accommodations, transportation, itineraries
- ✅ **AI Recommendations** - Restaurant, attraction, and business venue suggestions
- ✅ **Expense Tracking** - Detailed expense categories with receipt management
- ✅ **Approval Workflow** - Trip approval process with comments

## 🔧 **Technical Stack**

### **Frontend**

- **React 19** - Latest React with features
- **TypeScript** - Full type safety
- **Material UI** - Custom themed components
- **TanStack Router** - File-based routing
- **TanStack Query v5** - Data fetching and mutations
- **Vite** - Fast development and building

### **Testing**

- **Vitest** - test runner
- **React Testing Library** - Component testing
- **jsdom** - Test environment
- **59 Unit Tests** - Comprehensive coverage

### **Backend Integration**

- **Supabase** - PostgreSQL database
- **REST API** - Direct fetch calls to Supabase
- **Real-time Updates** - Optimistic mutations
- **Type Generation** - Database schema types

### **Data Structure**

```
Companies → Users → Trips
                    ├── Accommodations
                    ├── Transportation
                    ├── Trip Itineraries
                    ├── AI Recommendations
                    ├── Expenses
                    └── Trip Approvals
```

## 🎨 **UI Components**

### **Custom Material UI Components**

- **Gradient Buttons** - Travel, Ocean, Sunset themes
- **Enhanced Cards** - Elevated, hover effects, gradients
- **Custom Typography** - Gradient text, responsive sizing
- **Layout Components** - Row, Column, Section, Container
- **Status Badges** - Trip status and priority indicators

### **Trip Components**

- **TripCard** - Rich trip display with actions
- **TripList** - Grid layout with filtering
- **TripStats** - Statistical dashboard
- **Status Management** - Real-time status updates

## 📁 **Project Structure**

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.tsx      # Custom button variants
│   │   ├── Card.tsx        # Enhanced card components
│   │   └── Typography.tsx  # Gradient typography
│   ├── shared/             # Layout components
│   │   ├── Layout.tsx      # Main application layout
│   │   ├── Navbar.tsx      # Navigation component
│   │   ├── Pagination.tsx  # Data pagination
│   │   └── ViewToggle.tsx  # List/Grid toggle
│   └── trip/               # Trip-specific components
│       ├── TripCard.tsx    # Individual trip display
│       ├── TripList.tsx    # Trip collection view
│       ├── TripStats.tsx   # Trip analytics
│       ├── TripTable.tsx   # Tabular trip view
│       └── *Badge.tsx      # Status/Priority badges
├── hooks/                  # TanStack Query hooks
├── services/               # API service functions
├── types/                  # TypeScript definitions
├── lib/                    # API configuration
├── theme/                  # Material UI theming
├── routes/                 # TanStack Router pages
└── test/                   # Test configuration
    └── setup.ts            # Vitest test setup
```

## 🚀 **Quick Start Guide**

### **For Developers**

1. **Clone and Setup**

   ```bash
   git clone <repository>
   cd trutrip-fe
   nvm use v23.6.1
   pnpm install
   ```

2. **Configure Environment**

   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

3. **Start Development**

   ```bash
   pnpm dev
   ```

4. **Run Tests**
   ```bash
   pnpm test:clean
   ```

### **For Testing**

1. **Run Full Test Suite**

   ```bash
   pnpm test:clean
   ```

2. **Test Individual Components**

   ```bash
   pnpm vitest run src/components/ui/__tests__/Button.test.tsx
   ```

3. **Interactive Testing**
   ```bash
   pnpm test:ui
   ```

## 🎯 **Next Steps**

### **Potential Enhancements**

- **Trip Creation Form** - Rich form with validation
- **Trip Details Page** - Full trip view with itinerary
- **AI Integration** - OpenAI API for travel recommendations
- **Real-time Notifications** - Supabase real-time subscriptions
- **File Upload** - Receipt and document management
- **Advanced Filtering** - Date ranges, budget filters, search
- **Integration Testing** - End-to-end test coverage
- **Performance Monitoring** - Analytics and optimization

## 🔗 **Key Routes**

- **`/`** - Trip management dashboard
- **`/about`** - Technology and feature information

## 📚 **Development Resources**

### **Documentation**

- [React 19 Documentation](https://react.dev/)
- [Material UI Documentation](https://mui.com/)
- [TanStack Router](https://tanstack.com/router/)
- [TanStack Query](https://tanstack.com/query/)
- [Supabase Documentation](https://supabase.com/docs)
- [Vitest Documentation](https://vitest.dev/)

### **Testing Guides**

- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)
- [Vitest UI](https://vitest.dev/guide/ui.html)

---

**🎉 Ready to explore corporate travel management with React, comprehensive testing, and Supabase!**
