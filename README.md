Based on the paper [Optimal Reliable Point-in-Polygon Test and
Differential Coding Boolean Operations on Polygons](https://www.researchgate.net/publication/328261365_Optimal_Reliable_Point-in-Polygon_Test_and_Differential_Coding_Boolean_Operations_on_Polygons)

- Works on polygons with holes
- Works with degenerate polyons
- Reports 0 if on the edge

### Usage
Install via `npm install point-in-polygon-hao`

````
const inside = require('point-in-polygon-hao')
const polygon = [ [ [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ] ] ];
inside([ 1.5, 1.5 ], polygon)
// returns true

inside([ 4.9, 1.2 ], polygon)
// returns false

inside([1, 2], polygon)
// returns 0 to indicate on edge
````


### Comparisons
Some rough comparisons to similar libraries. 
While `point-in-polygon` is slightly faster in most cases it does not support polygons with holes or degenerate polygons.

````
// For a point in bounding box check
point-in-poly-hao x 22,139,049 ops/sec ±0.75% (91 runs sampled)
turf-point-in-polygon x 7,449,504 ops/sec ±0.67% (97 runs sampled)
point-in-polygon x 45,114,360 ops/sec ±0.37% (97 runs sampled)
robust-point-in-polygon x 22,621,987 ops/sec ±0.48% (91 runs sampled)
````

````
// For a point in a much larger geometry (700+ vertices)
point-in-poly-hao x 467,835 ops/sec ±0.97% (96 runs sampled)
turf-point-in-polygon x 207,265 ops/sec ±0.79% (90 runs sampled)
point-in-polygon x 503,046 ops/sec ±1.04% (91 runs sampled)
robust-point-in-polygon x 372,612 ops/sec ±0.66% (94 runs sampled)
````
