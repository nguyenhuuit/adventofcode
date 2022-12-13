global.int = (s) => parseInt(s, 10);
global.log = console.log.bind(console);
global.isArray = arr => Array.isArray(arr);
global.isNumber = n => typeof n === 'number';
global.min = Math.min;
global.max = Math.max;
Array.prototype.sum = function() {
  return this.reduce((acc, v) => (acc += v), 0)
}
Array.prototype.mul = function() {
  return this.reduce((acc, v) => (acc *= v), 1)
}