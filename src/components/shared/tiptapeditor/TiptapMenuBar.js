"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button, Divider, Tooltip } from "@heroui/react";
import {
  TbBold,
  TbList,
  TbListNumbers,
  TbLink,
  TbPhoto,
  TbAlignLeft,
  TbAlignCenter,
  TbAlignRight,
} from "react-icons/tb";
import ControlledSelect from "../forms/ControlledSelect";
  
/** 
 * Icon-only button with tooltip 
 * Props:
 * - title: tooltip text
 * - active: whether the button is active
 * - disabled: whether the button is disabled
 * - onClick: click handler
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
 * Toolbar content for the Tiptap editor
 * Props:
 * - editor: Tiptap editor instance
 * - onAddOrEditLink: callback to add or edit a link
 * - onInsertImage: callback to insert an image
 * - className: optional extra classes
 * - control: react-hook-form control object
 * - errors: react-hook-form errors object
 * - name: name of the block type field
 */
const ToolbarContent = ({
  editor,
  onAddOrEditLink,
  onInsertImage,
  className = "",
  control,
  errors,
  name = "blockType",
}) => {
  if (!editor) return null;

  // Check if a formatting option is active
  const formatState = (name) => editor.isActive(name);
  const alignState = (align) => editor.isActive({ textAlign: align });

  // Handle block type selection
  const handleBlockSelect = (value) => {
    if (!value) return;
    if (value === "paragraph") editor.chain().focus().setParagraph().run();
    else editor.chain().focus().toggleHeading({ level: parseInt(value, 10) }).run();
  };

  const renderDivider = () => <Divider orientation="vertical" className="hidden h-6 sm:block" />;

  const options = [
    { value: "paragraph", label: "Normal text" },
    { value: "1", label: "Heading 1" },
    { value: "2", label: "Heading 2" },
    { value: "3", label: "Heading 3" },
  ];

  return (
    <div role="toolbar" className={`flex flex-wrap items-center gap-2 ${className}`}>
      {/* Block type selector using ControlledSelect */}
      {control && (
        <ControlledSelect
          name={name}
          control={control}
          errors={errors}
          options={options}
          placeholder="Block type"
          onChange={handleBlockSelect} // sync selection with editor
        />
      )}

      {renderDivider()}

      {/* Bold formatting button */}
      <IconBtn
        title="Bold"
        active={formatState("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
        Icon={TbBold}
      />
      {renderDivider()}

      {/* List buttons */}
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

      {/* Text alignment buttons */}
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

      {/* Link button */}
      <IconBtn
        title="Add or Edit Link"
        active={formatState("link")}
        onClick={onAddOrEditLink}
        Icon={TbLink}
      />

      {renderDivider()}

      {/* Insert image button */}
      <div className="flex items-center gap-1">
        <IconBtn title="Insert Image" onClick={onInsertImage} Icon={TbPhoto} />
      </div>
    </div>
  );
};

/**
 * Main Tiptap toolbar wrapper
 * Props:
 * - title: toolbar title
 * - editor: Tiptap editor instance
 * - onAddOrEditLink: callback for links
 * - onInsertImage: callback for images
 * - control: react-hook-form control object
 * - errors: react-hook-form errors object
 */
export default function TiptapMenuBar({ title = "Editor Menu", editor, onAddOrEditLink, onInsertImage, control, errors }) {
  const [open, setOpen] = useState(false); // Mobile menu toggle
  const panelRef = useRef(null);

  // Handle outside click and escape key to close mobile menu
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
    <div className="relative border-b border-slate-600 bg-slate-700">
      {/* Toolbar header */}
      <div className="flex items-center justify-between px-3 py-2">
        <span className="text-sm font-medium text-slate-100">{title}</span>
        {/* Mobile toggle button */}
        <Button size="sm" radius="sm" variant="flat" className="sm:hidden bg-slate-700 text-slate-100" onClick={() => setOpen(v => !v)}>
          {open ? "پنهان کردن منو" : "نمایش منو"}
        </Button>
      </div>

      {/* Desktop toolbar */}
      <div className="hidden border-t border-slate-500 px-3 py-2 sm:block">
        <ToolbarContent
          editor={editor}
          onAddOrEditLink={onAddOrEditLink}
          onInsertImage={onInsertImage}
          className="gap-2"
          control={control}
          errors={errors}
        />
      </div>

      {/* Mobile toolbar */}
      {open && (
        <div
          ref={panelRef}
          className="absolute left-3 right-3 top-12 z-20 origin-top rounded-md border border-slate-500 bg-slate-700 p-2 shadow-xl transition-all sm:hidden"
        >
          <ToolbarContent
            editor={editor}
            onAddOrEditLink={onAddOrEditLink}
            onInsertImage={onInsertImage}
            className="gap-2"
            control={control}
            errors={errors}
          />
        </div>
      )}
    </div>
  );
}
