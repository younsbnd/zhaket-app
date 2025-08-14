"use client";

import React, {
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
  forwardRef,
} from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { Card, CardBody } from "@heroui/react";
import TiptapMenuBar from "./TiptapMenuBar";
 
 
/* ============================================================================
 * Utility Functions
 * ==========================================================================*/

/** Clean and normalize URL input */
const normalizeUrlInput = (raw) =>
  typeof raw === "string"
    ? raw.trim().replace(/^:+/, "").replace(/^data:/i, "").trim()
    : "";

/** Detect data/base64 URLs (not allowed) */
const isDataOrBase64 = (str) =>
  typeof str === "string" && (/^data:/i.test(str) || /base64,/.test(str));

/** Validate URLs: absolute HTTP/HTTPS or relative path */
const urlAllowed = (href, validate) => {
  const h = normalizeUrlInput(href);
  if (!h || isDataOrBase64(h)) return false;
  if (typeof validate === "function") {
    try {
      return !!validate(h);
    } catch {
      return false;
    }
  }
  return h.startsWith("/") || /^https?:\/\//i.test(h);
};

/** Remove base64 images from pasted HTML */
const stripDataImagesFromHTML = (html) =>
  typeof html === "string"
    ? html.replace(
        /<img[^>]+src=(["'])(?:data:[^"']*|[^"']*base64[^"']*)\1[^>]*>/gi,
        ""
      )
    : "";

/** Remove empty paragraph or heading tags */
const removeEmptyHtmlTags = (html) =>
  html.replace(/<(p|h[1-6])[^>]*>\s*<\/\1>/gi, "").trim();

/* ============================================================================
 * Document Parsing Helpers
 * ==========================================================================*/

/** Extract plain text from ProseMirror node */
const textOf = (node) =>
  !node
    ? ""
    : node.type === "text"
    ? node.text || ""
    : (node.content || []).map(textOf).join("");

/** Extract inline parts (text, links, line breaks) */
const inlineParts = (node) => {
  const out = [];
  (node?.content || []).forEach((child) => {
    if (child.type === "text") {
      const link = (child.marks || []).find((m) => m.type === "link");
      out.push({
        text: child.text || "",
        ...(link?.attrs?.href ? { href: link.attrs.href } : {}),
      });
    } else if (child.type === "hardBreak") {
      out.push({ br: true });
    } else if (child.content) {
      out.push(...inlineParts(child));
    }
  });
  return out;
};

/** Map ProseMirror node to clean block structure */
const mapNode = (n) => {
  if (!n) return null;

  if (n.type === "paragraph") {
    const txt = textOf(n).trim();
    if (!txt) return null;
    return {
      type: "p",
      align: n.attrs?.textAlign || "left",
      text: txt,
      inlines: inlineParts(n),
    };
  }

  if (n.type === "heading") {
    const txt = textOf(n).trim();
    if (!txt) return null;
    return {
      type: "h",
      level: n.attrs?.level || 1,
      align: n.attrs?.textAlign || "left",
      text: txt,
      inlines: inlineParts(n),
    };
  }

  if (n.type === "bulletList") {
    const items = (n.content || []).map(mapNode).filter(Boolean);
    return items.length ? { type: "ul", items } : null;
  }

  if (n.type === "orderedList") {
    const items = (n.content || []).map(mapNode).filter(Boolean);
    return items.length
      ? { type: "ol", start: n.attrs?.start || 1, items }
      : null;
  }

  if (n.type === "listItem") {
    const p = (n.content || []).find((c) => c.type === "paragraph");
    const txt = textOf(p || n).trim();
    if (!txt) return null;
    return {
      type: "li",
      text: txt,
      inlines: inlineParts(p || n),
      content: (n.content || [])
        .filter((c) => c.type !== "paragraph")
        .map(mapNode)
        .filter(Boolean),
    };
  }

  if (n.type === "image") {
    const src = n.attrs?.src || "";
    if (!src) return null;
    return {
      type: "img",
      src,
      alt: n.attrs?.alt || "",
    };
  }

  return null;
};

/** Convert document JSON to block array */
const docToBlocks = (doc) =>
  Array.isArray(doc?.content) ? doc.content.map(mapNode).filter(Boolean) : [];

/** Detect active heading level */
const getHeadingLevel = (editor) =>
  (editor.isActive("heading", { level: 1 }) && 1) ||
  (editor.isActive("heading", { level: 2 }) && 2) ||
  (editor.isActive("heading", { level: 3 }) && 3) ||
  0;

/* ============================================================================
 * Main Tiptap Editor Component
 * ==========================================================================*/

const TiptapEditor = forwardRef(function TiptapEditor(props, ref) {
  const {
    value = "",
    editable = true,
    className = "",
    linkOptions = {},
    menuTitle = "Editor Menu",
    onChangeHtml,
    onChangeBlocks,
  } = props || {};

  /** Configure editor extensions */
  const extensions = useMemo(
    () => [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        italic: false,
        strike: false,
        code: false,
        codeBlock: false,
        blockquote: false,
        horizontalRule: false,
      }),
      Link.configure({
        openOnClick: linkOptions.openOnClick ?? true,
        autolink: linkOptions.autolink ?? true,
        linkOnPaste: linkOptions.linkOnPaste ?? true,
        validate: (href) => urlAllowed(href, linkOptions.validate),
      }),
      Image.configure({ allowBase64: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    [linkOptions]
  );

  const [headingLevel, setHeadingLevel] = useState("0");

  /** Create Tiptap editor instance */
  const editor = useEditor({
    extensions,
    content: removeEmptyHtmlTags(stripDataImagesFromHTML(value || "")),
    editable,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose max-w-full text-sm sm:text-base focus:outline-none dark:prose-invert",
        dir: "auto",
      },
      transformPastedHTML: (html) =>
        removeEmptyHtmlTags(stripDataImagesFromHTML(html)),
      handlePaste: (_v, e) => {
        const files = e.clipboardData?.files;
        if (files?.length && Array.from(files).some((f) => f.type?.startsWith("image/"))) {
          e.preventDefault();
          return true;
        }
        return false;
      },
      handleDrop: (_v, e) => {
        const files = e.dataTransfer?.files;
        if (files?.length && Array.from(files).some((f) => f.type?.startsWith("image/"))) {
          e.preventDefault();
          return true;
        }
        return false;
      },
    },
    onCreate: ({ editor }) => {
      setHeadingLevel(String(getHeadingLevel(editor)));
      onChangeHtml?.(removeEmptyHtmlTags(editor.getHTML()));
      onChangeBlocks?.(docToBlocks(editor.getJSON()));
    },
    onSelectionUpdate: ({ editor }) =>
      setHeadingLevel(String(getHeadingLevel(editor))),
    onUpdate: ({ editor }) => {
      onChangeHtml?.(removeEmptyHtmlTags(editor.getHTML()));
      onChangeBlocks?.(docToBlocks(editor.getJSON()));
    },
  });

  /** Expose editor instance via ref */
  useImperativeHandle(ref, () => editor, [editor]);

  /** Sync external value changes */
  useEffect(() => {
    if (!editor) return;
    const sanitized = removeEmptyHtmlTags(stripDataImagesFromHTML(value || ""));
    if (sanitized !== editor.getHTML()) {
      editor.commands.setContent(sanitized, false);
    }
  }, [editor, value]);

  /** Update editable state dynamically */
  useEffect(() => {
    if (editor) editor.setEditable(!!editable);
  }, [editor, editable]);

  /** Handle heading level change */
  const handleHeadingChange = (lvlStr) => {
    if (!editor) return;
    const next = Number(lvlStr || 0);
    const current = getHeadingLevel(editor);
    if (current === next) return;
    setHeadingLevel(String(next));
    if (next === 0) editor.chain().focus().setParagraph().run();
    else editor.chain().focus().toggleHeading({ level: next }).run();
  };

  /** Add or edit link */
  const handleAddOrEditLink = () => {
    const prev = editor?.getAttributes("link")?.href || "";
    const raw = window.prompt("Enter a URL:", prev || "https://");
    if (raw === null) return;
    if (!urlAllowed(raw, linkOptions.validate)) {
      return editor?.chain().focus().unsetLink().run();
    }
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: normalizeUrlInput(raw) })
      .run();
  };

  /** Insert image via URL */
  const handleInsertImage = () => {
    const raw = window.prompt("Enter an image URL:", "");
    if (raw === null) return;
    const u = normalizeUrlInput(raw);
    if (!u || isDataOrBase64(u)) {
      return alert("Invalid URL. Only HTTP/HTTPS or relative paths allowed.");
    }
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
    <Card
      shadow="sm"
      className={`border w-full max-w-[700px] bg-white dark:bg-content1 dark:border-default-200 ${className}`}
    >
      <CardBody className="p-0">
        {/* Toolbar */}
        <TiptapMenuBar
          title={menuTitle}
          editor={editor}
          headingLevel={headingLevel}
          onHeadingChange={handleHeadingChange}
          onAddOrEditLink={handleAddOrEditLink}
          onInsertImage={handleInsertImage}
          onEditImageSrc={() => handleEditImageAttr("src")}
          onEditImageAlt={() => handleEditImageAttr("alt")}
        />

        {/* Editor content */}
        <div className="p-1">
          <div className="min-h-[161px] sm:min-h-[192px] max-h-[420px] overflow-auto rounded-md border bg-white p-2 dark:bg-content1">
            <EditorContent editor={editor} className="text-sm sm:text-base" />
          </div>
        </div>
      </CardBody>
    </Card>
  );
});

export default TiptapEditor;
