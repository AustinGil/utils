/**
 * @param {(...args: any[]) => unknown} func
 * @param {number} delay
 * @param {{ leading?: boolean }} [options]
 */
export const debounce = (func, delay, options = {}) => {
  /** @type {ReturnType<typeof setTimeout>} */
  let timerId;

  return (/** @type {Parameters<typeof func>} */ ...args) => {
    if (!timerId && options.leading) {
      func(...args);
    }
    clearTimeout(timerId);

    timerId = setTimeout(() => func(...args), delay);
  };
};
