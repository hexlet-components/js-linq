// @flow

class Enumerable {
  collection: [any];
  operations: [any];
  cache: ?[any];

  constructor(collection: [any], operations: ?[any]) {
    this.collection = collection;
    this.operations = operations || [];
  }

  where(fn: (value: any, index: number) => boolean) {
    return this.build('filter', fn);
  }

  select(fn: (value: any) => any) {
    return this.build('map', fn);
  }

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
    return this.build('sort', comparator);
  }

  get length(): number {
    return this.perform().length;
  }

  build(name: string, ...args: any) {
    const clonedOperations = this.operations.slice();
    clonedOperations.push({ name, args });

    return new Enumerable(this.collection, clonedOperations);
  }

  perform() {
    if (this.cache) {
      return this.cache;
    }
    return this.operations.reduce((acc, { name, args }) =>
      acc[name](...args), this.collection);
  }

  toArray() {
    return this.perform();
  }
}

export default Enumerable;
