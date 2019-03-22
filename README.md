Based on the paper [Optimal Reliable Point-in-Polygon Test and
Differential Coding Boolean Operations on Polygons](https://www.researchgate.net/publication/328261365_Optimal_Reliable_Point-in-Polygon_Test_and_Differential_Coding_Boolean_Operations_on_Polygons)

- Works on polygons with holes
- Works with degenerate polyons
- Reports 0 if on the edge

````
const polygon = [ [ [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ], [ 1, 1 ] ] ];
inside([ 1.5, 1.5 ], polygon)
// when inside returns true

inside([ 4.9, 1.2 ], polygon)
// when outside returns false

inside([1, 2], polygon)
// when on edge returns 0
````


### Comparisons
Some rough comparisons to similar libraries although 
`point-in-polygon` & `robust-point-in-polygon` do not support polygons with holes. So while `point-in-polygon` is slightly faster in most cases it supports fewer use cases.

````
// For a point in bounding box check
point-in-poly-hao x 25,473,702 ops/sec ±2.35% (81 runs sampled)
turf-point-in-polygon x 6,511,498 ops/sec ±1.04% (93 runs sampled)
point-in-polygon x 37,437,762 ops/sec ±0.68% (94 runs sampled)
robust-point-in-polygon x 18,344,949 ops/sec ±1.69% (83 runs sampled)

// For a point in a much larger geometry (700+ vertices)
point-in-poly-hao x 449,670 ops/sec ±0.80% (90 runs sampled)
turf-point-in-polygon x 204,064 ops/sec ±0.69% (91 runs sampled)
point-in-polygon x 469,503 ops/sec ±1.43% (93 runs sampled)
robust-point-in-polygon x 364,994 ops/sec ±0.63% (94 runs sampled)
````
