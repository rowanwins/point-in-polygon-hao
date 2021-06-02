import test from 'ava'
import loadJsonFile from 'load-json-file'
import path from 'path'

import inside from '../src/index'

const switzerland = loadJsonFile.sync(path.join(__dirname, 'fixtures', 'simple', 'switzerland.geojson'))
const switzCoords = switzerland.geometry.coordinates

test('is inside', t => {
    t.true(inside([8, 46.5], switzCoords))
});

test('is outside', t => {
    t.false(inside([8, 44], switzCoords))
});

const switzerlandKinked = loadJsonFile.sync(path.join(__dirname, 'fixtures', 'notSimple', 'switzerlandKinked.geojson'))
const switzKinkedCoords = switzerlandKinked.geometry.coordinates

test('is inside kinked', t => {
    t.true(inside([8, 46.5], switzKinkedCoords))
});

test('is outside kinked', t => {
    t.false(inside([8, 44], switzKinkedCoords))
});
