// Utility function for combining CSS classes
// This function helps us apply classes conditionally

/**
 * cn (className) function for combining CSS classes
 * @param {...(string|Object|Array)} classes - Classes or conditions
 * @returns {string} - Final class string
 */
export const cn = (...classes) => {
  return classes
    .map(cls => {
      // If cls is a string, return it directly
      if (typeof cls === 'string') {
        return cls;
      }
      
      // If cls is an object, return keys with true values
      if (typeof cls === 'object' && cls !== null && !Array.isArray(cls)) {
        return Object.keys(cls)
          .filter(key => cls[key]) // Only keys with true values
          .join(' ');
      }
      
      // If cls is an array, process recursively
      if (Array.isArray(cls)) {
        return cn(...cls);
      }
      
      // Otherwise, return an empty string
      return '';
    })
    .filter(Boolean) // Remove falsy values (empty, null, undefined)
    .join(' '); // Combine with spaces
};

// Helper function for combining conditional styles
export const conditionalClass = (condition, trueClass, falseClass = '') => {
  return condition ? trueClass : falseClass;
};

// Default export for convenience
export default cn;

// Usage examples:
// cn('btn', 'btn-primary') => 'btn btn-primary'
// cn('btn', { 'btn-active': isActive }) => 'btn btn-active' (if isActive = true)
// cn(['btn', 'btn-primary']) => 'btn btn-primary'
// cn('btn', isActive && 'btn-active') => 'btn btn-active' (if isActive = true)
// conditionalClass(isDark, 'bg-gray-800', 'bg-white') => 'bg-gray-800' or 'bg-white'
