function pluck(obj, keys) {
  return keys.reduce((next, key) => {
    next[key] = obj[key]
    return next
  }, {})
}

pluck({ a: 'a', b: 'b'}, ['b']) // { b: 'b' }
