/**
 * Returns an HTTP method wrapper
 * TODO: Add abort feature (https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
 * TODO: Add streams (https://jakearchibald.com/2016/streams-ftw/)
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
    options.headers = options.headers || {}
    const { query, json, data, body } = options

    if (query) {
      url += "?" + new URLSearchParams(query).toString()
    }

    if (!body) {
      if (json) {
        options.headers["content-type"] = "application/json"
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

    return fetch(url, options).then(async res => {
      const contentType = res.headers.get("content-type")
      const isJson = contentType && contentType.includes("application/json")

      const final = {
        timeout: res.timeout,
        url: res.url,
        status: res.status,
        statusText: res.statusText,
        ok: res.ok,
        // redirected false
        headers: res.headers,
        // text [Function: text]
        // json [Function: json]
        // blob [Function: blob]
        // buffer [Function: buffer]
        data: isJson ? await res.json() : await res.text(),
      }

      return final.ok ? final.data : Promise.reject(final)
    })
  }
}

exports.get = http("GET")
exports.post = http("POST")
exports.put = http("PUT")
exports.delete = http("DELETE")
