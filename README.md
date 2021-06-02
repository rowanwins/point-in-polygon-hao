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
point-in-poly-hao x 474,180 ops/sec ±0.55% (93 runs sampled)
point-in-polygon x 489,649 ops/sec ±0.75% (91 runs sampled)
robust-point-in-polygon x 376,268 ops/sec ±0.79% (89 runs sampled)
````

````
// For a point in bounding box check
point-in-poly-hao x 29,365,704 ops/sec ±1.30% (90 runs sampled)
point-in-polygon x 42,339,450 ops/sec ±0.78% (95 runs sampled)
robust-point-in-polygon x 20,675,569 ops/sec ±0.65% (95 runs sampled)
````

### Algorithm
This library is based on the paper [Optimal Reliable Point-in-Polygon Test and
Differential Coding Boolean Operations on Polygons](https://www.researchgate.net/publication/328261365_Optimal_Reliable_Point-in-Polygon_Test_and_Differential_Coding_Boolean_Operations_on_Polygons)

### Other notes
* Works irrespective of winding order of polygon
* Does not appear to be effected by floating point errors compared to `point-in-polygon` or `robust-point-in-polygon`
