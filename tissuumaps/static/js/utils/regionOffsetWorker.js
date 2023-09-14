importScripts(
  "../../vendor/turf-6.5.0/turf.min.js"
);

self.onmessage = function (event) {
  const [viewportPoints, offset] = event.data;
  offsetRegion(viewportPoints, offset);
};

/**
 * @summary Posts a message with the offsetted points
 * @param {*} viewportPoints Coordinates that will be offsetted
 * @param {*} offset Offset amount 
 */
function offsetRegion(viewportPoints, offset) {
  const multiPolygon = objectToArrayPoints(viewportPoints);

  function createOffsetPolygon(multipolygon, offset) {
    const turfMultipolygon = turf.multiPolygon(multipolygon);
    const offsetPolygon = turf.buffer(turfMultipolygon, offset, {
      units: "kilometers",
    });
    return offsetPolygon.geometry;
  }
  try {
    const result = createOffsetPolygon(multiPolygon, offset);
    let points =
      result.type === "Polygon" ? [result.coordinates] : result.coordinates;
      console.log("returning points", points)
    self.postMessage(points);
  } catch(e) {
      console.log("returnin null", e)
    self.postMessage(null);
  }
}

function objectToArrayPoints(points) {
  return points.map((arr) =>
    arr.map((polygon) => {
      let p = polygon.map((point) => [point.x, point.y]);
      p.push(p[0]);
      return p;
    })
  );
}