import React from "react";

const Input = ({
  input,
  setInput,
  placeholder,
  setPlaceholder,
  setFiles,
  allFiles,
  handleKeyUp,
  setHighlightedFile,
}) => {
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
      setHighlightedFile(allFiles[0]);
    } else if (placeholder === "Click to hide files") {
      setFiles([]);
      setHighlightedFile("");
    }
  };

  // only when input is empty
  const onClick = () => {
    if (!input) {
      toggleAllFiles();
      togglePlaceholder();
    }
  };

  return (
    <div>
      <input
        id="input"
        onChange={updateInput}
        onClick={onClick}
        onKeyUp={handleKeyUp}
        placeholder={placeholder}
        value={input}
        autoFocus={true}
      ></input>
    </div>
  );
};

export default Input;
