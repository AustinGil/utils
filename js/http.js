/**
 * TODO: Add abort feature (https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
 * TODO: Add streams (https://jakearchibald.com/2016/streams-ftw/)
 * TODO: Add Progress (https://danlevy.net/you-may-not-need-axios/)
 */

/**
 * @typedef {Response & {data: any}} HttpResponse
 */

const http = (function create(defaults = {}) {
  /**
   * @param {string} url
   * @param {RequestInit & {
   * baseURL?: string
   * url?: RequestInfo
   * query?: Record<any, any>
   * json?: Record<any, any>
   * data?: Record<any, any>
   * form?: HTMLFormElement
   * modifyRequest?: function
   * ignoreStatus?: boolean
   * modifyResponse?: function
   * }} [config={}]
   * @returns {Promise<HttpResponse>}
   */
  function http(url, config = {}) {
    config = Object.assign({}, defaults, config);
    config.url = url;
    config.method = config.method || 'get';
    config.headers = config.headers || {};
    const { query, json, data, form, body } = config;

    try {
      // Try to use a full URL, use it (fails on partial routes).
      config.url = '' + new URL(url);
    } catch {
      config.url = '' + new URL(config.baseURL + url);
    }

    if (query) {
      config.url += `?${new URLSearchParams(query).toString()}`;
    }

    if (!body && ['post', 'put', 'patch'].includes(config.method.toLowerCase())) {
      if (json) {
        config.headers['content-type'] = 'application/json';
        config.body = JSON.stringify(json);
      } else if (data) {
        config.body = new URLSearchParams(data);
      } else if (form) {
        config.body = new FormData(form);
      }
    }

    config = config.modifyRequest ? config.modifyRequest(config) : config;

    return fetch(config.url, config).then(async (/** @type {HttpResponse} */ response) => {
      const contentType = response.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');

      response.data = isJson ? await response.json() : await response.text();

      const ok = response.ok || config.ignoreStatus;

      response = config.modifyResponse
        ? config.modifyResponse(response)
        : response;

      return ok ? response : Promise.reject(response);
    });
  }

  for (const method of ['get', 'post', 'put', 'patch', 'delete', 'options']) {
    http[method] = (url = '', config) => http(url, { ...config, method });
  }

  http.create = create;

  return http;
})();

module.exports = http;

