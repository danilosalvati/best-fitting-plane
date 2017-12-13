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

  // TODO: Fix comment
  // I should follow what is stated here:
  // https://stackoverflow.com/a/44315221
  // https://it.wikipedia.org/wiki/Pseudo-inversa
  // I also need to investigate upon vertical planes...
  // Probably I need to catch a pram for it

  let M1_rows = [];
  let M2_rows = [];

  points.forEach(point => {
    M1_rows.push([point.x, point.y, 1]);
    M2_rows.push([point.z])
  });

  let M1 = math.matrix(M1_rows);
  let M2 = math.matrix(M2_rows);

  let M1_T = math.transpose(M1); // transpose of M1

  let resultMatrix = math.multiply(math.inv(math.multiply(M1_T, M1)), M1_T, M2);

  // Get A, B and C constants
  let A = resultMatrix.get([0, 0]);
  let B = resultMatrix.get([1, 0]);
  let C = resultMatrix.get([2, 0]);

  return {A, B, C};

}

