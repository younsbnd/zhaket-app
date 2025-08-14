"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button, Divider, Tooltip, Select, SelectItem } from "@heroui/react";
import {
  TbBold,
  TbList,
  TbListNumbers,
  TbLink,
  TbPhoto,
  TbPencil,
  TbTypography,
  TbAlignLeft,
  TbAlignCenter,
  TbAlignRight,
} from "react-icons/tb";

/**
 * IconBtn - A small icon-only button with tooltip for editor actions.
 *
 * Props:
 * - title: Tooltip text
 * - active: Whether the button is active (highlighted)
 * - disabled: Whether the button is disabled
 * - onClick: Click handler
 * - Icon: React icon component
 */
const IconBtn = ({ title, active, disabled, onClick, Icon }) => (
  <Tooltip content={title} placement="bottom" closeDelay={0}>
    <Button
      aria-label={title}
      isIconOnly
      size="sm"
      radius="sm"
      variant={active ? "solid" : "flat"}
      color={active ? "primary" : "default"}
      className="min-w-8"
      onClick={onClick}
      disabled={disabled}
    >
      <Icon className="h-4 w-4" />
    </Button>
  </Tooltip>
);

/**
 * ToolbarContent - The main toolbar controls for the editor.
 *
 * Props:
 * - editor: Tiptap editor instance
 * - onAddOrEditLink: Callback to add or edit links
 * - onInsertImage: Callback to insert an image
 * - onEditImageSrc: Callback to edit image URL
 * - onEditImageAlt: Callback to edit image alt text
 * - className: Optional additional CSS classes
 */
const ToolbarContent = ({
  editor,
  onAddOrEditLink,
  onInsertImage,
  onEditImageSrc,
  onEditImageAlt,
  className = "",
}) => {
  if (!editor) return null;

  // Returns whether a formatting is currently active
  const formatState = (name) => editor.isActive(name);

  // Returns whether a text alignment is currently active
  const alignState = (align) => editor.isActive({ textAlign: align });

  // Handle block type selection from dropdown
  const handleBlockSelect = (keys) => {
    const key = Array.from(keys)[0];
    if (!key) return;

    if (key === "paragraph") {
      editor.chain().focus().setParagraph().run();
    } else {
      editor.chain().focus().toggleHeading({ level: parseInt(key, 10) }).run();
    }
  };

  // Render vertical divider between toolbar groups
  const renderDivider = () => <Divider orientation="vertical" className="hidden h-6 sm:block" />;

  return (
    <div role="toolbar" className={`flex flex-wrap items-center gap-2 ${className}`}>
      {/* Block type selector */}
      <Select
        aria-label="Block type"
        className="max-w-[200px]"
        placeholder="Block type"
        selectionMode="single"
        onSelectionChange={handleBlockSelect}
      >
        <SelectItem key="paragraph">Normal text</SelectItem>
        <SelectItem key="1">Heading 1</SelectItem>
        <SelectItem key="2">Heading 2</SelectItem>
        <SelectItem key="3">Heading 3</SelectItem>
      </Select>

      {renderDivider()}

      {/* Bold button */}
      <IconBtn
        title="Bold"
        active={formatState("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
        Icon={TbBold}
      />
      {renderDivider()}

      {/* List controls */}
      <div className="flex items-center gap-1">
        <IconBtn
          title="Bullet List"
          active={formatState("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          Icon={TbList}
        />
        <IconBtn
          title="Ordered List"
          active={formatState("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          Icon={TbListNumbers}
        />
      </div>

      {renderDivider()}

      {/* Text alignment controls */}
      <div className="flex items-center gap-1">
        <IconBtn
          title="Align Left"
          active={alignState("left")}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          Icon={TbAlignLeft}
        />
        <IconBtn
          title="Align Center"
          active={alignState("center")}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          Icon={TbAlignCenter}
        />
        <IconBtn
          title="Align Right"
          active={alignState("right")}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          Icon={TbAlignRight}
        />
      </div>

      {renderDivider()}

      {/* Link control */}
      <IconBtn
        title="Add or Edit Link"
        active={formatState("link")}
        onClick={onAddOrEditLink}
        Icon={TbLink}
      />
      {renderDivider()}

      {/* Image controls */}
      <div className="flex items-center gap-1">
        <IconBtn title="Insert Image" onClick={onInsertImage} Icon={TbPhoto} />
        <IconBtn title="Edit Image URL" onClick={onEditImageSrc} Icon={TbPencil} />
        <IconBtn title="Edit Image Alt" onClick={onEditImageAlt} Icon={TbTypography} />
      </div>
    </div>
  );
};

/**
 * TiptapMenuBar - Main toolbar wrapper with responsive behavior.
 *
 * Props:
 * - title: Toolbar title
 * - editor: Tiptap editor instance
 * - onAddOrEditLink, onInsertImage, onEditImageSrc, onEditImageAlt: callbacks
 */
export default function TiptapMenuBar({
  title = "Editor Menu",
  editor,
  onAddOrEditLink,
  onInsertImage,
  onEditImageSrc,
  onEditImageAlt,
}) {
  const [open, setOpen] = useState(false); // Mobile menu open state
  const panelRef = useRef(null);

  // Close mobile toolbar when clicking outside or pressing Escape
  useEffect(() => {
    if (!open) return;

    const handleOutside = (e) => panelRef.current && !panelRef.current.contains(e.target) && setOpen(false);
    const handleEsc = (e) => e.key === "Escape" && setOpen(false);

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  return (
    <div className="relative border-b bg-gray-50/90 backdrop-blur supports-[backdrop-filter]:bg-gray-50/60 dark:bg-default-100/60">
      {/* Toolbar header */}
      <div className="flex items-center justify-between px-3 py-2">
        <span className="text-sm font-medium">{title}</span>
        <Button size="sm" radius="sm" variant="flat" className="sm:hidden" onClick={() => setOpen((v) => !v)}>
          {open ? "Hide menu" : "Show menu"}
        </Button>
      </div>

      {/* Desktop toolbar */}
      <div className="hidden border-t px-3 py-2 sm:block">
        <ToolbarContent
          {...{ editor, onAddOrEditLink, onInsertImage, onEditImageSrc, onEditImageAlt }}
          className="gap-2"
        />
      </div>

      {/* Mobile toolbar */}
      {open && (
        <div
          ref={panelRef}
          className="absolute left-3 right-3 top-12 z-20 origin-top rounded-md border bg-white p-2 shadow-xl ring-1 ring-black/5 transition-all dark:border-default-200 dark:bg-content1 sm:hidden"
        >
          <ToolbarContent
            {...{ editor, onAddOrEditLink, onInsertImage, onEditImageSrc, onEditImageAlt }}
            className="gap-2"
          />
        </div>
      )}
    </div>
  );
}
