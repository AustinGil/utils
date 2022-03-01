const cache = new Map();
async function swr(key, refresh, staleAfter = 5000) {
  let data = cache.get(key) || {ts: 0, val: null, promise: null}
  cache.set(key, data);
  // Item is stale, start refreshing in the background
  if (!data.promise && Date.now() - data.ts > staleAfter) {
    data.promise = refresh()
      .then((val) => { data.ts = Date.now(); data.val = val; })
      .catch((e) => console.error(e))
      .finally(() => (data.promise = null));
  }
  // No data yet, wait for the refresh to finish
  if (data.promise && !data.ts) await data.promise;
  return data.val;
}
