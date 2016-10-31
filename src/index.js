// @flow

import Enumerable from './Enumerable';

/**
 * Convert array to enumerable collection
 */
const from = (collection: [any]) => new Enumerable(collection);

export default { from };
