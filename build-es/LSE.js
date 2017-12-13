import math from 'mathjs';

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
export default (function (points) {

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

  var M1 = math.matrix(M1_rows);
  var M2 = math.matrix(M2_rows);

  var M1_T = math.transpose(M1); // transpose of M1

  var resultMatrix = math.multiply(math.inv(math.multiply(M1_T, M1)), M1_T, M2);

  // Get A, B and C constants
  var A = resultMatrix.get([0, 0]);
  var B = resultMatrix.get([1, 0]);
  var C = resultMatrix.get([1, 0]);

  return { A: A, B: B, C: C };

  /*
  // Compute mean of all points
    let meanPoint = meanPoints(points);
  
    let m1_11 = 0, m1_12 = 0, m1_21 = 0, m1_22 = 0;
    let m2_11 = 0, m2_21 = 0;
  
    points.forEach(point => {
      m1_11 += Math.pow((point.x - meanPoint.x), 2);
      m1_12 += (point.x - meanPoint.x) * (point.y - meanPoint.y);
      m1_22 += Math.pow((point.y - meanPoint.y), 2);
      m2_11 += (point.x - meanPoint.x) * (point.z - meanPoint.z);
      m2_21 += (point.y - meanPoint.y) * (point.z - meanPoint.z);
    });
  
    m1_21 = m1_12;
  
    let M1 = math.transpose(math.matrix([[m1_11, m1_12], [m1_21, m1_22]]));
    let M2 = math.matrix([[m2_11], [m2_21]]);
  
    let resultMatrix = math.multiply(M1, M2);
  
    // Get A and B constants
    let A = resultMatrix.get([0, 0]);
    let B = resultMatrix.get([1, 0]);
  
    // Find C constant
    let C = points[0].z - A * points[0].x - B * points[0].y
  
    return {A, B, C}
  */
});