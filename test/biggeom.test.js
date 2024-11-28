import {expect, test} from 'vitest'
import loadJsonFile from 'load-json-file'
import path from 'path'

import inside from '../src/index'

const switzerland = loadJsonFile.sync(path.join(__dirname, 'fixtures', 'simple', 'switzerland.geojson'))
const switzCoords = switzerland.geometry.coordinates

test('is inside', () => {
    expect(inside([8, 46.5], switzCoords)).toBe(true)
});

test('is outside', () => {
    expect(inside([8, 44], switzCoords)).toBe(false)
});

const switzerlandKinked = loadJsonFile.sync(path.join(__dirname, 'fixtures', 'notSimple', 'switzerlandKinked.geojson'))
const switzKinkedCoords = switzerlandKinked.geometry.coordinates

test('is inside kinked', () => {
    expect(inside([8, 46.5], switzKinkedCoords)).toBe(true)
});

test('is outside kinked', () => {
    expect(inside([8, 44], switzKinkedCoords)).toBe(false)
});
