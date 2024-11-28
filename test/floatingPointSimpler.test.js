import {expect, test} from 'vitest'
import inside from '../src/index'

const polygon = [[[1.111111111111, 1.111111111111], [1.111111111111, 2.111111111111], [2.111111111111, 2.111111111111], [2.111111111111, 1.111111111111], [1.111111111111, 1.111111111111]]]

test('is on bottom edge poly', () => {
    expect(inside([1.511111111111, 1.111111111111], polygon)).toBe(0)
});

test('is on top edge poly', () => {
    expect(inside([1.511111111111, 2.111111111111], polygon)).toBe(0)
});

test('is on left edge poly', () => {
    expect(inside([1.111111111111, 1.511111111111], polygon)).toBe(0)
});

test('is on right edge poly', () => {
    expect(inside([2.111111111111, 1.511111111111], polygon)).toBe(0)
});


test('is just inside left edge', () => {
    expect(inside([1.1111111111111, 1.511111111111], polygon)).toBe(true)
});

test('is just outside left edge', () => {
    expect(inside([1.111111111110, 1.511111111111], polygon)).toBe(false)
});
