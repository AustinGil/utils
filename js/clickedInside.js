/**
 * @param {{ target: HTMLElement }} event
 * @param {string} className
 * @returns {EventTarget | false}
 */
export function clickInsideElement({ target }, className) {
  if (target.classList.contains(className)) {
    return target;
  } else {
    while ((target = target.parentNode)) {
      if (target.classList && target.classList.contains(className)) {
        return target;
      }
    }
  }
  return false;
}
