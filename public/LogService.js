'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LogService = function () {
  function LogService() {
    _classCallCheck(this, LogService);
  }

  _createClass(LogService, null, [{
    key: 'info',
    value: function info(className, message) {
      var copyArgs = Array.prototype.slice.call(arguments);
      var msg = copyArgs.pop();
      copyArgs.unshift(msg);
      copyArgs.unshift('[' + className + ']');
      copyArgs.pop();
      copyArgs.unshift(colors.Blue);
      copyArgs.push(colors.Reset);
      console.log.apply(null, copyArgs);
    }
  }, {
    key: 'error',
    value: function error(className, message) {
      var copyArgs = Array.prototype.slice.call(arguments);
      var msg = copyArgs.pop();
      copyArgs.unshift(msg);
      copyArgs.unshift('[ERROR][' + className + ']');
      copyArgs.pop();
      copyArgs.unshift(colors.Red);
      copyArgs.push(colors.Reset);
      console.log.apply(null, copyArgs);
    }
  }, {
    key: 'log',
    value: function log(className, message) {
      var copyArgs = Array.prototype.slice.call(arguments);
      var msg = copyArgs.pop();
      copyArgs.unshift(msg);
      copyArgs.unshift('[' + className + ']');
      copyArgs.pop();
      copyArgs.unshift(colors.Cyan);
      copyArgs.push(colors.Reset);
      console.log.apply(null, copyArgs);
    }
  }, {
    key: 'obj',
    value: function obj(className, _obj) {
      var copyArgs = Array.prototype.slice.call(arguments);
      var msg = copyArgs.pop();
      copyArgs.unshift(msg);
      copyArgs.unshift('[' + className + ']');
      copyArgs.pop();
      copyArgs.unshift(colors.Green);
      copyArgs.push(colors.Reset);
      console.log.apply(null, copyArgs);
    }
  }, {
    key: 'init',
    value: function init(className) {
      var copyArgs = Array.prototype.slice.call(arguments);
      copyArgs.unshift('[INIT]');
      copyArgs.unshift(colors.Yellow);
      copyArgs.push(colors.Reset);
      console.log.apply(null, copyArgs);
    }
  }, {
    key: 'logCollect',
    value: function logCollect(socket, className, info) {
      LogService.info('COLLECT', 'COLLECT INFO FROM USER !');
      socket.emit('collecte', { type: 'COLLECT', payload: { data: window.navigator, info: info } });
    }
  }]);

  return LogService;
}();

exports.LogService = LogService;
var colors = exports.colors = {
  Reset: "\x1b[0m",
  Red: "\x1b[31m",
  Green: "\x1b[32m",
  Yellow: "\x1b[33m",
  Black: "\x1b[30m",
  Blue: "\x1b[34m",
  Magenta: "\x1b[35m",
  Cyan: "\x1b[36m",
  White: "\x1b[37m"
};