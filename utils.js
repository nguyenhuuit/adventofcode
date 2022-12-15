global.int = (s) => parseInt(s, 10);
global.log = console.log.bind(console);
global.isArray = arr => Array.isArray(arr);
global.isNumber = n => typeof n === 'number';
global.min = Math.min;
global.max = Math.max;
global.abs = Math.abs;
Array.prototype.sum = function() {
  return this.reduce((acc, v) => (acc += v), 0)
}
Array.prototype.mul = function() {
  return this.reduce((acc, v) => (acc *= v), 1)
}
Array.prototype.last = function() {
  return this[this.length - 1];
}
Set.prototype.addArr = function(array) {
  return this.add(array+"");
}
Set.prototype.hasArr = function(array) {
  return this.has(array+"");
}