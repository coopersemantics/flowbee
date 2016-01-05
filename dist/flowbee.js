/*
 * flowbee v0.1.0
 * Copyright 2016 coopersemantics
 * Available under MIT license <https://github.com/coopersemantics/flowbee/blob/master/LICENSE>
 */
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var r;r="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,r.flowbee=e()}}(function(){return function e(r,n,t){function u(a,l){if(!n[a]){if(!r[a]){var i="function"==typeof require&&require;if(!l&&i)return i(a,!0);if(o)return o(a,!0);var s=new Error("Cannot find module '"+a+"'");throw s.code="MODULE_NOT_FOUND",s}var f=n[a]={exports:{}};r[a][0].call(f.exports,function(e){var n=r[a][1][e];return u(n?n:e)},f,f.exports,e,r,n,t)}return n[a].exports}for(var o="function"==typeof require&&require,a=0;a<t.length;a++)u(t[a]);return u}({1:[function(e,r,n){"use strict";function t(e){return e&&e.__esModule?e:{"default":e}}function u(e){if(Array.isArray(e)){for(var r=0,n=Array(e.length);r<e.length;r++)n[r]=e[r];return n}return Array.from(e)}function o(e){return e.next=function(r,n){e.values[r]=n,r||e._done(e.error,s["default"].apply(void 0,u(e.values))())},e}Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=function(){return o(l["default"].apply(void 0,arguments))};var a=e("./parallel.js"),l=t(a),i=e("./helpers/compose.js"),s=t(i)},{"./helpers/compose.js":5,"./parallel.js":9}],2:[function(e,r,n){"use strict";function t(e){return e&&e.__esModule?e:{"default":e}}function u(e){if(Array.isArray(e)){for(var r=0,n=Array(e.length);r<e.length;r++)n[r]=e[r];return n}return Array.from(e)}function o(e){return e.next=function(r,n){e.values[r]=n,r||e._done(e.error,s["default"].apply(void 0,u(e.values)))},e}Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=function(){return o(l["default"].apply(void 0,arguments))};var a=e("./parallel.js"),l=t(a),i=e("./helpers/during.js"),s=t(i)},{"./helpers/during.js":6,"./parallel.js":9}],3:[function(e,r,n){"use strict";function t(e){return e&&e.__esModule?e:{"default":e}}function u(e){var r=e.next.bind(e),n=e._done.bind(e);return e.next=function(n,t){var u=e.stack[e.index];u&&(e.stack[e.index]=u.bind(null,t)),r(n,t)},e._done=function(r){n(r,e.values.slice(-1)[0])},e}Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=function(){return u(a["default"].apply(void 0,arguments))};var o=e("./step.js"),a=t(o)},{"./step.js":12}],4:[function(e,r,n){"use strict";function t(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0}),n.during=n.until=n.flow=n.parallel=n.series=n.sequence=n.compose=void 0;var u=e("./compose.js"),o=t(u),a=e("./sequence.js"),l=t(a),i=e("./series.js"),s=t(i),f=e("./parallel.js"),c=t(f),d=e("./flow.js"),p=t(d),v=e("./until.js"),y=t(v),_=e("./during.js"),j=t(_);n.compose=o["default"],n.sequence=l["default"],n.series=s["default"],n.parallel=c["default"],n.flow=p["default"],n.until=y["default"],n.during=j["default"]},{"./compose.js":1,"./during.js":2,"./flow.js":3,"./parallel.js":9,"./sequence.js":10,"./series.js":11,"./until.js":13}],5:[function(e,r,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=function(){for(var e=arguments.length,r=Array(e),n=0;e>n;n++)r[n]=arguments[n];return function(e){for(var n=arguments.length,t=Array(n>1?n-1:0),u=1;n>u;u++)t[u-1]=arguments[u];return r.reduceRight(function(e,r){return r.apply(void 0,[e].concat(t))},e)}}},{}],6:[function(e,r,n){"use strict";function t(e,r){return function(n){return e(n)?t(e,r)(r(n)):n}}Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=t},{}],7:[function(e,r,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=function(e,r){for(var n=arguments.length,t=Array(n>2?n-2:0),u=2;n>u;u++)t[u-2]=arguments[u];return function(){for(var n=arguments.length,u=Array(n),o=0;n>o;o++)u[o]=arguments[o];return e[r].apply(e,t.concat(u))}}},{}],8:[function(e,r,n){"use strict";function t(e,r){return function(n){return e(n)?n:t(e,r)(r(n))}}Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=t},{}],9:[function(e,r,n){"use strict";function t(e){return e&&e.__esModule?e:{"default":e}}function u(e){return e.next=function(r,n){e.values[r]=n,r||e._done(e.error,e.values)},e.execute=function(r){for(e.doneFn=r;!e._isDone(););e.error&&e._done(e.error)},e}Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=function(){return u(a["default"].apply(void 0,arguments))};var o=e("./step.js"),a=t(o)},{"./step.js":12}],10:[function(e,r,n){"use strict";function t(e){return e&&e.__esModule?e:{"default":e}}function u(e){if(Array.isArray(e)){for(var r=0,n=Array(e.length);r<e.length;r++)n[r]=e[r];return n}return Array.from(e)}function o(e){return e.next=function(r,n){e.values[r]=n,r||e._done(e.error,s["default"].apply(void 0,u(e.values.reverse()))())},e}Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=function(){return o(l["default"].apply(void 0,arguments))};var a=e("./parallel.js"),l=t(a),i=e("./helpers/compose.js"),s=t(i)},{"./helpers/compose.js":5,"./parallel.js":9}],11:[function(e,r,n){"use strict";function t(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=function(){return o["default"].apply(void 0,arguments)};var u=e("./step.js"),o=t(u)},{"./step.js":12}],12:[function(e,r,n){"use strict";function t(e){return e&&e.__esModule?e:{"default":e}}function u(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}var o=function(){function e(e,r){for(var n=0;n<r.length;n++){var t=r[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(r,n,t){return n&&e(r.prototype,n),t&&e(r,t),r}}();Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=function(){return new(Function.prototype.bind.apply(i,[null].concat(Array.prototype.slice.call(arguments))))};var a=e("./helpers/partial.js"),l=t(a),i=function(){function e(){u(this,e);var r=this;r.index=0,r.values=[],r.error=null;for(var n=arguments.length,t=Array(n),o=0;n>o;o++)t[o]=arguments[o];r.stack=t.map(function(e,n){return e.bind(null,(0,l["default"])(r,"next",n))})}return o(e,[{key:"_isDone",value:function(){var e=this,r=e.stack[e.index++];try{if(r)return r(),!1}catch(n){e.error=n}return!0}},{key:"next",value:function(e,r){var n=this;"undefined"!=typeof e&&(n.values[e]=r),n._isDone()&&n._done(n.error,n.values)}},{key:"_done",value:function(e,r){var n=this;return"function"!=typeof n.doneFn?console.warn("[.done] must be a Function"):void n.doneFn(e,e?void 0:r)}},{key:"execute",value:function(e){var r=this;r.doneFn=e,r.next()}}]),e}()},{"./helpers/partial.js":7}],13:[function(e,r,n){"use strict";function t(e){return e&&e.__esModule?e:{"default":e}}function u(e){if(Array.isArray(e)){for(var r=0,n=Array(e.length);r<e.length;r++)n[r]=e[r];return n}return Array.from(e)}function o(e){return e.next=function(r,n){e.values[r]=n,r||e._done(e.error,s["default"].apply(void 0,u(e.values)))},e}Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=function(){return o(l["default"].apply(void 0,arguments))};var a=e("./parallel.js"),l=t(a),i=e("./helpers/until.js"),s=t(i)},{"./helpers/until.js":8,"./parallel.js":9}]},{},[4])(4)});
//# sourceMappingURL=flowbee.js.map
