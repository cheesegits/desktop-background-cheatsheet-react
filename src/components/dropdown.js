import React from "react";

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

  // CSS highlight li
  const highlightFile = (file, highlightedFile) => {
    if (highlightedFile === file) {
      return { backgroundColor: "#175ca1" };
    }
  };
  
  // highlight li via onMouseOver
  const mouseHighlight = (event) => {
    setHighlightedFile(event.target.getAttribute("id"));
  };
  
  // reset li highlighting on mouseLeave of ul
  const mouseLeave = (_) => {
    setHighlightedFile(files[0]);
  };
  
  // highlight matching search text in li
  const highlightSubstrings = (file, substring) => {
    const fileLowerCase = file.toLowerCase(file);
    const index = fileLowerCase.indexOf(substring);
    return `${file.substring(0, index)}<span class="substring">${file.substring(index, index + substring.length)}</span>${file.substring(index+substring.length, file.length)}`
  }

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
      <ul onMouseLeave={mouseLeave}>{filesList}</ul>
    </div>
  );
};

export default Dropdown;
