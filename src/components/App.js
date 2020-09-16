/** ISSUES & BUGS
 *
 * 1) App component renders twice in order for directoryFiles to be received
 * 2) state at these lines are 1 setState behind
 */

console.log("App.js loaded");

import "../assets/css/App.css";
import React, { useState, useEffect } from "react";
import { ipcRenderer } from "electron";

import Input from "./input";
import Dropdown from "./dropdown";

// sends request to main.js one time for directoryFiles
ipcRenderer.send("App-onMount");
console.log("request for directoryFiles sent");

const App = () => {
  console.log("App rendered");
  const [allFiles, setAllFiles] = useState([]);
  const [files, setFiles] = useState([]);
  const [input, setInput] = useState("");
  const [tabComplete, setTabComplete] = useState(""); // 2)
  const [highlightedFile, setHighlightedFile] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");

  // fringe case keystrokes only - input.js updates input with onChange value
  const handleKeyUp = (event) => {
    const { key, keyCode } = event;

    switch (key) {
      case "ArrowUp":
        console.log("Arrow Up!");
        break;
      case "ArrowDown":
        console.log("Arrow Down!");
        break;
      case "Tab":
        console.log("-Tab- input: ", input);
        console.log(
          "-Tab- autocomplete (files[0]) is behind by 1 update: ",
          files
        ); // 2)
        setTabComplete(files[0]);
        break;
      case "Enter":
        console.log("files[0]: ", files[0]);
        setBackgroundImage(files[0]);
        break;
      default:
        console.log("Keystroke: ", key);
    }

    //   const newLetter = (keyCode) => {
    //     // lower and uppercase letters use same keyCode?
    //     if (
    //       (keyCode > 64 && keyCode < 91) ||
    //       (keyCode > 96 && keyCode < 123) ||
    //       keyCode == 8
    //     ) {
    //       console.log("keyCode of text character: ", keyCode);
    //     }
    //   };
    //   newLetter(keyCode);
  };

  // listener for keystrokes
  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [input]);

  // sets desktop background when backgroundImage updated
  useEffect(() => {
    console.log("setting-background with: ", backgroundImage);
    ipcRenderer.send("set-background", backgroundImage);
  }, [backgroundImage]);

  // setting allFiles = directoryFiles
  ipcRenderer.on("all-files", (_, directoryFiles) => {
    setAllFiles(directoryFiles);
    console.log("directoryFiles received, allFiles set to: ", directoryFiles); // 1)
  });

  return (
    <div id="app">
      <div>
        <h4>Input: {input}</h4>
      </div>
      <Input
        input={input}
        setInput={setInput}
        setFiles={setFiles}
        allFiles={allFiles}
        tabComplete={tabComplete}
      ></Input>
      <Dropdown
        allFiles={allFiles}
        files={files}
        setFiles={setFiles}
        input={input}
        setBackgroundImage={setBackgroundImage}
        highlightedFile={highlightedFile}
        setHighlightedFile={setHighlightedFile}
        setTabComplete={tabComplete}
      />
    </div>
  );
};

export default App;
