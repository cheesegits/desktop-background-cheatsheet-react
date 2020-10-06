import React from "react";

const Dropdown = ({
  files,
  setBackgroundImage,
  highlightedFile,
  setHighlightedFile,
}) => {
  const setDesktopBackground = () => {
    setBackgroundImage(highlightedFile);
  };

  // highlight onMouseOver
  const mouseHighlight = (event) => {
    setHighlightedFile(event.target.getAttribute("id"));
  };

  // logic to toggle highlight
  const highlightFile = (file, highlightedFile) => {
    if (highlightedFile === file) {
      return { backgroundColor: "#175ca1" };
    }
  };

  // restore highlightedFile to files[0] on mouseLeave
  const mouseLeave = (_) => {
    setHighlightedFile(files[0]);
  };

  // does not properly highlight files[0] after "Tab" autofill of input, 1 render behind
  const filesList = files.map(file => (
    <li
      style={highlightFile(file, highlightedFile)} // html doesn't look clean when highlightFile ends up false
      key={file}
      id={file}
      onMouseOver={mouseHighlight}
      onClick={setDesktopBackground}
    >
      {file}
    </li>
  ));

  return (
    <div>
      <ul onMouseLeave={mouseLeave}>{filesList}</ul>
    </div>
  );
};

export default Dropdown;
