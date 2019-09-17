/** WIP **/
/**
 * A promise based wrapper for XMLHttpRequest
 * @param {string} url
 * @param {object} opts
 */
function xhr(url, opts = {}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    // Alternative:
    // xhr.onreadystatechange = function() {
    //   // Only run if the request is complete
    //   if (xhr.readyState !== 4) return;

    //   if (xhr.status >= 200 && xhr.status < 300) {
    //     res(xhr);
    //     return
    //   }
    //   rej({
    //     status: xhr.status,
    //     statusText: xhr.statusText
    //   });
    // };

    xhr.open(opts.method || "get", url)

    Object.keys(opts.headers || {}).forEach(key => {
      xhr.setRequestHeader(key, opts.headers[key])
    })

    xhr.onload = e => {
      return res(e.target.responseText)
    }

    xhr.onerror = rej

    if (xhr.upload && opts.onProgress) {
      xhr.upload.onprogress = opts.onProgress
    }

    xhr.send(opts.body)
  })
}

module.exports = xhr
