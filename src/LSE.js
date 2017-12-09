import math from 'mathjs';

/**
 * Compute the mean value of an array of points
 * @param points Input array with points coordinates
 * @return {Object} The point with the mean values of the coordinates
 */
const meanPoints = (points) => {

  let xSum = 0, ySum = 0, zSum = 0;

  points.forEach(point => {
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
export default (points) => {
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

}
