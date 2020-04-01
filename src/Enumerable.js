// @ts-check

/**
 * Enumerable
 * @example
 * const cars = [
 *   { brand: 'bmw', model: 'm5', year: 2014 },
 *   { brand: 'bmw', model: 'm4', year: 2013 },
 *   { brand: 'kia', model: 'sorento', year: 2014 },
 *   { brand: 'kia', model: 'rio', year: 2010 },
 *   { brand: 'kia', model: 'sportage', year: 2012 },
 * ];
 * const coll = new Enumerable(cars);
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
   * @example
   * coll
   *   .where((car) => car.brand === 'kia')
   *   .where((car) => car.year > 2011)
   *   .toArray();
   *
   * // [
   * //   { brand: 'kia', model: 'sorento', year: 2014 },
   * //   { brand: 'kia', model: 'sportage', year: 2012 },
   * // ]
   */
  where(fn) {
    return this.build((coll) => coll.filter(fn));
  }

  /**
   * Select
   * @example
   * coll
   *   .select((car) => car.model)
   *   .toArray();
   *
   * // ['m5', 'm4', 'sorento', 'rio', 'sportage']
   */
  select(fn) {
    return this.build((coll) => coll.map(fn));
  }

  /**
   * OrderBy
   * @example
   * coll
   *   .orderBy((car) => car.year)
   *   .select((car) => car.model)
   *   .toArray();
   *
   * // ['rio', 'sportage', 'm4', 'm5', 'sorento']
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
   * @example
   * coll.length; // 5
   */
  get length() {
    return this.toArray().length;
  }

  /**
   * Build
   * @example
   * const fn = (coll) => coll.map(item => item.brand);
   * coll
   *   .build(fn)
   *   .toArray();
   *
   * // ['bmw', 'bmw', 'kia', 'kia', 'kia']
   */
  build(fn) {
    const newOperations = this.operations.slice();
    newOperations.push(fn);
    return new Enumerable(this.collection.slice(), newOperations);
  }

  /**
   * To Array
   * @example
   * coll.toArray();
   *
   * // [
   * //   { brand: 'bmw', model: 'm5', year: 2014 },
   * //   { brand: 'bmw', model: 'm4', year: 2013 },
   * //   { brand: 'kia', model: 'sorento', year: 2014 },
   * //   { brand: 'kia', model: 'rio', year: 2010 },
   * //   { brand: 'kia', model: 'sportage', year: 2012 },
   * // ]
   */
  toArray() {
    if (!this.memo) {
      this.memo = this.operations.reduce((acc, func) => func(acc), this.collection);
    }

    return this.memo;
  }
}

export default Enumerable;
