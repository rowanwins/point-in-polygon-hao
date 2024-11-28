import {expect, test} from 'vitest'
import inside from '../src/index'

const polygon = [[[1, 1], [1, 2], [2, 2], [2, 1], [1, 1]]];
const orig = JSON.parse(JSON.stringify(polygon))

test('is inside', () => {
    expect(inside([1.5, 1.5], polygon)).toBe(true)
});

test('input is not modified', () => {
    inside([2, 1.5], polygon)
    expect(orig).toStrictEqual(polygon)
});

test('is outside', () => {
    expect(inside([4.9, 1.2], polygon)).toBe(false)
});

test('is on top edge', () => {
    expect(inside([1.5, 2], polygon)).toBe(0)
});

test('is on bottom edge', () => {
    expect(inside([1.5, 1], polygon)).toBe(0)
});

test('is on left edge', () => {
    expect(inside([1, 1.5], polygon)).toBe(0)
});

test('is on right edge', () => {
    expect(inside([2, 1.5], polygon)).toBe(0)
});


const polygonWithHole = [[[1, 1], [1, 2], [2, 2], [2, 1], [1, 1]],
    [[1.5, 1.5], [1.5, 1.7], [1.7, 1.7], [1.7, 1.5], [1.5, 1.5]]];

test('is inside with hole', () => {
    expect(inside([1.2, 1.2], polygonWithHole)).toBe(true)
});

test('is outside with hole', () => {
    expect(inside([4.9, 1.2], polygonWithHole)).toBe(false)
});

test('is in the hole', () => {
    expect(inside([1.6, 1.6], polygonWithHole)).toBe(false)
});

test('is on edge with hole', () => {
    expect(inside([1.5, 1.5], polygonWithHole)).toBe(0)
});

test('is on edge of the outside', () => {
    expect(inside([1.2, 1], polygonWithHole)).toBe(0)
});


test('error is thrown when not the same first and last coords', () => {
    const poly = [[[0, 0], [1, 0], [1, 1]]]

    expect(() => inside([1, 1], poly)).toThrowError(/First and last/)
});
