# js-linq

[![github action status](https://github.com/hexlet-components/js-linq/workflows/Node%20CI/badge.svg)](https://github.com/hexlet-components/js-linq/actions)
[![Code Climate](https://codeclimate.com/github/hexlet-components/js-linq/badges/gpa.svg)](https://codeclimate.com/github/hexlet-components/js-linq)

## Install

```sh
npm install @hexlet/linq
```

## Usage example

```javascript
import HexletLinq from '@hexlet/linq';

const cars = [
  { brand: 'bmw', model: 'm5', year: 2014 },
  { brand: 'bmw', model: 'm4', year: 2013 },
  { brand: 'kia', model: 'sorento', year: 2014 },
  { brand: 'kia', model: 'rio', year: 2010 },
  { brand: 'kia', model: 'sportage', year: 2012 },
];
const coll = HexletLinq.from(cars);

const result = coll.orderBy(car => car.year, 'desc')
  .where(car => car.brand === 'kia')
  .select(car => car.model);

result.toArray();
// ['sorento', 'sportage', 'rio']
```

For more information, see the [Full Documentation](https://github.com/hexlet-components/js-linq/tree/master/docs)

[![Hexlet Ltd. logo](https://raw.githubusercontent.com/Hexlet/hexletguides.github.io/master/images/hexlet_logo128.png)](https://ru.hexlet.io/pages/about?utm_source=github&utm_medium=link&utm_campaign=js-linq)

This repository is created and maintained by the team and the community of Hexlet, an educational project. [Read more about Hexlet (in Russian)](https://ru.hexlet.io/pages/about?utm_source=github&utm_medium=link&utm_campaign=js-linq).
