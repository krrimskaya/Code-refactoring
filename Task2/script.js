// Функція для парсингу JSON та валідації
function parseAndValidateJSON(input) {
  try {
    const files = JSON.parse(input);

    if (!Array.isArray(files)) {
      throw new Error('JSON is not an array');
    }

    if (!files.every(file => typeof file === 'string')) {
      throw new Error('Array contains non-string elements');
    }

    return files;
  } catch (error) {
    throw new Error('Невірний формат JSON');
  }
}

// Функція для маніпуляції DOM (мініатюри та повноцінні зображення)
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

// Функція для відображення статусу
function displayStatus(status, message, className) {
  status.textContent = message;
  status.className = className;
}

// Основний обробник події
document.getElementById('showImages').addEventListener('click', () => {
  const input = document.getElementById('jsonInput').value;
  const status = document.getElementById('status');
  const minis = document.querySelector('.minis');
  const fullsize = document.querySelector('.fullsize');

  // Очистка DOM
  minis.innerHTML = '';
  fullsize.innerHTML = '';
  status.textContent = '';

  try {
    const files = parseAndValidateJSON(input);
    displayStatus(status, 'OK', 'success');
    updateImagesDOM(files, minis, fullsize);
  } catch (error) {
    displayStatus(status, error.message, 'error');
  }
});
