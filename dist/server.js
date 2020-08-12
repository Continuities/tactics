/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/server/GameServer.js":
/*!**********************************!*\
  !*** ./src/server/GameServer.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ws */ \"ws\");\n/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ws__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _shared_GameProtocol__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/GameProtocol */ \"./src/shared/GameProtocol.js\");\n\r\n\r\n\r\n\r\n\r\nclass GameServer {\r\n  constructor() {\r\n    const self = this;\r\n    this.webClientSockets = [];\r\n    this.webSocketServer = new ws__WEBPACK_IMPORTED_MODULE_1___default.a.Server({\r\n      port: _shared_GameProtocol__WEBPACK_IMPORTED_MODULE_2__[\"default\"].WEBSOCKET_PORT,\r\n      //perMessageDeflate: true, // Enable compression... lots of repetitive data.\r\n    });\r\n\r\n    this.webSocketServer.on('open', function() {\r\n      console.log(\"Websocket server is now running.\");\r\n    });\r\n    this.webSocketServer.on('connection', function(socket, request, client) {\r\n      console.log(\"Websocket opened.\");\r\n\r\n      self.webClientSockets.push(socket);\r\n\r\n      socket.on('message', function(data) {\r\n      });\r\n      socket.on('close', function() {\r\n        console.log(\"Websocket closed.\");\r\n        self.webClientSockets.splice(self.webClientSockets.indexOf(socket), 1);\r\n      });\r\n\r\n      const bfFilepath = 'test/maps/unequal_width_height.bf'; \r\n      fs__WEBPACK_IMPORTED_MODULE_0___default.a.readFile(bfFilepath, (err, data) => {\r\n        if (err) {\r\n          console.error(`Failed to read file '${bfFilepath}': ${err}`);\r\n          return;\r\n        }\r\n\r\n        const battlefieldData = {\r\n          type: _shared_GameProtocol__WEBPACK_IMPORTED_MODULE_2__[\"default\"].BATTLEFIELD_PACKET_TYPE,\r\n          fileText: data.toString('utf8'),\r\n        };\r\n        socket.send(JSON.stringify(battlefieldData));\r\n      });\r\n      \r\n\r\n    });\r\n    this.webSocketServer.on('close', function() {\r\n      console.log(\"Websocket server closed.\");\r\n    });\r\n  }\r\n\r\n\r\n\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (GameServer);\n\n//# sourceURL=webpack:///./src/server/GameServer.js?");

/***/ }),

/***/ "./src/server/main.js":
/*!****************************!*\
  !*** ./src/server/main.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var watch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! watch */ \"watch\");\n/* harmony import */ var watch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(watch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! http */ \"http\");\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var reload__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reload */ \"reload\");\n/* harmony import */ var reload__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(reload__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _GameServer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./GameServer */ \"./src/server/GameServer.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst LOCALHOST_WEB_PORT = 4001;\r\nconst DISTRIBUTION_DIRNAME = \"dist\";\r\n\r\n// Create the web server\r\nconst app = express__WEBPACK_IMPORTED_MODULE_1___default()();\r\nlet distPath = path__WEBPACK_IMPORTED_MODULE_0___default.a.resolve();\r\nif (distPath.substring(distPath.length-DISTRIBUTION_DIRNAME.length).toLowerCase() !== DISTRIBUTION_DIRNAME) {\r\n  distPath = path__WEBPACK_IMPORTED_MODULE_0___default.a.resolve(distPath, DISTRIBUTION_DIRNAME);\r\n}\r\n\r\napp.use(express__WEBPACK_IMPORTED_MODULE_1___default.a.static(distPath));\r\n//app.use(express.static('textures'));\r\napp.set('port', LOCALHOST_WEB_PORT);\r\napp.get(\"/\", (req, res) => {\r\n  res.sendFile(path__WEBPACK_IMPORTED_MODULE_0___default.a.join(distPath, 'index.html'));\r\n});\r\n\r\nconst webServer = http__WEBPACK_IMPORTED_MODULE_3___default.a.createServer(app);\r\nreload__WEBPACK_IMPORTED_MODULE_4___default()(app).then((reloadReturned) => {\r\n  // Reload started, start web server\r\n  webServer.listen(app.get('port'), function () {\r\n    console.log('Web server listening on port ' + app.get('port'));\r\n  });\r\n\r\n  // Watch this path for changes and reload the browser\r\n  watch__WEBPACK_IMPORTED_MODULE_2___default.a.watchTree(distPath, {interval: 1}, function (f, curr, prev) {\r\n    console.log('Tree changed, reloading browser');\r\n    reloadReturned.reload();\r\n  });\r\n}).catch(function (err) {\r\n  console.error('Reload could not start, could not start server/sample app', err)\r\n});\r\n\r\nconst gameServer = new _GameServer__WEBPACK_IMPORTED_MODULE_5__[\"default\"]();\n\n//# sourceURL=webpack:///./src/server/main.js?");

/***/ }),

/***/ "./src/shared/GameProtocol.js":
/*!************************************!*\
  !*** ./src/shared/GameProtocol.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass GameProtocol {\r\n  static get WEBSOCKET_PORT() { return 4021; }\r\n  static get WEBSOCKET_HOST() { return 'localhost'; }\r\n\r\n\r\n  static get BATTLEFIELD_PACKET_TYPE() { return 'battlefield_data'; }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (GameProtocol); \n\n//# sourceURL=webpack:///./src/shared/GameProtocol.js?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "reload":
/*!*************************!*\
  !*** external "reload" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"reload\");\n\n//# sourceURL=webpack:///external_%22reload%22?");

/***/ }),

/***/ "watch":
/*!************************!*\
  !*** external "watch" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"watch\");\n\n//# sourceURL=webpack:///external_%22watch%22?");

/***/ }),

/***/ "ws":
/*!*********************!*\
  !*** external "ws" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ws\");\n\n//# sourceURL=webpack:///external_%22ws%22?");

/***/ })

/******/ });