# extent method comparison

comparing methods of getting an extent

```
geojsonExtent + bbox2extent x 24,350 ops/sec ±1.94% (82 runs sampled)
koop.Extent x 771,160 ops/sec ±1.20% (88 runs sampled)
koop.Extent (cleaned) x 784,910 ops/sec ±1.08% (89 runs sampled)
esriExtent x 809,250 ops/sec ±0.62% (94 runs sampled)
Fastest is esriExtent
all results identical: true
```

created a script to convert output of geojsonExtent to esri format (bbox2extent)

reimplemented koop.Extent for better performance as `esriExtent` using some methods I saw in [geojsonExtent](https://github.com/mapbox/geojson-extent) & [extents](https://github.com/substack/node-extents)
