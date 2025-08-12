"use client";

import React, { useEffect, useImperativeHandle, useMemo } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import ControlledSelect from "../forms/ControlledSelect";
import { Button, Tooltip, Divider, Card, CardBody } from "@heroui/react";
import {
  TbBold,
  TbItalic,
  TbUnderline,
  TbStrikethrough,
  TbCode,
  TbBraces,
  TbList,
  TbListNumbers,
  TbQuote,
  TbLink,
  TbUnlink,
  TbPhoto,
  TbPencil,
  TbTypography,
  TbArrowBackUp,
  TbArrowForwardUp,
  TbEraser,
  // Direction icons (added)
  TbTextDirectionLtr,
  TbTextDirectionRtl,
} from "react-icons/tb";

/* Utility: normalize URL input (trim, strip leading ":" and any "data:" prefix) */
const normalizeUrlInput = (raw) => {
  if (typeof raw !== "string") return "";
  let s = raw.trim();
  while (s.startsWith(":")) s = s.slice(1);
  // Ensure no "data:" scheme remains
  while (s.toLowerCase().startsWith("data:")) s = s.slice(5).trim();
  return s;
};

/* Detect disallowed data/base64 URLs */
const isDataOrBase64 = (s) => {
  if (!s || typeof s !== "string") return false;
  const lower = s.toLowerCase();
  return lower.startsWith("data:") || lower.includes("base64,");
};

