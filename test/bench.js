const Benchmark = require('benchmark')
const pipHao = require('../dist/pointInPolygon.js')
const inside = require('point-in-polygon')
const turfPip = require('@turf/boolean-point-in-polygon').default
const robustPip = require('robust-point-in-polygon')
const loadJsonFile = require('load-json-file')
const path = require('path')

const insideSuite = new Benchmark.Suite();

const geojsonPoly = [[[1, 1], [1, 2], [2, 2], [2, 1], [1, 1]]];
const polygon = [[1, 1], [1, 2], [2, 2], [2, 1]];

insideSuite
    .add('point-in-poly-hao', function() {
        pipHao([1.5, 1.5], geojsonPoly)
    })
    .add('turf-point-in-polygon', function() {
        turfPip({type: 'Point', coordinates: [1.5, 1.5]}, {type: 'Polygon', coordinates: geojsonPoly})
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
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run()

const largePolySuite = new Benchmark.Suite();

const switzerland = loadJsonFile.sync(path.join(__dirname, 'fixtures', 'simple', 'switzerland.geojson'))
const switzCoords = switzerland.geometry.coordinates
const mainSwissRing = switzCoords[0]
largePolySuite
    .add('point-in-poly-hao', function() {
        pipHao([8, 46.5], switzCoords)
    })
    .add('turf-point-in-polygon', function() {
        turfPip({type: 'Point', coordinates: [8, 46.5]}, switzerland)
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
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run()

