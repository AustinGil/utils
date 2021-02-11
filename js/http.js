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
    Object.assign(config, defaults);
    config.url = url;
    config.method = config.method.toUpperCase() || 'GET';
    config.headers = config.headers || {};
    const { query, json, data, form, body } = config;

    if (config.baseURL) {
      config.url = '' + new URL(url, config.baseURL);
    }

    if (query) {
      config.url += `?${new URLSearchParams(query).toString()}`;
    }

    if (!body && ['POST', 'PUT', 'PATCH'].includes(config.method)) {
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

    return fetch(config.url, config).then(async (
      /** @type {HttpResponse} */ response
    ) => {
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

  http.get = (url = '', config) => http(url, { ...config, method: 'GET' });
  http.post = (url = '', config) => http(url, { ...config, method: 'POST' });
  http.put = (url = '', config) => http(url, { ...config, method: 'PUT' });
  http.patch = (url = '', config) => http(url, { ...config, method: 'PATCH' });
  http.delete = (url = '', config) =>
    http(url, { ...config, method: 'DELETE' });

  http.create = create;

  return http;
})();

export default http;
