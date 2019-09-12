// Fetch Options signature:
// {
//   method: "GET", // POST, PUT, DELETE, etc.
//   headers: {
//     // the content type header value is usually auto-set
//     // depending on the request body
//     "Content-Type": "text/plain;charset=UTF-8"
//   },
//   body: undefined // string, FormData, Blob, BufferSource, or URLSearchParams
//   referrer: "about:client", // or "" to send no Referer header,
//   // or an url from the current origin
//   referrerPolicy: "no-referrer-when-downgrade", // no-referrer, origin, same-origin...
//   mode: "cors", // same-origin, no-cors
//   credentials: "same-origin", // omit, include
//   cache: "default", // no-store, reload, no-cache, force-cache, or only-if-cached
//   redirect: "follow", // manual, error
//   integrity: "", // a hash, like "sha256-abcdef1234567890"
//   keepalive: false, // true
//   signal: undefined, // AbortController to abort request
//   window: window // null
// }

/**
 * Returns an HTTP method wrapper
 * @param {string} method HTTP method
 * @returns {function}
 */
function http(method = "GET") {
  /**
   * A convenient HTTP method wrapper
   * @param {string} url
   * @param {object} [options={}] see https://javascript.info/fetch-api for full list of options
   * @return {promise} Resulting fetch promise which resolves to the text or json response.
   */
  return (url, options = {}) => {
    options.method = options.method || method
    const { query, json, data, body } = options

    if (query) {
      url += "?" + new URLSearchParams(query).toString()
    }

    if (!body) {
      if (json) {
        options.body = JSON.stringify(json)
      } else if (data) {
        const form = new FormData()
        Object.entries(data).reduce((form, [key, value]) => {
          form.append(key, value)
          return form
        }, form)
        options.body = form
      }
    }

    return fetch(url, options).then(res => {
      if (!res.ok) {
        throw res
      }

      const contentType = res.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        return res.json()
      }
      return res.text()
    })
  }
}

module.exports = {
  get: http("GET"),
  post: http("POST"),
  put: http("PUT"),
  delete: http("DELETE"),
}
