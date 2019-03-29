import test from 'ava'

import inside from '../src/index'

const polygon = [[[1.111111111111, 1.111111111111], [1.111111111111, 2.111111111111], [2.111111111111, 2.111111111111], [2.111111111111, 1.111111111111], [1.111111111111, 1.111111111111]]]

test('is on bottom edge poly', t => {
    t.is(inside([1.511111111111, 1.111111111111], polygon), 0)
});

test('is on top edge poly', t => {
    t.is(inside([1.511111111111, 2.111111111111], polygon), 0)
});

test('is on left edge poly', t => {
    t.is(inside([1.111111111111, 1.511111111111], polygon), 0)
});

test('is on right edge poly', t => {
    t.is(inside([2.111111111111, 1.511111111111], polygon), 0)
});


test('is just inside left edge', t => {
    t.is(inside([1.1111111111111, 1.511111111111], polygon), true)
});

test('is just outside left edge', t => {
    t.is(inside([1.111111111110, 1.511111111111], polygon), false)
});
