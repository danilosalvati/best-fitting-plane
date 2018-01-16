(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["BestFittingPlane"] = factory();
	else
		root["BestFittingPlane"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_svd_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_svd_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_svd_js__);


/**
 * Implementation of a Least Square Evaluation function as descripted in
 * https://www.geometrictools.com/Documentation/LeastSquaresFitting.pdf (par. 3)
 * This will return a plane in the form Ax + By + C = z
 */

// TODO CHANGE COMMENT WITH THE NEW IMPLEMENTATION
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

  // Check if all points are aligned with the y-axis
  var allYEquals = true;
  var prevY = points[0].y;
  for (var i = 1; i < points.length && allYEquals; i++) {
    if (points[i].y !== prevY) {
      allYEquals = false;
    }
  }

  if (allYEquals) {
    throw new TypeError('Unable to find a plane for vertical points');
  }

  var meanCoordinates = function meanCoordinates(pointsArray) {
    var xs = 0;
    var ys = 0;
    var zs = 0;
    pointsArray.forEach(function (point) {
      xs += point.x;
      ys += point.y;
      zs += point.z;
    });

    return {
      xMean: xs / pointsArray.length,
      yMean: ys / pointsArray.length,
      zMean: zs / pointsArray.length
    };
  };

  var means = meanCoordinates(points);
  var pointsNormalized = [];

  for (var _i = 0; _i < points.length; _i++) {
    pointsNormalized[_i] = new Array(3);
  }

  points.forEach(function (point, index) {
    pointsNormalized[index][0] = point.x - means.xMean;
    pointsNormalized[index][1] = point.y - means.yMean;
    pointsNormalized[index][2] = point.z - means.zMean;
  });

  var _SVD = Object(__WEBPACK_IMPORTED_MODULE_0_svd_js__["SVD"])(pointsNormalized),
      v = _SVD.v;

  var normalize = -1 / v[2][2];

  var A = v[0][2] * normalize;
  var B = v[1][2] * normalize;
  var C = -(means.xMean * A + means.yMean * B + means.zMean * v[2][2] * normalize);

  return { A: A, B: B, C: C };
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

!function(r,o){ true?module.exports=o():"function"==typeof define&&define.amd?define([],o):"object"==typeof exports?exports.SVDJS=o():r.SVDJS=o()}("undefined"!=typeof self?self:this,function(){return function(r){function o(f){if(t[f])return t[f].exports;var e=t[f]={i:f,l:!1,exports:{}};return r[f].call(e.exports,e,e.exports,o),e.l=!0,e.exports}var t={};return o.m=r,o.c=t,o.d=function(r,t,f){o.o(r,t)||Object.defineProperty(r,t,{configurable:!1,enumerable:!0,get:f})},o.n=function(r){var t=r&&r.__esModule?function(){return r.default}:function(){return r};return o.d(t,"a",t),t},o.o=function(r,o){return Object.prototype.hasOwnProperty.call(r,o)},o.p="",o(o.s=0)}([function(r,o,t){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var f=t(1),e=t(2);t.d(o,"SVD",function(){return f.a}),t.d(o,"VERSION",function(){return e.a})},function(r,o,t){"use strict";var f=function(r,o,t,f,e){if(o=void 0===o||o,t=void 0===t||t,f=f||Math.pow(2,-52),e=1e-64/f,!r)throw new TypeError("Matrix a is not defined");var i=r[0].length,n=r.length;if(n<i)throw new TypeError("Invalid matrix: m < n");var a=void 0,u=void 0,s=void 0,d=void 0,v=void 0,c=void 0,l=void 0,p=void 0,h=void 0,M=void 0,b=void 0,y=void 0,w=void 0;p=0,b=0;var x=[],q=[],m=[],j=void 0;for(a=0;a<n;a++)q[a]=new Array(i).fill(0);for(a=0;a<i;a++)m[a]=new Array(i).fill(0);for(j=new Array(i).fill(0),a=0;a<n;a++)for(u=0;u<i;u++)q[a][u]=r[a][u];for(a=0;a<i;a++){for(x[a]=p,M=0,d=a+1,u=a;u<n;u++)M+=Math.pow(q[u][a],2);if(M<e)p=0;else for(l=q[a][a],p=l<0?Math.sqrt(M):-Math.sqrt(M),h=l*p-M,q[a][a]=l-p,u=d;u<i;u++){for(M=0,s=a;s<n;s++)M+=q[s][a]*q[s][u];for(l=M/h,s=a;s<n;s++)q[s][u]=q[s][u]+l*q[s][a]}for(j[a]=p,M=0,u=d;u<i;u++)M+=Math.pow(q[a][u],2);if(M<e)p=0;else{for(l=q[a][a+1],p=l<0?Math.sqrt(M):-Math.sqrt(M),h=l*p-M,q[a][a+1]=l-p,u=d;u<i;u++)x[u]=q[a][u]/h;for(u=d;u<n;u++){for(M=0,s=d;s<i;s++)M+=q[u][s]*q[a][s];for(s=d;s<i;s++)q[u][s]=q[u][s]+M*x[s]}}y=Math.abs(j[a])+Math.abs(x[a]),y>b&&(b=y)}if(t)for(a=i-1;a>=0;a--){if(0!==p){for(h=q[a][a+1]*p,u=d;u<i;u++)m[u][a]=q[a][u]/h;for(u=d;u<i;u++){for(M=0,s=d;s<i;s++)M+=q[a][s]*m[s][u];for(s=d;s<i;s++)m[s][u]=m[s][u]+M*m[s][a]}}for(u=d;u<i;u++)m[a][u]=0,m[u][a]=0;m[a][a]=1,p=x[a],d=a}if(o)for(a=i-1;a>=0;a--){for(d=a+1,p=j[a],u=d;u<i;u++)q[a][u]=0;if(0!==p){for(h=q[a][a]*p,u=d;u<i;u++){for(M=0,s=d;s<n;s++)M+=q[s][a]*q[s][u];for(l=M/h,s=a;s<n;s++)q[s][u]=q[s][u]+l*q[s][a]}for(u=a;u<n;u++)q[u][a]=q[u][a]/p}else for(u=a;u<n;u++)q[u][a]=0;q[a][a]=q[a][a]+1}f*=b;var S=void 0;for(s=i-1;s>=0;s--)for(var O=0;O<50;O++){for(S=!1,d=s;d>=0;d--){if(Math.abs(x[d])<=f){S=!0;break}if(Math.abs(j[d-1])<=f)break}if(!S)for(c=0,M=1,v=d-1,a=d;a<s+1&&(l=M*x[a],x[a]=c*x[a],!(Math.abs(l)<=f));a++)if(p=j[a],j[a]=Math.sqrt(l*l+p*p),h=j[a],c=p/h,M=-l/h,o)for(u=0;u<n;u++)y=q[u][v],w=q[u][a],q[u][v]=y*c+w*M,q[u][a]=-y*M+w*c;if(w=j[s],d===s){if(w<0&&(j[s]=-w,t))for(u=0;u<i;u++)m[u][s]=-m[u][s];break}for(b=j[d],y=j[s-1],p=x[s-1],h=x[s],l=((y-w)*(y+w)+(p-h)*(p+h))/(2*h*y),p=Math.sqrt(l*l+1),l=((b-w)*(b+w)+h*(y/(l<0?l-p:l+p)-h))/b,c=1,M=1,a=d+1;a<s+1;a++){if(p=x[a],y=j[a],h=M*p,p*=c,w=Math.sqrt(l*l+h*h),x[a-1]=w,c=l/w,M=h/w,l=b*c+p*M,p=-b*M+p*c,h=y*M,y*=c,t)for(u=0;u<i;u++)b=m[u][a-1],w=m[u][a],m[u][a-1]=b*c+w*M,m[u][a]=-b*M+w*c;if(w=Math.sqrt(l*l+h*h),j[a-1]=w,c=l/w,M=h/w,l=c*p+M*y,b=-M*p+c*y,o)for(u=0;u<n;u++)y=q[u][a-1],w=q[u][a],q[u][a-1]=y*c+w*M,q[u][a]=-y*M+w*c}x[d]=0,x[s]=l,j[s]=b}for(a=0;a<i;a++)j[a]<f&&(j[a]=0);return{u:q,q:j,v:m}};o.a=f},function(r,o,t){"use strict";t.d(o,"a",function(){return f});var f="1.0.1"}])});

/***/ })
/******/ ]);
});
//# sourceMappingURL=best-fitting-plane.js.map