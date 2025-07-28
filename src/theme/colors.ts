// Color palette for TruTrip application - Brand aligned
export const colors = {
  // Primary colors - TruTrip Teal (matching "Trip" in logo)
  primary: {
    50: "#E0F7F7",
    100: "#B3EAEA",
    200: "#80DCDC",
    300: "#4DCDCD",
    400: "#26C2C2",
    500: "#00B7B7", // Main primary - TruTrip teal
    600: "#00A5A5",
    700: "#008F8F",
    800: "#007A7A",
    900: "#005A5A",
  },

  // Secondary colors - Dark charcoal (matching "Tru" in logo)
  secondary: {
    50: "#F5F5F5",
    100: "#E8E8E8",
    200: "#D1D1D1",
    300: "#B0B0B0",
    400: "#888888",
    500: "#2D2D2D", // Main secondary - Dark charcoal
    600: "#262626",
    700: "#1F1F1F",
    800: "#1A1A1A",
    900: "#0F0F0F",
  },

  // Success colors - Fresh green
  success: {
    50: "#E8F5E8",
    100: "#C8E6C9",
    200: "#A5D6A7",
    300: "#81C784",
    400: "#66BB6A",
    500: "#4CAF50", // Main success
    600: "#43A047",
    700: "#388E3C",
    800: "#2E7D32",
    900: "#1B5E20",
  },

  // Warning colors - Warm orange
  warning: {
    50: "#FFF3E0",
    100: "#FFE0B2",
    200: "#FFCC80",
    300: "#FFB74D",
    400: "#FFA726",
    500: "#FF9800", // Main warning
    600: "#FB8C00",
    700: "#F57C00",
    800: "#EF6C00",
    900: "#E65100",
  },

  // Error colors - Modern red
  error: {
    50: "#FFEBEE",
    100: "#FFCDD2",
    200: "#EF9A9A",
    300: "#E57373",
    400: "#EF5350",
    500: "#F44336", // Main error
    600: "#E53935",
    700: "#D32F2F",
    800: "#C62828",
    900: "#B71C1C",
  },

  // Neutral/Gray colors
  gray: {
    50: "#FAFAFA",
    100: "#F5F5F5",
    200: "#EEEEEE",
    300: "#E0E0E0",
    400: "#BDBDBD",
    500: "#9E9E9E",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
  },

  // Background colors
  background: {
    default: "#FFFFFF",
    paper: "#FFFFFF",
    dark: "#F8F9FA",
    darker: "#F1F3F4",
  },

  // Text colors - Updated to match brand
  text: {
    primary: "#2D2D2D", // Dark charcoal for primary text
    secondary: "#666666",
    disabled: "#9E9E9E",
    hint: "#BDBDBD",
  },
};

// Gradient definitions - Updated for TruTrip brand
export const gradients = {
  primary: "linear-gradient(135deg, #00B7B7 0%, #26C2C2 100%)", // Teal gradient
  secondary: "linear-gradient(135deg, #2D2D2D 0%, #1A1A1A 100%)", // Dark gradient
  success: "linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)",
  warning: "linear-gradient(135deg, #FF9800 0%, #FFC107 100%)",
  error: "linear-gradient(135deg, #F44336 0%, #FF5722 100%)",
  sunset: "linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)",
  ocean: "linear-gradient(135deg, #00B7B7 0%, #2D2D2D 100%)", // TruTrip brand gradient
  travel: "linear-gradient(135deg, #00B7B7 0%, #26C2C2 100%)", // Teal travel gradient
};

// Shadow definitions
export const shadows = {
  light: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  medium: "0px 4px 8px rgba(0, 0, 0, 0.12)",
  heavy: "0px 8px 16px rgba(0, 0, 0, 0.15)",
  colored: "0px 4px 20px rgba(0, 183, 183, 0.3)", // Updated to use teal
};
