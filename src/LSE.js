import math from 'mathjs'

let computePlane = (points) => {
  try {
    let M1Rows = []
    let M2Rows = []

    points.forEach(point => {
      M1Rows.push([point.x, point.y, 1])
      M2Rows.push([point.z])
    })

    let M1 = math.matrix(M1Rows)
    let M2 = math.matrix(M2Rows)

    let M1_T = math.transpose(M1) // transpose of M1

    let resultMatrix = math.multiply(math.inv(math.multiply(M1_T, M1)), M1_T, M2)
    let errorsMatrix = math.subtract(M2, math.multiply(M1, resultMatrix))

    let errors = [errorsMatrix.get([0, 0]), errorsMatrix.get([1, 0]), errorsMatrix.get([2, 0])]

    let residual = math.norm(errors)

    // Get A, B and C constants
    let A = resultMatrix.get([0, 0])
    let B = resultMatrix.get([1, 0])
    let C = resultMatrix.get([2, 0])

    return {A, B, C, residual}
  } catch (err) {
    // I could enter here if the matrix is not invertible
    return {A: NaN, B: NaN, C: NaN, residual: Infinity}
  }
}

/**
 * Implementation of a Least Square Evaluation function as descripted in
 * https://www.geometrictools.com/Documentation/LeastSquaresFitting.pdf (par. 3)
 * This will return a plane in the form Ax + By + C = z
 */
export default (points) => {
  // INPUT VALIDATION

  // Check if the input array is well-formed
  if (!(points instanceof Array)) {
    throw new TypeError('This function accepts only an Array of points as input')
  }

  if (points.length < 3) {
    throw new TypeError('You need at least three points to define a plane')
  }

  points.forEach(point => {
    if (!(point instanceof Object)) {
      throw new TypeError('The input should contains only points ' +
        'with the following structure: {x:<number>, y:<number>, z:<number>}')
    } else {
      if (isNaN(point.x) ||
        isNaN(point.y) ||
        isNaN(point.z)) {
        throw new TypeError('The input should contains only points ' +
          'with the following structure: {x:<number>, y:<number>, z:<number>}')
      }
    }
  })

  // I need to establish if all points have the same y (the matrix is not invertible...)
  let allYEquals = !!points.reduce(function (a, b) {
    return (a.y === b.y) ? a : NaN
  })

  if (allYEquals) {
    // Return a vertical Plane Ax + (K + C) = z Where K is the constant value for y
    throw new Error('To implement')
  }

  // TODO: Fix comment
  // I should follow what is stated here:
  // https://stackoverflow.com/a/44315221
  // https://it.wikipedia.org/wiki/Pseudo-inversa
  // I also need to investigate upon vertical planes...
  // Probably I need to catch a param for it

  // First of all I try to compute the horizontal plane
  let {A: AHorizontal, B: BHorizontal, C: CHorizontal, residual: residualHorizontal} = computePlane(points)

  // Now I try to compute the vertical plane
  let swappedPoints = points.map(point => {
    return {x: point.y, y: point.x, z: point.z}
  })

  let {A: AVertical, B: BVertical, C: CVertical, residual: residualVertical} = computePlane(swappedPoints)

  let A = AHorizontal
  let B = BHorizontal
  let C = CHorizontal

  console.log('residual is :', residualHorizontal, residualVertical)

  if (residualVertical < residualHorizontal) {
    A = AVertical
    B = BVertical
    C = CVertical
  }

  return {A, B, C}
}
