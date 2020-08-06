/**
 * TODO: Add abort feature (https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
 * TODO: Add streams (https://jakearchibald.com/2016/streams-ftw/)
 * TODO: Add Progress (https://danlevy.net/you-may-not-need-axios/)
 */
const http = (function create(defaults = {}) {
  function http(url, config = {}) {
  	Object.assign(config, defaults)
    config.method = config.method
    config.headers = config.headers || {}
    const { query, json, data, form, body } = config

    if (config.baseURL) {
    	url = '' + new URL(url, config.baseURL);
    }

    if (query) {
      url += `?${new URLSearchParams(query).toString()}`
    }

    if (["post", "put", "patch"].includes(config.method.toLowerCase()) && !body) {
      if (json) {
        config.headers["content-type"] = "application/json"
        config.body = JSON.stringify(json)
      } else if (data) {
        config.body = new URLSearchParams(data)
      } else if (form) {
        config.body = new FormData(form)
      }
    }
    
    /* (options.transformRequest || []).map((f) => {
      data = f(data, options.headers) || data;
    }); */

    /* return fetch(url, config).then(async (res) => {
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
    }) */

    const response = {};

    return fetch(url, config).then((res) => {
      for (const i in res) {
        if (typeof res[i] != 'function') response[i] = res[i];
      }

      const ok = config.validateStatus ? config.validateStatus(res.status) : res.ok;
      if (!ok) return Promise.reject(res);

      /* if (options.responseType == 'stream') {
        response.data = res.body;
        return response;
      } */

    	return res[config.responseType || 'text']()
    		.then((data) => {
    			response.data = data;
    			// its okay if this fails: response.data will be the unparsed value:
    			response.data = JSON.parse(data);
    		})
    		.catch(Object)
    		.then(() => response.data);
    	});
  }

  http.CancelToken = (typeof AbortController == 'function' ? AbortController : Object);

  http.get = (url = '', config) => http(url, { ...config, method: 'GET' });
  http.post = (url = '', config) => http(url, { ...config, method: 'POST' });
  http.put = (url = '', config) => http(url, { ...config, method: 'PUT' });
  http.patch = (url = '', config) => http(url, { ...config, method: 'PATCH' });
  http.delete = (url = '', config) => http(url, { ...config, method: 'DELETE' });
  http.options = (url = '', config) => http(url, { ...config, method: 'OPTIONS' });
  
  http.create = create

  return http;
})();

module.exports = http


// More inspo: https://github.com/developit/redaxios/blob/982fd7fe30189e662cda5b72f9b37c8f1babc038/src/index.js

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
