/**
 * TODO: Add abort feature (https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
 * TODO: Add streams (https://jakearchibald.com/2016/streams-ftw/)
 * TODO: Add Progress (https://danlevy.net/you-may-not-need-axios/)
 */
const http = (function create(defaults = {}) {
  function http(url, config = {}) {
    Object.assign(config, defaults)
    config.url = url
    config.method = config.method || 'get'
    config.headers = config.headers || {}
    const { query, json, data, form, body } = config

    if (config.baseURL) {
      config.url = '' + new URL(url, config.baseURL);
    }

    if (query) {
      config.url += `?${new URLSearchParams(query).toString()}`
    }

    if (!body && ["post", "put", "patch"].includes(config.method.toLowerCase())) {
      if (json) {
        config.headers["content-type"] = "application/json"
        config.body = JSON.stringify(json)
      } else if (data) {
        config.body = new URLSearchParams(data)
      } else if (form) {
        config.body = new FormData(form)
      }
    }

    config = config.modifyRequest ? config.modifyRequest(config) : config

    return fetch(config.url, config).then(async (response) => {
      const contentType = response.headers.get("content-type")
      const isJson = contentType && contentType.includes("application/json")

      response.data = isJson ? await response.json() : await response.text()

      const ok = response.ok || config.ignoreStatus;
      
    	response = config.modifyResponse ? config.modifyResponse(response) : response
      
      return ok ? response : Promise.reject(response)
    });
  }
  
  for (const method of ['get', 'post', 'put', 'patch', 'delete', 'options']) {
  	http[method] = (url = '', config) => http(url, { ...config, method });
  }

  http.create = create

  return http;
})();

module.exports = http
