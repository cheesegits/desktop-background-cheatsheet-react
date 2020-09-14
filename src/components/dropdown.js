console.log("dropdown.js loaded");

import React, { useEffect } from "react";

const Dropdown = ({ allFiles, files, setFiles, input }) => {
  console.log("Dropdown rendered");
  // console.log('files inside Dropdown', files);

  const filterMatchingFiles = (allFiles, input) => {
    const filteredFiles = allFiles.filter((file) => {
      return file.toLowerCase().match(input.toLowerCase());
    });
    return filteredFiles;
  };

  // renders all files or matching files
  useEffect(() => {
    if (input === "") {
      setFiles([]);
    } else {
      setFiles(filterMatchingFiles(allFiles, input));
    }
  }, [input]);

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

// // highlights first file when input is changed
// useEffect(() => { // triggered on load of app
//   document
//     .getElementById(newFiles[0])
//     .setAttribute("style", "background-color:#175ca1");
//   console.log("background-color of newFiles[0] set");
// }, [input]);
