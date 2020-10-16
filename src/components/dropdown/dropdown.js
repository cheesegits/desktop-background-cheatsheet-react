import React from "react";

import "./dropdown.css"

import highlightFile from "./highlightFile"
import highlightSubstrings from "./highlightSubstrings";

const Dropdown = ({
  files,
  input,
  setBackgroundImage,
  highlightedFile,
  setHighlightedFile,
}) => {

  const setDesktopBackground = () => {
    setBackgroundImage(highlightedFile);
  };
  
  // highlight li via onMouseOver
  const mouseHighlight = (event) => {
    setHighlightedFile(event.target.getAttribute("id"));
  };
  
  // reset li highlighting on mouseLeave of ul
  const resetHighlight = (_) => {
    setHighlightedFile(files[0]);
  };
  

  const filesList = files.map(file => (
    <li
      style={highlightFile(file, highlightedFile)} // html has style attribute with no value when highlightFile is false
      key={file}
      id={file}
      onMouseEnter={mouseHighlight}
      onClick={setDesktopBackground}
    >
      <div dangerouslySetInnerHTML={ // WARNING: dangerouslySetInnerHTML
        {__html: highlightSubstrings(file, input)} // WARNING: dangerouslySetInnerHTML
      }>
      </div>
    </li>
  ));

  return (
    <div>
      <ul onMouseLeave={resetHighlight}>{filesList}</ul>
    </div>
  );
};

export default Dropdown;
