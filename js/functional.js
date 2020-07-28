const curry = fn => (...args) => fn.bind(null, ...args);

const map = curry((fn, arr) => arr.map(fn));

const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
const asyncCompose = (...fns) => x => fns.reduceRight((y, fn) => y.then(fn), Promise.resolve(x));

/**
 * @param  {...Function} fns List of functions to pipe in order first to last
 * @returns {Function} Function that passes input through all piped functions
 */
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
/** TEST

describe('pipe()', () => {
  const double = jest.fn((x) => x * 2);
  const orderBurger = utils.pipe(double, double);

  it('returns a function', () => {
    expect(typeof orderBurger).toBe('function');
  });

  it('calls each input function', () => {
    const input = 1;
    orderBurger(input);
    expect(double).toBeCalledWith(input);
    expect(double).toBeCalledWith(2 * input);
  });

  it('returns the accumulation of each input function', () => {
    const patties = orderBurger(1);
    expect(patties).toBe(4);
  });
});
*/

const asyncPipe = (...fns) => x => fns.reduce((y, fn) => y.then(fn), Promise.resolve(x))


const trace = curry((label, x) => {
  console.log(`== ${ label }:  ${ x }`);
  return x;
});

const tap = curry((fn, x) => {
  fn(x);
  return x;
});

/**
 * Calls a function with args only when the predicate is true. Otherwise, returns initial args.
 *
 * @param {boolean | Function} predicate
 * @param {Function} callback
 * @returns {Function}
 */
const when = (predicate, callback) => (args) => {
  const shoudRun = predicate instanceof Function ? predicate(args) : predicate;
  return shoudRun ? callback(args) : args;
};

const map = fn => initialValue => initialValue.map(fn)

const keys = Object.keys

const sort = (fn, items = []) => items.sort(fn)

const forEach = (fn, items) => items.forEach(fn)

const filterNullishEntries = arr => arr.filter(([key, val]) => val != null)

const filterNullishObject = pipe(
  Object.entries,
  filterNullishEntries,
  Object.fromEntries
)

const keepEntriesByKey = keys => arr => {
  return arr.filter(([key, val]) => keys.includes(key))
}

const pluckObjectKeys = keys => {
  return pipe(Object.entries, keepEntriesByKey(keys), Object.fromEntries)
}

