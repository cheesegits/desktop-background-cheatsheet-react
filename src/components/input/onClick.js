// toggle placeholder text
   const togglePlaceholder = (placeholder, setPlaceholder) => {
    if (placeholder === "Click to show all files") {
      setPlaceholder("Click to hide files");
    } else if (placeholder === "Click to hide files") {
      setPlaceholder("Click to show all files");
    }
  };

  // toggle showing all files when input is clicked
  const toggleAllFiles = (placeholder, setFiles, allFiles, setHighlightedFile) => {
    if (placeholder === "Click to show all files") {
      setFiles(allFiles);
      setHighlightedFile(allFiles[0]);
    } else if (placeholder === "Click to hide files") {
      setFiles([]);
      setHighlightedFile("");
    }
  };
 
export {togglePlaceholder, toggleAllFiles}