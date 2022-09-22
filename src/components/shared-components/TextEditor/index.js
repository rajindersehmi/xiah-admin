import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const FULL_SCREEN_ZINDEX = 10000000000;

const presetColors = [
  "#ff00aa",
  "#F5A623",
  "#F8E71C",
  "#8B572A",
  "#7ED321",
  "#417505",
  "#BD10E0",
  "#9013FE",
  "#4A90E2",
  "#0F56B3",
  "#50E3C2",
  "#B8E986",
  "#ff0000",
  "#000000",
  "#4A4A4A",
  "#9B9B9B",
  "#FFFFFF",
];

const controls = [
  "blockquote",
  "bold",
  "code",
  "clear",
  "emoji",
  "font-family",
  "font-size",
  "headings",
  "hr",
  "italic",
  "letter-spacing",
  "line-height",
  "link",
  "list-ol",
  "list-ul",
  "media",
  "redo",
  "remove-styles",
  "separator",
  "strike-through",
  "superscript",
  "subscript",
  "text-align",
  "text-color",
  "text-indent",
  "underline",
  "undo",
  "table",
  "fullscreen",
];

const TextEditor = (props) => {
  const [zIndex, setZIndex] = useState(0);
  const theme = useSelector((state) => state.theme);

  const _onFullScreen = (e) => {
    if (e) return setZIndex(FULL_SCREEN_ZINDEX);

    return setZIndex(0);
  };
  return (
    <div style={{ marginBottom: "2rem" }}>
      <BraftEditor
        {...props}
        controls={controls}
        language="en"
        fontFamilies={[{ name: "Manrope", family: "Manrope,sans-serif" }]}
        colors={presetColors}
        style={{
          zIndex,
          background: "",
          marginTop: 10,
          backgroundImage: "none",
          border: `1px solid ${
            theme.currentTheme === "dark" ? "rgb(77, 91, 117)" : "#e6ebf1"
          }`,
          borderRadius: "0.625rem",
        }}
        onFullscreen={_onFullScreen}
      />
    </div>
  );
};

export default TextEditor;
