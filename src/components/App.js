import "../assets/css/App.css";
import React, { useState, useEffect } from "react";

import Input from "./input";
import Dropdown from "./dropdown";

const App = () => {
  const [input, setInput] = useState("placeholder input");
  const [index, setIndex] = useState("placeholder index");
  const [files, setFiles] = useState([0, 1, 2]);

  console.log("input state has been updated to : ", { input });

  return (
    <div id="app">
      <Input
        input={input}
        setInput={setInput}
        index={index}
        setIndex={setIndex}
      />
      <Dropdown input={input} files={files} index={index} setIndex={setIndex} />
    </div>
  );
};

export default App;
