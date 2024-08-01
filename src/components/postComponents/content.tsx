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
      minHeight : 500,
    }),
    []
  );

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onChange={newContent => setContent(newContent)}
      />
    </div>
  );
};

export default Content;
