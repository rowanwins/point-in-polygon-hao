import test from 'ava'

import inside from '../src/index'

// Inspiration drawn from TurfJS issue
// https://github.com/Turfjs/turf/issues/1597

const polygon = [[[-115.1752628, 36.0873974], [-115.1752969, 36.0873974], [-115.1752969, 36.0874526], [-115.1752628, 36.0874526], [-115.1752628, 36.0873974]]]

test('is on edge poly', t => {
    t.is(inside([-115.1752799, 36.0874526], polygon), 0)
});

test('is on other edge poly', t => {
    t.is(inside([-115.1752799, 36.0873974], polygon), 0)
});

const shiftedPoly = [[[-115.1752628, 36.0873974], [-115.1752969, 36.0873974], [-115.1752969, 36.0874528], [-115.1752628, 36.0874528], [-115.1752628, 36.0873974]]]

test('is on edge slightly tweaked poly', t => {
    t.is(inside([-115.1752799, 36.0874528], shiftedPoly), 0)
});

test('is on other edge slightly tweaked poly', t => {
    t.is(inside([-115.1752799, 36.0873974], shiftedPoly), 0)
});
