  // highlight matching search text in li
  const highlightSubstrings = (file, substring) => {
    const fileLowerCase = file.toLowerCase(file);
    const index = fileLowerCase.indexOf(substring);
    return `${file.substring(0, index)}<span class="substring">${file.substring(index, index + substring.length)}</span>${file.substring(index+substring.length, file.length)}`
  }

  export default highlightSubstrings;