/**
 * Retrieve the value of the cookie for a given name
 * @param {string} name Name of the cookie value you want to receive.
 * @return {string}
 */
export const getCookie = name => `; ${document.cookie}`.split(`; ${name}=`).pop().split(';').shift();
