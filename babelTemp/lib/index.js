"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

require("regenerator-runtime/runtime");

// import "@babel/polyfill";
// const isHas = [1, 2, 3].includes(2);
// const p = new Promise((resolve, reject) => {
//   resolve(100);
// });
function f() {
  return _regenerator["default"].async(function f$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _regenerator["default"].awrap(123);

        case 2:
          return _context.abrupt("return", _context.sent);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}