// Project configuration and settings file
// All constant values and application configurations are defined here

// Icons used in the sidebar menu
export const MENU_ICONS = {
  dashboard: 'RiDashboardLine',     // Dashboard icon
  users: 'RiUserLine',              // Users icon
  products: 'RiShoppingBagLine',    // Products icon
  orders: 'RiShoppingCartLine',     // Orders icon
  analytics: 'RiBarChartBoxLine',   // Analytics icon
  settings: 'RiSettingsLine',       // Settings icon
  logout: 'RiLogoutBoxLine'         // Logout icon
};

// Sidebar menu items
export const SIDEBAR_MENU_ITEMS = [
  {
    id: 'dashboard',
    title: 'داشبورد',
    icon: MENU_ICONS.dashboard,
    path: '/',
    isActive: true // Default active menu
  },
  {
    id: 'users',
    title: 'کاربران',
    icon: MENU_ICONS.users,
    path: '/users',
    isActive: false
  },
  {
    id: 'products',
    title: 'محصولات',
    icon: MENU_ICONS.products,
    path: '/products',
    isActive: false
  },
  {
    id: 'orders',
    title: 'سفارشات',
    icon: MENU_ICONS.orders,
    path: '/orders',
    isActive: false
  },
  {
    id: 'analytics',
    title: 'آمار و گزارش',
    icon: MENU_ICONS.analytics,
    path: '/analytics',
    isActive: false
  },
  {
    id: 'settings',
    title: 'تنظیمات',
    icon: MENU_ICONS.settings,
    path: '/settings',
    isActive: false
  }
];

// Theme colors for dark and light mode
export const APP_THEME_COLORS = {
  light: {
    primary: '#3B82F6',      // Primary blue
    secondary: '#6B7280',    // Gray
    background: '#F9FAFB',   // Light background
    surface: '#FFFFFF',      // Card surface
    text: '#1F2937',         // Primary text
    textSecondary: '#6B7280' // Secondary text
  },
  dark: {
    primary: '#3B82F6',      // Primary blue
    secondary: '#9CA3AF',    // Light gray
    background: '#111827',   // Dark background
    surface: '#1F2937',      // Card surface
    text: '#F9FAFB',         // Primary text
    textSecondary: '#D1D5DB' // Secondary text
  }
};

// Breakpoints for responsive design
export const RESPONSIVE_BREAKPOINTS = {
  mobile: 768,     // Less than 768px = mobile
  tablet: 1024,    // Between 768px and 1024px = tablet
  desktop: 1024    // More than 1024px = desktop
};

// General application settings
export const APP_CONFIG = {
  name: 'پنل ادمین',
  version: '1.0.0',
  author: 'شما',
  defaultTheme: 'light',
  sidebarWidth: {
    open: '16rem',    // 256px
    closed: '4rem'    // 64px
  }
};
