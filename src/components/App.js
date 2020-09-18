import "../assets/css/App.css";
import React, { useState, useEffect } from "react";
import { ipcRenderer } from "electron";

import Input from "./input";
import Dropdown from "./dropdown";

const App = () => {
  console.log("App rendered");
  const [allFiles, setAllFiles] = useState([]);
  const [files, setFiles] = useState([]);
  const [input, setInput] = useState("");
  const [tabComplete, setTabComplete] = useState(""); // 2)
  const [highlightedFile, setHighlightedFile] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [placeHolder, setPlaceholder] = useState("Click to show all files");
  
  useEffect(() => {
    ipcRenderer.send("App-onMount");
  }, []);

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
  };

  const filterMatchingFiles = (allFiles, input) => {
    const filteredFiles = allFiles.filter((file) => {
      return file.toLowerCase().match(input.toLowerCase());
    });
    return filteredFiles;
  };

  // listener for keystrokes
  useEffect(() => {
    if (!input) {
      setFiles([]);
      setHighlightedFile("");
      setBackgroundImage("");
      setPlaceholder("Click to show all files");
    } else {
      setFiles(filterMatchingFiles(allFiles, input));
    }
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
