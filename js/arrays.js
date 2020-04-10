// returns true if the provided predicate function returns true for all elements in a collection
const all = (arr, fn = Boolean) => arr.every(fn);

// removes falsy values from an array.
const filterFalsy = arr => arr.filter(Boolean);

// returns every element that exists in any of the two arrays once.
const union = (a, b) => Array.from(new Set([...a, ...b]));

// returns the difference between two arrays.
const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};

// TODO
const intersect = () => {}

// true if all the elements in values are included in arr
const includesAll = (arr, values) => values.every(v => arr.includes(v));

// This snippet returns all unique values of an array.
const uniqueElements = arr => [...new Set(arr)];

// TODO
const subtract = () => {}
