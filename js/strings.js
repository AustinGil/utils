function camelCase(str) {
    return str.replace(/(_)([A-Za-z0-9])/g, (...parts) => parts[2].toUpperCase())
}
