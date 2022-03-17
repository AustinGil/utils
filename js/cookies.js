/**
 * Retrieve the value of the cookie for a given name
 * @param {string} name Name of the cookie value you want to receive.
 * @return {string}
 */
export const getCookie = name => `; ${document.cookie}`.split(`; ${name}=`).pop().split(';').shift();

const clearCookies = () => document.cookie
.split(';')
.forEach((c) =>(document.cookie = c.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`)));

const cookiesAsObject = document.cookie.split(';').map((item) => item.split('=')).reduce((acc, [k, v]) => (acc[k.trim().replace('"', '')] = v) && acc, {});
