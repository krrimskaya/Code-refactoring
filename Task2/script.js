// Function to parse JSON
// Code smell: Too many responsibilities in functions
// The parseAndValidateJSON function was doing too many tasks, including parsing, validation, and error handling.
// Now, these are separated into different functions (parseJSON and validateFiles).
function parseJSON(input) {
  try {
    return JSON.parse(input);
  } catch (error) {
    throw new Error('Invalid JSON format');
  }
}

// Function to validate the parsed JSON
// Code smell: Too many responsibilities in functions
// This validation logic has been moved to a separate function (validateFiles).
// Now, the validation only checks if the parsed data is an array and contains only strings.
function validateFiles(files) {
  if (!Array.isArray(files)) {
    throw new Error('JSON is not an array');
  }

  if (!files.every(file => typeof file === 'string')) {
    throw new Error('Array contains non-string elements');
  }
}

// Function to manipulate the DOM (thumbnails and full-size images)
function updateImagesDOM(files, minis, fullsize) {
  files.forEach(file => {
    const img = document.createElement('img');
    img.src = file.trim();
    img.alt = file;
    img.title = file;

    img.addEventListener('click', () => {
      fullsize.innerHTML = `<img src="${file.trim()}" alt="${file}">`;
    });

    minis.appendChild(img);
  });
}

// Function to display status
function displayStatus(status, message, className) {
  status.textContent = message;
  status.className = className;
}

// Main event handler
// Code smell: Too much logic in event handler
// The event handler was doing too many tasks, such as DOM cleanup, parsing, validation, and displaying images.
// Now, those tasks are delegated to smaller functions (parseJSON, validateFiles, updateImagesDOM).
document.getElementById('showImages').addEventListener('click', () => {
  const input = document.getElementById('jsonInput').value;
  const status = document.getElementById('status');
  const minis = document.querySelector('.minis');
  const fullsize = document.querySelector('.fullsize');

  // DOM cleanup
  minis.innerHTML = '';
  fullsize.innerHTML = '';
  status.textContent = '';

  try {
    // Parsing and validating now separated into dedicated functions
    const files = parseJSON(input);
    validateFiles(files);
    displayStatus(status, 'OK', 'success');
    updateImagesDOM(files, minis, fullsize);
  } catch (error) {
    displayStatus(status, error.message, 'error');
  }
});
