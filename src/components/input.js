import React, { useState, useEffect } from "react";

const Input = ({ input, setInput, index, setIndex }) => {
  const updateInput = (event) => {
    setInput(event.target.value);
  };
  const showFiles = () => {
    console.log("working");
  };

  return (
    <div>
      <input
        id="input"
        onChange={updateInput}
        onClick={showFiles}
        placeholder={"Click to show all files"}
      ></input>
    </div>
  );
};

export default Input;
