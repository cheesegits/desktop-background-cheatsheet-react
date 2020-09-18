import React from "react";

const Input = ({ input, setInput, placeholder, setPlaceholder, setFiles, allFiles, handleKeyUp }) => {

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
    if (!input) {
      toggleAllFiles();
      togglePlaceholder();
    }
  };

  // value, on first render, came back undefined... even though initial state of input is ""
  return (
    <div>
      <input
        id="input"
        onChange={updateInput}
        onClick={onClick}
        onKeyUp={handleKeyUp}
        placeholder={placeholder}
        value={input}
      ></input>
    </div>
  );
};

export default Input;
