console.log("dropdown.js loaded");

import React, { useEffect } from "react";

const Dropdown = ({
  allFiles,
  files,
  setFiles,
  input,
  setBackgroundImage,
  highlightedFile,
  setHighlightedFile,
  setTabComplete,
}) => {
  console.log("Dropdown rendered");

  const filterMatchingFiles = (allFiles, input) => {
    const filteredFiles = allFiles.filter((file) => {
      return file.toLowerCase().match(input.toLowerCase());
      // cannot read property 'toLowerCase' of undefined
      // state of files behind by 1 update
    });
    return filteredFiles;
  };

  const setDesktopBackground = () => {
    setBackgroundImage(highlightedFile);
    setFiles([]);
  };

  const updateHighlighted = (event) => {
    console.log("setHighlightedFile: ", event.target.id);
    setHighlightedFile(event.target.getAttribute("id"));
  };

  // renders all files or matching files
  useEffect(() => {
    if (input === "") {
      setFiles([]);
      // setTabComplete(""); // blocks initial rendering, need another way to reset
      setHighlightedFile("");
      setBackgroundImage("");
    } else {
      setFiles(filterMatchingFiles(allFiles, input));
    }
  }, [input]);

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

// // highlights first file when input is changed
// useEffect(() => { // triggered on load of app
//   document
//     .getElementById(newFiles[0])
//     .setAttribute("style", "background-color:#175ca1");
//   console.log("background-color of newFiles[0] set");
// }, [input]);
