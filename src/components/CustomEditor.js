import React, { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

const CustomJoditEditor = ({ value, onChange }) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "",
      toolbar: {
        items: [
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "|",
          "superscript",
          "subscript",
          "|",
          "font",
          "fontsize",
          "brush",
          "|",
          "paragraph",
          "|",
          "link",
          "video",
          "|",
          "align",
          "undo",
          "redo",
        ],
        uploader: false,
      },
    }),
    []
  );

  return (
    <JoditEditor
      ref={editor}
      value={value}
      config={config}
      tabIndex={1}
      onBlur={(newContent) => onChange(newContent)}
    />
  );
};

export default CustomJoditEditor;
