import React, { useState, useEffect } from "react";

const Input = ({ input, setInput, setFiles, allFiles, tabComplete }) => {
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

  // toggle showing all files when input is clicked
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

useEffect(() => {
  // tabComplete does not work a second time
  setInput(tabComplete); // 2)
  document.querySelector("#input").value = tabComplete;
}, [tabComplete]);

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
