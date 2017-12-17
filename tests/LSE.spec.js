import {assert} from 'chai'

import {LSE} from '../src/index'

const LSEWithUndefinedParam = () => LSE()
const LSEWithWrongTypeParam = () => LSE({})
const LSEWithoutPoints = () => LSE([[0, 0, 0], [1, 2, 3], [4, 5, 6]])
const LSEWithSomePoints1 = () => LSE([{x: 0, y: 0, z: 0}, [1, 2, 3], [4, 5, 6]])
const LSEWithSomePoints2 = () => LSE([{x: 0, y: 0, z: 0}, {x: '22', y: 5}, [4, 5, 6]])
const LSEWithSomePoints3 = () => LSE([{x: 0, y: 0, z: 0}, '', [4, 5, 6]])
const LSEWithOnlyOnePoint = () => LSE([{x: 0, y: 0, z: 0}])
const LSEWithOnlyTwoPoints = () => LSE([{x: 0, y: 0, z: 0}, {x: 10, y: 0, z: 0}])

describe('LSE tests', () => {
  it('should throws an error when input is undefined', (done) => {
    assert.throws(LSEWithUndefinedParam, TypeError, 'This function accepts only an Array of points as input')
    done()
  })

  it('should throws an error when input is not an Array', (done) => {
    assert.throws(LSEWithWrongTypeParam, TypeError, 'This function accepts only an Array of points as input')
    done()
  })

  it('should throws an error when the array does not contains points', (done) => {
    assert.throws(LSEWithoutPoints, TypeError,
      'The input should contains only points ' +
      'with the following structure: {x:<number>, y:<number>, z:<number>}')
    done()
  })

  it('should throws an error when the array some points and some other structures', (done) => {
    assert.throws(LSEWithSomePoints1, TypeError,
      'The input should contains only points ' +
      'with the following structure: {x:<number>, y:<number>, z:<number>}')

    assert.throws(LSEWithSomePoints2, TypeError,
      'The input should contains only points ' +
      'with the following structure: {x:<number>, y:<number>, z:<number>}')

    assert.throws(LSEWithSomePoints3, TypeError,
      'The input should contains only points ' +
      'with the following structure: {x:<number>, y:<number>, z:<number>}')

    done()
  })

  it('should throws an error when the array some points and some other structures', (done) => {
    assert.throws(LSEWithSomePoints1, TypeError,
      'The input should contains only points ' +
      'with the following structure: {x:<number>, y:<number>, z:<number>}')

    assert.throws(LSEWithSomePoints2, TypeError,
      'The input should contains only points ' +
      'with the following structure: {x:<number>, y:<number>, z:<number>}')
    done()
  })

  it('should throws an error when the input has less than three points', (done) => {
    assert.throws(LSEWithOnlyOnePoint, TypeError, 'You need at least three points to define a plane')
    assert.throws(LSEWithOnlyTwoPoints, TypeError, 'You need at least three points to define a plane')
    done()
  })

  it('should return a plane passing for z = 0 when all points lies on it', (done) => {

    let points = [{x: 0, y: 0, z: 0}, {x: 1, y: 0, z: 0}, {x: 1, y: 1, z: 0}]
    let plane = LSE(points)

    assert.typeOf(plane, 'object')
    //Check if the plane is horizontal and is passing for the origin
    assert.strictEqual(plane.A, 0)
    assert.strictEqual(plane.B, 0)
    assert.strictEqual(plane.C, 0)

    done()
  })

  it('should return a plane with all the three input points included', (done) => {

    let points = [{x: 5, y: 0, z: 5}, {x: 1, y: 0, z: 2}, {x: 1, y: 1, z: 0}]
    let plane = LSE(points)

    // Ax + By + C = z => Ax + By + C -z = 0
    assert.approximately(plane.A * points[0].x + plane.B * points[0].y + plane.C - points[0].z, 0, 0.0002)
    assert.approximately(plane.A * points[1].x + plane.B * points[1].y + plane.C - points[1].z, 0, 0.0002)
    assert.approximately(plane.A * points[2].x + plane.B * points[2].y + plane.C - points[2].z, 0, 0.0002)

    assert.typeOf(plane, 'object')
    //Check if the plane is horizontal and is passing for the origin

    done()
  })

})
