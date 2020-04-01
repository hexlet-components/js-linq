// @ts-check

import Enumerable from './Enumerable';

/**
 * Convert array to enumerable collection
 * @example
 * const cars = [
 *   { brand: 'bmw', model: 'm5', year: 2014 },
 *   { brand: 'kia', model: 'rio', year: 2010 },
 *   { brand: 'kia', model: 'sportage', year: 2012 },
 * ];
 * HexletLinq.from(cars).length; // 3
 */
const from = (collection) => new Enumerable(collection);

export default { from };
