  // CSS highlight li
  const highlightFile = (file, highlightedFile) => {
    if (highlightedFile === file) {
      return { backgroundColor: "#175ca1" };
    }
  };

  export default highlightFile;