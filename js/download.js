/**
 * Download text content with JavaScript
 * @param {String} data The content within the downloaded file
 * @param {Object} [opts={}]
 * @param {String} [opts.type="txt"] The file extension type
 * @param {String} [opts.filename="download"] The downloaded file name
 */
function download(data, opts = {}) {
  if (data == null) return

  const type = opts.type || "txt"
  const filename = opts.filename || `download.${type}`
  const link = document.createElement("a")

  link.setAttribute(
    "href",
    `data:text/${type};charset=utf-8,${encodeURI(data)}`
  )
  link.setAttribute("download", filename)
  link.click()
}

export default download
