// @ts-check

import Enumerable from './Enumerable';

/**
 * Convert array to enumerable collection
 */
const from = (collection) => new Enumerable(collection);

export default { from };
