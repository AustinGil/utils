/**
 * Download text content with JavaScript
 *
 * @param {string} data The content within the downloaded file
 * @param {string} [filename="download.txt"] Name (with extension) for the downloaded file
 */
function download(data, filename = 'download.txt') {
  if (data == null) return;

  const link = document.createElement('a');
  link.setAttribute(
    'href',
    `data:text/txt;charset=utf-8,${encodeURI(data)}`
  );
  link.setAttribute('download', filename);
  link.click();
}

export default download;
