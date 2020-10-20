  // highlight matching search text in li
  const highlightSubstrings = (file, input) => {
    const fileLowerCase = file.toLowerCase(file);
    const index = fileLowerCase.indexOf(input);
    return `${file.substring(0, index)}<span class="substring">${file.substring(index, index + input.length)}</span>${file.substring(index+input.length, file.length)}`
  }

  export default highlightSubstrings;