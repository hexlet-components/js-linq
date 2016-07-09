// @flow

import Enumerable from './Enumerable';

export default {
  from: (collection: [any]) => new Enumerable(collection),
};
