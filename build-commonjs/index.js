'use strict';

var _LSE = require('./LSE');

var _LSE2 = _interopRequireDefault(_LSE);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var plane = (0, _LSE2.default)([{ x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 0 }, { x: 0, y: 1, z: 0.2 }]);
console.log(plane);
