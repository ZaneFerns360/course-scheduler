"use client";
import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

const Content = ({ onContentChange }) => {
  const [content, setContent] = useState("");
  const editor = useRef(null);
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
      minHeight: 500,
    }),
    []
  );

  const handleContentChange = (newContent) => {
    setContent(newContent);
    onContentChange(newContent);
  };

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onChange={handleContentChange}
      />
    </div>
  );
};

export default Content;
