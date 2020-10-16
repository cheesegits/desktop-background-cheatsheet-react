import React from "react";

import "./input.css"

import {togglePlaceholder} from "./onClick"
import {toggleAllFiles} from "./onClick"

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
const onChange = (event) => {
  setInput(event.target.value);
};

 // toggles list of files only when input is empty
 const onClick = (_) => {
  if (!input) {
    toggleAllFiles(placeholder, setFiles, allFiles, setHighlightedFile);
    togglePlaceholder(placeholder, setPlaceholder);
  }
};

  return (
    <div>
      <input
        id={input}
        onChange={onChange}
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
