function randomFrom(from = 0, to = 100) {
  if (Array.isArray(from) || typeof from === "string") {
    const index = randomFrom(0, from.length - 1)
    return from[index]
  }
  return Math.floor(Math.random() * (to - from + 1) + from)
}

export default randomFrom
