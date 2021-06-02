import test from 'ava'
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


test('error is thrown when not the same first and last coords', t => {
    const poly = [[[0, 0], [1, 0], [1, 1]]]

    const fn = () => {
        inside([1, 1], poly)
    };

    const error = t.throws(() => {
        fn()
    }, {instanceOf: Error})
    t.is(error.message, 'First and last coordinates in a ring must be the same');
});
