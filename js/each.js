/**
 * @param {Array<any> | DynamicObject} v Array or object to iterate over
 * @param {(item: any, index?: number | string) => any} cb Function to call on each iteration
 */
exports.each = (v, cb) => {
  if (Array.isArray(v)) {
    let i = 0;
    while (i < v.length) {
      cb(v[i], i);
      i++;
    }
  } else if (this.getRawType(v) === 'object') {
    const entries = Object.entries(v);
    let i = 0;
    while (i < entries.length) {
      cb(entries[i][1], entries[i][0]);
      i++;
    }
  }
};

/** TESTS
describe('each()', () => {
  const tossIntoTheVoid = jest.fn((x) => {}); // eslint-disable-line no-unused-vars

  beforeEach(tossIntoTheVoid.mockReset);

  it('calls callback on each item in array and their index', () => {
    const items = new Array(3).fill(0).map(random.word); // eslint-disable-line unicorn/no-fn-reference-in-iterator
    utils.each(items, tossIntoTheVoid);

    expect(tossIntoTheVoid).toBeCalledWith(items[0], 0);
    expect(tossIntoTheVoid).toBeCalledWith(items[1], 1);
    expect(tossIntoTheVoid).toBeCalledWith(items[2], 2);
  });

  it('calls callback on each value in object and their key', () => {
    const obj = {
      a: random.word(),
      b: random.word(),
      c: random.word(),
    };
    utils.each(obj, tossIntoTheVoid);

    expect(tossIntoTheVoid).toBeCalledWith(obj.a, 'a');
    expect(tossIntoTheVoid).toBeCalledWith(obj.b, 'b');
    expect(tossIntoTheVoid).toBeCalledWith(obj.c, 'c');
  });
});
*/
