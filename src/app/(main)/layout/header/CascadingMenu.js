import React, { useState, useRef } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import Link from 'next/link';

// CascadingMenu: A dropdown menu for header/footer navigation
// Props:
// - label: string (menu button label)
// - items: array of { label, href, target, rel }
// - highlightColor: Tailwind color class for icon (e.g., 'text-[#FF9606]')
export default function CascadingMenu({ label, items, highlightColor = 'text-[#FF9606]' }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Open on mouse enter or focus, close on mouse leave or blur
  const handleMouseEnter = () => setOpen(true);
  const handleMouseLeave = () => setOpen(false);
  const handleFocus = () => setOpen(true);
  const handleBlur = (e) => {
    // Only close if focus moves outside the menu
    if (!menuRef.current.contains(e.relatedTarget)) {
      setOpen(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center relative gap-2 group"
      ref={menuRef}
      data-cy="data-cy-cascading-menu-button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
    >
      {/* Menu Button (no click handler, only hover/focus) */}
      <div className="flex items-center gap-1 p-0 bg-transparent border-none cursor-pointer focus:outline-none relative select-none">
        <span className="transition duration-300 font-bold text-[15px] text-[#424244] group-hover:text-[#ff9606]">
          {label}
        </span>
        <FaChevronDown
          className={`transition duration-300 ${open ? 'rotate-180' : 'rotate-0'} ${highlightColor}`}
          size={14}
        />
      </div>
      {/* Dropdown Menu */}
      <div
        className={`flex absolute right-0 top-10 z-50 w-[300px] items-start justify-start rounded-[10px] bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] transition-all duration-200 ease-in-out ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        <div className="rounded-[10px] w-full p-0">
          <ul>
            {items.map((item, idx) => (
              <li key={idx} data-cy="data-cy-cascading-menu-item-button">
                <Link
                  href={item.href}
                  target={item.target || '_blank'}
                  rel={item.rel || 'nofollow'}
                  className="block transition duration-300 text-[15px] text-[#5B5C60] px-[19px] py-4 hover:text-[#ff9606]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Decorative after element for spacing */}
      <div className="absolute top-full h-10 w-full content-['']" />
    </div>
  );
}
