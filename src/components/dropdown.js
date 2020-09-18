import React from "react";

const Dropdown = ({
  files,
  setFiles,
  setBackgroundImage,
  highlightedFile,
  setHighlightedFile,
}) => {

  const setDesktopBackground = () => {
    setBackgroundImage(highlightedFile);
    setFiles([]);
  };

  const updateHighlighted = (event) => {
    setHighlightedFile(event.target.getAttribute("id"));
  };

  const filesList = files.map((file, index) => (
    <li
      key={file}
      id={file}
      index={index}
      onMouseOver={updateHighlighted}
      onClick={setDesktopBackground}
    >
      {file}
    </li>
  ));

  return (
    <div>
      <ul>{filesList}</ul>
    </div>
  );
};

export default Dropdown;
