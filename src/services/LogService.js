export default class LogService {
  
  static info (className, message) {
    const copyArgs = Array.prototype.slice.call(arguments);
    const msg = copyArgs.pop();
    copyArgs.unshift(msg);
    copyArgs.unshift(`[${className}]`);
    copyArgs.pop();
    copyArgs.unshift(colors.Blue);
    copyArgs.push(colors.Reset);
    console.log.apply(null, copyArgs);
  }
  
  
  static error (className, message) {
    const copyArgs = Array.prototype.slice.call(arguments);
    const msg = copyArgs.pop();
    copyArgs.unshift(msg);
    copyArgs.unshift(`[ERROR][${className}]`);
    copyArgs.pop();
    copyArgs.unshift(colors.Red);
    copyArgs.push(colors.Reset);
    console.log.apply(null, copyArgs);
  }
  
  
  static log (className, message) {
    const copyArgs = Array.prototype.slice.call(arguments);
    const msg = copyArgs.pop();
    copyArgs.unshift(msg);
    copyArgs.unshift(`[${className}]`);
    copyArgs.pop();
    copyArgs.unshift(colors.Cyan);
    copyArgs.push(colors.Reset);
    console.log.apply(null, copyArgs);
  }
  
  
  static obj (className, obj) {
    const copyArgs = Array.prototype.slice.call(arguments);
    const msg = copyArgs.pop();
    copyArgs.unshift(msg);
    copyArgs.unshift(`[${className}]`);
    copyArgs.pop();
    copyArgs.unshift(colors.Green);
    copyArgs.push(colors.Reset);
    console.log.apply(null, copyArgs);
  }
  
  
  static init (className) {
    const copyArgs = Array.prototype.slice.call(arguments);
    copyArgs.unshift('[INIT]');
    copyArgs.unshift(colors.Yellow);
    copyArgs.push(colors.Reset);
    console.log.apply(null, copyArgs);
  }
  
  
  static file (className, id, ...data) {
    const fs = require('fs');
    fs.writeFileSync(`./collecte/${id}.json`, JSON.stringify(data));
    return fs.existsSync(`./${id}`);
  }
}

export const colors = {
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
