
/** @typedef {HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement} HTMLFormControl */

const FORM_CONTROLS = ['input','select','textarea'];

/** @param {HTMLFormControl} input */
function validateInput(input) {
  const inputId = input.id || Math.random().toString(36).slice(2);
  input.id = inputId;
  const errorsId = `${inputId}-input-errors`;
  let descriptors = input.getAttribute('aria-describedby');
  descriptors = descriptors ? descriptors.split(' ') : [];
  descriptors = descriptors.filter((s) => s !== errorsId);

  const { validity } = input;
  input.setAttribute('aria-invalid', 'false');
  document.getElementById(errorsId)?.remove();

  if (!validity.valid) {
    input.setAttribute('aria-invalid', 'true');
    const errors = [];
    const errorContainer = document.createElement('div');
    errorContainer.id = errorsId;
    errorContainer.classList.add('control__errors');
    if (validity.valueMissing) {
      const error = input.dataset.errorRequired || `Field is required.`
      errors.push(error);
    }
    if (validity.typeMismatch) {
      const error = input.dataset.errorType || `Must be of type ${input.type}.`
      errors.push(error);
    }
    if (validity.rangeUnderflow) {
      const error = input.dataset.errorMin || `Must be greater than ${input.min}.`
      errors.push(error)
    }
    if (validity.rangeOverflow) {
      const error = input.dataset.errorMax || `Must be less than ${input.max}.`
      errors.push(error)
    }
    if (validity.tooShort) {
      const error = input.dataset.errorMinLength || `Must be longer than ${input.minLength}.`
      errors.push(error)
    }
    if (validity.tooLong) {
      const error = input.dataset.errorMaxLength || `Must be shorter than ${input.maxLength}.`
      errors.push(error)
    }
    if (validity.patternMismatch) {
      const error = input.dataset.errorPattern || `Does not match pattern (${input.pattern}).`
      errors.push(error)
    }
    errorContainer.innerText = errors.join(' ');
    descriptors.push(errorsId);
    input.parentElement.before(errorContainer);
  }
  if (descriptors.length > 0) {
    input.setAttribute('aria-describedby', descriptors.join(' '));
  }
}

window.addEventListener('invalid', (event) => {
  /** @type {HTMLFormControl} */
  const control = event.target
  validateInput(control)
  control.form.querySelector(':invalid:not(fieldset)').focus()
  event.preventDefault()
}, { capture: true })

window.addEventListener('blur', (event) => {
  const target = event.target
  if (!FORM_CONTROLS.includes(target.localName)) return
  validateInput(target)
}, { capture: true })
