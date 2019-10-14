### js-linq

[![Code Climate](https://codeclimate.com/github/hexlet-components/js-linq/badges/gpa.svg)](https://codeclimate.com/github/hexlet-components/js-linq)
[![Build Status](https://travis-ci.org/hexlet-components/js-linq.svg?branch=master)](https://travis-ci.org/hexlet-components/js-linq)


```javascript
cars = [
  { brand: 'bmw', model: 'm5', year: 2014 },
  { brand: 'bmw', model: 'm4', year: 2013 },
  { brand: 'kia', model: 'sorento', year: 2014 },
  { brand: 'kia', model: 'rio', year: 2010 },
  { brand: 'kia', model: 'sportage', year: 2012 },
];
coll = HexletLinq.from(cars);

const result = coll.orderBy(car => car.year, 'desc')
  .where(car => car.brand === 'kia')
  .select(car => car.model);
```
