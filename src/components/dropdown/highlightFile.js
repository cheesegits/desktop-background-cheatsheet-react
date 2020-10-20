  // CSS highlight li
  const highlightFile = (file, highlightedFile) => {
    if (highlightedFile === file) {
      return { backgroundColor: "#00A4EF" };
    }
  };

  export default highlightFile;