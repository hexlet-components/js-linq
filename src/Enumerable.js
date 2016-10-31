// @flow

/**
 * Enumerable
 */
class Enumerable {
  collection: [any];
  operations: [any];
  memo: ?[any];

  /**
   * Constructor
   */
  constructor(collection: [any], operations: ?[any]) {
    this.collection = collection;
    this.operations = operations || [];
  }

  /**
   * Where
   */
  where(fn: (value: any, index: number) => boolean) {
    return this.build(coll => coll.filter(fn));
  }

  /**
   * Select
   */
  select(fn: (value: any, index: number) => any) {
    return this.build(coll => coll.map(fn));
  }

  /**
   * OrderBy
   */
  orderBy(fn: (value: any) => any, direction: 'asc' | 'desc' = 'asc') {
    const comparator = (a, b) => {
      const a1 = fn(a);
      const b1 = fn(b);

      const compareResult = direction === 'asc' ? 1 : -1;

      if (a1 > b1) {
        return compareResult;
      } else if (a1 < b1) {
        return -compareResult;
      }

      return 0;
    };
    return this.build(coll => coll.sort(comparator));
  }

  /**
   * Length
   */
  get length(): number {
    return this.toArray().length;
  }

  /**
   * Build
   */
  build(fn: (coll: [any]) => any) {
    const newOperations = this.operations.slice();
    newOperations.push(fn);
    return new Enumerable(this.collection.slice(), newOperations);
  }

  /**
   * To Array
   */
  toArray() {
    if (!this.memo) {
      this.memo = this.operations.reduce((acc, func) => func(acc), this.collection);
    }

    return this.memo;
  }
}

export default Enumerable;
