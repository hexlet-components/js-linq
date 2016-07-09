// @flow

import { beforeEach, describe, it } from 'mocha';
import assert from 'assert';

import HexletLinq from '../src/index';

describe('HexletLinq', () => {
  let coll;
  let cars;

  beforeEach(() => {
    cars = [
      { brand: 'bmw', model: 'm5', year: 2014 },
      { brand: 'bmw', model: 'm4', year: 2013 },
      { brand: 'kia', model: 'sorento', year: 2014 },
      { brand: 'kia', model: 'rio', year: 2010 },
      { brand: 'kia', model: 'sportage', year: 2012 },
    ];
    coll = HexletLinq.from(cars);
  });

  it('should be immutable', () => {
    coll.orderBy(car => car.year, 'asc').toArray();
    const result = coll.where(car => car.brand === 'kia')
      .where(car => car.year > 2011);

    assert.deepEqual(result.toArray(), [cars[2], cars[4]]);
  });

  it('should be immutable 2', () => {
    const result = coll
      .where(car => car.brand === 'kia')
      .where(car => car.year > 2011);

    const result2 = coll
      .orderBy(car => car.year, 'asc')
      .where(car => car.model === 'sorento');
    assert.equal(result2.length, 1);
    assert.equal(result2.length, 1);

    assert.equal(result.length, 2);
    assert.deepEqual(result.toArray(), [cars[2], cars[4]]);
    assert.deepEqual(result.toArray(), [cars[2], cars[4]]);
  });

  it('#where', () => {
    const result = coll
      .where(car => car.brand === 'kia')
      .where(car => car.year > 2011);

    assert.equal(result.length, 2);
    assert.deepEqual(result.toArray(), [cars[2], cars[4]]);
  });

  it('#select', () => {
    const result = coll.where(car => car.brand === 'bmw').select(car => car.model);

    assert.equal(result.length, 2);
    assert.deepEqual(result.toArray(), ['m5', 'm4']);
  });

  it('#orderBy', () => {
    const result = coll.orderBy(car => car.year)
      .where(car => car.brand === 'kia')
      .select(car => car.model);

    assert.equal(result.length, 3);
    assert.deepEqual(result.toArray(), ['rio', 'sportage', 'sorento']);

    const result2 = coll.orderBy(car => car.year, 'desc')
      .where(car => car.brand === 'kia')
      .select(car => car.model);

    assert.equal(result2.length, 3);
    assert.deepEqual(result2.toArray(), ['sorento', 'sportage', 'rio']);
  });
});
