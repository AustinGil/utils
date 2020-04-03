const curry = fn => (...args) => fn.bind(null, ...args);

const map = curry((fn, arr) => arr.map(fn));

const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
const asyncCompose = (...fns) => x => fns.reduceRight((y, fn) => y.then(fn), Promise.resolve(x));

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
const asyncPipe = (...fns) => x => fns.reduce((y, fn) => y.then(fn), Promise.resolve(x))


const trace = curry((label, x) => {
  console.log(`== ${ label }:  ${ x }`);
  return x;
});

const tap = curry((fn, x) => {
  fn(x);
  return x;
});

const when = (cond, fn) => args => {
 const shoudRun = cond instanceof Function ? cond(args) : cond;
 return shoudRun ? fn(args) : args
}

const map = fn => initialValue => initialValue.map(fn)

const keys = Object.keys

const sort = (fn, items = []) => items.sort(fn)

const forEach = (fn, items) => items.forEach(fn)

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

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

