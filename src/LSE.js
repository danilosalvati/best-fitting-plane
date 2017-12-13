import math from 'mathjs';

/**
 * Implementation of a Least Square Evaluation function as descripted in
 * https://www.geometrictools.com/Documentation/LeastSquaresFitting.pdf (par. 3)
 * This will return a plane in the form Ax + By + C = z
 */
export default (points) => {

  // INPUT VALIDATION

  // Check if the input array is well-formed
  if (!(points instanceof Array)) {
    throw new TypeError('This function accepts only an Array of points as input');
  }

  if (points.length < 3) {
    throw new TypeError('You need at least three points to define a plane');
  }

  points.forEach(point => {
    if (!(point instanceof Object)) {
      throw new TypeError('The input should contains only points ' +
        'with the following structure: {x:<number>, y:<number>, z:<number>}');
    } else {
      if (isNaN(point.x) ||
        isNaN(point.y) ||
        isNaN(point.z)) {
        throw new TypeError('The input should contains only points ' +
          'with the following structure: {x:<number>, y:<number>, z:<number>}');
      }
    }
  });

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

