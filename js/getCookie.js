/**
 * Retrieve the value of the cookie for a given name
 * @param {string} name Name of the cookie value you want to receive.
 * @return {string}
 */
function getCookie(name) {
  const cookiesArr = document.cookie.split("; ").map(str => str.split("="))
  const cookiesObj = Object.fromEntries(cookiesArr)
  return cookiesObj[name]
}

export default getCookie
