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
point-in-poly-hao x 29,365,704 ops/sec ±1.30% (90 runs sampled)
turf-point-in-polygon x 7,142,567 ops/sec ±0.61% (93 runs sampled)
point-in-polygon x 42,339,450 ops/sec ±0.78% (95 runs sampled)
robust-point-in-polygon x 20,675,569 ops/sec ±0.65% (95 runs sampled)
````

````
// For a point in a much larger geometry (700+ vertices)
point-in-poly-hao x 474,180 ops/sec ±0.55% (93 runs sampled)
turf-point-in-polygon x 214,584 ops/sec ±0.74% (95 runs sampled)
point-in-polygon x 489,649 ops/sec ±0.75% (91 runs sampled)
robust-point-in-polygon x 376,268 ops/sec ±0.79% (89 runs sampled)
````
