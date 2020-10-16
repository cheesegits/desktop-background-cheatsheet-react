import "../../assets/css/app.css";
import React, { useState, useEffect } from "react";
import { ipcRenderer } from "electron";

import Input from "../input/input";
import Dropdown from "../dropdown/dropdown";

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
    const { key } = event;

    // setHighlightedFile via arrows
    const arrowHighlight = (key) => {
      if (highlightedFile === files[0] && key === "ArrowUp") {
        setHighlightedFile(files[files.length - 1]);
      } else if (
        highlightedFile === files[files.length - 1] &&
        key === "ArrowDown"
      ) {
        setHighlightedFile(files[0]);
      } else {
        for (let i = 0; i < files.length; i++) {
          if (files[i] === highlightedFile && key === "ArrowUp") {
            setHighlightedFile(files[i - 1]);
          } else if (files[i] === highlightedFile && key === "ArrowDown") {
            setHighlightedFile(files[i + 1]);
          }
        }
      }
    };

    // handles non-input keystrokes
    switch (key) {
      case "ArrowUp":
        arrowHighlight(key);
        break;
      case "ArrowDown":
        arrowHighlight(key);
        break;
      case "Tab":
        setInput(highlightedFile);
        break;
      case "Enter":
        setBackgroundImage(highlightedFile);
        break;
      default:
        break;
    }
  };

  // filter files based on input value
  const filterMatchingFiles = (allFiles, input) => {
    const filteredFiles = allFiles.filter((file) => {
      return file.toLowerCase().match(input.toLowerCase()); // ".j" includes "-j" result, but "-j" does not include ".j" results 
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
  
  // highlight files[0] whenever files change
  useEffect(() => {
    setHighlightedFile(files[0]);
  }, [files]);

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
        setHighlightedFile={setHighlightedFile}
      ></Input>
      <Dropdown
        files={files}
        input={input}
        setBackgroundImage={setBackgroundImage}
        highlightedFile={highlightedFile}
        setHighlightedFile={setHighlightedFile}
      />
    </div>
  );
};

export default App;