/* Remove <img> tags whose src is data/base64 */
const stripDataImagesFromHTML = (html) => {
  if (typeof html !== "string") return "";
  return html.replace(
    /<img[^>]+src=(["'])(?:data:[^"']*|[^"']*base64[^"']*)\1[^>]*>/gi,
    ""
  );
};

/* Extract plain text recursively from a node */
const getTextContent = (node) => {
  if (!node) return "";
  if (node.type === "text") return node.text || "";
  const content = node.content || [];
  return content.map(getTextContent).join("");
};

/* Extract inline parts (marks + hardBreak) from a node */
const extractInlineParts = (node) => {
  const parts = [];
  if (!node || !node.content) return parts;

  node.content.forEach((child) => {
    if (child.type === "text") {
      const marks = (child.marks || []).map((m) => m.type);
      const link = (child.marks || []).find((m) => m.type === "link");
      parts.push({
        text: child.text || "",
        marks,
        ...(link?.attrs?.href ? { href: link.attrs.href } : {}),
      });
    } else if (child.type === "hardBreak") {
      parts.push({ tag: "br" });
    } else if (child.content) {
      parts.push(...extractInlineParts(child));
    }
  });

  return parts;
};

/* Map block nodes to a simplified object */
const mapNodeToTagObject = (node) => {
  if (!node) return null;

  switch (node.type) {
    case "paragraph":
      return {
        tag: "p",
        text: getTextContent(node),
        inlines: extractInlineParts(node),
      };

    case "heading": {
      const level = node.attrs?.level || 1;
      return {
        tag: `h${level}`,
        level,
        text: getTextContent(node),
        inlines: extractInlineParts(node),
      };
    }

    case "bulletList": {
      const items = (node.content || [])
        .map((li) => mapNodeToTagObject(li))
        .filter(Boolean);
      return { tag: "ul", items };
    }

    case "orderedList": {
      const start = node.attrs?.start || 1;
      const items = (node.content || [])
        .map((li) => mapNodeToTagObject(li))
        .filter(Boolean);
      return { tag: "ol", start, items };
    }

    case "listItem": {
      const firstParagraph = (node.content || []).find(
        (c) => c.type === "paragraph"
      );
      const text = firstParagraph
        ? getTextContent(firstParagraph)
        : getTextContent(node);
      const inlines = firstParagraph
        ? extractInlineParts(firstParagraph)
        : extractInlineParts(node);
      const nestedBlocks = (node.content || [])
        .filter((c) => c.type !== "paragraph")
        .map((c) => mapNodeToTagObject(c))
        .filter(Boolean);
      return {
        tag: "li",
        text,
        inlines,
        ...(nestedBlocks.length ? { content: nestedBlocks } : {}),
      };
    }

    case "blockquote": {
      const content = (node.content || [])
        .map((c) => mapNodeToTagObject(c))
        .filter(Boolean);
      return { tag: "blockquote", content };
    }

    case "codeBlock":
      return {
        tag: "pre",
        code: getTextContent(node),
        language: node.attrs?.language || "",
      };

    case "image":
      return {
        tag: "img",
        src: node.attrs?.src || "",
        alt: node.attrs?.alt || "",
        title: node.attrs?.title || "",
      };

    case "horizontalRule":
      return { tag: "hr" };

    default:
      return null;
  }
};

/* Convert full document JSON (getJSON()) to an array of simplified blocks */
const docToContentArray = (docJSON) => {
  if (!docJSON || !Array.isArray(docJSON.content)) return [];
  return docJSON.content.map(mapNodeToTagObject).filter(Boolean);
};

/* Icon-only toolbar button using heroui + react-icons */
function ToolbarIconButton({
  active,
  disabled,
  onClick,
  title,
  icon: Icon,
  className = "",
}) {
  const color = active ? "primary" : "default";
  const variant = active ? "solid" : "flat";
  return (
    <Tooltip content={title} placement="bottom" closeDelay={0}>
      <Button
        isIconOnly
        size="sm"
        radius="sm"
        variant={variant}
        color={color}
        className={`min-w-8 ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        <Icon className="h-4 w-4" />
      </Button>
    </Tooltip>
  );
}

/* Zod schema for non-function props (runtime validation) */
const PropsSchema = z.object({
  value: z.string().optional(),
  editable: z.boolean().optional(),
  className: z.string().optional(),
  linkOptions: z
    .object({
      openOnClick: z.boolean().optional(),
      autolink: z.boolean().optional(),
      linkOnPaste: z.boolean().optional(),
      // validate is handled at runtime; do not use z.function here
    })
    .optional(),
  immediatelyRender: z.boolean().optional(),
});

const TiptapEditor = React.forwardRef(function TiptapEditor(allProps, ref) {
  // Validate plain (non-function) props via Zod
  const parsed = PropsSchema.safeParse(allProps);
  const safeProps = parsed.success ? parsed.data : {};
  const {
    value = "",
    editable = true,
    className = "",
    linkOptions: linkOpts = {},
    immediatelyRender = false,
  } = safeProps;

  // Pull callbacks directly and type-check at usage time
  const onChange =
    typeof allProps.onChange === "function" ? allProps.onChange : undefined;
  const onReady =
    typeof allProps.onReady === "function" ? allProps.onReady : undefined;
  const onImagesChange =
    typeof allProps.onImagesChange === "function"
      ? allProps.onImagesChange
      : undefined;
  const onContentArrayChange =
    typeof allProps.onContentArrayChange === "function"
      ? allProps.onContentArrayChange
      : undefined;

  // Build a URL validator that always rejects data/base64; defer to user's validator if provided
  const userValidate =
    typeof allProps.linkOptions?.validate === "function"
      ? allProps.linkOptions.validate
      : null;
  const linkValidate = (href) => {
    const normalized = normalizeUrlInput(href);
    if (!normalized) return false;
    if (isDataOrBase64(normalized)) return false;
    if (userValidate) {
      try {
        return !!userValidate(normalized);
      } catch {
        return false;
      }
    }
    return normalized.startsWith("/") || /^https?:\/\//i.test(normalized);
  };

  // Form state for heading selector
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { headingLevel: "0" },
  });

  // Editor extensions
  const extensions = useMemo(
    () => [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Underline,
      Link.configure({
        openOnClick: linkOpts.openOnClick ?? true,
        autolink: linkOpts.autolink ?? true,
        linkOnPaste: linkOpts.linkOnPaste ?? true,
        validate: linkValidate,
      }),
      Image.configure({ allowBase64: false }),
    ],
    // Depend on primitives to avoid re-initialization
    [linkOpts.openOnClick, linkOpts.autolink, linkOpts.linkOnPaste]
  );

  // Collect images from editor state (filter out data/base64 just in case)
  const extractImages = (editorInstance) => {
    const imgs = [];
    if (!editorInstance) return imgs;
    editorInstance.state.doc.descendants((node) => {
      if (node.type?.name === "image") {
        imgs.push({
          src: node.attrs?.src || "",
          alt: node.attrs?.alt || "",
        });
      }
    });
    return imgs.filter((img) => !isDataOrBase64(img.src));
  };

  // Sanitize initial content by removing data/base64 images
  const sanitizedInitial = useMemo(
    () => stripDataImagesFromHTML(value || ""),
    [value]
  );

  // Initialize TipTap editor
  const editor = useEditor({
    extensions,
    content: sanitizedInitial,
    editable,
    immediatelyRender,
    editorProps: {
      attributes: {
        class: "prose max-w-none focus:outline-none dark:prose-invert",
        dir: "auto",
      },
      // Block data/base64 images from paste/drop
      transformPastedHTML: (html) => stripDataImagesFromHTML(html),
      handlePaste: (_view, event) => {
        const dt = event.clipboardData;
        if (dt && dt.files && dt.files.length > 0) {
          const hasImage = Array.from(dt.files).some((f) =>
            f.type?.startsWith("image/")
          );
          if (hasImage) {
            event.preventDefault();
            return true;
          }
        }
        return false;
      },
      handleDrop: (_view, event) => {
        const dt = event.dataTransfer;
        if (dt && dt.files && dt.files.length > 0) {
          const hasImage = Array.from(dt.files).some((f) =>
            f.type?.startsWith("image/")
          );
          if (hasImage) {
            event.preventDefault();
            return true;
          }
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      if (onChange) onChange(editor.getHTML());
      if (onImagesChange) onImagesChange(extractImages(editor));
      if (onContentArrayChange) {
        const arr = docToContentArray(editor.getJSON());
        onContentArrayChange(arr);
      }
    },
    onCreate: ({ editor }) => {
      if (onReady) onReady(editor);
      if (onImagesChange) onImagesChange(extractImages(editor));
      if (onContentArrayChange) {
        const arr = docToContentArray(editor.getJSON());
        onContentArrayChange(arr);
      }
      // Sync initial heading level to the select
      const lvl =
        (editor.isActive("heading", { level: 1 }) && 1) ||
        (editor.isActive("heading", { level: 2 }) && 2) ||
        (editor.isActive("heading", { level: 3 }) && 3) ||
        0;
      setValue("headingLevel", String(lvl), {
        shouldDirty: false,
        shouldTouch: false,
      });
    },
    onSelectionUpdate: ({ editor }) => {
      // Keep the select in sync when cursor moves
      const lvl =
        (editor.isActive("heading", { level: 1 }) && 1) ||
        (editor.isActive("heading", { level: 2 }) && 2) ||
        (editor.isActive("heading", { level: 3 }) && 3) ||
        0;
      setValue("headingLevel", String(lvl), {
        shouldDirty: false,
        shouldTouch: false,
      });
    },
  });

  // Expose editor instance
  useImperativeHandle(ref, () => editor, [editor]);

  // Controlled sync: update content when "value" changes
  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    const sanitized = stripDataImagesFromHTML(value || "");
    if (sanitized !== current) editor.commands.setContent(sanitized, false);
  }, [editor, value]);

  // Sync editable flag
  useEffect(() => {
    if (editor) editor.setEditable(Boolean(editable));
  }, [editor, editable]);

  // Apply heading change coming from the ControlledSelect
  const watchedHeading = watch("headingLevel");
  useEffect(() => {
    if (!editor) return;

    const raw =
      typeof watchedHeading === "object" && watchedHeading?.target
        ? watchedHeading.target.value
        : watchedHeading;
    const lvl = Number(raw ?? 0);
    if (Number.isNaN(lvl)) return;

    const currentLvl =
      (editor.isActive("heading", { level: 1 }) && 1) ||
      (editor.isActive("heading", { level: 2 }) && 2) ||
      (editor.isActive("heading", { level: 3 }) && 3) ||
      0;

    if (lvl === currentLvl) return;

    if (lvl === 0) {
      editor.chain().focus().setParagraph().run();
    } else {
      editor.chain().focus().toggleHeading({ level: lvl }).run();
    }
  }, [watchedHeading, editor]);

  /* Direction state and application:
     - Keeps UI direction (RTL/LTR) without changing editor logic.
     - Updates both Card dir prop and editor root DOM attribute. */
  const [dir, setDir] = React.useState("rtl");

  useEffect(() => {
    if (!editor) return;
    const root = editor.view?.dom;
    if (root) {
      root.setAttribute("dir", dir);
    }
  }, [editor, dir]);

  if (!editor) return null;

  const canUndo = editor.can().undo();
  const canRedo = editor.can().redo();
  const isImageActive = editor.isActive("image");

  // Insert image by URL (reject data/base64, strip any leading "data:")
  const handleInsertImagePrompt = () => {
    const rawUrl = window.prompt(
      "Enter an image URL (example: https://example.com/a.jpg):"
    );
    if (rawUrl === null) return;
    const url = normalizeUrlInput(rawUrl);
    if (!url) {
      alert("URL is not valid.");
      return;
    }
    if (isDataOrBase64(url)) {
      alert(
        "Base64 or data URLs are not allowed — please provide a regular http/https URL."
      );
      return;
    }
    const alt = window.prompt("Enter image alt text (optional):", "") ?? "";
    editor.chain().focus().setImage({ src: url, alt }).run();
  };

  const promptEditImageSrc = () => {
    const prev = editor.getAttributes("image")?.src || "";
    const raw = window.prompt("Enter new image URL:", prev);
    if (raw === null) return;
    const url = normalizeUrlInput(raw);
    if (!url) {
      alert("URL is not valid.");
      return;
    }
    if (isDataOrBase64(url)) {
      alert(
        "Base64 or data URLs are not allowed — please provide a regular http/https URL."
      );
      return;
    }
    editor.chain().focus().updateAttributes("image", { src: url }).run();
  };

  const promptEditImageAlt = () => {
    const prev = editor.getAttributes("image")?.alt || "";
    const alt = window.prompt("Enter image alt text:", prev);
    if (alt === null) return;
    editor.chain().focus().updateAttributes("image", { alt }).run();
  };

  return (
    <Card
      dir={dir} // Reflect current direction on container
      shadow="sm "
      className={`border bg-white dark:bg-content1 dark:border-default-200 ${className}`}
    >
      <CardBody className="p-0">
        {/* Toolbar */}
        <div className="sticky top-0 z-10 border-b bg-gray-50/90 backdrop-blur supports-[backdrop-filter]:bg-gray-50/60 dark:bg-default-100/60">
          <div className="flex flex-wrap items-center gap-2 p-2">
            {/* Heading level selector via ControlledSelect */}
            <div className="w-48">
              <ControlledSelect
                name="headingLevel"
                control={control}
                errors={errors}
                label="Heading"
                placeholder="Select heading"
                options={[
                  { value: "0", label: "Paragraph" },
                  { value: "1", label: "Heading 1" },
                  { value: "2", label: "Heading 2" },
                  { value: "3", label: "Heading 3" },
                ]}
                variant="bordered"
              />
            </div>

            <Divider orientation="vertical" className="h-6" />

            {/* Inline styles */}
            <div className="flex items-center gap-1">
              <ToolbarIconButton
                title="Bold"
                active={editor.isActive("bold")}
                onClick={() => editor.chain().focus().toggleBold().run()}
                icon={TbBold}
              />
              <ToolbarIconButton
                title="Italic"
                active={editor.isActive("italic")}
                onClick={() => editor.chain().focus().toggleItalic().run()}
                icon={TbItalic}
              />
              <ToolbarIconButton
                title="Underline"
                active={editor.isActive("underline")}
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                icon={TbUnderline}
              />
              <ToolbarIconButton
                title="Strikethrough"
                active={editor.isActive("strike")}
                onClick={() => editor.chain().focus().toggleStrike().run()}
                icon={TbStrikethrough}
              />
              <ToolbarIconButton
                title="Inline Code"
                active={editor.isActive("code")}
                onClick={() => editor.chain().focus().toggleCode().run()}
                icon={TbCode}
              />
            </div>

            <Divider orientation="vertical" className="h-6" />

            {/* Lists / Blocks */}
            <div className="flex items-center gap-1">
              <ToolbarIconButton
                title="Bullet List"
                active={editor.isActive("bulletList")}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                icon={TbList}
              />
              <ToolbarIconButton
                title="Ordered List"
                active={editor.isActive("orderedList")}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                icon={TbListNumbers}
              />
              <ToolbarIconButton
                title="Blockquote"
                active={editor.isActive("blockquote")}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                icon={TbQuote}
              />
              <ToolbarIconButton
                title="Code Block"
                active={editor.isActive("codeBlock")}
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                icon={TbBraces}
              />
            </div>

            <Divider orientation="vertical" className="h-6" />

            {/* Link */}
            <div className="flex items-center gap-1">
              <ToolbarIconButton
                title={editor.isActive("link") ? "Edit/Remove Link" : "Add Link"}
                active={editor.isActive("link")}
                onClick={() => {
                  const prev = editor.getAttributes("link")?.href || "";
                  const rawUrl = window.prompt(
                    "Enter a URL:",
                    prev || "https://"
                  );
                  if (rawUrl === null) return;
                  const normalized = normalizeUrlInput(rawUrl);
                  if (!normalized) {
                    editor.chain().focus().unsetLink().run();
                    return;
                  }
                  if (isDataOrBase64(normalized)) {
                    alert(
                      "Base64 or data URLs are not allowed — please provide a regular http/https URL."
                    );
                    return;
                  }
                  if (!linkValidate(normalized)) {
                    alert("URL is not valid.");
                    return;
                  }
                  editor
                    .chain()
                    .focus()
                    .extendMarkRange("link")
                    .setLink({ href: normalized })
                    .run();
                }}
                icon={TbLink}
              />
              {editor.isActive("link") && (
                <ToolbarIconButton
                  title="Remove Link"
                  onClick={() => editor.chain().focus().unsetLink().run()}
                  icon={TbUnlink}
                />
              )}
            </div>

            <Divider orientation="vertical" className="h-6" />

            {/* Images (URL only) */}
            <div className="flex items-center gap-1">
              <ToolbarIconButton
                title="Insert Image (URL only)"
                onClick={handleInsertImagePrompt}
                icon={TbPhoto}
              />
              <ToolbarIconButton
                title="Edit Image URL"
                onClick={promptEditImageSrc}
                disabled={!isImageActive}
                icon={TbPencil}
              />
              <ToolbarIconButton
                title="Edit Image Alt"
                onClick={promptEditImageAlt}
                disabled={!isImageActive}
                icon={TbTypography}
              />
            </div>

            <Divider orientation="vertical" className="h-6" />

            {/* Text direction controls (RTL / LTR) */}
            <div className="flex items-center gap-1">
              {/* Right-to-Left */}
              <ToolbarIconButton
                title="Right-to-Left"
                active={dir === "rtl"}
                onClick={() => setDir("rtl")}
                icon={TbTextDirectionRtl}
              />
              {/* Left-to-Right */}
              <ToolbarIconButton
                title="Left-to-Right"
                active={dir === "ltr"}
                onClick={() => setDir("ltr")}
                icon={TbTextDirectionLtr}
              />
            </div>

            <Divider orientation="vertical" className="h-6" />

            {/* History + Clear */}
            <div className="flex items-center gap-1">
              <ToolbarIconButton
                title="Undo"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!canUndo}
                icon={TbArrowBackUp}
              />
              <ToolbarIconButton
                title="Redo"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!canRedo}
                icon={TbArrowForwardUp}
              />
              <ToolbarIconButton
                title="Clear Formatting"
                onClick={() =>
                  editor.chain().focus().clearNodes().unsetAllMarks().run()
                }
                icon={TbEraser}
              />
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="p-3">
          <div className="min-h-56 max-h-[520px] overflow-auto rounded-md border bg-white p-3 dark:bg-content1">
            <EditorContent editor={editor} className="min-h-48" />
          </div>
        </div>
      </CardBody>
    </Card>
  );
});

export default TiptapEditor;