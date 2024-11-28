A small library for detecting in a point lies inside a polygon

**Features**
- Works on polygons with holes
- Works with degenerate/self-intersecting polyons 
- Returns `0` if on the edge
- Not effected by floating point errors


### Usage
Install via `npm install point-in-polygon-hao`

````
import inside from 'point-in-polygon-hao'

const polygon = [
  [
    [1, 1],
    [1, 2],
    [2, 2],
    [2, 1],
    [1, 1]
  ]
];

inside([ 1.5, 1.5 ], polygon)
// => true

inside([ 4.9, 1.2 ], polygon)
// => false

inside([1, 2], polygon)
// => 0 to indicate on edge
````

**Note:** The input polygon format aligns with the GeoJson specification for polygons. This means that the first and last coordinate in a polygon must be repeated, if not this library will throw an error.
````
const polygonWithHole = [
  [
    [0, 0], [1, 0], [1, 1], [0, 1], [0, 0]
  ],
  [
    [0.1, 0.1], [0.1, 0.9], [0.9, 0.9], [0.9, 0.1], [0.1, 0.1]
  ]
]
````
The library does not support multi-polygons.

### Comparisons
Some rough comparisons to similar libraries. 
While `point-in-polygon` is slightly faster in most cases it does not support polygons with holes or degenerate polygons.

````
// For a point in a much larger geometry (700+ vertices)
point-in-poly-hao x 348,426 ops/sec ±3.04% (84 runs sampled)
point-in-polygon x 290,308 ops/sec ±2.53% (90 runs sampled)
robust-point-in-polygon x 279,963 ops/sec ±0.66% (88 runs sampled)
````

````
// For a point in bounding box check
point-in-poly-hao x 23,514,349 ops/sec ±1.71% (86 runs sampled)
point-in-polygon x 27,979,131 ops/sec ±2.47% (86 runs sampled)
robust-point-in-polygon x 24,954,850 ops/sec ±1.77% (88 runs sampled)
````

### Algorithm
This library is based on the paper [Optimal Reliable Point-in-Polygon Test and
Differential Coding Boolean Operations on Polygons](https://www.researchgate.net/publication/328261365_Optimal_Reliable_Point-in-Polygon_Test_and_Differential_Coding_Boolean_Operations_on_Polygons)

### Other notes
* Works irrespective of winding order of polygon
* ~~Does not appear to be effected by floating point errors compared to `point-in-polygon` or `robust-point-in-polygon`~~
  * Added robust-predicates to deal with some floating point errors
