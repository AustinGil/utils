/**
 * @template T
 * @param {Promise<T>} original the original Promise to wrap with the timeout
 * @param {number} ms milliseconds to wait before rejecting due to timeout
 * @param {string} [error] optional custom timeout message
 * @returns {Promise<T>}
 */
function timeout(original, ms, error = `timed out after ${ms}ms`) {
  return new Promise((resolve, reject) => {
    const timerId = setTimeout(() => reject(new Error(error)), ms);

    original
      .then((resolvedValue) => resolve(resolvedValue))
      .catch((error) => reject(error))
      .finally(() => clearTimeout(timerId));
  });
}

function deferred() {
  let res, rej

  const promise = new Promise((resolve, reject) => {
    res = resolve
    rej = reject
  })

  promise.resolve = res
  promise.reject = rej

  return promise
}

class LazyPromise extends Promise {
  /** @param {ConstructorParameters<PromiseConstructor>[0]} executor */
  constructor(executor) {
    super(() => {});
    if (typeof executor !== 'function') {
      throw new TypeError(`LazyPromise executor is not a function`);
    }
    this._executor = executor;
  }
  then() {
    this.promise = this.promise || new Promise(this._executor);
    return this.promise.then.apply(this.promise, arguments);
  }
}

function abortableAsync({signal}) {
	if (signal.aborted) {
		return Promise.reject(new DOMException('Aborted', 'AbortError'));
	}

	return new Promise((resolve, reject) => {
		console.log('Promise Started');

		// Something fake async
		const timeout = window.setTimeout(resolve, 2500, 'Promise Resolved')

		// Listen for abort event on signal
		signal.addEventListener('abort', () => {
			window.clearTimeout(timeout);
			reject(new DOMException('Aborted', 'AbortError'));
		});
	});
}

/**
 * @template T
 * @param {Promise<T>} p
 * @returns {Promise<[Error, undefined] | [undefined, T]>}
 */
function inlinePromise(p) {
	return p.then(r => [undefined, r], e => [e, undefined])
}
