// @ts-check

/**
 * Enumerable
 */
class Enumerable {
  /**
   * Constructor
   */
  constructor(collection, operations) {
    this.collection = collection;
    this.operations = operations || [];
  }

  /**
   * Where
   */
  where(fn) {
    return this.build((coll) => coll.filter(fn));
  }

  /**
   * Select
   */
  select(fn) {
    return this.build((coll) => coll.map(fn));
  }

  /**
   * OrderBy
   */
  orderBy(fn, direction = 'asc') {
    const comparator = (a, b) => {
      const a1 = fn(a);
      const b1 = fn(b);

      const compareResult = direction === 'asc' ? 1 : -1;

      if (a1 > b1) {
        return compareResult;
      }
      if (a1 < b1) {
        return -compareResult;
      }

      return 0;
    };
    return this.build((coll) => coll.sort(comparator));
  }

  /**
   * Length
   */
  get length() {
    return this.toArray().length;
  }

  /**
   * Build
   */
  build(fn) {
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
