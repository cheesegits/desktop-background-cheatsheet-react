  // filter files based on input value
  const filterMatchingFiles = (allFiles, input) => {
    const filteredFiles = allFiles.filter((file) => {
      return file.toLowerCase().match(input.toLowerCase()); // ".j" includes "-j" result, but "-j" does not include ".j" results 
    });
    return filteredFiles;
  };

  export default filterMatchingFiles;