// @flow

import Enumerable from './src/Enumerable';

export default {
  from: (collection: [any]) => new Enumerable(collection),
};
