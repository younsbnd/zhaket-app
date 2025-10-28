/**
 * Menu Logic Constants
 * Contains business logic for menu management
 */

/**
 * Build menu type options based on current menu type
 * @param {string|null} currentMenuType - Current menu type
 * @returns {Array} Array of menu type options
 */
export const getMenuTypeOptions = (currentMenuType) => {
  // For new menus (currentMenuType is null), show all options
  if (!currentMenuType) {
    return [
      { label: "مگا منو", value: "mega-menu" },
      { label: "منوی هدر", value: "header-menu" },
      { label: "منوی فوتر", value: "footer-menu" }
    ];
  }
  
  // For existing menus, show appropriate options based on current type
  if (currentMenuType === "mega-menu") {
    return [
      { label: "مگا منو", value: "mega-menu" },
      { label: "منوی هدر", value: "header-menu" },
      { label: "منوی فوتر", value: "footer-menu" }
    ];
  } else if (currentMenuType === "footer-menu") {
    return [
      { label: "منوی فوتر", value: "footer-menu" }
    ];
  } else {
    return [
      { label: "مگا منو", value: "mega-menu" },
      { label: "منوی هدر", value: "header-menu" },
      { label: "منوی فوتر", value: "footer-menu" }
    ];
  }
};

/**
 * Build hierarchical options for parent menu selection
 * @param {Array} menus - Array of menu objects
 * @returns {Array} Array of parent menu options
 */

/**
 * Menu type constants
 */
export const MENU_TYPES = {
  MEGA_MENU: "mega-menu",
  HEADER_MENU: "header-menu", 
  FOOTER_MENU: "footer-menu"
};

/**
 * Target type constants
 */
export const TARGET_TYPES = {
  SELF: "_self",
  BLANK: "_blank"
};

/**
 * Default menu type options
 */
export const DEFAULT_MENU_TYPE_OPTIONS = [
  { label: "مگا منو", value: MENU_TYPES.MEGA_MENU },
  { label: "منوی هدر", value: MENU_TYPES.HEADER_MENU },
  { label: "منوی فوتر", value: MENU_TYPES.FOOTER_MENU }
];

/**
 * Default target type options
 */
export const DEFAULT_TARGET_OPTIONS = [
  { label: "همان صفحه", value: TARGET_TYPES.SELF },
  { label: "صفحه جدید", value: TARGET_TYPES.BLANK }
];
