/** @param {HTMLFormElement} event */
export function jsFormSubmit(form) {
  const url = new URL(form.action);
  const formData = new FormData(form);
  const searchParameters = new URLSearchParams(formData);

  /** @type {Parameters<fetch>[1]} */
  const fetchOptions = {
    method: form.method,
  };

  if (form.method.toLowerCase() === 'post') {
    fetchOptions.body =
      form.enctype === 'multipart/form-data' ? formData : searchParameters;
  } else {
    url.search = searchParameters;
  }
  
  return fetch(url, fetchOptions);
}
