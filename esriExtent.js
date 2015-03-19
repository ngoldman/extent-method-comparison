var bbox = [Infinity, Infinity, -Infinity, -Infinity]

module.exports = function (features, callback) {
  features.forEach(function (f, i) {
    if (!f.geometry) return

    var isPoint = f.geometry.type === 'Point'
    var isLine = f.geometry.type === 'LineString'
    var isMultiLine = f.geometry.type === 'MultiLineString'
    var isPolygon = f.geometry.type === 'Polygon'
    var isMultiPolygon = f.geometry.type === 'MultiPolygon'
    var coords = f.geometry.coordinates

    // POINT
    if (isPoint) extend(bbox, coords)

    // LINE
    if (isLine || isMultiLine) {
      if (isMultiLine) coords = coords[0]
      coords.forEach(function (c, j) {
        extend(bbox, c)
      })
    }

    // POLYGON
    if (isPolygon || isMultiPolygon) {
      coords = isMultiPolygon ? coords[0][0] : coords[0]
      coords.forEach(function (c, j) {
        extend(bbox, c)
      })
    }
  })

  var extent = {
    'xmin': bbox[0],
    'ymin': bbox[1],
    'xmax': bbox[2],
    'ymax': bbox[3],
    'spatialReference': {
      'wkid': 4326,
      'latestWkid': 4326
    }
  }

  if (callback) callback(null, extent)
  else return extent
}

function extend (bbox, coord) {
  bbox[0] = Math.min(bbox[0], coord[0])
  bbox[1] = Math.min(bbox[1], coord[1])
  bbox[2] = Math.max(bbox[2], coord[0])
  bbox[3] = Math.max(bbox[3], coord[1])
}
