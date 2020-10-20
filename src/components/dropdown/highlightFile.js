  // CSS highlight li
  const highlightFile = (file, highlightedFile) => {
    if (highlightedFile === file) {
      return { backgroundColor: "#00618a" };
    }
  };

  export default highlightFile;