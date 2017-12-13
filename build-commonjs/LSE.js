'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mathjs = require('mathjs');

var _mathjs2 = _interopRequireDefault(_mathjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Compute the mean value of an array of points
 * @param points Input array with points coordinates
 * @return {Object} The point with the mean values of the coordinates
 */
var meanPoints = function meanPoints(points) {

  var xSum = 0,
      ySum = 0,
      zSum = 0;

  points.forEach(function (point) {
    xSum += point.x;
    ySum += point.y;
    zSum += point.z;
  });

  return {
    x: xSum / points.length,
    y: ySum / points.length,
    z: zSum / points.length
  };
};

/**
 * Implementation of a Least Square Evaluation function as descripted in
 * https://www.geometrictools.com/Documentation/LeastSquaresFitting.pdf (par. 3)
 * This will return a plane in the form Ax + By + C = z
 */

exports.default = function (points) {

  // TODO:
  // THIS ALGORITHM IS NOT WORKING (OR IT DOES NOT DOING WHAT I AM EXPECTING...)
  // I should follow what is stated here:
  // https://stackoverflow.com/a/44315221
  // https://it.wikipedia.org/wiki/Pseudo-inversa
  // I also need to investigate upon vertical planes...
  // Probably I need to catch a pram for it

  var M1_rows = [];
  var M2_rows = [];

  points.forEach(function (point) {
    M1_rows.push([point.x, point.y, 1]);
    M2_rows.push([point.z]);
  });

  var M1 = _mathjs2.default.matrix(M1_rows);
  var M2 = _mathjs2.default.matrix(M2_rows);

  var M1_T = _mathjs2.default.transpose(M1); // transpose of M1

  var resultMatrix = _mathjs2.default.multiply(_mathjs2.default.inv(_mathjs2.default.multiply(M1_T, M1)), M1_T, M2);

  // Get A, B and C constants
  var A = resultMatrix.get([0, 0]);
  var B = resultMatrix.get([1, 0]);
  var C = resultMatrix.get([2, 0]);

  return { A: A, B: B, C: C };
};
