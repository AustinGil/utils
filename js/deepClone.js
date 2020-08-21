function deepClone (...sources) {
  const result = {}
  for (const source of sources) {
    merge(result, source)
  }
  return result
}

function merge (output, input) {
  const props = Object.keys(input)

  for (const prop of props) {
    // Prevents Prototype Pollution
    if (prop === '__proto__') continue

    const descriptor = Object.getOwnPropertyDescriptor(input, prop)
    const value = descriptor.value
    if (value) descriptor.value = cloneDescriptorValue(value)
    Object.defineProperty(output, prop, descriptor)
  }

  return output
}

// Creates a deep clone for each value
function cloneDescriptorValue (value) {
  // Arrays
  if (objectType(value) === '[object Array]') {
    const array = []
    for (let v of value) {
      v = cloneDescriptorValue(v)
      array.push(v)
    }
    return array
  }

  // Objects
  if (objectType(value) === '[object Object]') {
    const obj = {}
    const props = Object.keys(value)
    for (const prop of props) {
      const descriptor = Object.getOwnPropertyDescriptor(value, prop)
      if (descriptor.value) descriptor.value = cloneDescriptorValue(descriptor.value)
      Object.defineProperty(obj, prop, descriptor)
    }
    return obj
  }

  // Other Types of Objects
  if (objectType(value) === '[object Date]') {
    return new Date(value.getTime())
  }

  if (objectType(value) === '[object Map]') {
    const map = new Map()
    for (const entry of value) {
      map.set(entry[0], cloneDescriptorValue(entry[1]))
    }
    return map
  }

  if (objectType(value) === '[object Set]') {
    const set = new Set()
    for (const entry of value.entries()) {
      set.add(cloneDescriptorValue(entry[0]))
    }
    return set
  }

  // Types we don't need to clone or cannot clone.
  // Examples:
  // - Primitives don't need to clone
  // - Functions cannot clone
  return value
}

function objectType (value) {
  return Object.prototype.toString.call(value)
}

export default deepClone
