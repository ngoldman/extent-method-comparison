var Benchmark = require('benchmark')
var suite = new Benchmark.Suite()
var equal = require('deep-equal')

var geojsonExtent = require('geojson-extent')
var bbox2extent = require('./bbox2extent')
var koopExtent = require('./koopExtent')
var koopExtent2 = require('./koopExtent-cleaned')
var esriExtent = require('./esriExtent')

var example = require('./test/geojson-spec-example.json')

// testing with GeoJSON Spec Example

suite
  .add('geojsonExtent + bbox2extent', function () {
    bbox2extent(geojsonExtent(example))
  })
  .add('koop.Extent', function () {
    koopExtent.bounds(example.features)
  })
  .add('koop.Extent (cleaned)', function () {
    koopExtent2(example.features)
  })
  .add('esriExtent', function () {
    esriExtent(example.features)
  })
  // add listeners
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'))
    var res = []
    res.push(bbox2extent(geojsonExtent(example)))
    res.push(koopExtent.bounds(example.features))
    res.push(koopExtent2(example.features))
    res.push(esriExtent(example.features))
    var identical = equal(res[0], res[1], res[2], res[3])
    console.log('all results identical:', identical)
  })
  // run async
  .run({ 'async': true })
