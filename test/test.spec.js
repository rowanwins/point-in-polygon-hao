import test from 'ava';
import inside from '../src/index'

const polygon = [[[1, 1], [1, 2], [2, 2], [2, 1], [1, 1]]];
const orig = JSON.parse(JSON.stringify(polygon))

test('is inside', t => {
    t.true(inside([1.5, 1.5], polygon))
});

test('input is not modified', t => {
    inside([2, 1.5], polygon)
    t.deepEqual(orig, polygon)
});

test('is outside', t => {
    t.false(inside([4.9, 1.2], polygon))
});

test('is on top edge', t => {
    t.is(inside([1.5, 2], polygon), 0)
});

test('is on bottom edge', t => {
    t.is(inside([1.5, 1], polygon), 0)
});

test('is on left edge', t => {
    t.is(inside([1, 1.5], polygon), 0)
});

test('is on right edge', t => {
    t.is(inside([2, 1.5], polygon), 0)
});


const polygonWithHole = [[[1, 1], [1, 2], [2, 2], [2, 1], [1, 1]],
    [[1.5, 1.5], [1.5, 1.7], [1.7, 1.7], [1.7, 1.5], [1.5, 1.5]]];

test('is inside with hole', t => {
    t.true(inside([1.2, 1.2], polygonWithHole))
});

test('is outside with hole', t => {
    t.false(inside([4.9, 1.2], polygonWithHole))
});

test('is in the hole', t => {
    t.false(inside([1.6, 1.6], polygonWithHole))
});

test('is on edge with hole', t => {
    t.is(inside([1.5, 1.5], polygonWithHole), 0)
});

test('is on edge of the outside', t => {
    t.is(inside([1.2, 1], polygonWithHole), 0)
});

// https://github.com/substack/point-in-polygon/issues/2
test('point-in-polygon issues solved', t => {
    const poly = [[[1, 1], [2, 1], [2, 2], [1, 2]]]
    t.is(inside([2, 2], poly), 0)
    t.is(inside([1, 1], poly), 0)
});

// https://github.com/mikolalysenko/robust-point-in-polygon/issues/3
test('robust-point-in-polygon issues solved', t => {
    const poly = [[[0, 0], [1, 0], [1, 1]]]
    t.is(inside([1, 1], poly), 0)
    const anotherPoly = [[[1, 1], [1, 2], [2, 3], [2, 2]]]
    t.is(inside([1, 1], anotherPoly), 0)
    t.is(inside([2, 3], anotherPoly), 0)
});
