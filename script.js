function parseSrtContent(srtContent) {
  const lines = srtContent.split('\n');
  const subtitleTexts = [];

  for (const line of lines) {
    let trimmedLine = line.trim();

    // Setting breaks of empty lines
    if (trimmedLine === '') {
      trimmedLine = '\n';
    }

    // Skip index lines
    else if (!isNaN(trimmedLine, 10)) {
      // isSubtitleLine = false;
      continue;
    }

    // Skip timestamp lines
    if (
      trimmedLine.match(/^\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}$/)
    ) {
      // isSubtitleLine = false;
      continue;
    }

    subtitleTexts.push(trimmedLine);
  }

  const finalText = subtitleTexts.join('\n');
  return finalText;
}

document
  .getElementById('srtInput')
  .addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (!file) return;

    // Display the filename
    const fileNameElement = document.getElementById('filenameDisplay');
    fileNameElement.textContent = file.name;

    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById('srtDisplay').value = e.target.result;
    };
    reader.readAsText(file, 'UTF-8');
  });

document
  .getElementById('getContentButton')
  .addEventListener('click', function () {
    const srtContent = document.getElementById('srtDisplay').value;
    const subtitleText = parseSrtContent(srtContent);
    document.getElementById('secondBox').value = subtitleText;
  });
