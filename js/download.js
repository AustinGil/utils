/**
 * Download text content with JavaScript
 *
 * @param {string} data The content within the downloaded file
 * @param {string} [filename="download.txt"] Name (with extension) for the downloaded file
 */
function download(data, filename = 'download.txt') {
  if (data == null) return;

  let type = 'txt';
  const index = filename.lastIndexOf('.');
  if (index > -1) {
    type = filename.slice(index + 1);
  }

  const link = document.createElement('a');
  link.setAttribute(
    'href',
    `data:text/${type};charset=utf-8,${encodeURI(data)}`
  );
  link.setAttribute('download', filename);
  link.click();
}

export default download;
