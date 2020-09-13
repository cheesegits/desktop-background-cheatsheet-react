console.log('dropdown.js loaded');

import React, { useState, useEffect } from "react";

const Dropdown = ({ files} ) => {
  console.log("Dropdown rendered");
  
  // renders list of files
  const filesList = files.map((file) => (
    <li key={file} id={file}>
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

// console.log("dropdown input: ", { input });
// console.log("dropdown {files}.files: ", { files }.files);
// console.log("dropdown {files}.files[0]: ", { files }.files[0]);
// console.log("newFiles: ", newFiles[0]);

// // highlights first file when input is changed
// useEffect(() => { // triggered on load of app
//   document
//     .getElementById(newFiles[0])
//     .setAttribute("style", "background-color:#175ca1");
//   console.log("background-color of newFiles[0] set");
// }, [input]);