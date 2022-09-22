import React from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import { formats, modules, ReactQuillToolbar } from "./ReactQuillToolbar";
import "react-quill/dist/quill.snow.css";
const ReactQuillEditor = ({ content, handleChange }) => {
  return (
    <div className="text-editor">
      <ReactQuillToolbar />
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleChange}
        placeholder={"Write something awesome..."}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default ReactQuillEditor;
