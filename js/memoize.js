const memoizeUtil = func => {
  const cache = {};
  return (input) => {
    return cache[input] || (cache[input] = func(input));
  };
};
