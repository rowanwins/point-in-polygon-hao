import Benchmark from 'benchmark'
import pipHao from '../dist/pointInPolygon.mjs'
import inside from 'point-in-polygon'
import robustPip from 'robust-point-in-polygon'

import loadJsonFile from 'load-json-file'
import path from 'path'

const insideSuite = new Benchmark.Suite();

const polygon = [[1, 1], [1, 2], [2, 2], [2, 1]];
const polywrapped = [[[1, 1], [1, 2], [2, 2], [2, 1], [1, 1]]];

insideSuite
    .add('point-in-poly-hao', function() {
        pipHao([1.5, 1.5], polywrapped)
    })
    .add('point-in-polygon', function() {
        inside([1.5, 1.5], polygon)
    })
    .add('robust-point-in-polygon', function() {
        robustPip(polygon, [1.5, 1.5])
    })
    .on('cycle', function(event) {
        console.log(String(event.target))
    })
    .on('complete', function() {
        // eslint-disable-next-line no-invalid-this
        console.log(`Fastest is ${  this.filter('fastest').map('name')}`);
    })
    .run()

const largePolySuite = new Benchmark.Suite();

const switzerland = loadJsonFile.sync(path.join('test', 'fixtures', 'simple', 'switzerland.geojson'))
const switzCoords = switzerland.geometry.coordinates
const mainSwissRing = switzCoords[0]

largePolySuite
    .add('point-in-poly-hao', function() {
        pipHao([8, 46.5], switzCoords)
    })
    .add('point-in-polygon', function() {
        inside([8, 46.5], mainSwissRing)
    })
    .add('robust-point-in-polygon', function() {
        robustPip(mainSwissRing, [8, 46.5])
    })
    .on('cycle', function(event) {
        console.log(String(event.target))
    })
    .on('complete', function() {
        // eslint-disable-next-line no-invalid-this
        console.log(`Fastest is ${  this.filter('fastest').map('name')}`);
    })
    .run()

