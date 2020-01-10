const curry = fn => (...args) => fn.bind(null, ...args);

const map = curry((fn, arr) => arr.map(fn));

const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const trace = curry((label, x) => {
  console.log(`== ${ label }:  ${ x }`);
  return x;
});

const tap = curry((fn, x) => {
  fn(x);
  return x;
});
