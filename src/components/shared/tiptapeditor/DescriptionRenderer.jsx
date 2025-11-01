"use client";

import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import parse, { domToReact } from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@heroui/react";

const DescriptionRenderer = ({ description, title = "توضیحات" }) => {
  const [isClient, setIsClient] = useState(false);

  //   useEffect to set the client state to true
  useEffect(() => {
    setIsClient(true);
  }, []);

  // if not client, return skeleton
  if (!isClient) {
    return (
      <div className="mt-5 space-y-2">
        <Skeleton className="w-full h-5 rounded-lg" />
        <Skeleton className="w-4/5 h-5 rounded-lg" />
        <Skeleton className="w-full h-5 rounded-lg" />
        <Skeleton className="w-2/3 h-5 rounded-lg" />
      </div>
    );
  }

  // if no description, return null
  if (!description) {
    return null;
  }

  // sanitize the description
  const sanitizedHtml = DOMPurify.sanitize(description, {
    ALLOWED_TAGS: [
      "p",
      "b",
      "i",
      "u",
      "strong",
      "em",
      "ul",
      "ol",
      "li",
      "a",
      "h1",
      "h2",
      "h3",
      "img",
      "br",
    ],
    ALLOWED_ATTR: ["href", "target", "src", "alt", "title", "width", "height"],
  });

  // options for the parse function
  const options = {
    replace: (domNode) => {
      if (domNode.name === "img" && domNode.attribs && domNode.attribs.src) {
        return (
          <Image
            src={domNode.attribs.src}
            alt={domNode.attribs.alt || "تصویر محتوا"}
            width={parseInt(domNode.attribs.width) || 500}
            height={parseInt(domNode.attribs.height) || 300}
            className="rounded-lg object-cover my-4 mx-auto w-full h-auto max-w-full"
            priority
          />
        );
      }
      if (domNode.name === "a" && domNode.attribs && domNode.attribs.href) {
        const href = domNode.attribs.href;
        if (href.startsWith("/") || href.startsWith(window.location.origin)) {
          return (
            <Link href={href} className="text-primary hover:underline">
              {domToReact(domNode.children, options)}
            </Link>
          );
        }
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {domToReact(domNode.children, options)}
          </a>
        );
      }
      if (domNode.name === "ul") {
        return (
          <ul className="list-disc list-outside pr-5">
            {domToReact(domNode.children, options)}
          </ul>
        );
      }
      if (domNode.name === "ol") {
        return (
          <ol className="list-decimal list-outside pr-5">
            {domToReact(domNode.children, options)}
          </ol>
        );
      }
    },
  };

  const reactContent = parse(sanitizedHtml, options);

  return (
    <section className="max-w-7xl mx-auto">
      <div className="text-gray-700 leading-relaxed prose max-w-none px-4">
        {reactContent}
      </div>
    </section>
  );
};

export default DescriptionRenderer;
