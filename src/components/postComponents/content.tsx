"use client";
import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

const Content = () => {
  const [content, setContent] = useState("");
  const editor = useRef(null);
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
      filebrowser: "IFileBrowserOptions",
      minHeight : 500,
      // theme: "dark"
    }),
    []
  );

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onChange={(newContent) => setContent(newContent)}
      />
    </div>
  );
};

export default Content;
