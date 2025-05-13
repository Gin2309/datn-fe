"use client";
import React, { useEffect, useRef, useState } from "react";

export default function RenderTruncatedContent({
  content,
  maxLength = 100,
}: {
  content: string;
  maxLength?: number;
}) {
  const rawHtmlRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");

  useEffect(() => {
    if (rawHtmlRef.current) {
      const plainText = rawHtmlRef.current.innerText;
      setText(truncate(plainText, maxLength));
    }
  }, [content]);

  return (
    <>
      <div
        ref={rawHtmlRef}
        style={{ display: "none" }}
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <div>{text}</div>
    </>
  );
}

function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max) + "..." : str;
}
