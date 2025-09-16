import React, { useState, useRef, useCallback, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import Link from 'next/link';
import { logger } from '@/lib/utils/logger';

/**
 * CascadingMenu: Professional dropdown menu component
 * @param {string} label - Menu button label
 * @param {Array} items - Menu items array
 * @param {string} highlightColor - Icon highlight color class
 */
export default function CascadingMenu({
  label,
  items = [],
  highlightColor = 'text-[#FF9606]'
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // CHANGE 1: Performance - useCallback for event handlers
  const handleMouseEnter = useCallback(() => {
    setOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOpen(false);
  }, []);

  const handleFocus = useCallback(() => {
    setOpen(true);
  }, []);

  // CHANGE 2: Enhanced blur handling with null check
  const handleBlur = useCallback((e) => {
    if (menuRef.current && !menuRef.current.contains(e.relatedTarget)) {
      setOpen(false);
    }
  }, []);

  // CHANGE 3: Keyboard navigation support
  const handleKeyDown = useCallback((e) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        setOpen(prev => !prev);
        break;
      case 'Escape':
        e.preventDefault();
        setOpen(false);
        menuRef.current?.blur();
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!open) {
          setOpen(true);
        }
        break;
    }
  }, [open]);

  //CHANGE 4: Click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // CHANGE 5: Input validation
  if (!label || !Array.isArray(items)) {
    logger.debug('CascadingMenu: Invalid props provided');
    return null;
  }

  return (
    <div
      className="flex items-center justify-center relative gap-2 group"
      ref={menuRef}
      data-cy="data-cy-cascading-menu-button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown} //  CHANGE 6: Added keyboard handler
      tabIndex={0}
      role="button" //  CHANGE 7: Accessibility - semantic role
      aria-haspopup="menu" //  CHANGE 8: ARIA for menu popup
      aria-expanded={open} // CHANGE 9: ARIA expanded state
      aria-label={`${label} navigation menu`} //  CHANGE 10: Descriptive label
    >
      {/* Menu Button */}
      <div className="flex items-center gap-1 p-0 bg-transparent border-none cursor-pointer focus:outline-none relative select-none">
        <span className="transition duration-300 font-bold text-[15px] text-[#424244] group-hover:text-[#ff9606]">
          {label}
        </span>
        <FaChevronDown
          className={`transition-transform duration-300 ${open ? 'rotate-180' : 'rotate-0'
            } ${highlightColor} group-hover:text-[#ff9606]`} //  CHANGE 11: Enhanced transition
          size={14}
          aria-hidden="true" //  CHANGE 12: Hide decorative icon from screen readers
        />
      </div>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 top-10 z-50 w-[300px] items-start justify-start rounded-[10px] bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] transition-all duration-200 ease-in-out hidden lg:block ${open ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        role="menu" //  CHANGE 13: Semantic menu role
        aria-orientation="vertical" //  CHANGE 14: Menu orientation
        aria-labelledby="menu-button" //  CHANGE 15: Associate with trigger
      >
        <div className="rounded-[10px] w-full p-0">
          <ul role="none"> {/*  CHANGE 16: Remove list semantics for menu */}
            {items.map((item, idx) => (
              <li
                key={`${item.href}-${idx}`} //  CHANGE 17: Better key generation
                role="none"
                data-cy="data-cy-cascading-menu-item-button"
              >
                <Link
                  href={item.href}
                  target={item.target || '_blank'}
                  rel={item.rel || 'nofollow'}
                  className="block transition-colors duration-300 text-[15px] text-[#5B5C60] px-[19px] py-4 hover:text-[#ff9606] focus:text-[#ff9606] focus:outline-none focus:bg-gray-50" //  CHANGE 18: Enhanced focus styles
                  role="menuitem" // CHANGE 19: Menu item role
                  tabIndex={open ? 0 : -1} //  CHANGE 20: Conditional tabbing
                  aria-label={`Navigate to ${item.label}`} // CHANGE 21: Descriptive aria-label
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Hover bridge for UX */}
      <div className="absolute top-full h-10 w-full" aria-hidden="true" /> {/*  CHANGE 22: Hide from screen readers */}
    </div>
  );
}
