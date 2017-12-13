(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("mathjs"));
	else if(typeof define === 'function' && define.amd)
		define(["mathjs"], factory);
	else if(typeof exports === 'object')
		exports["BestFittingPlane"] = factory(require("mathjs"));
	else
		root["BestFittingPlane"] = factory(root["math"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__LSE__ = __webpack_require__(1);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "LSE", function() { return __WEBPACK_IMPORTED_MODULE_0__LSE__["a"]; });




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mathjs__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mathjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mathjs__);


/**
 * Implementation of a Least Square Evaluation function as descripted in
 * https://www.geometrictools.com/Documentation/LeastSquaresFitting.pdf (par. 3)
 * This will return a plane in the form Ax + By + C = z
 */
/* harmony default export */ __webpack_exports__["a"] = (function (points) {

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

  // TODO: Fix comment
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

  var M1 = __WEBPACK_IMPORTED_MODULE_0_mathjs___default.a.matrix(M1_rows);
  var M2 = __WEBPACK_IMPORTED_MODULE_0_mathjs___default.a.matrix(M2_rows);

  var M1_T = __WEBPACK_IMPORTED_MODULE_0_mathjs___default.a.transpose(M1); // transpose of M1

  var resultMatrix = __WEBPACK_IMPORTED_MODULE_0_mathjs___default.a.multiply(__WEBPACK_IMPORTED_MODULE_0_mathjs___default.a.inv(__WEBPACK_IMPORTED_MODULE_0_mathjs___default.a.multiply(M1_T, M1)), M1_T, M2);

  // Get A, B and C constants
  var A = resultMatrix.get([0, 0]);
  var B = resultMatrix.get([1, 0]);
  var C = resultMatrix.get([2, 0]);

  return { A: A, B: B, C: C };
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=best-fitting-plane.js.map