"use client";

import React, { useEffect, useImperativeHandle, useMemo, useState, forwardRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { Card, CardBody } from "@heroui/react";
import TiptapMenuBar from "./TiptapMenuBar";

/* --------------------- Utilities --------------------- */
const normalizeUrlInput = (raw) => typeof raw === "string" ? raw.trim().replace(/^:+/, "").trim() : "";
const urlAllowed = (href, validate) => {
  const h = normalizeUrlInput(href);
  if (!h) return false;
  if (typeof validate === "function") {
    try { return !!validate(h); } catch { return false; }
  }
  return h.startsWith("/") || /^https?:\/\//i.test(h);
};
const stripEmptyTags = (html) => html.replace(/<(p|h[1-6])[^>]*>\s*<\/\1>/gi, "").trim();

/* --------------------- Main Editor --------------------- */
const getHeadingLevel = (editor) =>
  (editor.isActive("heading", { level: 1 }) && 1) ||
  (editor.isActive("heading", { level: 2 }) && 2) ||
  (editor.isActive("heading", { level: 3 }) && 3) || 0;

const TiptapEditor = forwardRef(function TiptapEditor(props, ref) {
  const { value = "", editable = true, className = "", linkOptions = {}, menuTitle = "Editor Menu", onChangeHtml, onChangeBlocks } = props;

  const extensions = useMemo(() => [
    StarterKit.configure({ 
      heading: { levels: [1,2,3] }, 
      italic: false, 
      strike: false, 
      code: false, 
      codeBlock: false, 
      blockquote: false, 
      horizontalRule: false,
      link: false // Exclude link from StarterKit to avoid duplicate
    }),
    Link.configure({ openOnClick: linkOptions.openOnClick ?? true, autolink: linkOptions.autolink ?? true, linkOnPaste: linkOptions.linkOnPaste ?? true, validate: href => urlAllowed(href, linkOptions.validate) }),
    Image.configure({}),
    TextAlign.configure({ types: ["heading", "paragraph"] })
  ], [linkOptions]);

  const [headingLevel, setHeadingLevel] = useState("0");

  /** Create Tiptap editor instance */
  const editor = useEditor({
    extensions,
    content: stripEmptyTags(value),
    editable,
    immediatelyRender: false,
    editorProps: {
      attributes: { class: "prose max-w-none text-sm sm:text-base focus:outline-none prose-invert text-slate-100", dir: "rtl" },
      transformPastedHTML: stripEmptyTags,
      handlePaste: (_v, e) => {
        const files = e.clipboardData?.files;
        if (files?.length && Array.from(files).some(f => f.type?.startsWith("image/"))) { e.preventDefault(); return true; }
        return false;
      },
      handleDrop: (_v, e) => {
        const files = e.dataTransfer?.files;
        if (files?.length && Array.from(files).some(f => f.type?.startsWith("image/"))) { e.preventDefault(); return true; }
        return false;
      },
    },
    onCreate: ({ editor }) => { onChangeHtml?.(stripEmptyTags(editor.getHTML())); },
    onUpdate: ({ editor }) => { onChangeHtml?.(stripEmptyTags(editor.getHTML())); },
    onSelectionUpdate: ({ editor }) => setHeadingLevel(String(getHeadingLevel(editor))),
  });

  useImperativeHandle(ref, () => editor, [editor]);
  useEffect(() => { if (!editor) return; const sanitized = stripEmptyTags(value); if (sanitized !== editor.getHTML()) editor.commands.setContent(sanitized, false); }, [editor, value]);
  useEffect(() => { if (editor) editor.setEditable(!!editable); }, [editor, editable]);

  const handleAddOrEditLink = () => {
    const prev = editor?.getAttributes("link")?.href || "";
    const raw = window.prompt("Enter a URL:", prev || "https://");
    if (raw === null) return;
    if (!urlAllowed(raw, linkOptions.validate)) { editor?.chain().focus().unsetLink().run(); return; }
    editor?.chain().focus().extendMarkRange("link").setLink({ href: normalizeUrlInput(raw) }).run();
  };

  /** Insert image via URL */
  const handleInsertImage = () => {
    const raw = window.prompt("Enter an image URL:", "");
    if (raw === null) return;
    const u = normalizeUrlInput(raw);
    if (!u) return alert("Invalid URL. Only HTTP/HTTPS or relative paths allowed.");
    const alt = window.prompt("Enter image alt text:", "") ?? "";
    editor?.chain().focus().setImage({ src: u, alt }).run();
  };

  /** Edit image attributes */
  const handleEditImageAttr = (attr) => {
    if (!editor) return;
    const prev = editor.getAttributes("image")?.[attr] || "";
    const raw = window.prompt(`Enter image ${attr}:`, prev);
    if (raw === null) return;
    const val = attr === "src" ? normalizeUrlInput(raw) : raw;
    if (attr === "src" && (!val || isDataOrBase64(val))) {
      return alert("Invalid URL. Only HTTP/HTTPS or relative paths allowed.");
    }
    editor.chain().focus().updateAttributes("image", { [attr]: val }).run();
  };

  if (!editor) return null;

  return (
    <div className={`w-full border border-slate-600 rounded-md bg-slate-700 ${className}`}>
      <TiptapMenuBar
        title={menuTitle}
        editor={editor}
        headingLevel={headingLevel}
        onAddOrEditLink={handleAddOrEditLink}
        onInsertImage={handleInsertImage}
      />
      <div className="p-2">
        <div className="min-h-[161px] sm:min-h-[192px] max-h-[420px] overflow-auto rounded-md border border-slate-600 bg-slate-800 p-3">
          <EditorContent editor={editor} className="text-sm sm:text-base text-slate-100 prose prose-invert max-w-none" />
        </div>
      </div>
    </div>
  );
});

export default TiptapEditor;
