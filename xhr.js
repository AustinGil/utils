/** WIP **/
/**
 * A promise based wrapper for XMLHttpRequest
 * @param {string} url
 * @param {object} opts
 */
function xhr(url, opts = {}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.open(opts.method || "get", url)

    Object.keys(opts.headers || {}).forEach(key => {
      xhr.setRequestHeader(key, opts.headers[key])
    })

    if (xhr.upload && opts.onProgress) {
      xhr.upload.onprogress = opts.onProgress
    }

    xhr.onload = e => resolve(e.target.responseText)

    xhr.onerror = reject

    xhr.send(opts.body)
  })
}

module.exports = xhr
