console.log("input.js loaded");

import React, { useState, useEffect } from "react";

const Input = ({ input, setInput, setFiles, allFiles }) => {
  console.log("Input rendered");
  const [placeholder, setPlaceholder] = useState("Click to show all files");

  // updates state of input with keystroke
  const updateInput = (event) => {
    setInput(event.target.value);
  };

  // toggle placeholder text
  const togglePlaceholder = () => {
    if (placeholder === "Click to show all files") {
      setPlaceholder("Click to hide files");
    } else if (placeholder === "Click to hide files") {
      setPlaceholder("Click to show all files");
    }
  };

  // toggle showing all files when input is clicked, but does nothing input has text
  const toggleAllFiles = () => {
    if (placeholder === "Click to show all files") {
      setFiles(allFiles);
    } else if (placeholder === "Click to hide files") {
      setFiles([]);
    }
  };

  // only when input is empty
  const onClick = () => {
    if (input === "") {
      toggleAllFiles();
      togglePlaceholder();
    }
  };

  // resets state of input and files
  useEffect(() => {
    // 1)
    if (input === "") {
      setPlaceholder("Click to show all files");
    }
  }, [input]);

  return (
    <div>
      <input
        id="input"
        onChange={updateInput}
        onClick={onClick}
        placeholder={placeholder}
      ></input>
    </div>
  );
};

export default Input;
