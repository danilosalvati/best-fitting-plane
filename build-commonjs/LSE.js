'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _svdJs = require('svd-js');

/**
 * Implementation of a Least Square Evaluation function as descripted in
 * https://www.geometrictools.com/Documentation/LeastSquaresFitting.pdf (par. 3)
 * This will return a plane in the form Ax + By + C = z
 */

// TODO CHANGE COMMENT WITH THE NEW IMPLEMENTATION
exports.default = function (points) {
  // INPUT VALIDATION

  // Check if the input array is well-formed
  if (!(points instanceof Array)) {
    throw new TypeError('This function accepts only an Array of points as input');
  }

  if (points.length < 3) {
    throw new TypeError('You need at least three points to define a plane');
  }

  points.forEach(function (point) {
    if (!(point instanceof Object)) {
      throw new TypeError('The input should contains only points ' + 'with the following structure: {x:<number>, y:<number>, z:<number>}');
    } else {
      if (isNaN(point.x) || isNaN(point.y) || isNaN(point.z)) {
        throw new TypeError('The input should contains only points ' + 'with the following structure: {x:<number>, y:<number>, z:<number>}');
      }
    }
  });

  // Check if all points are aligned with the y-axis
  var allYEquals = true;
  var prevY = points[0].y;
  for (var i = 1; i < points.length && allYEquals; i++) {
    if (points[i].y !== prevY) {
      allYEquals = false;
    }
  }

  if (allYEquals) {
    throw new TypeError('Unable to find a plane for vertical points');
  }

  var meanCoordinates = function meanCoordinates(pointsArray) {
    var xs = 0;
    var ys = 0;
    var zs = 0;
    pointsArray.forEach(function (point) {
      xs += point.x;
      ys += point.y;
      zs += point.z;
    });

    return {
      xMean: xs / pointsArray.length,
      yMean: ys / pointsArray.length,
      zMean: zs / pointsArray.length
    };
  };

  var means = meanCoordinates(points);
  var pointsNormalized = [];

  for (var _i = 0; _i < points.length; _i++) {
    pointsNormalized[_i] = new Array(3);
  }

  points.forEach(function (point, index) {
    pointsNormalized[index][0] = point.x - means.xMean;
    pointsNormalized[index][1] = point.y - means.yMean;
    pointsNormalized[index][2] = point.z - means.zMean;
  });

  var _SVD = (0, _svdJs.SVD)(pointsNormalized),
      v = _SVD.v;

  var normalize = -1 / v[2][2];

  var A = v[0][2] * normalize;
  var B = v[1][2] * normalize;
  var C = -(means.xMean * A + means.yMean * B + means.zMean * v[2][2] * normalize);

  return { A: A, B: B, C: C };
};