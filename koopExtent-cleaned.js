var xmin, ymin, xmax, ymax

module.exports = function (features, callback) {
  features.forEach(function (f, i) {
    if (!f.geometry) return false

    var isPoint = f.geometry.type === 'Point'
    var isLine = f.geometry.type === 'LineString' || f.geometry.type === 'MultiLineString'
    var isPolygon = f.geometry.type === 'Polygon' || f.geometry.type === 'MultiPolygon'
    var coords = f.geometry.coordinates

    // POINT
    if (isPoint) {
      if (i === 0) {
        xmin = coords[0]
        ymin = coords[1]
        xmax = coords[0]
        ymax = coords[1]
      }
      if (coords[0] < xmin) xmin = coords[0]
      if (coords[1] < ymin) ymin = coords[1]
      if (coords[0] > xmax) xmax = coords[0]
      if (coords[1] > ymax) ymax = coords[1]
    }

    // LINE
    if (isLine && coords) {
      coords = f.geometry.type === 'MultiLineString' ? coords[0] : coords
      coords.forEach(function (c, j) {
        if (i === 0) {
          xmin = c[0]
          ymin = c[1]
          xmax = c[0]
          ymax = c[1]
        }
        if (c[0] < xmin) xmin = c[0]
        if (c[1] < ymin) ymin = c[1]
        if (c[0] > xmax) xmax = c[0]
        if (c[1] > ymax) ymax = c[1]
      })
    }

    // POLYGON
    if (isPolygon && coords) {
      coords = f.geometry.type === 'MultiPolygon' ? coords[0][0] : coords[0]
      coords.forEach(function (c, j) {
        if (i === 0) {
          xmin = c[0]
          ymin = c[1]
          xmax = c[0]
          ymax = c[1]
        }
        if (c[0] < xmin) xmin = c[0]
        if (c[1] < ymin) ymin = c[1]
        if (c[0] > xmax) xmax = c[0]
        if (c[1] > ymax) ymax = c[1]
      })
    }
  })

  var extent = {
    'xmin': xmin,
    'ymin': ymin,
    'xmax': xmax,
    'ymax': ymax,
    'spatialReference': {
      'wkid': 4326,
      'latestWkid': 4326
    }
  }

  if (callback) callback(null, extent)
  else return extent
}
