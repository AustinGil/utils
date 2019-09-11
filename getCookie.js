function getCookie(name) {
  const cookiesArr = document.cookie.split("; ").map(str => str.split("="))
  const cookiesObj = Object.fromEntries(cookiesArr)
  return cookiesObj[name]
}

export default getCookie
