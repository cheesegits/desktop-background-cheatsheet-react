/**
 * need click event on ./input when input='' to render/remove all files
 * matching li listed
 * matching substring to be highlighted
 *
 */

import React, { useState, useEffect } from "react";

const Dropdown = ({ input, files, index, setIndex }) => {
  // console.log("dropdown input: ", { input });
  // console.log("dropdown {files}.files: ", { files }.files);
  // console.log("dropdown {files}.files[0]: ", { files }.files[0]);
  // console.log("newFiles: ", newFiles[0]);
  // console.log('index inside dropdown.js: ',{index});

  // const [highlight, setHighlight] = useState("blue");
  const newFiles = { files }.files; // no longer state

  const filesList = newFiles.map((file) => (
    <li key={file} id={file}>
      {file}
    </li>
  ));

  useEffect(() => {
    document
      .getElementById(newFiles[0])
      .setAttribute("style", "background-color:#175ca1");
    console.log("background-color set");
  }, [input]);

  return (
    <div>
      <div>
        <h4>Input: {input}</h4>
        <h4>Index: {index}</h4>
      </div>
      <ul>{filesList}</ul>
    </div>
  );
};

export default Dropdown;
