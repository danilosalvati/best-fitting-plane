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
})
