import "../assets/css/App.css";
import React, { useState, useEffect } from "react";
import { ipcRenderer } from "electron";

import Input from "./input";
import Dropdown from "./dropdown";

const App = () => {
  const [allFiles, setAllFiles] = useState([]);
  const [files, setFiles] = useState([]);
  const [input, setInput] = useState("");
  const [highlightedFile, setHighlightedFile] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [placeholder, setPlaceholder] = useState("Click to show all files");

  useEffect(() => {
    ipcRenderer.send("App-onMount");
  }, []);

  // fringe case keystrokes only - input.js updates input with onChange value
  const handleKeyUp = (event) => {
    const { key, keyCode } = event;

    switch (key) {
      case "ArrowUp":
        break;
      case "ArrowDown":
        break;
      case "Tab":
        setInput(files[0]);
        break;
      case "Enter":
        setBackgroundImage(files[0]);
        break;
      default:
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
    ipcRenderer.send("set-background", backgroundImage);
    setInput("");
    setPlaceholder("Click to show all files");
    setFiles([]);
  }, [backgroundImage]);

  // setting allFiles = directoryFiles
  ipcRenderer.on("all-files", (_, directoryFiles) => {
    setAllFiles(directoryFiles);
  });

  return (
    <div id="app">
      <Input
        input={input}
        setInput={setInput}
        placeholder={placeholder}
        setPlaceholder={setPlaceholder}
        setFiles={setFiles}
        allFiles={allFiles}
        handleKeyUp={handleKeyUp}
      ></Input>
      <Dropdown
        files={files}
        setBackgroundImage={setBackgroundImage}
        highlightedFile={highlightedFile}
        setHighlightedFile={setHighlightedFile}
      />
    </div>
  );
};

export default App;
