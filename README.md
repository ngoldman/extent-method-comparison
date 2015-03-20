# extent method comparison

Comparing methods to get the extent of a GeoJSON feature collection.

Results of cloning, running `npm i` and `npm start` as of 2015/03/19:

```
geojsonExtent + bbox2extent x 24,350 ops/sec ±1.94% (82 runs sampled)
koop.Extent x 771,160 ops/sec ±1.20% (88 runs sampled)
koop.Extent (cleaned) x 784,910 ops/sec ±1.08% (89 runs sampled)
esriExtent x 809,250 ops/sec ±0.62% (94 runs sampled)
Fastest is esriExtent
all results identical: true
```

Based on these results I did two things:

* created a script to convert output of geojsonExtent to esri format ([bbox2extent](https://github.com/ngoldman/bbox2extent))
* reimplemented `koop.Extent`as [esri-extent](https://github.com/ngoldman/esri-extent) using some methods I saw in [geojsonExtent](https://github.com/mapbox/geojson-extent) & [extents](https://github.com/substack/node-extents) to improve performance

Check https://travis-ci.org/ngoldman/extent-method-comparison to see the benchmark output for yourself.
