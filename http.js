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
