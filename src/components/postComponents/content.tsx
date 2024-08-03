"use client";

import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

const Content = ({ onContentChange }) => {
  const [content, setContent] = useState("");
  const editorRef = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
      minHeight: 500,
      uploader: {
        url: "http://localhost:8055/files",
        format: "json",
        method: "POST",
        prepareData: (formData) => {
          const file = formData.get("files[0]");
          formData.delete("files[0]");
          formData.append("file", file);
          return formData;
        },
        isSuccess: (resp) => {
          return resp && resp.data && resp.data.id;
        },
        getMsg: (resp) => {
          return resp && resp.data
            ? "File uploaded successfully"
            : "Upload failed";
        },
        process: (resp) => {
          if (resp && resp.data && resp.data.id) {
            const fileUrl = `http://localhost:8055/assets/${resp.data.id}`;
            return {
              files: [fileUrl],
              path: fileUrl,
              baseurl: fileUrl,
              message: "File uploaded successfully",
            };
          }
          return resp;
        },
        defaultHandlerError: (e) => {
          console.error("Upload error:", e);
        },
        defaultHandlerSuccess: function (data, resp) {
          var i,
            field = "files";
          if (data[field] && data[field].length) {
            for (i = 0; i < data[field].length; i += 1) {
              this.s.insertImage(data[field][i]);
            }
          }
        },
      },
    }),
    [],
  );

  const handleContentChange = (newContent) => {
    setContent(newContent);
    onContentChange(newContent);
  };

  return (
    <div>
      <JoditEditor
        ref={editorRef}
        value={content}
        config={config}
        onChange={handleContentChange}
      />
    </div>
  );
};

export default Content;
