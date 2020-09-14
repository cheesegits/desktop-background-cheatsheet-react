/** ISSUES & BUGS
 *
 * 1) App component renders twice in order for directoryFiles to be received
 */

console.log("App.js loaded");

import "../assets/css/App.css";
import React, { useState, useEffect } from "react";

import Input from "./input";
import Dropdown from "./dropdown";
import { ipcRenderer } from "electron";

// sends request to main.js one time for directoryFiles
ipcRenderer.send("App-onMount");
console.log("request for directoryFiles sent");

const App = () => {
  console.log("App rendered");
  const [input, setInput] = useState("");
  const [allFiles, setAllFiles] = useState([]);
  const [files, setFiles] = useState([]);
  const [index, setIndex] = useState("placeholder index");

  // setting allFiles = directoryFiles
  ipcRenderer.on("all-files", (_, directoryFiles) => {
    setAllFiles(directoryFiles);
    console.log("directoryFiles received, allFiles set to: ", directoryFiles); // 1)
  });

  return (
    <div id="app">
      <div>
        <h4>Input: {input}</h4>
        <h4>Index: {index}</h4>
      </div>
      <Input
        input={input}
        setInput={setInput}
        setFiles={setFiles}
        allFiles={allFiles}
      ></Input>
      <Dropdown
        allFiles={allFiles}
        files={files}
        setFiles={setFiles}
        input={input}
      />
    </div>
  );
};

export default App;
